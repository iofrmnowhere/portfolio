import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-ink bg-cream border-t-2">
      <Container className="flex flex-col gap-2 py-10">
        <p className="font-mono text-xs uppercase">[ Contact ]</p>
        <a href={`mailto:${site.email}`} className="font-mono text-sm">
          {site.email}
        </a>
        {site.github && (
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm"
          >
            GitHub
          </a>
        )}
        {site.linkedin && (
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm"
          >
            LinkedIn
          </a>
        )}
      </Container>
    </footer>
  );
}
