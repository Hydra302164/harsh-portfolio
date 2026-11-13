"use client";

import { useState, ViewTransition } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";

type Props = {
  project: Project;
  size?: "large" | "default";
  delay?: number;
};

export function ProjectCard({ project, size = "default", delay = 0 }: Props) {
  const [hover, setHover] = useState(false);
  const href = project.hasCaseStudy ? `/projects/${project.slug}` : `/projects#${project.slug}`;
  const large = size === "large";

  return (
    <Link
      href={href}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group block"
    >
      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
      <div
        className={`relative overflow-hidden rounded-[6px] bg-paper-2 ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}
      >
        <ProjectMedia
          src={project.mediaUrl}
          type={project.mediaType}
          alt={`${project.title} preview`}
          active={hover}
          autoplayInView={large}
          className="transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03]"
        />
        {(project.hasCaseStudy || project.liveUrl) && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-day/90 px-3 py-1 text-[12px] font-medium text-night backdrop-blur">
            {project.liveUrl && <span className="h-1.5 w-1.5 rounded-full bg-[#d2401e]" />}
            {project.hasCaseStudy ? "Case study" : "Playable"}
          </span>
        )}
        <span className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center rounded-full bg-day text-night shadow-[0_6px_20px_-6px_var(--glow)] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      </ViewTransition>

      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <h3
            className={`font-display font-semibold tracking-tight transition-colors group-hover:text-accent ${
              large ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <p className={`mt-1.5 text-ink-2 ${large ? "max-w-xl text-[16px]" : "text-[15px]"}`}>{project.summary}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="label">{project.year}</p>
          <p className="label mt-1 hidden sm:block">{project.category}</p>
        </div>
      </div>
    </Link>
  );
}
