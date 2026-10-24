# Portfolio Website: Requirements

**Owner:** Gio Ferreras
**Last updated:** October 21, 2026
**Status:** Confirmed, ready to build

---

## 1. Goal

Get a short internship (December to January) by showing projects clearly and professionally.

**Success criteria (launch gates)**
- Peer review by 2-3 developer friends passes
- Lighthouse 95+ in all four categories (Performance, Accessibility, Best Practices, SEO), on mobile and desktop
- A stranger can find the best project and the contact email within 10 seconds on mobile and desktop
- Every featured project has something a recruiter can see in under a minute (live demo, hosted demo, or video)

**Timing**
- Apply to internships now. The site does not gate applications.
- Target launch: about November 1, 2026

## 2. Audience and positioning

- **Audience:** recruiters and engineers screening internship candidates (full-stack/frontend web, with ML as a plus)
- **Name:** Gio Ferreras
- **Headline:** "Computer Science student building full-stack web apps and computer vision tools"
- **Availability line** (About and Contact only): "Open to internship opportunities". No dates, location, or work-style preference.

## 3. Scope

### In scope
Home, Projects (index + 3 detail pages), About, Resume, Contact.

### Out of scope (on purpose)
- SOICT conference details and December travel (handled in interviews)
- RAITE, Capabara bootcamp, Matsuo-Iwasa course (resume only)
- Anything about the Taiwan hackathon result
- Location or hybrid/online/on-site preferences
- PTF04 Portfolio as a featured project
- Blog, CMS, contact form, dark mode, inline PDF preview (all possible later additions)

## 4. Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router), static generation, no server logic |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Package manager | pnpm |
| Content | MDX files in the repo (frontmatter for metadata), no CMS |
| Quality | ESLint + Prettier |
| CI | GitHub Actions: lint + build on every push |
| Hosting | Vercel (preview deployments per branch) |
| Analytics | Vercel Web Analytics (no cookie banner) |
| Fonts | `next/font`: Anton, Space Mono, Inter, Pixelify Sans |

## 5. Pages and requirements

### 5.1 Home
- Name in pixel font (Pixelify Sans), the headline, two buttons: "View projects" and "Download resume"
- Three featured projects below, in order: Pop Hop, InstaHAM, Style Finder
- No intro animations or loading screens

### 5.2 Projects
- Index page listing the three projects as cards
- One page per project (`/projects/[slug]`), about 300-500 words, with this structure:
  1. Problem
  2. **My role** (2-3 specific things Gio personally built, linked to commits or PRs where possible)
  3. Key technical decisions and why
  4. Verifiable facts or metrics (see section 8)
  5. Screenshots (at the top)
  6. Links: live demo or demo video, GitHub repo

| Project | Order | Demo | Notes |
|---|---|---|---|
| Pop Hop | 1 | Live (Vercel) | Leads: matches target roles |
| InstaHAM | 2 | 30-60s demo video | Mobile app; title only, no conference line for now |
| Style Finder | 3 | Streamlit Community Cloud | Deploy if not already hosted |

### 5.3 About
Only these five elements:
1. Short bio (3-4 sentences, own voice)
2. Skills grouped by area: Frontend, Backend, ML/CV, Tools
3. Experience: MIS Developer Intern, Inari Amertron Inc. (June to July 2026), described at resume level only, with no internal details or screenshots of the company's system
4. Education: B.S. Computer Science, Angeles University Foundation (2023 to expected 2027), DOST-SEI Merit scholarship, College & University Scholar
5. One recognition line: led a 9-person team in the Presidential Hackathon International Track, proposing an app connecting Filipino caregivers with elderly and care-dependent patients in Taiwan (role: assigned work and oversaw production; no claim of award or finalist status)

Plus the availability line (section 2). A headshot is optional; if there isn't a good one, launch without it.

### 5.4 Resume
- Clear download button on Home and on the Resume page, plus a simple page, with no embedded PDF
- Single file: `Gio-Ferreras-Resume.pdf`
- Public contact details: email, GitHub, LinkedIn only (no phone, no home address)

### 5.5 Contact
- gioferreras@gmail.com as a `mailto:` link with a copy-to-clipboard button
- GitHub and LinkedIn links
- No form

## 6. Design

**Style:** neo-brutalist / retro, based on the Komi Store and Joshua reference screenshots.

- **Mode:** light only at launch
- **Base:** cream background, near-black text, 2-3px black borders, hard offset shadows
- **Accents:** two only, red-orange (primary) and yellow (secondary), **used only as fills behind black text, never as text color on cream**
- **Typography:** Anton (display headings), Space Mono (labels, tags, buttons), Inter (body), Pixelify Sans (the name in the hero only)
- **Retro touch (limited):** pixel-font name plus bracketed `[ LABEL ]` styling on small UI details
- **Not used:** tape, stickers, handwriting, neon-on-light text, intro animations

## 7. Accessibility, performance, SEO

- Visible focus outline on every interactive element
- Keyboard-navigable throughout, with a "skip to content" link
- Sufficient text contrast (check every accent fill)
- Alt text on all images
- Responsive from 375px up
- Per-page metadata (title, description) and a generated Open Graph image so links preview well on LinkedIn
- Favicon, custom 404 page
- Fonts loaded via `next/font` (self-hosted)

## 8. Content rules

- Use only claims Gio can defend in an interview
- No placeholder numbers at launch
  - Pop Hop and Style Finder: countable facts from the repos (roles, API routes, database models, dataset size, features shipped)
  - InstaHAM: metrics from the team paper. If not ready by launch, that page ships without a metrics section.
- Internship description stays at resume level

## 9. Repo and deployment

- **New public repo**, tidy commits, README explaining the stack and how to run it
- Old portfolio project (`ptf04-portfolio.vercel.app`) stays deployed and redirects to the new domain
- **Domain:** `gioferreras.dev` (fallbacks: `.com`, `.me`), with the name consistent in header, titles, and social image
- Vercel preview for each branch, production from `main`

## 10. Pre-launch cleanup

- [ ] Fix the duplicated Style Finder link (it was pasted under PTF04 Portfolio)
- [ ] Fork or transfer the featured team repos to Gio's own GitHub profile
- [ ] Record a 30-60 second InstaHAM demo video
- [ ] Deploy Style Finder on Streamlit Community Cloud if not already hosted
- [ ] Write "My role" items for each project
- [ ] Collect screenshots for Pop Hop and Style Finder
- [ ] Add GitHub and LinkedIn URLs for the Contact page
- [ ] Final resume PDF with email, GitHub, LinkedIn only

## 11. Schedule

| When | Focus |
|---|---|
| Weekend 1 (Oct 24-25) | Content prep, project setup, Home and Projects pages |
| Weekend 2 (Oct 31-Nov 1) | About, Resume, Contact, polish, Lighthouse and accessibility pass, peer review, domain, launch |

## 12. Working agreement

- Gio writes and owns the implementation, since it may come up in interviews
- Claude supplies the checklist, starter code in small chunks, and a review after each chunk
- Content, screenshots, metrics, and profile links are gathered by Gio

## 13. Possible later additions

Dark mode, blog, extra projects, SOICT paper line on InstaHAM (once the title and publication status are final), contact form.
