import type { ReactNode } from "react";

type TagProps = {
  bracketed?: boolean;
  children: ReactNode;
};

export function Tag({ bracketed = false, children }: TagProps) {
  return (
    <span className="border-ink bg-cream text-ink inline-flex items-center border-2 px-2 py-1 font-mono text-xs uppercase">
      {bracketed ? `[ ${children} ]` : children}
    </span>
  );
}
