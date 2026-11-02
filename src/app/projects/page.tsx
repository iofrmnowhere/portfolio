import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies for Pop Hop, InstaHAM, and Style Finder.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-16">
      <SectionHeading level={1}>Projects</SectionHeading>
      <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ meta }) => (
          <li key={meta.slug}>
            <ProjectCard meta={meta} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
