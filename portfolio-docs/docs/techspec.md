# Portfolio Website: Technical Specification

**Owner:** Gio Ferreras
**Last updated:** October 21, 2026
**Companion docs:** `requirements.md` (what and why), `weekend-1-checklist.md` (tasks)

This document defines *how* the site is built. If it conflicts with `requirements.md`, the requirements win and this file gets updated.

> **Version note:** package versions are not pinned here. Use the latest stable releases at scaffold time and commit the lockfile. Where a tool's setup changed between major versions (notably Tailwind), check the scaffold output and adapt the snippets below.

---

## 1. Architecture overview

A fully static, content-driven site. No database, no API routes, no server-side logic at request time.

```
MDX files (content/projects/*.mdx)
        │  read at build time (fs + gray-matter + zod validation)
        ▼
Next.js App Router (server components, static generation)
        │  generateStaticParams for /projects/[slug]
        ▼
Static HTML + minimal client JS
        │
        ▼
Vercel CDN
```

**Principles**
- Server components by default. Client components only where interaction requires it.
- Content lives in the repo as MDX, validated at build time. A bad frontmatter field fails the build.
- Everything a recruiter sees is pre-rendered HTML, so it is fast and works without JavaScript.
- Do **not** use `output: 'export'`. Vercel serves the statically generated pages already and `next/image` optimization keeps working.

## 2. Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js, App Router | Static generation |
| Language | TypeScript, `strict: true` | Plus `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS | Tokens defined once (section 6) |
| Content | MDX + `gray-matter` + `next-mdx-remote` (RSC build) | Frontmatter validated with `zod` |
| Fonts | `next/font/google` | Anton, Space Mono, Inter, Pixelify Sans |
| Images | `next/image` | Local files in `public/` or colocated imports |
| Analytics | `@vercel/analytics` | Cookie-free, no consent banner |
| Lint/format | ESLint (Next config) + Prettier + `prettier-plugin-tailwindcss` | |
| CI | GitHub Actions | lint, typecheck, build |
| Hosting | Vercel | Previews per branch, production from `main` |
| Package manager | pnpm | Pin via `packageManager` in `package.json` |

## 3. Repository structure

```
gioferreras-portfolio/
├─ .github/workflows/ci.yml
├─ content/
│  └─ projects/
│     ├─ pop-hop.mdx
│     ├─ instaham.mdx
│     └─ style-finder.mdx
├─ public/
│  ├─ Gio-Ferreras-Resume.pdf
│  ├─ projects/<slug>/…           # screenshots, demo poster images
│  └─ favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               # fonts, header, footer, metadata, analytics
│  │  ├─ page.tsx                 # Home
│  │  ├─ globals.css              # Tailwind import + tokens
│  │  ├─ not-found.tsx
│  │  ├─ opengraph-image.tsx      # generated social preview
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ projects/
│  │  │  ├─ page.tsx              # index
│  │  │  └─ [slug]/page.tsx       # detail
│  │  ├─ about/page.tsx
│  │  ├─ resume/page.tsx
│  │  └─ contact/page.tsx
│  ├─ components/
│  │  ├─ ui/                      # Button, Tag, Card, Container, SectionHeading
│  │  ├─ layout/                  # Header, MobileNav, Footer, SkipLink
│  │  ├─ projects/                # ProjectCard, ProjectLinks, MdxComponents
│  │  └─ contact/                 # CopyEmailButton
│  ├─ lib/
│  │  ├─ projects.ts              # load, validate, sort
│  │  ├─ schema.ts                # zod schemas
│  │  └─ site.ts                  # site-wide constants (name, email, URLs)
│  └─ types/
├─ next.config.ts
├─ prettier.config.mjs
├─ tsconfig.json
└─ README.md
```

## 4. Routes

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static | Hero + featured projects |
| `/projects` | Static | Cards sorted by `order` |
| `/projects/[slug]` | Static (SSG) | `generateStaticParams`; `dynamicParams = false` so unknown slugs 404 |
| `/about` | Static | Content from components, not MDX |
| `/resume` | Static | Download button + short page |
| `/contact` | Static | One small client component (copy button) |
| `/opengraph-image` | Static at build | `next/og` `ImageResponse` |
| `/sitemap.xml`, `/robots.txt` | Static | From `sitemap.ts` and `robots.ts` |
| `*` | Static | `not-found.tsx` |

## 5. Content model

### 5.1 Frontmatter schema (`src/lib/schema.ts`)

```ts
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().max(180),           // card + meta description
  year: z.number().int(),
  order: z.number().int(),                // 1 = first on the site
  stack: z.array(z.string()).min(1),
  cover: z.object({ src: z.string(), alt: z.string() }),
  links: z.object({
    demo: z.string().url().optional(),    // live site or hosted demo
    video: z.string().url().optional(),   // e.g. InstaHAM demo
    repo: z.string().url(),
  }),
  role: z.array(z.string()).min(1).max(4), // "My role" bullets
  facts: z.array(z.string()).optional(),   // verifiable facts or metrics; omit section if absent
});

