from scholarly import scholarly
from rapidfuzz import fuzz
import json
import re
import os
from pathlib import Path

USER_IDS = [
    "Xo-8O_UAAAAJ",  # Chaipat Chunharas
    "zZDl3-AAAAAJ"   # Anthipa Chokesuwattanaskul
]

# Run ออกจาก scripts/ แล้วเข้า public/
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "public" / "publications.json"

category_keywords = {
    "cogn": [
        "memory", "attention", "perception", "decision", "visual",
        "cognitive", "awareness", "recognition", "priming", "scene", "bias",
        "eye tracking", "behavioral", "detection", "familiarity"
    ],
    "clin": [
        "clinical", "patient", "disorder", "psychiatric", "depression", "therapy",
        "mood", "diagnosis", "autism", "anxiety", "intervention", "mental illness",
        "symptom", "thinning", "schizophrenia"
    ],
    "comp": [
        "model", "bayesian", "simulation", "reinforcement", "algorithm",
        "network", "optimization", "machine learning", "predictive", "decoding",
        "generative", "artificial", "parameter"
    ],
    "neuro": [
        "brain", "neural", "cortex", "fmri", "eeg", "meg", "connectivity",
        "neuroscience", "bold", "spike", "neuron", "synapse", "volume", "gray matter"
    ]
}

def is_valid_entry(pub):
    title = pub.get("bib", {}).get("title", "").lower()
    url = pub.get("pub_url", "").lower()
    
    if any(x in title for x in ["abstract", "poster"]):
        return False
    if any(x in url for x in ["book", "bookchapter"]):
        return False
    
    return True

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

    preprint_domains = [
        "arxiv", "biorxiv", "psyarxiv", "medrxiv", "preprints",
        "osf", "engrxiv"
    ]
    trusted_journal_domains = [
        "nature", "sciencedirect", "springer", "wiley",
        "oup", "cambridge", "jneurosci", "apa", "tandfonline",
        "doi", "jstor", "frontiersin", "plos", "pnas"
    ]
    abstract_keywords = [
        "jov", "poster", "supplement", "proceedings", "meeting-abstract", "session",
        "confabstract", "conference-summary"
    ]

    # 1. Detect preprints
    if any(domain in link for domain in preprint_domains):
        return "Preprint"

    # 2. Skip abstract detection for trusted journals (even if 'abstract' in path)
    if any(domain in link for domain in trusted_journal_domains):
        return ""

    # 3. Detect real abstracts by keywords or patterns
    if any(k in link for k in abstract_keywords) or any(k in title for k in abstract_keywords):
        return "Abstract"

    if re.search(r'/[pa][0-9]{2,4}', link):  # e.g. /P123 or /A456
        return "Abstract"

    return ""

def simplify(pub):
    bib = pub.get("bib", {})
    return {
        "title": bib.get("title", ""),
        "authors": format_authors(bib.get("author", "")),
        "year": str(bib.get("pub_year", "")),
        "link": pub.get("pub_url") or "",
        "categories": categorize(bib.get("title", "")),
        "badge": detect_badge(pub.get("pub_url", "")),
    }

def fetch_user_publications(user_id):
    print(f"📥 Fetching publications for user {user_id}...")
    author = scholarly.search_author_id(user_id)
    filled = scholarly.fill(author, sections=["publications"])
    # pubs = filled.get("publications", [])[:20] // เอาไว้รันเช็คว่า fetch มาไหม
    pubs = filled.get("publications", [])

    detailed_pubs = []
    for p in pubs:
        try:
            full_pub = scholarly.fill(p)
            if is_valid_entry(full_pub):
                detailed_pubs.append(simplify(full_pub))
        except Exception as e:
            print(f"⚠️  Skipped one publication due to error: {e}")

    return detailed_pubs

def is_similar_title(t1: str, t2: str, threshold: int = 90) -> bool:
    return fuzz.partial_ratio(t1.lower(), t2.lower()) >= threshold

def is_valid_clean_entry(pub):
    return (
        len(pub.get("title", "")) >= 31 and
        bool(pub.get("year"))
    )
    
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
        pubs = fetch_user_publications(uid)
        all_pubs.extend(pubs)

    unique_pubs = deduplicate_publications(all_pubs)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(unique_pubs, f, indent=2)

    print(f"✅ Wrote {len(unique_pubs)} publications to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()

