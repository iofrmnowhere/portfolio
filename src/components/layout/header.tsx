import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="border-ink bg-cream relative border-b-2">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-2">
        <Link
          href="/"
          className="font-display py-3 text-2xl tracking-wide uppercase"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              variant="desktop"
            />
          ))}
        </nav>
        <MobileNav links={[...NAV_LINKS]} />
      </Container>
    </header>
  );
}
