import type { ReactNode } from "react";

const sizeClasses = {
  1: "text-4xl md:text-5xl",
  2: "text-2xl md:text-3xl",
  3: "text-xl md:text-2xl",
} as const;

type SectionHeadingProps = {
  level: 1 | 2 | 3;
  className?: string;
  id?: string;
  children: ReactNode;
};

export function SectionHeading({
  level,
  className = "",
  id,
  children,
}: SectionHeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <Tag
      id={id}
      className={`font-display tracking-wide uppercase ${sizeClasses[level]} ${className}`}
    >
      {children}
    </Tag>
  );
}
