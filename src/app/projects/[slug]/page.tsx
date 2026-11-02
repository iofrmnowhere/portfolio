import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/projects/mdx-components";
import { ProjectLinks } from "@/components/projects/project-links";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }
  return {
    title: project.meta.title,
    description: project.meta.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const { meta, content } = project;

  return (
    <Container as="article" className="py-16">
      {meta.cover ? (
        <Image
          src={meta.cover.src}
          alt={meta.cover.alt}
          width={1600}
          height={900}
          className="border-ink shadow-brutal mb-8 w-full border-2 object-cover"
        />
      ) : null}

      <p className="font-mono text-xs uppercase">Case study · {meta.year}</p>
      <h1 className="font-display mt-2 text-4xl tracking-wide uppercase md:text-5xl">
        {meta.title}
      </h1>
      <ul className="mt-4 flex flex-wrap gap-2">
        {meta.stack.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-10 max-w-[65ch] text-lg">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {meta.role ? (
        <section aria-labelledby="role-heading" className="mt-10 max-w-[65ch]">
          <SectionHeading level={2} id="role-heading">
            My role
          </SectionHeading>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {meta.role.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {meta.facts ? (
        <section aria-labelledby="facts-heading" className="mt-10 max-w-[65ch]">
          <SectionHeading level={2} id="facts-heading">
            Facts
          </SectionHeading>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {meta.facts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-10">
        <ProjectLinks links={meta.links} />
      </div>
    </Container>
  );
}
