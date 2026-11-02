import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import { type ProjectMeta } from "@/lib/schema";

type ProjectCardProps = {
  meta: ProjectMeta;
};

export function ProjectCard({ meta }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${meta.slug}`}
      className="border-ink bg-cream shadow-brutal hover:shadow-brutal-sm block border-2 transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
    >
      <p className="border-ink bg-accent-yellow text-ink border-b-2 px-4 py-2 font-mono text-xs uppercase">
        {meta.year}
      </p>
      <div className="p-4">
        <h3 className="font-display text-2xl tracking-wide uppercase">
          {meta.title}
          <span className="sr-only"> — case study</span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed">{meta.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {meta.stack.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
