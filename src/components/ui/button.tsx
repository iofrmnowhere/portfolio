import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent-red",
  secondary: "bg-cream",
};

const baseClasses =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border-2 border-ink px-4 font-mono text-sm uppercase text-ink shadow-brutal transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm";

type ButtonProps = {
  variant: Variant;
  href?: string;
  download?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant,
  href,
  download,
  external,
  onClick,
  className = "",
  children,
}: ButtonProps) {
  const classNameFinal = `${baseClasses} ${variantClasses[variant]} ${className}`;
  if (href && !external && href.startsWith("/")) {
    return (
      <Link href={href} download={download} className={classNameFinal}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classNameFinal}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classNameFinal}>
      {children}
    </button>
  );
}
