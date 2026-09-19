"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark with WebGL Glow */}
        <Link
          href="/"
          className="group flex items-center space-x-3 text-white font-mono tracking-tight font-bold text-sm md:text-base transition-all duration-300 active:scale-95"
        >
          <span className="w-2.5 h-2.5 bg-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_12px_#22d3ee] transition-all duration-300 inline-block" />
          <span className="uppercase tracking-widest text-neutral-100 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
            HARSH ALAMBAIN
          </span>
          <span className="text-[10px] text-neutral-500 font-normal tracking-widest hidden sm:inline-block border border-neutral-800 group-hover:border-cyan-500/60 px-1.5 py-0.5 transition-colors">
            IXD // 2026
          </span>
        </Link>

        {/* Desktop Navigation with Glow Micro-interactions */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-mono text-xs uppercase tracking-widest py-1 transition-all duration-300 group active:scale-95 ${isActive
                    ? "text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    : "text-neutral-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  }`}
              >
                <span className="flex items-center space-x-1">
                  <span>{link.name}</span>
                  {link.href.startsWith("/#") && (
                    <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-neutral-300 hover:text-cyan-400 p-2 focus:outline-none transition-colors active:scale-95"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-neutral-950/98 backdrop-blur-xl z-40 border-b border-neutral-800 px-6 py-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6 pt-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? false
                    : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-xl uppercase tracking-wider py-2 flex items-center justify-between border-b border-neutral-900 active:scale-95 ${isActive
                      ? "text-cyan-400 font-bold pl-2 border-l-2 border-l-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                      : "text-neutral-400 hover:text-white"
                    }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-600" />
                </Link>
              );
            })}
          </div>

          <div className="border-t border-neutral-900 pt-6 font-mono text-xs text-neutral-500">
            <p className="uppercase tracking-widest text-neutral-400 mb-1">
              Harsh Alambain
            </p>
            <p>Interaction Designer — Creative Coding & Physical Computing</p>
            <p className="text-neutral-600 mt-2">alambainharsh@gmail.com</p>
          </div>
        </div>
      )}
    </header>
  );
};
