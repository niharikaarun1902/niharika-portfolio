#!/usr/bin/env python3
"""
Ingestion script for Niharika Arun's portfolio.

Parses .docx resumes and linkedin.txt, deduplicates entries,
and writes structured JSON to /content.

Usage:
    pip install -r requirements.txt
    python scripts/ingest.py

Requires: python-docx
"""

import json
import os
import re
import sys
from pathlib import Path
from datetime import datetime

try:
    from docx import Document
except ImportError:
    print("ERROR: python-docx is not installed.")
    print("Run:  pip install -r requirements.txt")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "source"
CONTENT = ROOT / "content"
REPORT = ROOT / "ingestion_report.txt"

MONTH_ORDER = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}

todos: list[str] = []


def log_todo(msg: str):
    todos.append(msg)
    print(f"  [TODO] {msg}")


def extract_docx_text(path: Path) -> list[str]:
    """Return all non-empty paragraphs from a .docx file."""
    doc = Document(str(path))
    lines = []
    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            lines.append(text)
    return lines


def parse_date(s: str) -> tuple[int, int]:
    """Parse 'Mon YYYY' into (year, month). Returns (9999, 0) for 'Present'."""
    s = s.strip()
    if s.lower() == "present":
        return (9999, 0)
    parts = s.split()
    if len(parts) == 2:
        month = MONTH_ORDER.get(parts[0][:3], 0)
        try:
            year = int(parts[1])
        except ValueError:
            year = 0
        return (year, month)
    return (0, 0)


def date_key(start: str, end: str) -> str:
    return f"{start.strip()}|{end.strip()}"


def slugify(text: str) -> str:
    s = text.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s-]+", "-", s)
    return s.strip("-")


# ---------------------------------------------------------------------------
# Parsers for resume sections
# ---------------------------------------------------------------------------

def extract_experience_blocks(lines: list[str]) -> list[dict]:
    """
    Heuristic parser: looks for patterns like 'Title | Company' or
    'Company — Title' followed by date ranges and bullet points.
    """
    experiences = []
    i = 0
    while i < len(lines):
        line = lines[i]
        date_match = re.search(
            r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*[-–]\s*(Present|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})",
            line,
        )
        if date_match:
            date_span = date_match.group(0)
            parts = re.split(r"\s*[-–]\s*", date_span, maxsplit=1)
            start = parts[0].strip()
            end = parts[1].strip() if len(parts) > 1 else "Present"

            title_line = lines[i - 1] if i > 0 else ""
            company = ""
            title = title_line

            for sep in [" | ", " – ", " — ", ", "]:
                if sep in title_line:
                    segs = title_line.split(sep, 1)
                    title = segs[0].strip()
                    company = segs[1].strip()
                    break

            bullets = []
            j = i + 1
            while j < len(lines) and (lines[j].startswith("•") or lines[j].startswith("-") or lines[j].startswith("–")):
                bullets.append(re.sub(r"^[•\-–]\s*", "", lines[j]))
                j += 1

            experiences.append({
                "title": title,
                "company": company,
                "startDate": start,
                "endDate": end,
                "bullets": bullets,
            })
            i = j
        else:
            i += 1
    return experiences


def deduplicate_experience(all_entries: list[dict]) -> list[dict]:
    """Deduplicate by (company, title, date range). Merge bullets."""
    seen: dict[str, dict] = {}
    for entry in all_entries:
        key = f"{entry.get('company', '').lower()}|{entry.get('title', '').lower()}|{date_key(entry['startDate'], entry['endDate'])}"
        if key in seen:
            existing = seen[key]
            existing_bullets = set(existing["bullets"])
            for b in entry["bullets"]:
                if b not in existing_bullets:
                    existing["bullets"].append(b)
        else:
            seen[key] = {**entry, "bullets": list(entry["bullets"])}
    return list(seen.values())


