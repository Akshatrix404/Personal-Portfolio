# Portfolio update — based on your combined resumes

## What happened to the uploaded zip
The `akshat-portfolio.zip` was a git repo, but its object database was incomplete —
only `App.tsx` (layout) and your Skills/Services component survived. The other
section files (Hero, About, Projects, Experience, Testimonials, Contact, Footer,
CustomCursor, index.css) were not recoverable, so they're rebuilt from scratch
below, following the visual language of the surviving files (deep-purple/aqua
gradient palette, `font-heading` / `font-body`, glassy nav, noise overlay,
flashcard sections alternating dark/light).

## Files in this delivery (`src/`)
- `App.tsx` — your original layout, with the "Testimonials" nav label renamed to
  **"Recognition"** since that section's content changed.
- `index.css` — recreated global stylesheet defining the CSS variables
  (`--bg-deep`, `--bg-dark`, `--royal-violet`, `--pearl-aqua`, `--slate-blue`),
  `font-heading` / `font-body` (Space Grotesk + Inter), and `.noise-overlay`
  that your components rely on. **Drop this in as `src/index.css`** — your
  current stylesheet was also missing from the zip.
- `components/Hero.tsx` — name, rotating role ("AI/ML Engineer" / "Data Analyst"
  / "GenAI Developer"), tagline, CTAs, socials.
- `components/About.tsx` — combined summary, VIT Vellore education, coursework,
  and quick stats.
- `components/Services.tsx` — **Skills**, rebuilt with 3 tabs that actually match
  your resumes: **AI/ML Engineer**, **Generative AI & LLMs**, **Data Analyst**
  (the old Android/Full-Stack tabs are gone).
- `components/Projects.tsx` — ProbeAI, WealthSense+, RupeeX with tech-stack chips
  and impact bullets.
- `components/Experience.tsx` — PraisIT, Genpact, and your Team Prometheus
  POR history as a timeline.
- `components/Testimonials.tsx` — repurposed as **Achievements**: the Build &
  Beyond Hackathon highlight + your 4 certifications. (No real testimonials
  existed in either resume, so this slot now carries recognition/credentials —
  rename the section/nav label further if you'd rather call it something else.)
- `components/Contact.tsx` — email, phone, LinkedIn, GitHub, portfolio link.
- `components/Footer.tsx` — closing brand mark + quick links.
- `components/CustomCursor.tsx` — recreated custom cursor (dot + trailing ring).

## Integration notes
1. Copy `src/index.css` and `src/App.tsx` into your project root `src/`.
2. Copy everything in `src/components/` into your project's `src/components/`.
3. Confirm your project has `framer-motion` and Tailwind configured (your
   `package.json`/`tailwind.config.js` weren't in the recoverable objects either
   — if Tailwind isn't already set up, let me know and I can scaffold those too).
4. Update the placeholder `#` links in `Projects.tsx` with your actual GitHub
   repo / live demo URLs for ProbeAI, WealthSense+, and RupeeX.

## Things worth double-checking
- PraisIT internship dates read "May 2026 – Jul 2026" in your resume — that's
  in the future relative to today; you may want to confirm/correct this.
- Project GitHub/demo links are placeholders (`#`).