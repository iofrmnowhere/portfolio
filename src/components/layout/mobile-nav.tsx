"use client";

import { useEffect, useState } from "react";

import { NavLink } from "@/components/layout/nav-link";

type NavItem = { href: string; label: string };

type MobileNavProps = {
  links: NavItem[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className={`${
          open
            ? "border-ink bg-cream shadow-brutal"
            : "hover:border-ink hover:bg-cream hover:shadow-brutal-sm border-transparent bg-transparent"
        } text-ink inline-flex min-h-11 items-center border-2 px-4 font-mono text-sm uppercase transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out hover:translate-x-0.5 hover:translate-y-0.5`}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-ink bg-cream absolute top-full right-0 left-0 z-10 border-b-2"
        >
          <ul>
            {links.map((link) => (
              <li
                key={link.href}
                className="border-ink border-b-2 last:border-b-0"
              >
                <NavLink
                  href={link.href}
                  label={link.label}
                  variant="mobile"
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
