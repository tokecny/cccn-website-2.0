"""
CCCN Publication Fetcher — OpenAlex-only, minimal output, with abstract/paper type

What this script does
---------------------
- Uses **OpenAlex REST API** only (CC0/public-domain metadata).
- Outputs compact `publications.json` with fields:
  { title, authors, year, link, categories, type }  where type ∈ {"abstract","paper"}.
- Detects abstracts safely from OpenAlex and (optionally) from Crossref via DOI for AAIC/A&D cases.
- **No journal names, no SJR, no journal badges**.

Attribution / Credits
---------------------
- Data from **OpenAlex** (CC0): https://api.openalex.org
  Keep `OPENALEX_MAILTO` set so they can contact you if needed.
- Optional metadata lookups from **Crossref** (DOI only): https://api.crossref.org
  No HTML/PDF scraping of publishers.

Biannual update (every ~6 months)
---------------------------------
1) venv & install:
   cd /Users/pavlov/Documents/GitHub/cccn-website-2.0
   python3 -m venv .venv && source .venv/bin/activate
   pip install requests rapidfuzz
2) run:
   export OPENALEX_MAILTO=cccnlab@gmail.com
   python scripts/fetch_publications.py
3) commit/push (เฉพาะไฟล์ผลลัพธ์):
   git add public/publications.json
   git commit -m "pubs: biannual refresh from OpenAlex"
   git push
"""

from __future__ import annotations
import os, json, re, time, random
from pathlib import Path
from typing import List, Optional, Dict
import requests
from rapidfuzz import fuzz

# ============== CONFIG ==============
ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = ROOT / "public" / "publications.json"

OPENALEX_MAILTO = os.getenv("OPENALEX_MAILTO", "")
if not OPENALEX_MAILTO:
    raise SystemExit("Please export OPENALEX_MAILTO=cccnlab@gmail.com before running.")

BASE_URL = "https://api.openalex.org"
HTTP_TIMEOUT = 30
PER_PAGE = 200
MAX_RPS = float(os.getenv("OPENALEX_MAX_RPS", "5"))
UA = {"User-Agent": "CCCN-Lab-PublicationFetcher/2.0 (+https://cccnlab.co)"}

# ใส่ OpenAlex ID ให้เรียบร้อย (หรือปล่อยว่าง เดี๋ยวสคริปต์ช่วย resolve ให้)
AUTHORS = [
    {"name": "Chaipat Chunharas", "openalex_id": "https://openalex.org/A5004289799"},
    {"name": "Anthipa Chokesuwattanaskul", "openalex_id": "https://openalex.org/A5018815415"},
]

# ตัวกรองหลัก: research articles ในวารสาร (ยังสามารถติด type=abstract ได้จากเมทาดาตา)
FILTER_RESEARCH_ONLY = True
EXCLUDE_REVIEW_BY_TITLE = True
REVIEW_PAT = re.compile(r"\b(review|systematic review|meta[- ]analysis)\b", re.I)

# นโยบาย Abstract
FORCE_JOV_AS_ABSTRACT = True     # Journal of Vision (ARVO) → mark as "abstract"
MAX_CROSSREF_LOOKUPS = 20        # เรียก Crossref ได้เล็กน้อยต่อการรัน (สุภาพ)

# ===== Topic tags =====
category_keywords: Dict[str, List[str]] = {
    "cogn": ["memory","attention","perception","decision","visual","cognitive","awareness","recognition","priming","scene","bias","eye tracking","behavioral","detection","familiarity"],
    "clin": ["clinical","patient","disorder","psychiatric","depression","therapy","mood","diagnosis","autism","anxiety","intervention","mental illness","symptom","thinning","schizophrenia"],
    "comp": ["model","bayesian","simulation","reinforcement","algorithm","network","optimization","machine learning","predictive","decoding","generative","artificial","parameter"],
    "neuro": ["brain","neural","cortex","fmri","eeg","meg","connectivity","neuroscience","bold","spike","neuron","synapse","volume","gray matter"],
}

