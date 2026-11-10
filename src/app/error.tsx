"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container as="section" className="py-20">
      <SectionHeading level={1}>Something went wrong</SectionHeading>
      <p className="mt-4 max-w-xl text-lg leading-relaxed">
        An unexpected error occurred. Please try again, or go back to the home
        page.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
