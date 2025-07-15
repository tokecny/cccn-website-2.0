import os
import json
import re
from pathlib import Path
from typing import List
from rapidfuzz import fuzz

# 📌 ตั้งค่าตรงนี้ว่าใช้ scholarly หรือ serpapi
SOURCE = "scholarly"  # หรือ "scholarly"

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
        parts = a.strip().split()
        if len(parts) >= 2:
            *first_names, last_name = parts
            initial = first_names[0][0] + "." if first_names else ""
            formatted.append(f"{last_name} {initial}")
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

    # 🛡 Skip abstracts only if it's a trusted journal without special keywords
    if any(domain in link for domain in trusted_journal_domains):
        return ""
    
    # ✅ Check if the link itself is abstract-worthy regardless of journal
    if any(k in link for k in abstract_keywords):
        return "Abstract"

    if re.search(r'/[pa][0-9]{2,4}', link):
        return "Abstract"

    return ""

def simplify(pub):
    if SOURCE == "serpapi":
        title = pub.get("title", "")
        link = pub.get("link", "")
        
        # 🔍 ลองหาชื่อผู้แต่งจากหลายแหล่ง
        if isinstance(pub.get("author_list"), list):
            raw_authors = ", ".join(pub["author_list"])
        else:
            raw_authors = pub.get("authors", "")

    else:
        bib = pub.get("bib", {})
        title = bib.get("title", "")
        link = pub.get("pub_url", "")
        raw_authors = bib.get("author", "")

    badge = detect_badge(link, title)
    if badge == "Exclude":
        return None

    return {
        "title": title,
        "authors": format_authors(raw_authors),
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
            "author_id": user_id,
            "api_key": SERPAPI_KEY,
            "start": start
        }
        res = requests.get(base_url, params=params)
        data = res.json()
        articles = data.get("articles", [])
        
        for article in articles:
            article_id = article.get("article_id")
            if article_id:
                detail_params = {
                    "engine": "google_scholar_article",
                    "api_key": SERPAPI_KEY,
                    "article_id": article_id
                }
                detail_res = requests.get(base_url, params=detail_params)
                detail_data = detail_res.json()

                if "authors" in detail_data and isinstance(detail_data["authors"], list):
                    article["author_list"] = detail_data["authors"]
                elif "authors" in detail_data and isinstance(detail_data["authors"], str):
                    article["author_list"] = [a.strip() for a in detail_data["authors"].split(",")]

            publications.append(article)

        if len(articles) < 20:
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
