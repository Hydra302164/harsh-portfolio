import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JalTarangInteractiveFlow } from "@/components/JalTarangInteractiveFlow";
import { JalTarangSoundSimulator } from "@/components/JalTarangSoundSimulator";
import {
  JalTarangSystemFlow,
  CircuitVisualizer,
  ArduinoTerminal,
  TouchDesignerNodes,
  TestingWaveform,
} from "@/components/JalTarangProcessComponents";
import { jalTarangCaseStudyData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Case Study: Jal Tarang | Harsh Alambain",
  description: "Detailed case study of Jal Tarang - an interactive physical computing installation using Arduino Uno, TouchDesigner, conductive glass vessels, and metal chopsticks to produce sound.",
};

export default function JalTarangCaseStudyPage() {
  const data = jalTarangCaseStudyData;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 md:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          {/* Top Breadcrumb & Back Link */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-all duration-300 border border-neutral-800 hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] bg-neutral-900/60 px-4 py-2 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO ALL PROJECTS</span>
            </Link>
          </div>

          {/* HEADER SECTION */}
          <header className="space-y-8 border-b border-neutral-900 pb-12">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400 uppercase tracking-wider">
              <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                PROJECT 01 CASE STUDY
              </span>
              <span>//</span>
              <span>{data.category}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              {data.title}
            </h1>

            {/* Meta Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-900 font-mono text-xs">
              <div>
                <span className="text-neutral-500 uppercase tracking-widest block mb-1">
                  CATEGORY
                </span>
                <span className="text-white font-semibold">
                  {data.category}
                </span>
              </div>

              <div>
                <span className="text-neutral-500 uppercase tracking-widest block mb-1">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.technologyStack.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-neutral-900 border border-neutral-800 text-cyan-400 px-2 py-0.5 font-mono shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-neutral-500 uppercase tracking-widest block mb-1">
                  HARDWARE & SOFTWARE
                </span>
                <span className="text-white font-semibold">
                  Arduino Uno + TouchDesigner Patch
                </span>
              </div>
            </div>
          </header>

          {/* 01 OVERVIEW */}
          <section id="overview" className="space-y-4 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>01 OVERVIEW</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Physical Touch Meets Digital Soundscape
            </h2>
            <p className="text-xl md:text-2xl text-neutral-200 font-sans font-light leading-relaxed max-w-4xl bg-neutral-900/40 p-6 md:p-8 border border-neutral-800">
              "{data.overview}"
            </p>
          </section>

          {/* 02 CONCEPT */}
          <section id="concept" className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>02 CONCEPT & SYSTEM FLOW</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Reinterpreting the Traditional Instrument
            </h2>
            <div className="space-y-6">
              <div className="text-neutral-300 text-base md:text-lg leading-relaxed font-sans space-y-4 max-w-4xl">
                <p>{data.concept}</p>
                <p className="text-neutral-400 text-sm font-sans">
                  Traditional Jal Tarang relies on varying water levels inside ceramic or glass bowls struck by wooden sticks to alter acoustic pitch. In this modern digital reinterpretation, water vessels become conductive inputs mapped directly to digital sound layers inside TouchDesigner.
                </p>
              </div>
              <div className="w-full pt-2">
                <JalTarangSystemFlow />
              </div>
            </div>
          </section>

          {/* 03 INTERACTION */}
          <section id="interaction" className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>03 INTERACTION</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Conductive Metal Chopsticks & Tactile Sensing
            </h2>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 md:p-8 space-y-4">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-sans">
                {data.interaction}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800 font-mono text-xs">
                <div className="flex items-start space-x-2 text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Low-voltage safety matrix</span>
                </div>
                <div className="flex items-start space-x-2 text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Conductive water & metal contact</span>
                </div>
                <div className="flex items-start space-x-2 text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Real-time analog threshold detection</span>
                </div>
              </div>
            </div>
          </section>

          {/* 04 HOW IT WORKS (VISUAL FLOW) */}
          <section id="flow" className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>04 HOW IT WORKS (VISUAL FLOW)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              System Block Diagram Architecture
            </h2>
            
            {/* Interactive Block Diagram Component */}
            <JalTarangInteractiveFlow />
          </section>

          {/* 05 SOUND MAPPING */}
          <section id="sound-mapping" className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>05 SOUND MAPPING</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Vessel Pitch Mapping & Acoustic Scale
            </h2>

            {/* Clean List & Web Audio Simulator Component */}
            <JalTarangSoundSimulator />
          </section>

          {/* 06 PROCESS */}
          <section id="process" className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>06 PROCESS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Prototyping & System Development
            </h2>
            <p className="text-neutral-400 text-sm font-sans max-w-2xl">
              Iterative development from breadboard circuit assembly to sensor debouncing in C++ and TouchDesigner DSP patching.
            </p>

            {/* Grid for Process Interactive Systems */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.processImages.map((proc, index) => {
                const processVisualizers = [
                  <CircuitVisualizer key="circuit" />,
                  <ArduinoTerminal key="arduino" />,
                  <TouchDesignerNodes key="td" />,
                  <TestingWaveform key="testing" />,
                ];

                return (
                  <div
                    key={index}
                    className="bg-neutral-900/60 border border-neutral-800 p-6 flex flex-col justify-between space-y-4 group hover:border-cyan-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] rounded-xl"
                  >
                    {processVisualizers[index]}
                    <div>
                      <span className="font-mono text-xs text-cyan-400 font-bold block mb-1 uppercase tracking-wider">
                        {proc.label} — {proc.title}
                      </span>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                        {proc.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 07 FINAL OUTCOME - AUTO-PLAYING LOOPING HERO VIDEO */}
          <section id="final-outcome" className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>07 FINAL OUTCOME</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              The Completed Jal Tarang Installation
            </h2>

            {/* Looping HTML5 Hero Video */}
            <div className="space-y-4">
              <div className="relative overflow-hidden border border-neutral-800 bg-neutral-900 rounded-xl shadow-lg transition-all duration-300 hover:border-cyan-500/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                <video
                  src="/images/projects/jal-tarang.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-xl shadow-lg object-cover max-h-[600px]"
                />
              </div>

              <div className="p-4 bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-4">
                <span>[EXHIBITION INSTALLATION DEMO // 2024]</span>
                <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                  HARDWARE + SOFTWARE RUNNING IN SYNC
                </span>
              </div>
            </div>
          </section>

          {/* 08 REFLECTION */}
          <section id="reflection" className="space-y-6">
            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#22d3ee]" />
              <span>08 REFLECTION</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Key Insights & Learning Outcomes
            </h2>
            <div className="bg-neutral-900/80 border border-neutral-800 p-8 md:p-10 space-y-6">
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-sans">
                {data.reflection}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-800 font-mono text-xs">
                <div className="space-y-2">
                  <span className="text-cyan-400 font-bold block uppercase tracking-wider">
                    01 // PHYSICAL INTERACTION & CONDUCTIVITY
                  </span>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    Capacitive and conductive inputs require careful physical calibration to avoid false triggers from ambient noise. Using pull-down resistors and threshold windows ensured clean binary and analog readings.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-cyan-400 font-bold block uppercase tracking-wider">
                    02 // RELIABLE CONNECTIONS & FEEDBACK
                  </span>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    In physical computing installations, immediate multisensory feedback (visual light impulse + acoustic output) gives users clear confirmation that their physical tap was received by the software.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Next / Previous Project Navigation */}
          <div className="pt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ALL PROJECTS ARCHIVE</span>
            </Link>

            <Link
              href="/#contact"
              className="group inline-flex items-center space-x-2 bg-white text-black font-bold px-6 py-3 uppercase tracking-wider hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] active:scale-95"
            >
              <span>DISCUSS THIS INSTALLATION</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
