# Weekend 2 Checklist (Oct 31 to Nov 1)

**Goal for the weekend:** finish every page, pass all launch gates, and go live on your own domain.

Prerequisite: weekend 1 is done (see `weekend-1-checklist.md`) and `docs/content-source.md` has no `FILL IN` left for anything that will appear on the site.

---

## Before you start (content track, you and your AI)

- [ ] Bio written in your own voice (`content-source.md` section 2)
- [ ] "My role", key technical decisions, and verifiable facts filled in for all three projects
- [ ] InstaHAM metrics pulled from the paper (or decide to ship without a metrics section)
- [ ] Screenshots added for all three projects, resized to 1600px wide or less
- [ ] InstaHAM demo video recorded and uploaded; Style Finder hosted on Streamlit Community Cloud
- [ ] Featured repos forked or transferred to your GitHub profile, and repo links updated
- [ ] GitHub and LinkedIn URLs added to `src/lib/site.ts`
- [ ] Final resume PDF at `public/Gio-Ferreras-Resume.pdf`
- [ ] Domain bought (`gioferreras.dev`, or fallback `.com` / `.me`)

---

## Day 1 (Sat Oct 31): Remaining pages and polish

### 1. About page
- [ ] Bio
- [ ] Skills grouped: Frontend, Backend, ML/CV, Tools
- [ ] Experience: MIS Developer Intern entry (resume-level wording only)
- [ ] Education with scholarships
- [ ] One recognition line (Presidential Hackathon team lead, no result claimed)
- [ ] Availability line: "Open to internship opportunities"
- [ ] Headshot only if you have a good one

### 2. Resume page
- [ ] Download button (`download` attribute, correct file name)
- [ ] Short page text and the same button on Home
- [ ] Confirm the PDF shows email, GitHub, LinkedIn only (no phone, no home address)

### 3. Contact page
- [ ] Email as a `mailto:` link
- [ ] Copy-to-clipboard button with a visible "Copied" state announced to screen readers
- [ ] GitHub and LinkedIn links
- [ ] No contact form

### 4. Site-wide
- [ ] Per-page metadata (title and description) on every route
- [ ] `generateMetadata` for project pages
- [ ] Open Graph image (`opengraph-image.tsx`)
- [ ] `sitemap.ts` and `robots.ts`
- [ ] Favicon and custom 404 page
- [ ] Build-time content checks working (frontmatter validation, no `TODO`/`TBD`/`lorem`, social links not empty, resume file exists)

### 5. Content pass on project pages
- [ ] Every project has demo or video link plus repo link, and all links work
- [ ] "My role" items are specific and yours
- [ ] Nothing on any page that isn't in `content-source.md`

---

## Day 2 (Sun Nov 1): Gates, review, launch

### 6. Accessibility and performance
- [ ] Keyboard-only pass on every page (focus always visible, menus work with keyboard)
- [ ] Contrast check on text over both accent colors; adjust accent hex values if any fail
- [ ] Alt text on all meaningful images; one `<h1>` per page; no skipped heading levels
- [ ] Touch targets at least 44px
- [ ] Lighthouse on production URL, mobile and desktop, incognito: 95+ in all four categories
- [ ] axe browser extension on every page, with no serious issues

### 7. Responsive and device checks
- [ ] 375px, 768px, 1280px: no horizontal scrolling
- [ ] One real phone and one non-Chrome desktop browser
- [ ] Click every demo, repo, resume, and `mailto:` link on the live site

### 8. Peer review
- [ ] 2-3 developer friends open the site cold and try the 10-second test: find the best project and your email on both phone and desktop
- [ ] Note their feedback and fix anything that confused them

### 9. Launch
- [ ] Connect the domain in Vercel, wait for DNS and HTTPS
- [ ] Set `site.url` to the final domain, redeploy
- [ ] Add a redirect from `ptf04-portfolio.vercel.app` to the new domain (temporary first, permanent once stable)
- [ ] Share a link in a message to yourself and check how it previews (Open Graph image shows)
- [ ] Merge to `main`, confirm production deploy is green
- [ ] README finished: what it is, stack, how to run, how to add a project

### 10. After launch
- [ ] Put the new site URL on your resume, LinkedIn, and GitHub profile
- [ ] Pin the three featured repos on your GitHub profile
- [ ] Add the site link to every internship application from here on
- [ ] Check Vercel Analytics a few days later to see whether anyone visits

---

## Definition of done

- [ ] All six routes live on your domain
- [ ] CI green, production build clean
- [ ] Lighthouse 95+ in all four categories
- [ ] Peer review passed (10-second test on mobile and desktop)
- [ ] No placeholders, invented metrics, or out-of-scope content anywhere on the site
- [ ] Old site redirects to the new one
