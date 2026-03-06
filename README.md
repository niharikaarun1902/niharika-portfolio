# Niharika Arun – Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Framer Motion**.

## Quick Start

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── content/            # Generated JSON data (source of truth for the UI)
│   ├── profile.json
│   ├── experience.json
│   ├── projects.json
│   ├── skills.json
│   ├── education.json
│   ├── certifications.json
│   ├── interests.json
│   └── hero_callouts.json
├── scripts/
│   └── ingest.py       # Python script to parse resumes → JSON
├── source/             # Raw resume files (not committed to public)
│   ├── Niharika-Arun-Resume.docx
│   ├── Niharika-Arun-Logistics-Data-Analyst-Resume.docx
│   └── linkedin.txt
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── lib/            # Data loaders
│   └── types/          # TypeScript interfaces
└── requirements.txt    # Python deps for ingestion
```

## Content Ingestion

The ingestion script parses `.docx` resumes using `python-docx` and writes
structured JSON to `content/`.

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run ingestion
python scripts/ingest.py
```

The script will:
- Parse both resume `.docx` files from `source/`
- Read `source/linkedin.txt` as supplementary data
- Deduplicate experience by company + title + date range
- Deduplicate projects by title; merge non-overlapping bullets
- Flag date conflicts in `ingestion_report.txt`
- Print a TODO checklist to the console

## Adding Assets

### Hero Video

1. Place `hero.mp4` in `public/`
2. Optionally place `hero-poster.jpg` in `public/` (used as the video poster frame)
3. The hero section auto-detects the video; if missing, a placeholder card is shown

### Avatar

Place `avatar.jpg` in `public/`.

### Resume PDF

Place `resume.pdf` in `public/`. The `/resume` page will show a download button
when the file exists.

### Logos

Place institution logos in `public/logos/`:
- `purdue.png`
- `nie.png`

## Pages

| Route | Description |
|---|---|
| `/` | Home – Hero, Progress Map, Proof of Work, Core Toolkit, Outside the Terminal, Reach Out |
| `/projects/[slug]` | Project detail – Problem, Approach, Stack, Results, Links |
| `/resume` | Resume viewer with PDF download |

## Design Tokens

CSS variables are defined in `src/app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FBFBF8` | Page background |
| `--surface` | `#FFFFFF` | Cards, nav |
| `--text` | `#1F2937` | Body text |
| `--muted` | `#4B5563` | Secondary text |
| `--primary` | `#FFB36B` | Buttons, accents |
| `--link` | `#2563EB` | Links |
| `--pastel-blue` | `#DCEBFF` | Card backgrounds |
| `--pastel-pink` | `#FFE1EC` | Card backgrounds |
| `--pastel-orange` | `#FFE7CC` | Card backgrounds |
| `--pastel-mint` | `#DDF6E6` | Card backgrounds |
| `--pastel-lavender` | `#ECE7FF` | Card backgrounds |

Fonts: **Fraunces** (headings) · **Inter** (body)
Max width: 1100px · Base font: 16px · Line height: 1.6 · Card radius: 24px

## Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Set root directory to `.` (default)
5. Deploy

Or use the CLI:

```bash
npx vercel
```

## TODO Checklist

- [ ] Add email address in `content/profile.json`
- [ ] Add `avatar.jpg` to `public/`
- [ ] Add `hero.mp4` and `hero-poster.jpg` to `public/`
- [ ] Add `resume.pdf` to `public/`
- [ ] Add Purdue logo to `public/logos/purdue.png`
- [ ] Add NIE logo to `public/logos/nie.png`
- [ ] Add credential URLs in `content/certifications.json`
- [ ] Add remaining certifications (LinkedIn mentions 12 total)
- [ ] Complete TODO fields in `content/projects.json` (capstone details, links)
- [ ] Replace placeholder interest card in `content/interests.json`
- [ ] Install Python and run `python scripts/ingest.py` to regenerate content from resumes
