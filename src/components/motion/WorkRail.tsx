"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { MotionValue } from "motion/react";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "@/components/ProjectMedia";

/**
 * Selected work as a rail. On desktop the section pins to the screen and
 * scrolling down slides the projects sideways, with the cards leaning into
 * the direction of travel. On phones it's a plain swipeable row.
 */
export function WorkRail({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  // How far the track has to travel so the last card ends at the right edge
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      distance.current = desktop ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, (v) => -v * distance.current);
  const x = useSpring(rawX, { stiffness: 260, damping: 40, mass: 0.4 });

  // Cards lean with scroll speed and settle when you stop
  const velocity = useVelocity(scrollYProgress);
  const skewX = useSpring(useTransform(velocity, [-1.5, 0, 1.5], [6, 0, -6], { clamp: true }), {
    stiffness: 200,
    damping: 30,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1)))));
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ ["--rail-h" as string]: `${projects.length * 60 + 100}vh` }}
      className="relative md:h-[var(--rail-h)]"
    >
      <div
        ref={viewportRef}
        className="overflow-hidden py-20 md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:pb-0 md:pt-16"
      >
        {/* Header row: title, live counter */}
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
          <div className="flex items-end justify-between border-t border-line pt-8">
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Selected work</h2>
            <p className="hidden font-mono text-[13px] tabular-nums text-muted md:block" aria-hidden>
              <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}
            </p>
            <Link href="/projects" className="text-[15px] link-underline inline-flex items-center gap-1 md:hidden">
              All <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* The rail */}
        <m.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mt-10 md:snap-none md:gap-8 md:overflow-visible md:px-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))] md:pb-0"
        >
          {projects.map((p) => (
            <Card key={p.slug} project={p} skewX={reduced ? undefined : skewX} />
          ))}

          {/* End of the rail */}
          <Link
            href="/projects"
            className="group flex w-[60vw] shrink-0 snap-start flex-col justify-between rounded-[8px] border border-line p-6 transition-colors hover:border-ink sm:w-[40vw] md:w-[320px] md:p-8"
          >
            <p className="label">Everything else</p>
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold leading-[1.02] tracking-[-0.03em] transition-colors group-hover:text-accent">
                See all projects
              </p>
              <span className="mt-6 grid h-12 w-12 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
          {/* keeps a gutter after the last card on phones */}
          <span aria-hidden className="w-px shrink-0 md:hidden" />
        </m.div>

        {/* Progress along the rail (desktop) */}
        <div className="mx-auto mt-10 hidden w-full max-w-[1280px] px-10 md:block">
          <div className="h-px w-full bg-line">
            <m.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-accent" />
          </div>
          <p className="mt-3 label">Keep scrolling</p>
        </div>
      </div>
    </section>
  );
}

function Card({ project: p, skewX }: { project: Project; skewX?: MotionValue<number> }) {
  const [hover, setHover] = useState(false);
  const href = p.hasCaseStudy ? `/projects/${p.slug}` : `/projects#${p.slug}`;

  return (
    <m.div style={{ skewX }} className="w-[78vw] shrink-0 snap-start sm:w-[56vw] md:w-[min(46vw,540px,calc((100svh_-_330px)*1.333))]">
      <Link
        href={href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="group block"
      >
        <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-paper-2">
            <ProjectMedia
              src={p.mediaUrl}
              type={p.mediaType}
              alt={`${p.title} preview`}
              active={hover}
              className="transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
            />
            <span className="absolute left-4 top-4 font-mono text-[12px] text-day mix-blend-difference">{p.number}</span>
            {(p.hasCaseStudy || p.liveUrl) && (
              <span className="absolute right-4 top-4 rounded-full bg-day/90 px-3 py-1 text-[12px] font-medium text-night backdrop-blur">
                {p.hasCaseStudy ? "Case study" : "Playable"}
              </span>
            )}
          </div>
        </ViewTransition>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-accent">
              {p.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-2">{p.summary}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
        <p className="label mt-3">
          {p.category} · {p.year}
        </p>
      </Link>
    </m.div>
  );
}