# ===== Rate limiter =====
class RateLimiter:
    def __init__(self, rps: float):
        self.capacity = max(rps, 0.5)
        self.tokens = self.capacity
        self.refill_rate = self.capacity
        self.last = time.monotonic()
    def take(self):
        now = time.monotonic()
        elapsed = now - self.last
        self.last = now
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        if self.tokens < 1.0:
            time.sleep((1.0 - self.tokens) / self.refill_rate)
            self.tokens = 1.0
        self.tokens -= 1.0

limiter = RateLimiter(MAX_RPS)

# --- Debug toggles ---
DEBUG_RELAX_FILTERS = True   # True ในช่วงที่ต้องการดึงข้อมูลใหม่
DEBUG_LOG_URLS = False        # True เพื่อพิมพ์ URL ของคำขอสำคัญ (ช่วยไล่ปัญหา)

# ===== HTTP helper =====
def _request(method: str, url: str, *, params: dict | None = None) -> requests.Response | None:
    params = dict(params or {})
    params.setdefault("mailto", OPENALEX_MAILTO)
    for attempt in range(6):
        limiter.take()
        try:
            r = requests.request(method, url, params=params, timeout=HTTP_TIMEOUT, headers=UA)
            if r.status_code == 200:
                return r
            if r.status_code in (429, 500, 502, 503, 504):
                time.sleep((2 ** attempt) + random.uniform(0, 0.5))
                continue
            r.raise_for_status()
            return r
        except requests.RequestException:
            time.sleep((2 ** attempt) + random.uniform(0, 0.5))
    return None

# ===== OpenAlex lookups =====
def openalex_author_lookup(name: str) -> Optional[str]:
    r = _request("GET", f"{BASE_URL}/authors", params={"search": name, "per-page": 1})
    if not r: return None
    res = (r.json() or {}).get("results") or []
    return (res[0] or {}).get("id") if res else None

def openalex_author_works(author_id_or_url: str) -> list[dict]:
    aid = author_id_or_url.rsplit("/", 1)[-1]
    filters = [f"authorships.author.id:{aid}"]
    if not DEBUG_RELAX_FILTERS:
        filters.append("is_paratext:false")
    if FILTER_RESEARCH_ONLY and not DEBUG_RELAX_FILTERS:
        filters.append("type:journal-article")
    flt = ",".join(filters)

    works: list[dict] = []

    # --- โหมด cursor (ปกติ) ---
    cursor = "*"
    while True:
        params = {"filter": flt, "per-page": PER_PAGE, "cursor": cursor, "sort": "publication_date:desc"}
        if DEBUG_LOG_URLS:
            q = "&".join(f"{k}={v}" for k, v in params.items())
            print("[DEBUG] OpenAlex(cursor) =>", f"{BASE_URL}/works?{q}&mailto={OPENALEX_MAILTO}")
        r = _request("GET", f"{BASE_URL}/works", params=params)
        if not r:
            break
        j = r.json() or {}
        results = j.get("results") or []
        works.extend(results)
        cursor = (j.get("meta") or {}).get("next_cursor")
        if not cursor:
            break

    # --- Fallback: ถ้า cursor ได้ 0 ลอง page=1..N ---
    if not works:
        page = 1
        while True:
            params = {"filter": flt, "per-page": PER_PAGE, "page": page, "sort": "publication_date:desc"}
            if DEBUG_LOG_URLS:
                q = "&".join(f"{k}={v}" for k, v in params.items())
                print("[DEBUG] OpenAlex(page) =>", f"{BASE_URL}/works?{q}&mailto={OPENALEX_MAILTO}")
            r = _request("GET", f"{BASE_URL}/works", params=params)
            if not r:
                break
            j = r.json() or {}
            results = j.get("results") or []
            works.extend(results)
            if len(results) < PER_PAGE:
                break
            page += 1

    return works

