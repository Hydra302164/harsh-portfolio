"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/projects";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 240 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => href.startsWith("/") && pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] border-b ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "bg-paper/85 backdrop-blur-md border-line" : "bg-transparent border-transparent"}`}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Harsh Alambain, home">
          <span className="font-display font-semibold text-[17px] tracking-tight">Harsh Alambain</span>
          <span className="hidden sm:inline text-[13px] text-muted transition-colors group-hover:text-accent">
            Interaction Designer
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px]" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative py-1 transition-colors hover:text-ink ${isActive(l.href) ? "text-ink" : "text-ink-2"}`}
            >
              {l.name}
              <span
                className={`absolute left-0 -bottom-0.5 h-px bg-accent transition-all duration-300 ${
                  isActive(l.href) ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener"
            className="pop glow rounded-full border border-ink px-4 py-1.5 hover:bg-ink hover:text-paper"
          >
            Résumé
          </a>
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-paper px-5 pt-8 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {[...links, { name: "Résumé", href: site.resume }].map((l, i) => {
            const cls = `font-display text-4xl font-semibold tracking-tight py-3 border-b border-line transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`;
            const style = { transitionDelay: open ? `${80 + i * 50}ms` : "0ms" };
            return l.href.endsWith(".pdf") ? (
              <a key={l.name} href={l.href} target="_blank" rel="noopener" style={style} className={cls}>
                {l.name}
              </a>
            ) : (
              <Link key={l.name} href={l.href} onClick={() => setOpen(false)} style={style} className={cls}>
                {l.name}
              </Link>
            );
          })}
        </nav>
        <p className="mt-8 text-sm text-muted">{site.email}</p>
      </div>
    </header>
  );
};
