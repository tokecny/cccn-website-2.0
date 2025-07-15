import os
import json
import re
from pathlib import Path
from typing import List
from rapidfuzz import fuzz

# 📌 ตั้งค่าตรงนี้ว่าใช้ scholarly หรือ serpapi
SOURCE = "serpapi"  # หรือ "scholarly"

USER_IDS = [
    "Xo-8O_UAAAAJ",  # Chaipat Chunharas
    "zZDl3-AAAAAJ"   # Anthipa Chokesuwattanaskul
]

SERPAPI_KEY = os.getenv("SERPAPI_KEY")
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "public" / "publications.json"

category_keywords = {
    "cogn": ["memory", "attention", "perception", "decision", "visual", "cognitive", "awareness", "recognition", "priming", "scene", "bias", "eye tracking", "behavioral", "detection", "familiarity"],
    "clin": ["clinical", "patient", "disorder", "psychiatric", "depression", "therapy", "mood", "diagnosis", "autism", "anxiety", "intervention", "mental illness", "symptom", "thinning", "schizophrenia"],
    "comp": ["model", "bayesian", "simulation", "reinforcement", "algorithm", "network", "optimization", "machine learning", "predictive", "decoding", "generative", "artificial", "parameter"],
    "neuro": ["brain", "neural", "cortex", "fmri", "eeg", "meg", "connectivity", "neuroscience", "bold", "spike", "neuron", "synapse", "volume", "gray matter"]
}

def format_authors(raw: str):
    authors = [a.strip() for a in raw.split(" and ")]
    formatted = []
    for a in authors:
        parts = a.split()
        if len(parts) >= 2:
            last = parts[-1]
            initials = [p[0] + "." for p in parts[:-1]]
            formatted.append(f"{last} {' '.join(initials)}")
        else:
            formatted.append(a)
    return ", ".join(formatted)

def categorize(title: str):
    categories = set()
    title = title.lower()
    for cat, keywords in category_keywords.items():
        if any(kw in title for kw in keywords):
            categories.add(cat)
    return list(categories)

def detect_badge(link: str, title: str = "") -> str:
    if not link:
        return ""

    link = link.lower()
    title = title.lower()

    # 🚫 ตัดออกกรณีเป็น book chapter หรือใกล้เคียง
    book_exclude_keywords = [
        "bookchapter", "book-section", "booksection", "handbook", "textbook", "editedvolume", "monograph"
    ]
    if any(k in link for k in book_exclude_keywords):
        return "Exclude"  

    preprint_domains = [
        "arxiv", "biorxiv", "psyarxiv", "medrxiv", "preprints",
        "osf", "engrxiv"
    ]
    if any(domain in link for domain in preprint_domains):
        return "Preprint"
    
    trusted_journal_domains = [
        # สำนักพิมพ์หลัก
        "nature",          # รวม Nature, Nature Comm, Sci Reports
        "sciencedirect",   # Elsevier journals (Neuron, TINS, etc.)
        "springer",        # Springer journals
        "wiley",           # Wiley (e.g., Human Brain Mapping, Alzheimer's & Dementia)
        "oup",             # Oxford University Press (e.g., Brain, Sleep)
        "cambridge",       # Cambridge University Press
        "tandfonline",     # Taylor & Francis
        "frontiersin",     # Frontiers journals
        "plos",            # PLOS ONE, PLOS Biology
        "pnas",            # PNAS.org
        "jneurosci",       # Journal of Neuroscience (SfN)
        "apa",             # American Psychological Association
        "jamanetwork",     # JAMA Neurology, Psychiatry
        "thelancet",       # Lancet Neurology
        "aacrjournals",    # Cancer neuroscience/biomarker research
        "karger",          # Neurology and neuroscience focus
        "biomedcentral",   # BMC journals
        "lww",             # Wolters Kluwer (e.g., Neurology by AAN)
        "cell",            # Cell Press (Neuron, TINS)
        "sciencemag",      # Science, Science Translational Medicine
        "sagepub",         # SAGE journals (Clinical Neuroscience, Psychology)
        "jstor",           # Archive, older neuroscience/psych papers
        "elifesciences",   # eLife
        "alz-journals",    # Alzheimer's & Dementia journal (ISTAART)
        "aaas",            # American Association for the Advancement of Science
    ]
    abstract_keywords = [
        "jov", "poster", "supplement", "proceedings",
        "meeting-abstract", "session", "confabstract", "conference-summary",
        "abstract", "symposium"
    ]
    if any(k in title for k in abstract_keywords):
        return "Abstract"

    if any(k in link for k in abstract_keywords):
        if not any(domain in link for domain in trusted_journal_domains):
            return "Abstract"

    if re.search(r'/[pa][0-9]{2,4}', link):
        return "Abstract"

    return ""