# ===== Abstract detection (OpenAlex + Crossref via DOI only) =====
CROSSREF_BASE = "https://api.crossref.org"
_crossref_used = 0
AD_POSTER_OR_ORAL_PAT = re.compile(r"\b(?:p|o|lbp)\s?-?\s?\d{2,5}\b", re.I)

def looks_like_aandd_context(work: dict) -> bool:
    hv = (work.get("host_venue") or {})
    venue = (hv.get("display_name") or "").strip().lower()
    title = (work.get("title") or work.get("display_name") or "").lower()
    doi = (work.get("doi") or "").lower()
    return ("alzheimer" in venue and "dementia" in venue) or ("aaic" in title) or ("10.1002/alz" in doi)

def crossref_by_doi(doi: str) -> dict | None:
    global _crossref_used
    if not doi or _crossref_used >= MAX_CROSSREF_LOOKUPS: return None
    r = _request("GET", f"{CROSSREF_BASE}/works/{doi}")
    if not r: return None
    _crossref_used += 1
    try:
        return (r.json() or {}).get("message")
    except Exception:
        return None

def pick_link(work: dict) -> str:
    url = (work.get("primary_location") or {}).get("landing_page_url") or ""
    if url: return url
    doi = (work.get("doi") or "").strip()
    if doi: return f"https://doi.org/{doi.split('doi.org/')[-1]}"
    return ""

def detect_type(work: dict) -> str:
    # 1) กฎตามคำขอ: ถ้าลิงก์มี "jov", "suppl", หรือ "supplement" → Abstract
    primary_url = ((work.get("primary_location") or {}).get("landing_page_url") or "").lower()
    chosen_link = pick_link(work).lower()
    link_text = primary_url or chosen_link
    if any(k in link_text for k in ("jov", "suppl", "supplement")):
        return "Abstract"

    # 2) Journal of Vision (ARVO abstracts) → Abstract
    hv = work.get("host_venue") or {}
    venue = (hv.get("display_name") or "").strip().lower()
    if FORCE_JOV_AS_ABSTRACT and venue == "journal of vision":
        return "Abstract"

    # 3) ชนิดงาน/สถานะ paratext จาก OpenAlex
    wtype = (work.get("type") or "").lower()
    if wtype in {"proceedings-article", "poster"}:
        return "Abstract"
    if work.get("is_paratext") is True:
        return "Abstract"

    genre = work.get("genre")
    if isinstance(genre, list) and any(str(g).lower() == "abstract" for g in genre):
        return "Abstract"
    if isinstance(genre, str) and genre.lower() == "abstract":
        return "Abstract"

    # 4) AAIC/Alzheimer’s & Dementia supplement (via Crossref DOI metadata only — no scraping)
    if looks_like_aandd_context(work):
        doi = (work.get("doi") or "").strip()
        if doi:
            msg = crossref_by_doi(doi)
            if msg:
                issue = str(msg.get("issue") or "").lower()
                title_list = [*(msg.get("title") or []), *(msg.get("short-title") or [])]
                subtitle_list = msg.get("subtitle") or []
                subject_list = msg.get("subject") or []
                combo = " ".join([*title_list, *subtitle_list, *subject_list]).lower()
                page  = (msg.get("page") or "")
                artno = (msg.get("article-number") or "")
                code_text = f"{page} {artno}".lower()
                if ("supplement" in combo
                    or re.search(r"(^|[^a-z])s\d{1,2}([^a-z]|$)", issue)
                    or "conference" in combo or "meeting" in combo or "poster" in combo
                    or AD_POSTER_OR_ORAL_PAT.search(code_text)):
                    return "Abstract"

    # ถ้าไม่เข้าเงื่อนไขด้านบน ถือเป็น "paper" (ปล่อยว่างตามสัญญาณเดิมของระบบ)
    return ""

