"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkVariant = "desktop" | "mobile";

type NavLinkProps = {
  href: string;
  label: string;
  variant: NavLinkVariant;
  onNavigate?: () => void;
};

// "/" matches the home page only; every other href also matches its child
// routes (e.g. /projects stays current on /projects/pop-hop).
function isCurrentPage(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Desktop nav links look like plain text at rest (no border, no shadow, no
// fill); the neo-brutalist box only appears on hover, on press, or while the
// link points at the current page (Gio, November 2026). The transparent
// border/bg live on the idle state (not the base) so hover/active/current
// always win the cascade.
const baseClasses: Record<NavLinkVariant, string> = {
  desktop:
    "inline-flex min-h-11 items-center border-2 px-3 py-2 font-mono text-sm uppercase text-ink transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out",
  mobile:
    "block px-4 py-4 font-mono text-sm uppercase transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out",
};

const currentClasses: Record<NavLinkVariant, string> = {
  desktop: "border-ink bg-accent-red text-ink shadow-brutal",
  mobile: "bg-accent-red text-ink",
};

const idleClasses: Record<NavLinkVariant, string> = {
  desktop:
    "border-transparent bg-transparent hover:border-ink hover:bg-accent-yellow hover:text-ink hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm active:border-ink active:bg-accent-red active:text-ink",
  mobile:
    "hover:bg-accent-yellow hover:text-ink active:bg-accent-red active:text-ink",
};

export function NavLink({ href, label, variant, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = isCurrentPage(href, pathname);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isCurrent ? "page" : undefined}
      className={`${baseClasses[variant]} ${isCurrent ? currentClasses[variant] : idleClasses[variant]}`}
    >
      {label}
    </Link>
  );
}
