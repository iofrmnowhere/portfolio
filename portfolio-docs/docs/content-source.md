# Content Source

**The only source of facts for the site.** Agents must not state anything about Gio or his projects that isn't written here. Anything marked `FILL IN` is missing: leave it off the page until Gio provides it.

Facts below were taken from Gio's own resume text. Gio: review everything and correct anything that's off.

---

## 1. Identity

- **Name:** Gio Ferreras
- **Headline:** Computer Science student building full-stack web apps and computer vision tools
- **Availability line:** Open to internship opportunities
- **Email:** gioferreras@gmail.com
- **GitHub profile URL:** FILL IN
- **LinkedIn URL:** FILL IN
- **Headshot:** FILL IN (yes/no; if no, launch without one)

## 2. Bio (About page)

3-4 sentences in Gio's own voice. FILL IN.

Prompts to help write it: What do you build? What are you studying? What kind of internship are you looking for? What's one thing you enjoy about building software?

## 3. Skills (About page)

Grouped by area. Start from the stacks on the resume, then edit.

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Flutter, Dart *(confirm)*
- **Backend:** Node.js, Prisma, PostgreSQL, JWT authentication *(confirm)*
- **ML / CV:** Python, YOLO, GhostNet, ONNX, XGBoost, Gaussian Mixture Model, Streamlit *(confirm)*
- **Tools:** Git, GitHub, Vercel, C++ *(confirm; move C++ if you'd rather list it under ML/CV)*

## 4. Experience (About page, resume-level only)

**MIS Developer Intern**, Inari Amertron Inc., Clark Freeport, Angeles City, Pampanga. June 2026 to July 2026.
- Redesigned and modernized a document tracking system used by the company while maintaining the familiar system flow.
- Applied SDLC to identify software gaps and usability issues to improve upon.
- Presented the proposed redesign of the document tracking system to department heads and engineers to verify.

Do not add any internal details of the system or screenshots.

## 5. Education (About page)

- **Angeles University Foundation**, Angeles City, Pampanga. 2023 to expected 2027.
- B.S. in Computer Science
- Scholarships: DOST-SEI Merit
- Honors: College & University Scholar

## 6. Recognition (About page, one line only)

Led a 9-person team in the Presidential Hackathon International Track, proposing an app that helps Filipino caregivers take care of Taiwanese elderly and patients who need care. Gio assigned parts and oversaw production of the app.

Do not claim an award, finalist status, or any result.

## 7. Left off the site on purpose

SOICT 2026, December travel dates, RAITE 2025, Capabara bootcamp, Matsuo-Iwasa course, anything about the Taiwan hackathon result, location or work-style preferences, PTF04 Portfolio.

---

## 8. Projects

Order on the site: Pop Hop, InstaHAM, Style Finder.

### 8.1 Pop Hop (April 2026)

- **Stack:** Next.js, TypeScript, Prisma, PostgreSQL, JWT, Tailwind CSS, Vercel
- **Live site:** https://pop-hop-rwdz.vercel.app/
- **Repo:** https://github.com/raldddddddd/pop-hop (currently under another account; fork or transfer to Gio's profile, then update)
- **Team:** 4 people
- **Facts from resume:**
  - Full-stack flea market management web app for organizers and vendors
  - Features: booth allocation, management dashboard, integrated chat
  - JWT-based role-based access control (RBAC) authentication
  - PostgreSQL database using Prisma ORM
  - Used Git workflows; deployed on Vercel
- **Problem (1-2 sentences):** FILL IN
- **My role (2-3 specific things Gio personally built):** FILL IN
- **Key technical decisions and why:** FILL IN
- **Outcome / verifiable facts (counts from the repo, e.g. roles, routes, models):** FILL IN
- **Screenshots (3-4):** FILL IN

### 8.2 InstaHAM (September 2026)

- **Stack:** YOLO, GhostNet, ONNX, XGBoost, Flutter, Dart, C++, Python
- **Demo:** 30-60 second video. FILL IN once recorded
- **Repo:** https://github.com/iofrmnowhere/instaham/ (fork or transfer to Gio's profile, then update)
- **Team:** 4 people
- **Facts from resume:**
  - Mobile computer vision app that estimates live pig weight and health from RGB images
  - Trained and fine-tuned models, testing combinations for image segmentation, health classification, and weight estimation
  - Converted the best combination of models from Python to C++ and deployed a lightweight app through Flutter
  - Used Git workflows and the native Flutter build to deploy prototypes
- **Title on the site:** "InstaHAM" only. No conference line.
- **Problem (1-2 sentences):** FILL IN
- **My role (2-3 specific things Gio personally built):** FILL IN
- **Key technical decisions and why:** FILL IN
- **Metrics from the team paper (e.g. weight estimation error, classification accuracy, inference speed, model size):** FILL IN. If not ready by launch, the page ships without a metrics section.
- **Screenshots (app screens):** FILL IN

### 8.3 Style Finder (April 2026)

- **Stack:** Python, Streamlit, Gaussian Mixture Model, HuggingFace dataset
- **Demo:** hosted Streamlit link. FILL IN (deploy on Streamlit Community Cloud if not already hosted)
- **Repo:** https://github.com/Litiumn/outfit-style-finder/ (fork or transfer to Gio's profile, then update)
- **Team:** 4 people
- **Facts from resume:**
  - Outfit recommendation system using a Gaussian Mixture Model trained on the Polyvore Outfits dataset from HuggingFace
  - Streamlit interface that analyzes color and texture features from uploaded clothing images to generate stylistically similar outfits
- **Problem (1-2 sentences):** FILL IN
- **My role (2-3 specific things Gio personally built):** FILL IN
- **Key technical decisions and why:** FILL IN
- **Outcome / verifiable facts (e.g. dataset size, number of features used):** FILL IN
- **Screenshots (3-4):** FILL IN

---

## 9. Rules for filling this file in

- Write only what you can defend in an interview.
- "My role" must be things **you** did, not the team. Be specific ("built the booth allocation dashboard", not "worked on the frontend").
- Numbers must come from the repo, your logs, or the paper. If you can't verify it, leave it out.
- When you update this file, tell the agent to re-sync the matching `content/projects/*.mdx` file.
