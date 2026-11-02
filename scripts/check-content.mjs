import { createRequire } from "node:module";
import { existsSync, readdirSync, readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

const PROJECTS_DIR = "content/projects";

let failed = false;

for (const file of readdirSync(PROJECTS_DIR).filter((f) =>
  f.endsWith(".mdx"),
)) {
  const raw = readFileSync(`${PROJECTS_DIR}/${file}`, "utf8");

  // Amendment 2026-11-02: placeholders for Gio-supplied content are allowed this
  // weekend and warn instead of failing; weekend 2 flips this back to an error.
  const markers = raw.match(/TODO|TBD|LOREM|PLACEHOLDER|REPLACE-|lorem/g) ?? [];
  if (markers.length > 0) {
    console.warn(
      `${PROJECTS_DIR}/${file}: ${markers.length} placeholder marker(s) found. Replace all placeholders before launch.`,
    );
  }

  const { data } = matter(raw);
  if (!data.links || (!data.links.demo && !data.links.video)) {
    console.warn(
      `${PROJECTS_DIR}/${file}: no demo or video link yet. Add one before launch.`,
    );
  }
}

const siteSource = readFileSync("src/lib/site.ts", "utf8");
const github = /github:\s*"([^"]*)"/.exec(siteSource)?.[1] ?? "";
const linkedin = /linkedin:\s*"([^"]*)"/.exec(siteSource)?.[1] ?? "";

if (process.env.VERCEL_ENV === "production" && (!github || !linkedin)) {
  console.error(
    "site.github and site.linkedin must be set before production deploys.",
  );
  failed = true;
}

if (!existsSync("public/Gio-Ferreras-Resume.pdf")) {
  console.warn(
    "public/Gio-Ferreras-Resume.pdf is missing. Add the final resume PDF before launch.",
  );
}

if (failed) {
  process.exit(1);
}