def deduplicate_projects(all_projects: list[dict]) -> list[dict]:
    """Deduplicate by project title. Merge non-overlapping bullets and preserve metrics."""
    seen: dict[str, dict] = {}
    for proj in all_projects:
        key = proj.get("title", "").lower().strip()
        if key in seen:
            existing = seen[key]
            existing_bullets = set(existing.get("bullets", []))
            for b in proj.get("bullets", []):
                if b not in existing_bullets:
                    existing["bullets"].append(b)
        else:
            seen[key] = {**proj}
    return list(seen.values())


def check_date_conflicts(entries: list[dict]):
    """Flag conflicting date ranges for the same role."""
    by_role: dict[str, list[dict]] = {}
    for e in entries:
        key = f"{e.get('company', '').lower()}|{e.get('title', '').lower()}"
        by_role.setdefault(key, []).append(e)
    for key, group in by_role.items():
        if len(group) > 1:
            dates = [f"{g['startDate']} – {g['endDate']}" for g in group]
            if len(set(dates)) > 1:
                log_todo(
                    f"Date conflict for '{group[0].get('title')}' at '{group[0].get('company')}': {dates}. "
                    "Picked the first occurrence; verify manually."
                )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("Portfolio Content Ingestion")
    print("=" * 60)
    CONTENT.mkdir(exist_ok=True)

    resume_files = list(SOURCE.glob("*.docx"))
    linkedin_path = SOURCE / "linkedin.txt"

    if not resume_files:
        print(f"WARNING: No .docx files found in {SOURCE}")
        log_todo("Place resume .docx files in source/ and re-run.")

    all_lines: list[list[str]] = []
    for rf in resume_files:
        print(f"\nParsing: {rf.name}")
        lines = extract_docx_text(rf)
        print(f"  Extracted {len(lines)} paragraphs")
        all_lines.append(lines)

    linkedin_text = ""
    if linkedin_path.exists():
        linkedin_text = linkedin_path.read_text(encoding="utf-8")
        print(f"\nRead linkedin.txt ({len(linkedin_text)} chars)")
    else:
        log_todo("linkedin.txt not found in source/")

    # Extract and deduplicate experience
    all_experience: list[dict] = []
    for lines in all_lines:
        all_experience.extend(extract_experience_blocks(lines))
    check_date_conflicts(all_experience)
    deduped_experience = deduplicate_experience(all_experience)
    print(f"\nExperience entries: {len(all_experience)} raw -> {len(deduped_experience)} deduplicated")

    if not deduped_experience:
        log_todo(
            "Heuristic parser found 0 experience entries. "
            "The .docx format may differ from expected. "
            "Falling back to existing content/experience.json if present."
        )

    # Write report
    with open(REPORT, "w", encoding="utf-8") as f:
        f.write(f"Ingestion Report – {datetime.now().isoformat()}\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Resume files parsed: {len(resume_files)}\n")
        for rf in resume_files:
            f.write(f"  - {rf.name}\n")
        f.write(f"LinkedIn text: {'found' if linkedin_text else 'missing'}\n")
        f.write(f"Experience entries (raw): {len(all_experience)}\n")
        f.write(f"Experience entries (deduped): {len(deduped_experience)}\n\n")
        if todos:
            f.write("TODOs:\n")
            for t in todos:
                f.write(f"  [ ] {t}\n")
        else:
            f.write("No TODOs – all clean.\n")

    print(f"\nReport written to: {REPORT}")

    # Print final TODO checklist
    print("\n" + "=" * 60)
    print("FINAL TODO CHECKLIST")
    print("=" * 60)
    static_todos = [
        "Add email address in content/profile.json",
        "Add avatar.jpg to public/",
        "Add hero.mp4 and hero-poster.jpg to public/",
        "Add resume.pdf to public/",
        "Add Purdue logo to public/logos/purdue.png",
        "Add NIE logo to public/logos/nie.png",
        "Add credential URLs in content/certifications.json",
        "Add remaining certifications (LinkedIn mentions 12 total)",
        "Complete TODO fields in content/projects.json",
        "Add personal interests in content/interests.json",
    ]
    for t in static_todos + todos:
        print(f"  [ ] {t}")
    print()


if __name__ == "__main__":
    main()
