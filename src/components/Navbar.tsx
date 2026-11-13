"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => href.startsWith("/") && pathname.startsWith(href);

  return (
    <>
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
              {isActive(l.href) && (
                <m.span
                  layoutId="nav-underline"
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
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
    </header>

      {/* Kept outside <header>: the header's transform/backdrop-blur would otherwise trap this fixed panel inside its 64px box. */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper px-5 pt-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)", transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] } }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }}
          >
            <m.nav
              className="flex flex-col"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              {[...links, { name: "Résumé", href: site.resume }].map((l) => {
                const cls = "block font-display text-4xl font-semibold tracking-tight py-3 border-b border-line";
                return (
                  <m.div
                    key={l.name}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 30 } },
                    }}
                  >
                    {l.href.endsWith(".pdf") ? (
                      <a href={l.href} target="_blank" rel="noopener" className={cls}>
                        {l.name}
                      </a>
                    ) : (
                      <Link href={l.href} onClick={() => setOpen(false)} className={cls}>
                        {l.name}
                      </Link>
                    )}
                  </m.div>
                );
              })}
            </m.nav>
            <m.p
              className="mt-8 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              {site.email}
            </m.p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