export type ProjectMeta = z.infer<typeof projectSchema>;
```

**Rules enforced by the schema and the loader**
- `slug` must match the filename.
- At least one of `demo` or `video` should exist before launch (checked by a build-time warning, not an error, so drafts can build).
- `facts` is optional. If absent, the page simply renders no metrics section, so nothing is ever a placeholder.

### 5.2 Loader (`src/lib/projects.ts`)

Responsibilities:
1. Read all `content/projects/*.mdx` with `fs`.
2. Parse with `gray-matter`, validate with `projectSchema`, throw a clear error naming the file on failure.
3. Return `{ meta, content }[]` sorted by `order`.
4. Expose `getAllProjects()`, `getProjectBySlug(slug)`, `getFeaturedProjects()` (first three).

All reads happen at build time, in server components only. The module must never be imported from a client component.

### 5.3 MDX body structure

Each project file follows the same headings, rendered with shared MDX components (`MdxComponents.tsx`):

```mdx
## Problem
## Key technical decisions
## Outcome
```

"My role" and "Facts" come from frontmatter and are rendered by the page template, not written in the body, so the structure is consistent across all three projects.

## 6. Design system implementation

### 6.1 Tokens

Defined once in `globals.css`. With Tailwind v4 (CSS-first config) this is an `@theme` block; with v3 the same values go in `tailwind.config.ts` under `theme.extend`.

```css
@import "tailwindcss";

@theme {
  --color-cream: #f4efe3;
  --color-ink: #111111;
  --color-accent-red: #e5372b;     /* verify contrast with ink text */
  --color-accent-yellow: #f5c542;

  --font-display: var(--font-anton), ui-sans-serif, system-ui;
  --font-mono: var(--font-space-mono), ui-monospace, monospace;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui;
  --font-pixel: var(--font-pixelify), ui-monospace, monospace;

  --shadow-brutal: 4px 4px 0 0 var(--color-ink);
  --shadow-brutal-lg: 8px 8px 0 0 var(--color-ink);
}
```

Hex values above are starting points. The contrast check in section 9 decides the final values.

### 6.2 Style rules

- Borders: `border-2 border-ink` (3px on large cards).
- Shadow: `shadow-brutal` at rest; on hover, translate by `(2px, 2px)` and reduce the shadow to simulate a press.
- Accent colors are **fills only** (`bg-accent-*` with `text-ink`). Never `text-accent-*` on cream.
- Display headings: Anton, uppercase. Labels, tags, buttons: Space Mono, uppercase, small. Body: Inter. The pixel font appears only on the name in the hero.
- Light theme only. Set `color-scheme: light`.
- Respect `prefers-reduced-motion`: the press-hover effect is a transform only and is disabled when reduced motion is requested.

### 6.3 Fonts (`layout.tsx`)

```tsx
import { Anton, Space_Mono, Inter, Pixelify_Sans } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: "400", variable: "--font-pixelify", display: "swap" });
```

Apply all four variable classes on `<html>`. Load Pixelify with a small `subsets` footprint, since it is used for one line of text. Confirm each font's available weights in the scaffold's type errors if a weight is rejected.

## 7. Components

| Component | Type | Key props | Notes |
|---|---|---|---|
| `Container` | Server | `as?`, `className` | Max width, horizontal padding |
| `Button` | Server | `variant: "primary" \| "secondary"`, `href?`, `download?` | Renders `<a>` or `<button>`; visible focus ring |
| `Tag` | Server | `children`, `bracketed?` | Stack chips; `[ LABEL ]` style |
| `Card` | Server | `as?`, `className` | Border + shadow |
| `SectionHeading` | Server | `level`, `children` | Correct heading level; styling decoupled from level |
| `Header` | Server | none | Wraps `MobileNav` |
| `MobileNav` | **Client** | `links` | Menu toggle; `aria-expanded`, `aria-controls`, closes on route change and Escape |
| `Footer` | Server | none | Email, GitHub, LinkedIn |
| `SkipLink` | Server | none | First focusable element |
| `ProjectCard` | Server | `meta` | Whole card is one link; one `<h3>` |
| `ProjectLinks` | Server | `links` | Demo, video, repo |
| `CopyEmailButton` | **Client** | `email` | `navigator.clipboard`, with a visible "Copied" state announced via `aria-live="polite"`; falls back to the `mailto:` link if clipboard is unavailable |

Client JavaScript on the whole site is limited to `MobileNav`, `CopyEmailButton`, and the Vercel Analytics script.

## 8. Site constants (`src/lib/site.ts`)

One file holds anything reused across pages, so changes happen in one place:

```ts
export const site = {
  name: "Gio Ferreras",
  headline: "Computer Science student building full-stack web apps and computer vision tools",
  availability: "Open to internship opportunities",
  email: "gioferreras@gmail.com",
  url: "https://gioferreras.dev",          // update if a fallback domain is used
  github: "",                               // fill in
  linkedin: "",                             // fill in
  resumePath: "/Gio-Ferreras-Resume.pdf",
} as const;
```

Empty `github` / `linkedin` values fail a build-time check before production deploys (see section 12).

## 9. Accessibility requirements (implementation level)

- One `<h1>` per page; headings never skip levels.
- Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`.
- Skip link targets `#main`.
- Every interactive element has a `:focus-visible` outline of at least 3px with 3:1 contrast against its surroundings, defined once as a shared utility.
- Contrast: body text and every label on an accent fill must reach WCAG AA (4.5:1 for normal text). Check ink on both accent colors and the muted text color on cream. Adjust the accent hex values, not the text color, if one fails.
- Links and buttons have descriptive names ("View Pop Hop case study", not "Read more").
- Images: meaningful `alt`; decorative images use `alt=""`.
- The demo video, if embedded, has captions or a text summary, and does not autoplay.
- Touch targets at least 44×44px.
- The mobile nav works by keyboard and screen reader (see `MobileNav`).

