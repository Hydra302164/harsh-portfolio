"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "alambainharsh@gmail.com";
  const instagramUrl = "https://instagram.com/harshgt250";
  const linkedinUrl = "https://www.linkedin.com/in/harsh-a-513a69246/";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 pt-20 pb-12 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background ambient glow effect */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-magenta-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-900">
          {/* Section 1: ABOUT ME */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-cyan-400 inline-block shadow-[0_0_8px_#06b6d4]" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                01 // ABOUT ME
              </h3>
            </div>
            <p className="text-xl md:text-2xl font-light text-neutral-200 leading-relaxed font-sans max-w-xl">
              Interaction Design student interested in creative coding, physical computing, motorsports, technology and visual design.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans max-w-lg">
              Exploring how physical computing and generative software can dissolve the boundaries between physical artifacts and digital soundscapes. Driven by precision, speed, and experimental interactions.
            </p>
          </div>

          {/* Section 2: CONTACT */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-fuchsia-400 inline-block shadow-[0_0_8px_#e879f9]" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  02 // CONTACT
                </h3>
              </div>

              {/* Email Direct Link & Copy Block */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block">
                  Direct Email
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="text-2xl md:text-3xl font-mono tracking-tight text-white hover:text-cyan-400 transition-all duration-300 underline decoration-neutral-700 underline-offset-8 hover:decoration-cyan-400 hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] active:scale-95"
                  >
                    {email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center space-x-1 font-mono text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-cyan-500/60 px-3 py-2 transition-all duration-300 active:scale-95 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links Grid with WebGL Glow Effects */}
            <div className="pt-6">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-4">
                Social Networks & Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Instagram Link */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-neutral-900/60 border border-neutral-800 hover:border-fuchsia-500/60 transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] active:scale-95"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-neutral-400 group-hover:text-fuchsia-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <div>
                      <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest group-hover:text-neutral-200">
                        Instagram
                      </p>
                      <p className="text-sm font-semibold text-white font-mono group-hover:text-fuchsia-300">
                        harshgt250
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-fuchsia-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-neutral-900/60 border border-neutral-800 hover:border-cyan-500/60 hover:text-cyan-400 transition-colors transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-neutral-400 group-hover:text-cyan-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <div>
                      <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest group-hover:text-neutral-200">
                        LinkedIn
                      </p>
                      <p className="text-sm font-semibold text-white font-mono group-hover:text-cyan-300">
                        Harsh Alambain
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Technical Subfoot */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-neutral-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} HARSH ALAMBAIN — ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#5eead4]" />
              <span>AVAILABLE FOR INTERACTION DESIGN ROLES</span>
            </span>
            <span>NEXT.JS // TAILWIND // WEBGL-GLOW</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
