"use client";

import { useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, m, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "@/components/ProjectMedia";

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Same condition the CSS uses to swap thumbnails for the floating preview. */
const canHover = () => window.matchMedia("(hover: hover) and (min-width: 768px)").matches;

/**
 * Selected work as a typographic index. On desktop a single preview window
 * follows the cursor and swaps to whichever project you're over, tilting with
 * the speed of your movement. On touch screens each row carries its own thumbnail.
 */
export function SelectedWork({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Preview position, smoothed with a spring so it trails the cursor
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 26, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 220, damping: 26, mass: 0.6 });
  // Tilt in the direction of travel
  const rotate = useSpring(useTransform(useVelocity(rawX), [-1600, 0, 1600], [-9, 0, 9], { clamp: true }), {
    stiffness: 180,
    damping: 20,
  });

  const moveTo = (clientX: number, clientY: number) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(clientX - r.left);
    rawY.set(clientY - r.top);
  };

  const activeProject = projects.find((p) => p.slug === active);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        onPointerMove={(e) => e.pointerType === "mouse" && moveTo(e.clientX, e.clientY)}
        onPointerLeave={() => setActive(null)}
        className="relative border-t border-line"
      >
        {projects.map((p, i) => {
          const href = p.hasCaseStudy ? `/projects/${p.slug}` : `/projects#${p.slug}`;
          const dimmed = active !== null && active !== p.slug;
          const on = active === p.slug;

          return (
            <li
              key={p.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="border-b border-line"
            >
              <m.div animate={{ opacity: dimmed ? 0.28 : 1 }} transition={{ duration: 0.3, ease }}>
                <Link
                  href={href}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse" || !canHover()) return;
                    // First entry: jump straight to the cursor instead of flying in from the corner
                    if (active === null) {
                      moveTo(e.clientX, e.clientY);
                      x.jump(rawX.get());
                      y.jump(rawY.get());
                    }
                    setActive(p.slug);
                  }}
                  onFocus={(e) => {
                    if (!canHover()) return;
                    const r = listRef.current?.getBoundingClientRect();
                    const row = e.currentTarget.getBoundingClientRect();
                    if (r) moveTo(r.left + r.width * 0.68, row.top + row.height / 2);
                    setActive(p.slug);
                  }}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[4rem_1fr_auto] md:gap-6 md:py-9"
                >
                  {/* Touch thumbnail (hidden where the floating preview takes over) */}
                  <span className="relative h-16 w-20 overflow-hidden rounded-[4px] bg-paper-2 sm:h-20 sm:w-28 [@media(hover:hover)_and_(min-width:768px)]:hidden">
                    <ProjectMedia src={p.mediaUrl} type={p.mediaType} alt="" />
                  </span>

                  <span className="hidden font-mono text-[13px] text-muted transition-colors group-hover:text-accent [@media(hover:hover)_and_(min-width:768px)]:block">
                    {p.number}
                  </span>

                  <span className="min-w-0">
                    <m.span
                      className="block font-display text-[clamp(1.5rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.035em]"
                      animate={{ x: on ? 18 : 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      {p.title}
                    </m.span>
                    <span className="mt-2 block text-[14px] leading-snug text-ink-2 [@media(hover:hover)_and_(min-width:768px)]:hidden">
                      {p.summary}
                    </span>
                  </span>

                  <span className="flex items-center gap-5">
                    <span className="hidden text-right sm:block">
                      <span className="label block">{p.category}</span>
                      <span className="label mt-1 block">
                        {p.year} · {p.hasCaseStudy ? "Case study" : p.liveUrl ? "Playable" : "Project"}
                      </span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:h-12 md:w-12">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </span>
                </Link>
              </m.div>
            </li>
          );
        })}
      </ul>

        {/* Floating preview, desktop pointer only */}
        <m.div
          aria-hidden
          style={{ x, y, rotate }}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)_and_(min-width:768px)]:block"
        >
          <ViewTransition name={activeProject ? `project-${activeProject.slug}` : undefined} share="morph" default="none">
            <m.div
              initial={false}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={active ? { type: "spring", stiffness: 300, damping: 24 } : { duration: 0.2, ease: "easeIn" }}
              className="relative ml-[28px] -mt-[125px] h-[250px] origin-left w-[360px] overflow-hidden rounded-[8px] bg-paper-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)]"
            >
              {projects.map((p) => (
                <m.div
                  key={p.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={active === p.slug ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.12 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <ProjectMedia src={p.mediaUrl} type={p.mediaType} alt="" active={active === p.slug} />
                </m.div>
              ))}

              <AnimatePresence mode="wait">
                {activeProject && (
                  <m.span
                    key={activeProject.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
                    className="absolute bottom-3 left-3 rounded-full bg-day/90 px-3 py-1 text-[12px] font-medium text-night backdrop-blur"
                  >
                    {activeProject.hasCaseStudy ? "Read the case study" : activeProject.liveUrl ? "Play it" : "View project"}
                  </m.span>
                )}
              </AnimatePresence>
            </m.div>
          </ViewTransition>
        </m.div>
    </div>
  );
}