## 10. SEO and social

- `metadata` exported from each page: unique `title` (`Page | Gio Ferreras`) and `description`.
- Project pages derive their metadata from frontmatter via `generateMetadata`.
- `metadataBase` set from `site.url`.
- `opengraph-image.tsx` generates a 1200×630 image with the name and headline in the site's style. If the OG image needs custom fonts, load them from local files inside the route, not from the network at build time.
- `sitemap.ts` lists all static routes plus project slugs. `robots.ts` allows all and points at the sitemap.
- Canonical URL per page.

## 11. Performance budget

| Metric | Target |
|---|---|
| Lighthouse (all four categories, mobile) | 95+ |
| LCP | under 2.0s on mobile profile |
| CLS | under 0.05 |
| Total JS on Home (compressed) | as small as the framework allows; no extra client libraries beyond analytics |
| Images | Use `next/image` with explicit `width`/`height` or `fill` with sized containers; `priority` only on the single above-the-fold image; screenshots ≤ 1600px wide before upload |
| Fonts | Four families, `display: swap`, subsets limited to Latin |

Rule of thumb: if a feature needs a new client-side library, it probably does not belong on this site.

## 12. Build-time checks

Run during `pnpm build` or as a pre-build script:

1. Validate all project frontmatter (section 5).
2. Warn if a project has neither `demo` nor `video`.
3. Fail production builds (`VERCEL_ENV=production`) if `site.github` or `site.linkedin` is empty, or if any MDX file contains the strings `TODO`, `TBD`, or `lorem`.
4. Confirm the resume file exists at `public/Gio-Ferreras-Resume.pdf`.

