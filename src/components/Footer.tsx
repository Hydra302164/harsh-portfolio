"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/projects";
import { ContactForm } from "./ContactForm";
import { LiveDot } from "./LiveDot";

export const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const socials = [
    { name: "LinkedIn", href: site.linkedin },
    { name: "Instagram", href: site.instagram },
    { name: "Résumé (PDF)", href: site.resume },
  ];

  return (
    <footer id="contact" className="bg-night text-day dark:border-t dark:border-white/10">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 pt-20 md:pt-28 pb-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="label text-day/50!">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.03em] max-w-[13ch]">
              Let&apos;s make something people can touch.
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-day/60">
              Internships, freelance websites or a collaboration. Send a message and I&apos;ll reply by email.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="pop glow group inline-flex items-center gap-2 rounded-full bg-day px-6 py-3.5 text-[15px] font-medium text-night"
              >
                {site.email}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                onClick={copy}
                className="pop rounded-full border border-day/30 px-5 py-3.5 text-[15px] hover:border-day"
                aria-live="polite"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-day/15 pt-8 text-[14px] sm:grid-cols-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:col-span-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-day/80 hover:text-day"
                >
                  {s.name}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-day/60 sm:text-right">
            <p className="inline-flex items-center gap-2 text-day/85">
              <LiveDot />
              Open to internships
            </p>
            <p>© {new Date().getFullYear()} Harsh Alambain · Ahmedabad &amp; Jaipur</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
