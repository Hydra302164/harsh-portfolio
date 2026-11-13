"use client";

import { useState, ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { categories, projects as allProjects } from "@/data/projects";
import { ProjectMedia } from "@/components/ProjectMedia";
import { LiveDot } from "@/components/LiveDot";
import { ReactionTile } from "./ReactionTile";
import { CountUp } from "./CountUp";

/**
 * Selected work as a bento grid. On desktop, hovering a tile widens its
 * columns and rows while the neighbours give way. Two tiles aren't projects:
 * a reaction test you can play right here, and a live snapshot of the work.
 */

type Cell = { cols: number[]; rows: number[] };

// Desktop layout on a 4 × 3 grid
const cells: Record<string, Cell> = {
  "jal-tarang": { cols: [0, 1], rows: [0, 1] },
  "lap-replay": { cols: [2, 3], rows: [0] },
  reaction: { cols: [2], rows: [1] },
  "interactive-clock": { cols: [3], rows: [1] },
  "brand-identity": { cols: [0, 1], rows: [2] },
  stats: { cols: [2], rows: [2] },
  all: { cols: [3], rows: [2] },
};

const canHover = () => window.matchMedia("(hover: hover) and (min-width: 1024px)").matches;

function track(n: number, grow?: number[]) {
  return Array.from({ length: n }, (_, i) => (grow ? (grow.includes(i) ? "1.32fr" : "0.84fr") : "1fr")).join(" ");
}

export function BentoWork({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const cell = hovered ? cells[hovered] : undefined;
  const find = (slug: string) => projects.find((p) => p.slug === slug);

  const hoverProps = (id: string) => ({
    onMouseEnter: () => canHover() && setHovered(id),
    onFocus: () => canHover() && setHovered(id),
  });

  const jal = find("jal-tarang");
  const lap = find("lap-replay");
  const clock = find("interactive-clock");
  const brand = find("brand-identity");
  const reaction = find("motorsports-reaction-game");

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(null)}
      style={{ ["--cols" as string]: track(4, cell?.cols), ["--rows" as string]: track(3, cell?.rows) }}
      className="grid grid-cols-2 gap-3 lg:h-[clamp(560px,78svh,780px)] lg:gap-4 lg:[grid-template-columns:var(--cols)] lg:[grid-template-rows:var(--rows)] lg:transition-[grid-template-columns,grid-template-rows] lg:duration-[650ms] lg:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
    >
      {jal && (
        <ProjectTile
          project={jal}
          active={hovered === "jal-tarang"}
          className="col-span-2 aspect-[4/3] lg:aspect-auto lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2"
          big
          {...hoverProps("jal-tarang")}
        />
      )}
      {lap && (
        <ProjectTile
          project={lap}
          active={hovered === "lap-replay"}
          className="col-span-2 aspect-[16/9] lg:aspect-auto lg:col-start-3 lg:col-span-2 lg:row-start-1"
          {...hoverProps("lap-replay")}
        />
      )}

      <div
        data-reveal
        style={{ ["--reveal-delay" as string]: "120ms" }}
        className="group relative rounded-[10px] aspect-square lg:aspect-auto lg:col-start-3 lg:row-start-2 dark:shadow-[0_20px_40px_-28px_rgb(0_0_0)]"
        {...hoverProps("reaction")}
      >
        <ReactionTile gameHref={reaction ? `/projects#${reaction.slug}` : "/projects"} />
        <span aria-hidden className="tile-edge" />
      </div>

      {clock && (
        <ProjectTile
          project={clock}
          active={hovered === "interactive-clock"}
          className="aspect-square lg:aspect-auto lg:col-start-4 lg:row-start-2"
          compact
          {...hoverProps("interactive-clock")}
        />
      )}
      {brand && (
        <ProjectTile
          project={brand}
          active={hovered === "brand-identity"}
          className="col-span-2 aspect-[16/9] lg:aspect-auto lg:col-start-1 lg:col-span-2 lg:row-start-3"
          {...hoverProps("brand-identity")}
        />
      )}

      {/* Snapshot */}
      <div
        data-reveal
        style={{ ["--reveal-delay" as string]: "200ms" }}
        className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-[10px] border border-line bg-paper-2 p-5 dark:border-transparent dark:bg-[#1b1b19] dark:shadow-[0_20px_40px_-28px_rgb(0_0_0)] lg:aspect-auto lg:col-start-3 lg:row-start-3 lg:p-6"
        {...hoverProps("stats")}
      >
        <span aria-hidden className="tile-edge" />
        <p className="inline-flex items-center gap-2 text-[13px] text-ink-2">
          <LiveDot /> Open to internships
        </p>
        {/* Sized by the tile's own width, so both stats always fit: side by side
            when there's room, stacked as rows when the tile is squeezed */}
        <div className="@container">
          <div className="grid gap-2 @min-[13rem]:grid-cols-2 @min-[13rem]:gap-4">
            {[
              { n: allProjects.length, label: "Projects", accent: false },
              { n: categories.length, label: "Disciplines", accent: true },
            ].map((s) => (
              <div key={s.label} className="flex min-w-0 items-baseline gap-2.5 @min-[13rem]:block">
                <p
                  className={`font-display text-[clamp(1.75rem,26cqw,2.75rem)] font-semibold leading-none tracking-[-0.04em] @min-[13rem]:text-[clamp(2.25rem,24cqw,3.75rem)] ${
                    s.accent ? "text-accent" : ""
                  }`}
                >
                  <CountUp to={s.n} />
                </p>
                <p className="label tracking-[0.04em]! @min-[13rem]:mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Everything else */}
      <Link
        href="/projects"
        data-reveal
        style={{ ["--reveal-delay" as string]: "260ms" }}
        className="group relative flex aspect-square flex-col justify-between rounded-[10px] bg-ink p-5 dark:shadow-[0_20px_40px_-28px_rgb(0_0_0)] text-paper lg:aspect-auto lg:col-start-4 lg:row-start-3 lg:p-6"
        {...hoverProps("all")}
      >
        <p className="label text-paper/60!">Archive</p>
        <div className="flex items-end justify-between gap-3">
          <p className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.03em] lg:text-3xl">
            All
            <br />
            projects
          </p>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </Link>
    </div>
  );
}

type TileProps = {
  project: Project;
  active: boolean;
  className?: string;
  big?: boolean;
  /** Small square tile: below desktop width the title gets the whole row. */
  compact?: boolean;
  onMouseEnter?: () => void;
  onFocus?: () => void;
};

function ProjectTile({ project: p, active, className = "", big = false, compact = false, onMouseEnter, onFocus }: TileProps) {
  const href = p.hasCaseStudy ? `/projects/${p.slug}` : `/projects#${p.slug}`;

  return (
    <Link
      href={href}
      data-reveal
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={`group relative block overflow-hidden rounded-[10px] bg-night text-day dark:shadow-[0_20px_40px_-28px_rgb(0_0_0)] ${className}`}
    >
      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
        <div className="absolute inset-0">
          <ProjectMedia
            src={p.mediaUrl}
            type={p.mediaType}
            alt={`${p.title} preview`}
            active={active}
            className="transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] opacity-90 group-hover:scale-[1.05] group-hover:opacity-100"
          />
        </div>
      </ViewTransition>

      {/* Legibility shade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <span aria-hidden className="tile-edge" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 lg:p-5">
        <span className="font-mono text-[12px] text-day/80">{p.number}</span>
        {(p.hasCaseStudy || p.liveUrl) && (
          <span className="rounded-full bg-day/90 px-2.5 py-1 text-[11px] font-medium text-night backdrop-blur">
            {p.hasCaseStudy ? "Case study" : "Playable"}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 lg:p-5">
        <div className="min-w-0">
          <h3
            className={`font-display font-semibold tracking-[-0.03em] ${
              big ? "text-3xl lg:text-5xl" : compact ? "text-lg leading-tight sm:text-xl lg:text-2xl" : "text-xl lg:text-2xl"
            }`}
          >
            {p.title}
          </h3>
          {big && (
            <p className="mt-1.5 line-clamp-2 max-w-md text-[14px] leading-snug text-day/75 transition-opacity duration-300 lg:text-[15px] lg:opacity-0 lg:group-hover:opacity-100">
              {p.summary}
            </p>
          )}
        </div>
        <span className={`${compact ? "hidden lg:grid" : "grid"} h-10 w-10 shrink-0 place-items-center rounded-full bg-day text-night transition-all duration-300 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100`}>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
