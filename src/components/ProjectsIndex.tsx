"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, X } from "lucide-react";
import { categories, projects, type Category, type Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";

function Entry({ p }: { p: Project }) {
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <article
      id={p.slug}
      data-reveal
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
    >
      <div className="md:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-paper-2">
          {playing && p.liveUrl ? (
            <>
              <iframe
                src={p.liveUrl}
                title={`${p.title}, playable p5.js sketch`}
                className="absolute inset-0 h-full w-full bg-black"
                allow="autoplay; fullscreen"
              />
              <button
                onClick={() => setPlaying(false)}
                className="pop absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-night/85 px-3 py-1.5 text-[12px] text-day backdrop-blur"
              >
                <X className="h-3.5 w-3.5" /> Close
              </button>
            </>
          ) : (
            <>
              <ProjectMedia src={p.mediaUrl} type={p.mediaType} alt={`${p.title} preview`} active={hover} />
              {p.liveUrl && (
                <button
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 grid place-items-center bg-black/0 transition-colors hover:bg-black/25 focus-visible:bg-black/25"
                  aria-label={`Play ${p.title} here`}
                >
                  <span className="pop glow inline-flex items-center gap-2 rounded-full bg-day px-5 py-3 text-[14px] font-medium text-night opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Play className="h-4 w-4 fill-current" /> Play it here
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="md:col-span-5 flex flex-col">
        <div className="flex items-baseline justify-between">
          <p className="label">
            {p.number} · {p.category}
          </p>
          <p className="label">{p.year}</p>
        </div>
        <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em]">{p.title}</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{p.description}</p>

        {p.highlights && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2">
                {h}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-5 text-[14px]">
          {p.context && (
            <div>
              <dt className="label">Context</dt>
              <dd className="mt-1">{p.context}</dd>
            </div>
          )}
          <div>
            <dt className="label">Tools</dt>
            <dd className="mt-1">{p.tools.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.hasCaseStudy && (
            <Link
              href={`/projects/${p.slug}`}
              className="pop glow group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper"
            >
              Read the case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
          {p.liveUrl && (
            <>
              <button
                onClick={() => setPlaying((v) => !v)}
                className="pop glow inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper"
              >
                {playing ? <X className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                {playing ? "Stop playing" : "Play it here"}
              </button>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pop group inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[14px] hover:border-ink"
              >
                {p.liveUrl.startsWith("http") ? "Open in p5.js" : "Open full screen"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsIndex() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const options: (Category | "All")[] = ["All", ...categories];

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by discipline">
        {options.map((o) => {
          const count = o === "All" ? projects.length : projects.filter((p) => p.category === o).length;
          const active = filter === o;
          return (
            <button
              key={o}
              onClick={() => setFilter(o)}
              aria-pressed={active}
              className={`pop rounded-full border px-4 py-2 text-[14px] ${
                active ? "glow border-ink bg-ink text-paper" : "border-line hover:border-ink"
              }`}
            >
              {o} <span className={active ? "text-paper/60" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {shown.map((p) => (
          <Entry key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
