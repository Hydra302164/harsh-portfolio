import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects Archive | Harsh Alambain — Interaction Designer",
  description: "Complete portfolio of 06 interactive projects by Harsh Alambain across Physical Computing, Creative Coding (p5.js, TouchDesigner), and Visual Identity.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 md:pt-44 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {/* Header */}
          <div className="space-y-4 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="w-2.5 h-2.5 bg-cyan-400 inline-block shadow-[0_0_10px_#22d3ee]" />
              <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                CATALOGUE // ALL PROJECTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              PROJECT ARCHIVE
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl font-sans font-light leading-relaxed">
              Explorations spanning physical computing, capacitive audio installations, generative p5.js algorithms, motorsports games, and brand identity systems.
            </p>

            {/* Total Count & Filter Badge */}
            <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-neutral-400">
              <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                TOTAL: 06 PROJECTS
              </span>
              <span className="border border-neutral-800 px-3 py-1 text-emerald-400">
                1 CASE STUDY AVAILABLE
              </span>
              <span className="text-neutral-500 hidden sm:inline">
                [HOVER CARDS FOR WEBGL GLOW]
              </span>
            </div>
          </div>

          {/* ALL 6 PROJECTS GRID - Mapping over imported projects array */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
