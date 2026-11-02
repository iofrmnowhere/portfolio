import type { ReactNode } from "react";

type CardProps = {
  as?: "div" | "article";
  className?: string;
  children: ReactNode;
};

export function Card({ as = "div", className = "", children }: CardProps) {
  const Tag = as;
  return (
    <Tag className={`border-ink bg-cream shadow-brutal border-2 ${className}`}>
      {children}
    </Tag>
  );
}