def simplify(pub):
    if SOURCE == "serpapi":
        link = pub.get("link", "")
        title = pub.get("title", "")
    else:
        bib = pub.get("bib", {})
        link = pub.get("pub_url", "")
        title = bib.get("title", "")

    badge = detect_badge(link, title)
    if badge == "Exclude":
        return None  # <<< กรองออกจาก list

    return {
        "title": title,
        "authors": format_authors(pub.get("authors", "") if SOURCE == "serpapi" else bib.get("author", "")),
        "year": str(pub.get("year", "") if SOURCE == "serpapi" else bib.get("pub_year", "")),
        "link": link,
        "categories": categorize(title),
        "badge": badge,
    }

def is_similar_title(t1: str, t2: str, threshold: int = 90) -> bool:
    return fuzz.partial_ratio(t1.lower(), t2.lower()) >= threshold

def is_valid_clean_entry(pub):
    return (
        len(pub.get("title", "")) >= 31 and
        bool(pub.get("year"))
    )

def normalize_pub(pub: dict, source: str):
    if source == "serpapi":
        return {
            "title": pub.get("title", ""),
            "authors": format_authors(pub.get("authors", "")),
            "year": str(pub.get("year", "")),
            "link": pub.get("link", ""),
            "categories": categorize(pub.get("title", "")),
            "badge": detect_badge(pub.get("link", ""), pub.get("title", "")),
        }
    elif source == "scholarly":
        bib = pub.get("bib", {})
        return {
            "title": bib.get("title", ""),
            "authors": format_authors(bib.get("author", "")),
            "year": str(bib.get("pub_year", "")),
            "link": pub.get("pub_url", ""),
            "categories": categorize(bib.get("title", "")),
            "badge": detect_badge(pub.get("pub_url", ""), bib.get("title", "")),
        }

def fetch_user_publications_serpapi(user_id) -> List[dict]:
    import requests
    print(f"📥 Fetching from SerpAPI for {user_id}...")
    base_url = "https://serpapi.com/search.json"
    start = 0
    publications = []

    while True:
        params = {
            "engine": "google_scholar_author",
            "user_id": user_id,
            "api_key": SERPAPI_KEY,
            "start": start
        }
        res = requests.get(base_url, params=params)
        data = res.json()
        pubs = data.get("articles", [])
        publications.extend(pubs)
        if len(pubs) < 20:
            break
        start += 20
    return publications

def fetch_user_publications_scholarly(user_id) -> List[dict]:
    from scholarly import scholarly
    print(f"📥 Fetching from scholarly for {user_id}...")
    author = scholarly.search_author_id(user_id)
    filled = scholarly.fill(author, sections=["publications"])
    pubs = filled.get("publications", [])
    detailed = []
    for p in pubs:
        try:
            full = scholarly.fill(p)
            detailed.append(full)
        except Exception as e:
            print(f"⚠️ Error: {e}")
    return detailed

def deduplicate_publications(publications):
    unique = []
    for pub in publications:
        if not is_valid_clean_entry(pub):
            continue
        is_duplicate = False
        for u in unique:
            score = 0
            if is_similar_title(pub["title"], u["title"]): score += 1
            if is_similar_title(pub["authors"], u["authors"]): score += 1
            if pub["year"] == u["year"]: score += 1
            if score == 3:
                is_duplicate = True
                break
        if not is_duplicate:
            unique.append(pub)
    return unique

def main():
    all_pubs = []
    for uid in USER_IDS:
        if SOURCE == "serpapi":
            pubs = fetch_user_publications_serpapi(uid)
        else:
            pubs = fetch_user_publications_scholarly(uid)
            
        normalized = [
            p for p in [simplify(pub) for pub in pubs]
            if p is not None
        ]
        all_pubs.extend(normalized)

    unique = deduplicate_publications(all_pubs)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(unique, f, indent=2)
    print(f"✅ Wrote {len(unique)} publications to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
