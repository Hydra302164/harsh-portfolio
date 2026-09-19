"use client";

import React, { useState } from "react";
import { Volume2, Music, Sparkles } from "lucide-react";
import { jalTarangCaseStudyData } from "@/data/projects";

export const JalTarangSoundSimulator = () => {
  const [activeGlass, setActiveGlass] = useState<string | null>(null);

  // Web Audio Synthesizer to play tuned Jal Tarang frequencies on tap
  const playGlassTone = (frequencyHz: number, glassName: string) => {
    setActiveGlass(glassName);

    try {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with subtle harmonic overlay for acoustic glass bowl effect
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequencyHz, ctx.currentTime);

      // Envelope: Instant attack, long metallic decay
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch {
      // AudioContext fallback
    }

    setTimeout(() => {
      setActiveGlass(null);
    }, 1800);
  };

  const parseFreq = (freqStr: string) => {
    return parseFloat(freqStr.replace(" Hz", ""));
  };

  const cardGlows = [
    "hover:border-cyan-500/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]",
    "hover:border-emerald-500/80 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]",
    "hover:border-fuchsia-500/80 hover:shadow-[0_0_25px_rgba(217,70,239,0.4)]",
    "hover:border-amber-400/80 hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]",
    "hover:border-violet-500/80 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]",
    "hover:border-orange-400/80 hover:shadow-[0_0_25px_rgba(251,146,60,0.4)]",
  ];

  return (
    <div className="bg-neutral-950 border border-neutral-800 p-6 md:p-10 space-y-8 my-8 relative overflow-hidden transition-all duration-300 hover:border-fuchsia-500/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.15)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6 relative z-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-400 block mb-1 font-semibold drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
            // INTERACTIVE SOUND MAPPING & TUNING MATRIX
          </span>
          <h3 className="font-sans text-xl md:text-2xl font-bold text-white tracking-tight">
            05 Sound Mapping Calibration
          </h3>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-3.5 py-2 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
          <Volume2 className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
          <span>TAP ANY GLASS TO PLAY FREQUENCY</span>
        </div>
      </div>

      {/* Grid of 6 Vessels with WebGL Glow Effects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
        {jalTarangCaseStudyData.soundMappings.map((mapping, index) => {
          const isPlaying = activeGlass === mapping.glass;
          const freq = parseFreq(mapping.frequency);
          const glow = cardGlows[index % cardGlows.length];

          return (
            <button
              key={index}
              onClick={() => playGlassTone(freq, mapping.glass)}
              className={`group relative p-5 border text-left transition-all duration-300 flex flex-col justify-between h-48 active:scale-95 cursor-pointer ${glow} ${
                isPlaying
                  ? "bg-neutral-900 border-cyan-400 scale-[1.04] shadow-[0_0_30px_rgba(6,182,212,0.6)] z-20"
                  : "bg-neutral-900/40 border-neutral-800"
              }`}
            >
              {/* Top Glass Identifier */}
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-white">
                  0{index + 1}
                </span>
                <Music
                  className={`w-3.5 h-3.5 ${
                    isPlaying ? "text-cyan-400 animate-bounce drop-shadow-[0_0_8px_#22d3ee]" : "text-neutral-600"
                  }`}
                />
              </div>

              {/* Water Level & Vessel Visual Mockup */}
              <div className="my-2 relative w-full h-16 bg-neutral-950 border border-neutral-800 flex items-end p-1 overflow-hidden">
                {/* Simulated Water height per pitch */}
                <div
                  className={`w-full transition-all duration-500 ${
                    isPlaying
                      ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                      : "bg-neutral-700/60 group-hover:bg-cyan-500/60"
                  }`}
                  style={{ height: `${30 + index * 12}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-neutral-300 uppercase tracking-tighter font-bold">
                  {mapping.note}
                </span>
              </div>

              {/* Pitch Info */}
              <div>
                <h4 className="font-mono text-xs font-bold text-white tracking-wider group-hover:text-cyan-300">
                  {mapping.glass}
                </h4>
                <p className="font-mono text-[10px] text-cyan-400 mt-0.5 font-semibold">
                  {mapping.frequency}
                </p>
                <span className="font-mono text-[9px] text-neutral-500 block truncate mt-1">
                  {mapping.sound}
                </span>
              </div>

              {isPlaying && (
                <div className="absolute top-2 right-2 flex space-x-0.5">
                  <span className="w-1 h-3 bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                  <span className="w-1 h-3 bg-cyan-400 animate-pulse delay-75 shadow-[0_0_8px_#22d3ee]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-neutral-900/60 border border-neutral-800 font-mono text-xs text-neutral-400 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span>ACOUSTIC TUNING: RAGA PENTATONIC SCALE (C4, D4, E4, G4, A4, B4)</span>
        </div>
        <span className="text-cyan-400 font-semibold hidden sm:inline">[WEB AUDIO SYNTHESIS]</span>
      </div>
    </div>
  );
};
