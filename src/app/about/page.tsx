import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Cpu, Code, Terminal, Sparkles, Layers, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Harsh Alambain — Interaction Designer",
  description: "Background, skills, and creative philosophy of Interaction Designer Harsh Alambain specializing in creative coding, physical computing, and motorsports visual design.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-grow pt-32 md:pt-44 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          {/* Header */}
          <div className="space-y-6 border-b border-neutral-900 pb-12">
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="w-2 h-2 bg-emerald-400 inline-block" />
              <span>PROFILE // HARSH ALAMBAIN</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white">
              ABOUT ME
            </h1>
            <p className="text-xl md:text-3xl text-neutral-200 font-sans font-light leading-relaxed max-w-4xl">
              Interaction Design student interested in creative coding, physical computing, motorsports, technology and visual design.
            </p>
          </div>

          {/* Grid Layout: Bio & Core Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed font-sans">
              <h2 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                01 // BACKGROUND & MOTIVATION
              </h2>
              <p>
                My work lies at the intersection of tangible hardware interfaces and generative visual software. I believe that interactions feel most natural when physical tactile objects—such as water, metal conductors, and sensors—are directly bridged into digital soundscapes and creative code.
              </p>
              <p className="text-neutral-400 text-sm">
                From prototyping micro-second Formula 1 reaction timer algorithms in p5.js to building conductive Jal Tarang musical instruments with Arduino Uno and TouchDesigner, I continuously push the boundaries of how humans experience technology.
              </p>
            </div>

            <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 p-8 space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-neutral-500 uppercase tracking-widest">ROLE</span>
                <span className="text-white font-bold">INTERACTION DESIGNER</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-neutral-500 uppercase tracking-widest">FOCUS</span>
                <span className="text-emerald-400 font-bold">PHYSICAL & CREATIVE COMPUTING</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-neutral-500 uppercase tracking-widest">LOCATION</span>
                <span className="text-white">INDIA</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-neutral-500 uppercase tracking-widest">STATUS</span>
                <span className="text-emerald-400">OPEN FOR ROLES</span>
              </div>
            </div>
          </div>

          {/* Technical Toolkit Grid */}
          <div className="space-y-8 border-t border-neutral-900 pt-16">
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="w-2 h-2 bg-white inline-block" />
              <span>02 // DOMAINS & TOOLKIT</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              SKILLS & CAPABILITIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-neutral-900/40 border border-neutral-800 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Physical Computing
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Arduino Uno, Microcontrollers, Capacitive & Conductive Sensors, Circuit Design, Breadboard Harnesses, Low-voltage I/O.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Code className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Creative Coding
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  p5.js, JavaScript (ES6+), HTML5 Canvas, Algorithmic Visuals, Particle Systems, Mathematical Time Visualizations.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Terminal className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Interactive DSP & Sound
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  TouchDesigner CHOPs/OSC, Serial Communication, Web Audio API, Polyphonic Synthesizer Mapping.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Motorsports & Gaming
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Reaction telemetry timing engines, quiz state machines, sports ergonomics, race gantry light sequencing.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Layers className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Visual & Brand Identity
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Minimalist typography, grid layout systems, graphic design collaterals, monogram design, design spec sheets.
                </p>
              </div>

              <div className="bg-neutral-900/40 border border-neutral-800 p-6 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    Frontend Web Tech
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Next.js App Router, React 19, TypeScript, Tailwind CSS, Responsive Web Design, SEO Optimization.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-2">
                // INTERESTED IN COLLABORATION?
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Let's build interactive experiences together.
              </h3>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold px-6 py-4 hover:bg-neutral-200 transition-all shrink-0"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
