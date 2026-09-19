"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { PlaceholderImage } from "./PlaceholderImage";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const targetHref = project.hasCaseStudy
    ? `/projects/${project.slug}`
    : `/projects#${project.slug}`;

  // Map glowColor to Tailwind WebGL-style glow shadow classes & border accents
  const glowMap = {
    cyan: {
      card: "hover:border-cyan-500/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)]",
      badge: "group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee]",
      text: "group-hover:text-cyan-400",
      pill: "hover:border-cyan-500/60 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    },
    magenta: {
      card: "hover:border-fuchsia-500/80 hover:shadow-[0_0_35px_rgba(217,70,239,0.4)]",
      badge: "group-hover:bg-fuchsia-400 group-hover:shadow-[0_0_10px_#e879f9]",
      text: "group-hover:text-fuchsia-400",
      pill: "hover:border-fuchsia-500/60 hover:text-fuchsia-300 hover:shadow-[0_0_12px_rgba(217,70,239,0.5)]",
    },
    yellow: {
      card: "hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(251,191,36,0.4)]",
      badge: "group-hover:bg-amber-400 group-hover:shadow-[0_0_10px_#fbbf24]",
      text: "group-hover:text-amber-400",
      pill: "hover:border-amber-400/60 hover:text-amber-300 hover:shadow-[0_0_12px_rgba(251,191,36,0.5)]",
    },
    emerald: {
      card: "hover:border-emerald-400/80 hover:shadow-[0_0_35px_rgba(52,211,153,0.4)]",
      badge: "group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_#34d399]",
      text: "group-hover:text-emerald-400",
      pill: "hover:border-emerald-400/60 hover:text-emerald-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.5)]",
    },
    purple: {
      card: "hover:border-violet-500/80 hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]",
      badge: "group-hover:bg-violet-400 group-hover:shadow-[0_0_10px_#a78bfa]",
      text: "group-hover:text-violet-400",
      pill: "hover:border-violet-500/60 hover:text-violet-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]",
    },
    amber: {
      card: "hover:border-orange-400/80 hover:shadow-[0_0_35px_rgba(251,146,60,0.4)]",
      badge: "group-hover:bg-orange-400 group-hover:shadow-[0_0_10px_#fb923c]",
      text: "group-hover:text-orange-400",
      pill: "hover:border-orange-400/60 hover:text-orange-300 hover:shadow-[0_0_12px_rgba(251,146,60,0.5)]",
    },
  };

  const currentGlow = glowMap[project.glowColor || "cyan"];

  const renderMediaContent = () => {
    if (project.mediaType === "video" && project.mediaUrl && !videoError) {
      return (
        <video
          src={project.mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
        />
      );
    }
    if (project.mediaType === "image" && project.mediaUrl && !imageError) {
      return (
        <img
          src={project.mediaUrl}
          alt={project.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
        />
      );
    }
    return (
      <PlaceholderImage
        label={project.placeholderLabel}
        sublabel={project.techString}
        aspectRatio="video"
        interactive={true}
      />
    );
  };

  return (
    <div
      className={`group relative bg-neutral-950 border border-neutral-800/80 transition-all duration-300 hover:scale-[1.02] hover:z-10 flex flex-col justify-between overflow-hidden active:scale-95 cursor-pointer ${currentGlow.card}`}
    >
      {/* Top Header Bar */}
      <div className="p-5 md:p-6 border-b border-neutral-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span
            className={`font-mono text-lg md:text-xl font-bold text-neutral-400 transition-colors duration-300 ${currentGlow.text}`}
          >
            {project.number}
          </span>
          <span className={`w-1.5 h-1.5 bg-neutral-600 transition-all duration-300 ${currentGlow.badge}`} />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
            {project.category}
          </span>
        </div>

        <div className="font-mono text-[11px] text-neutral-500 border border-neutral-800 group-hover:border-neutral-600 px-2 py-0.5 transition-colors">
          {project.year}
        </div>
      </div>

      {/* Thumbnail Area - Dynamic Video or Image Rendering */}
      <div className="p-5 md:p-6 pb-0">
        {project.hasCaseStudy ? (
          <Link href={targetHref} className="block relative overflow-hidden aspect-video border border-neutral-800 bg-neutral-900">
            {renderMediaContent()}

            <div className="absolute top-3 right-3 bg-neutral-950/90 text-white font-mono text-[10px] uppercase tracking-wider border border-neutral-700 px-2.5 py-1 flex items-center space-x-1 shadow-lg z-20 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all">
              <span>Case Study</span>
              <ArrowUpRight className="w-3 h-3 text-cyan-400" />
            </div>
          </Link>
        ) : (
          <div className="relative overflow-hidden aspect-video border border-neutral-800 bg-neutral-900">
            {renderMediaContent()}
          </div>
        )}
      </div>

      {/* Body Info */}
      <div className="p-5 md:p-6 flex-grow flex flex-col justify-between space-y-4">
        <div>
          {project.hasCaseStudy ? (
            <Link href={targetHref} className="group/title block">
              <h3 className="font-sans text-lg md:text-xl font-semibold text-white tracking-tight group-hover/title:text-cyan-300 flex items-center justify-between transition-colors">
                <span>{project.title}</span>
                <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover/title:text-cyan-300 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-transform" />
              </h3>
            </Link>
          ) : (
            <h3 className="font-sans text-lg md:text-xl font-semibold text-white tracking-tight">
              {project.title}
            </h3>
          )}

          <p className="mt-2 text-sm text-neutral-400 font-sans leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Tech Badges & Footer CTA */}
        <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technology.map((tech, i) => (
              <span
                key={i}
                className={`font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 transition-all duration-200 ${currentGlow.pill}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {project.hasCaseStudy ? (
            <Link
              href={targetHref}
              className={`font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-white underline decoration-neutral-600 underline-offset-4 flex items-center space-x-1 font-semibold transition-all ${currentGlow.text}`}
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
              [P5.JS EXPERIMENT]
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
