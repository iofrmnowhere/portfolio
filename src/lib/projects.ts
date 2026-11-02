import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { projectSchema, type ProjectMeta } from "@/lib/schema";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type Project = {
  meta: ProjectMeta;
  content: string;
};

export function getAllProjects(): Project[] {
  const files = readdirSync(PROJECTS_DIR).filter((file) =>
    file.endsWith(".mdx"),
  );

  return files
    .map((file) => {
      const slugFromFile = file.replace(/\.mdx$/, "");
      const { data, content } = matter(
        readFileSync(path.join(PROJECTS_DIR, file), "utf8"),
      );

      const parsed = projectSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in content/projects/${file}: ${parsed.error.message}`,
        );
      }

      const meta = parsed.data;
      if (meta.slug !== slugFromFile) {
        throw new Error(
          `content/projects/${file}: slug "${meta.slug}" must match the filename "${slugFromFile}"`,
        );
      }

      if (!meta.links.demo && !meta.links.video) {
        console.warn(
          `content/projects/${file} has no demo or video link. Add one before launch.`,
        );
      }

      return { meta, content };
    })
    .sort((a, b) => a.meta.order - b.meta.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.meta.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().slice(0, 3);
}