The goal is that the site cannot ship with placeholders, matching the content rules in `requirements.md`.

## 13. CI (`.github/workflows/ci.yml`)

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
```

Add `"typecheck": "tsc --noEmit"` to `package.json`. Check the current major versions of the three actions when you create the file.

## 14. Deployment and domain

1. Import the repo in Vercel; production branch is `main`.
2. Enable Vercel Web Analytics.
3. Buy `gioferreras.dev` (fallbacks `.com`, `.me`); add it in Vercel → Domains and follow the DNS instructions. HTTPS is automatic.
4. Set `site.url` to the final domain before launch.
5. **Old site redirect:** in the old `ptf04-portfolio` Vercel project, add a redirect from every path to the new domain, either with `redirects()` in its `next.config` or a `vercel.json` `redirects` rule (`source: "/(.*)"`, `destination: "https://gioferreras.dev/$1"`). Start with a temporary redirect, switch to permanent once the new domain is stable.
6. Security headers in `next.config.ts` (`headers()`): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`. Keep it simple; there is no user input to protect.

## 15. Testing and verification

No unit-test suite. The site is content and layout, so these checks carry the weight:

| Check | When | How |
|---|---|---|
| Lint, typecheck, build | Every push | CI |
| Frontmatter validation | Every build | zod in the loader |
| Keyboard-only pass | Each page, before each merge to `main` | Tab through everything; focus always visible; menus open and close with keyboard |
| Responsive pass | Before launch | 375px, 768px, 1280px; no horizontal scroll |
| Automated a11y | Before launch | Lighthouse and the axe browser extension on every page |
| Lighthouse | Before launch | Mobile and desktop, production URL, incognito |
| Real devices | Before launch | One iPhone or Android, one desktop browser besides Chrome |
| Link check | Before launch | Click every demo, repo, resume, and mailto link on the production site |
| Peer review | Before launch | 2-3 developer friends run the 10-second test |

## 16. Git workflow

- `main` is always deployable.
- Short-lived feature branches (`feat/home`, `feat/projects`, `feat/about`) with a PR into `main`, even solo, so you get a Vercel preview and a CI run before merging.
- Conventional-style commit messages (`feat:`, `fix:`, `chore:`, `docs:`) with small, focused commits. The history is part of what a reviewer reads.
- README includes: what the site is, stack, how to run locally (`pnpm install`, `pnpm dev`), project structure, and how to add a project.

## 17. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Neo-brutalist colors fail contrast | Check accent fills early (weekend 1, step 5); adjust accent hex values |
| Content isn't ready when code is | Build against real draft text; the build checks block launch with placeholders |
| Too many fonts hurt performance | Latin subsets only, `display: swap`; drop a weight or family if Lighthouse flags it |
| Large screenshots slow the page | Resize before upload; `next/image` with correct `sizes` |
| MDX tooling friction | Keep to the small `gray-matter` + `next-mdx-remote` setup; avoid plugin chains |
| Scope creep (animations, dark mode, blog) | Parked in `requirements.md` section 13 until after launch |
| Team repos not under your profile | Fork or transfer before launch (see requirements section 10) |

## 18. Out of scope for this spec

Dark mode, blog, CMS, contact form, i18n, automated end-to-end tests, and any server-side logic.