# ===== Transform =====
def format_authors_from_openalex(authorships: List[dict]) -> str:
    names = []
    for au in authorships or []:
        dn = ((au or {}).get("author") or {}).get("display_name") or ""
        dn = dn.strip()
        if not dn: continue
        parts = dn.split()
        if len(parts) >= 2:
            *first, last = parts
            initial = (first[0][0] + ".") if first else ""
            names.append(f"{last} {initial}")
        else:
            names.append(dn)
    return ", ".join(names)

def categorize(title: str) -> list[str]:
    t = (title or "").lower()
    return [cat for cat, kws in category_keywords.items() if any(kw in t for kw in kws)]

def simplify_openalex(work: dict) -> Optional[dict]:
    title = (work.get("title") or work.get("display_name") or "").strip()
    if not title: return None
    if EXCLUDE_REVIEW_BY_TITLE and REVIEW_PAT.search(title): return None
    year = work.get("publication_year")
    # เลือกลิงก์ครั้งเดียวเพื่อความเสถียร
    link = pick_link(work)
    return {
        "title": title,
        "authors": format_authors_from_openalex(work.get("authorships") or []),
        "year": str(year) if year else "",
        "link": link,
        "categories": categorize(title),
        "type": detect_type(work),  # "Abstract" หรือ "" (paper)
        "_sort_key": f"{int(year) if year else 0:04d}-12-31",
    }

# ===== Dedupe / Sort =====
def is_valid_clean_entry(pub: dict) -> bool:
    return (len(pub.get("title", "") or "") >= 31 and bool(pub.get("year")))

def is_similar_title(t1: str, t2: str, thr: int = 90) -> bool:
    return fuzz.partial_ratio((t1 or "").lower(), (t2 or "").lower()) >= thr

def choose_better(a: dict, b: dict) -> dict:
    # prefer paper > abstract; else newer
    pa = 1 if a.get("type") == "" else 0
    pb = 1 if b.get("type") == "" else 0
    if pa != pb: return a if pa > pb else b
    return a if (a.get("_sort_key","") > b.get("_sort_key","")) else b

def deduplicate_publications(publications: List[dict]) -> List[dict]:
    unique: List[dict] = []
    for pub in publications:
        if not is_valid_clean_entry(pub): continue
        idx = None
        for i, u in enumerate(unique):
            score = 0
            if is_similar_title(pub.get("title",""), u.get("title","")): score += 1
            if is_similar_title(pub.get("authors",""), u.get("authors","")): score += 1
            if pub.get("year") == u.get("year"): score += 1
            if score == 3: idx = i; break
        if idx is None: unique.append(pub)
        else: unique[idx] = choose_better(pub, unique[idx])
    return unique

def sort_publications(publications: List[dict]) -> List[dict]:
    arr = sorted(publications, key=lambda p: (p.get("_sort_key") or "", p.get("title") or ""), reverse=True)
    for x in arr: x.pop("_sort_key", None)
    return arr

# ===== Main =====
def main():
    # Resolve IDs if missing
    for a in AUTHORS:
        if not a.get("openalex_id"):
            a["openalex_id"] = openalex_author_lookup(a.get("name","")) or ""
        print(f"👤 Author: {a.get('name')}  ->  ID: {a.get('openalex_id') or 'NOT FOUND'}")

    all_norm: list[dict] = []
    for a in AUTHORS:
        oid = a.get("openalex_id")
        if not oid:
            print(f"⚠️ Skip {a.get('name')} — no OpenAlex ID found")
            continue
        works = openalex_author_works(oid)
        print(f"   ↳ fetched {len(works)} works before simplify")
        kept = 0
        for w in works:
            entry = simplify_openalex(w)
            if entry is not None:
                all_norm.append(entry); kept += 1
        print(f"   ↳ kept {kept} works after simplify()")

    unique = deduplicate_publications(all_norm)
    print(f"   ↳ unique {len(unique)}")
    sorted_unique = sort_publications(unique)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted_unique, f, indent=2, ensure_ascii=False)
    print(f"✅ Wrote {len(sorted_unique)} publications to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
