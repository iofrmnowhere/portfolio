import type { ReactNode } from "react";

type ContainerProps = {
  as?: "div" | "section" | "article";
  className?: string;
  children: ReactNode;
};

export function Container({
  as = "div",
  className = "",
  children,
}: ContainerProps) {
  const Tag = as;
  return (
    <Tag
      className={`mx-auto w-full max-w-3xl px-4 md:max-w-5xl md:px-6 ${className}`}
    >
      {children}
    </Tag>
  );
}
