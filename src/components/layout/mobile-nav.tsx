"use client";

import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

type MobileNavProps = {
  links: NavLink[];
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
        className="border-ink bg-cream text-ink shadow-brutal hover:shadow-brutal-sm inline-flex min-h-11 items-center border-2 px-4 font-mono text-sm uppercase transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
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
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-4 font-mono text-sm uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
