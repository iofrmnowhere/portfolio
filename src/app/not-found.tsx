import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";

export default function NotFound() {
  return (
    <Container as="section" className="py-20">
      <Tag bracketed>404</Tag>
      <SectionHeading level={1} className="mt-6">
        Page not found
      </SectionHeading>
      <p className="mt-4 max-w-xl text-lg leading-relaxed">
        The page you are looking for does not exist. It may have moved, or the
        address may be misspelled.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/projects" variant="primary">
          View projects
        </Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
