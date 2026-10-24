# AGENTS.md

Instructions for AI coding agents working in this repo. Read this file first, every session.

## What this project is

A personal portfolio website for Gio Ferreras, a Computer Science student looking for a short internship (December to January). Its only job is to show three projects clearly. Static Next.js site, no backend.

## Read these before writing code

1. `portfolio-docs/docs/requirements.md`: what to build and why (source of truth for scope)
2. `portfolio-docs/docs/techspec.md`: how to build it (architecture, schema, components, checks)
3. `portfolio-docs/docs/weekend-1-checklist.md` and `docs/weekend-2-checklist.md`: ordered tasks
4. `portfolio-docs/docs/content-source.md`: the **only** source for facts about Gio and his projects
5. `portfolio-docs/docs/design-references/`: screenshots of the target visual style (see the README in that folder)

If two documents conflict, `requirements.md` wins. If something is unclear or missing, ask Gio instead of guessing.

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # local dev server
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm build            # production build (also runs content checks)
pnpm format           # Prettier
```

Before telling Gio a task is done, run `pnpm lint`, `pnpm typecheck`, and `pnpm build`, and report the results honestly. If a command fails, say so and fix it or explain why you can't.

## Rules that matter most

### Content integrity (strict)
- **Never invent facts, metrics, results, dates, quotes, or claims.** Use only what is in `docs/content-source.md`. If a fact is missing, leave it out of the page and tell Gio what's needed.
- No placeholder numbers, no `TODO`, `TBD`, or lorem ipsum in anything that renders on the site.
- Do not mention anything listed under "Out of scope" in `docs/requirements.md` (SOICT, the Taiwan hackathon result, location preferences, other activities).
- Do not add a conference or award line to InstaHAM. It is titled "InstaHAM" only.
- Do not describe internal details of the internship company's system.

### Scope
- Build only what the checklist asks for, one section at a time. No extra pages, features, animations, dark mode, blog, or contact form.
- Do not add a dependency without asking Gio first and explaining why.
- Keep client-side JavaScript to the components listed in `docs/techspec.md` section 7.

### Design
- Neo-brutalist/retro style from the references: cream background, near-black text, thick black borders, hard offset shadows.
- Two accent colors only (red-orange and yellow), used **only as fills behind black text**, never as text color on cream.
- Fonts: Anton (headings), Space Mono (labels), Inter (body), Pixelify Sans (the name in the hero only).
- Light mode only.

### Accessibility
- Visible focus outline on every interactive element, keyboard navigation everywhere, one `<h1>` per page, meaningful alt text, 44px touch targets, WCAG AA contrast. This is a launch gate (Lighthouse 95+ in all categories).

### Code
- TypeScript strict. Server components by default.
- Content lives in `content/projects/*.mdx`, validated by the zod schema in `src/lib/schema.ts`.
- Reuse the shared components in `src/components/ui/` instead of one-off styling.
- Keep functions and components small and readable. Gio will be asked about this code in interviews, so prefer clear code over clever code and add short comments only where the reason isn't obvious.

### Git
- Work on a short-lived branch, not `main`. Conventional commit messages (`feat:`, `fix:`, `chore:`, `docs:`), small focused commits.
- If you change a decision (stack, structure, design, scope), update the relevant doc in the same commit.

## How to work with Gio

- Gio writes and owns the implementation. Explain what you did and why in a few plain sentences, and point out anything he should understand before moving on.
- When a checklist section is done, tick it in the checklist file and summarize what changed.
- When you are blocked or a decision isn't covered by the docs, stop and ask a specific question instead of making the call yourself.
