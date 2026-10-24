# Weekend 1 Checklist (Oct 24-25)

**Goal for the weekend:** a deployed site with a working layout, Home page, Projects index, and all three project pages (with draft content).

---

## Before you start (content track, ongoing, you and your AI)

- [ ] Fix the duplicated Style Finder link on your resume and notes
- [ ] Fork or transfer Pop Hop, InstaHAM, and Style Finder repos to your own GitHub profile
- [ ] For each project, write 2-3 things *you* built ("My role")
- [ ] Draft each case study (about 300-500 words): problem, my role, key technical decisions, verifiable facts, links
- [ ] Take screenshots: Pop Hop (3-4), Style Finder (3-4), InstaHAM (app screens)
- [ ] Deploy Style Finder on Streamlit Community Cloud if it isn't hosted
- [ ] Record the 30-60 second InstaHAM demo video
- [ ] Export the final resume as `Gio-Ferreras-Resume.pdf` (email, GitHub, LinkedIn only)
- [ ] Collect your GitHub and LinkedIn URLs

---

## Day 1: Setup and foundation

### 1. Repo and project
- [ ] Create a new **public** GitHub repo, e.g. `gioferreras-portfolio`, with a README
- [ ] Scaffold: `pnpm create next-app@latest` with TypeScript, Tailwind, ESLint, App Router, `src/` directory
- [ ] Run `pnpm dev` and confirm the default page loads
- [ ] Commit and push to `main`

### 2. Code quality
- [ ] Add Prettier (and the Tailwind Prettier plugin) with a config file
- [ ] Add scripts: `lint`, `format`, `typecheck`
- [ ] Add a GitHub Actions workflow that runs lint, typecheck, and build on every push and PR
- [ ] Confirm the workflow passes (green check on GitHub)

### 3. Vercel
- [ ] Import the repo in Vercel and deploy
- [ ] Confirm a preview deployment appears for a test branch
- [ ] Enable Vercel Web Analytics

### 4. Fonts
- [ ] Load Anton, Space Mono, Inter, and Pixelify Sans through `next/font/google`
- [ ] Expose each as a CSS variable and map them in the Tailwind config (`display`, `mono`, `sans`, `pixel`)

### 5. Design tokens (Tailwind)
- [ ] Colors: cream background, near-black ink, red-orange, yellow
- [ ] Border width (2-3px black) and hard offset shadow utilities
- [ ] A shared focus-ring style for all interactive elements
- [ ] Check text contrast for every accent fill (black text on red-orange and on yellow)

### 6. Base components
- [ ] `Container`
- [ ] `Button` (primary, secondary; link and button variants; hover and focus states)
- [ ] `Tag` (stack chips, bracketed `[ LABEL ]` style)
- [ ] `Card` (border plus offset shadow)
- [ ] `SectionHeading`

### 7. Layout
- [ ] Header with nav: Home, Projects, About, Resume, Contact (works on mobile)
- [ ] Footer with email, GitHub, LinkedIn
- [ ] "Skip to content" link
- [ ] Base metadata (site title, description) and a placeholder favicon
- [ ] Commit, push, and check the preview deployment on your phone

---

## Day 2: Content model, Home, Projects

### 8. MDX content setup
- [ ] Install an MDX approach that works with static generation (e.g. `gray-matter` for frontmatter plus `next-mdx-remote` rendered on the server)
- [ ] Create `content/projects/` with `pop-hop.mdx`, `instaham.mdx`, `style-finder.mdx`
- [ ] Define the frontmatter fields: `title`, `slug`, `summary`, `stack`, `order`, `cover`, `links` (demo, repo), `year`
- [ ] Write a typed helper that reads and sorts projects by `order`
- [ ] Paste in your draft case studies (placeholder text is fine for now; no invented metrics)

### 9. Home page
- [ ] Hero: your name in Pixelify Sans, the headline, "View projects" and "Download resume" buttons
- [ ] Featured projects section using the three project cards
- [ ] No intro animation
- [ ] Add the resume PDF to `public/` so the button works

### 10. Projects pages
- [ ] `/projects` index with the three cards in order
- [ ] `/projects/[slug]` detail page with `generateStaticParams`
- [ ] Sections: summary, My role, key technical decisions, facts/metrics, screenshots, links
- [ ] Add screenshots with `next/image` and alt text
- [ ] Handle a missing project with the 404 page

### 11. Checks
- [ ] Test at 375px, 768px, and 1280px widths
- [ ] Tab through every page with the keyboard only; focus is always visible
- [ ] Run `pnpm build` locally with no errors
- [ ] Run Lighthouse once on Home to get a baseline (don't optimize yet)
- [ ] Commit, push, and open the preview URL on your phone

---

## Definition of done for weekend 1

- [ ] Site deployed on Vercel from `main`
- [ ] CI passing
- [ ] Home, Projects index, and all three project pages working with draft content
- [ ] Design tokens and base components in place and reused
- [ ] Mobile layout works with no horizontal scrolling
- [ ] Nothing in the repo has fake metrics or placeholder numbers presented as real

---

## Weekend 2 preview (Oct 31-Nov 1)

About page, Resume page, Contact page, Open Graph image, polish, Lighthouse and accessibility pass to 95+, peer review, domain, launch.
