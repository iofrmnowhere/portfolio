import { Button } from "@/components/ui/button";

type ProjectLinksProps = {
  links: {
    demo?: string;
    video?: string;
    repo: string;
  };
};

export function ProjectLinks({ links }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {links.demo && (
        <Button href={links.demo} external variant="primary">
          Live demo
        </Button>
      )}
      {links.video && (
        <Button href={links.video} external variant="primary">
          Demo video
        </Button>
      )}
      <Button href={links.repo} external variant="secondary">
        GitHub repo
      </Button>
    </div>
  );
}
