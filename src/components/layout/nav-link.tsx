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

const baseClasses: Record<NavLinkVariant, string> = {
  desktop:
    "inline-flex min-h-11 items-center px-3 py-2 font-mono text-sm uppercase transition-transform active:translate-x-0.5 active:translate-y-0.5",
  mobile: "block px-4 py-4 font-mono text-sm uppercase",
};

const currentClasses = "bg-accent-red text-ink";
const idleClasses =
  "hover:bg-accent-yellow hover:text-ink active:bg-accent-red active:text-ink";

export function NavLink({ href, label, variant, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = isCurrentPage(href, pathname);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isCurrent ? "page" : undefined}
      className={`${baseClasses[variant]} ${isCurrent ? currentClasses : idleClasses}`}
    >
      {label}
    </Link>
  );
}
