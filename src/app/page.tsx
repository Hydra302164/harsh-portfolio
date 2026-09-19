import React from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Sparkles, Terminal, Code } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  // Selected Work: Display first 4 projects from the projects array
  const selectedProjects = projects.slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 md:pt-44 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-36">
          {/* HERO SECTION - Left Aligned */}
          <section className="space-y-8 border-b border-neutral-900 pb-16 md:pb-24 relative">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 bg-emerald-400 animate-pulse inline-block shadow-[0_0_10px_#34d399]" />
                <span className="border border-neutral-800 px-2 py-0.5 text-neutral-300">
                  PORTFOLIO 2026
                </span>
                <span className="text-neutral-500">//</span>
                <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                  PHYSICAL COMPUTING & CREATIVE CODING
                </span>
              </div>

              {/* Stark Large Name Header */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none">
                HARSH <br className="hidden sm:inline" />
                ALAMBAIN
              </h1>

              <div className="flex items-center space-x-3 pt-2">
                <span className="font-mono text-lg md:text-2xl font-bold uppercase tracking-widest text-neutral-300 border-l-2 border-cyan-400 pl-4 py-1">
                  INTERACTION DESIGNER
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xl md:text-3xl font-light text-neutral-300 leading-relaxed max-w-3xl font-sans">
              I design interactive experiences that connect technology, physical interaction and visual storytelling.
            </p>

            {/* Interactive Capability Chips & WebGL Glow CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-neutral-900">
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                <span className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:text-cyan-300">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Arduino & Sensors</span>
                </span>
                <span className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 transition-all duration-300 hover:border-fuchsia-500/60 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:text-fuchsia-300">
                  <Terminal className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>TouchDesigner</span>
                </span>
                <span className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:text-amber-300">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span>p5.js & WebGL</span>
                </span>
              </div>

              <div className="flex items-center space-x-4 font-mono text-xs">
                <Link
                  href="/projects"
                  className="group inline-flex items-center space-x-2 bg-white text-black hover:bg-neutral-100 font-bold px-5 py-3 transition-all duration-300 active:scale-95 uppercase tracking-wider hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                >
                  <span>VIEW ALL PROJECTS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/projects/jal-tarang"
                  className="inline-flex items-center space-x-2 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] px-5 py-3 transition-all duration-300 font-mono uppercase tracking-wider active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CASE STUDY</span>
                </Link>
              </div>
            </div>
          </section>

          {/* SELECTED WORK SECTION */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                    SELECTED WORK
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white">
                  CURATED PROJECTS
                </h2>
              </div>

              <Link
                href="/projects"
                className="group font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-cyan-400 flex items-center space-x-2 transition-colors self-start md:self-auto hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] active:scale-95"
              >
                <span>EXPLORE ALL 06 PROJECTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Minimalist Grid - Explicitly mapping over projects data array */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} priority={idx < 2} />
              ))}
            </div>

            <div className="pt-8 text-center">
              <Link
                href="/projects"
                className="inline-block font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-white border border-neutral-800 hover:border-cyan-500/80 bg-neutral-900/60 px-8 py-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
              >
                [ VIEW ALL 06 PROJECTS IN CATALOGUE ]
              </Link>
            </div>
          </section>

          {/* EXPERIMENTAL APPROACH / MANIFESTO */}
          <section className="bg-neutral-900/40 border border-neutral-800 p-8 md:p-14 space-y-6 relative overflow-hidden transition-all duration-300 hover:border-fuchsia-500/60 hover:shadow-[0_0_35px_rgba(217,70,239,0.2)]">
            <div className="absolute top-4 right-4 font-mono text-[10px] text-neutral-600">
              [SYSTEM_MANIFESTO // IXD]
            </div>

            <div className="space-y-3 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-400 font-semibold drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
                03 // DESIGN PHILOSOPHY
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                Where Physical Objects Become Generative Instruments
              </h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-sans pt-2">
                I explore physical computing, algorithmic artwork, and interactive sound. By treating conductive materials, microcontrollers, and motion graphics as unified design primitives, I create tactile feedback loops that transform static interfaces into dynamic sensory environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-800 font-mono text-xs">
              <div className="p-4 bg-neutral-950/60 border border-neutral-900 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                <span className="text-cyan-400 font-bold block mb-1">01 / PHYSICAL TACTILITY</span>
                <p className="text-neutral-500 text-[11px]">
                  Conductive sensors, water, and microcontrollers as tangible interface controls.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/60 border border-neutral-900 hover:border-fuchsia-500/60 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all">
                <span className="text-fuchsia-400 font-bold block mb-1">02 / CREATIVE CODING</span>
                <p className="text-neutral-500 text-[11px]">
                  Generative algorithms, fluid physics, and real-time p5.js canvas experiments.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/60 border border-neutral-900 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all">
                <span className="text-amber-400 font-bold block mb-1">03 / VISUAL & MOTORSPORTS</span>
                <p className="text-neutral-500 text-[11px]">
                  Precision telemetry, race mechanics, and stark grid typography systems.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
