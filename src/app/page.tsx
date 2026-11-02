import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { getFeaturedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section aria-labelledby="hero-heading">
        <Container className="py-20">
          <Tag bracketed>Portfolio</Tag>
          <h1
            id="hero-heading"
            className="font-pixel mt-6 text-4xl md:text-6xl"
          >
            {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">
            {site.headline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/projects" variant="primary">
              View projects
            </Button>
            <Button
              href={site.resumePath}
              download="Gio-Ferreras-Resume.pdf"
              variant="secondary"
            >
              Download resume
            </Button>
          </div>
        </Container>
      </section>

      <section aria-labelledby="featured-heading">
        <Container className="pb-20">
          <SectionHeading level={2} id="featured-heading" className="mb-8">
            Featured projects
          </SectionHeading>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ meta }) => (
              <li key={meta.slug}>
                <ProjectCard meta={meta} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
