"use client";

import React, { useState } from "react";
import { Play, Activity, Cpu, Sparkles, Volume2 } from "lucide-react";

export const JalTarangInteractiveFlow = () => {
  const [activeNode, setActiveNode] = useState<number | null>(1);
  const [pulsing, setPulsing] = useState(false);

  const steps = [
    {
      id: 1,
      name: "GLASS + METAL CHOPSTICK",
      tag: "Conductive Input Sensor",
      desc: "User taps water-filled glass vessel with metal chopstick to complete physical circuit switch.",
      icon: Sparkles,
      signal: "TACTILE IMPULSE",
      glow: "hover:border-cyan-500/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]",
      accent: "text-cyan-400",
    },
    {
      id: 2,
      name: "ARDUINO UNO",
      tag: "ADC Microcontroller",
      desc: "Detects analog voltage drop across pins, runs C++ firmware debounce, and outputs serial MIDI bytes.",
      icon: Cpu,
      signal: "SERIAL MIDI / 115200 BAUD",
      glow: "hover:border-emerald-500/80 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]",
      accent: "text-emerald-400",
    },
    {
      id: 3,
      name: "TOUCHDESIGNER",
      tag: "Real-time DSP Engine",
      desc: "Processes incoming CHOP channels, triggers polyphonic synth modules, and generates reactive visual particle shaders.",
      icon: Activity,
      signal: "OSC / DSP SYNTHESIS",
      glow: "hover:border-fuchsia-500/80 hover:shadow-[0_0_25px_rgba(217,70,239,0.4)]",
      accent: "text-fuchsia-400",
    },
    {
      id: 4,
      name: "SOUND OUTPUT",
      subTag: "(LAPTOP SPEAKER)",
      tag: "Acoustic Output",
      desc: "Outputs resonant tuned acoustic Jal Tarang frequencies directly to room speakers in <12ms latency.",
      icon: Volume2,
      signal: "AUDIO WAVEFORM (44.1kHz)",
      glow: "hover:border-amber-400/80 hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]",
      accent: "text-amber-400",
    },
  ];

  const triggerPulse = (nodeId: number) => {
    setActiveNode(nodeId);
    setPulsing(true);
    setTimeout(() => setPulsing(false), 1200);
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 p-6 md:p-10 space-y-8 my-8 relative overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6 relative z-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 block mb-1 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            // INTERACTIVE SIGNAL FLOW SCHEMATIC
          </span>
          <h3 className="font-sans text-xl md:text-2xl font-bold text-white tracking-tight">
            Physical-to-Digital Signal Pipeline
          </h3>
        </div>

        <button
          onClick={() => triggerPulse(1)}
          className="inline-flex items-center space-x-2 font-mono text-xs bg-white text-black hover:bg-cyan-300 font-bold px-4 py-2.5 transition-all duration-300 active:scale-95 self-start md:self-auto hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span>SIMULATE PHYSICAL TAP</span>
        </button>
      </div>

      {/* Block Diagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeNode === step.id;

          return (
            <div key={step.id} className="relative group">
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-[2px] bg-neutral-800 z-0">
                  <div
                    className={`h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-700 ${
                      pulsing && activeNode && activeNode <= step.id ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}

              {/* Node Card */}
              <button
                onClick={() => triggerPulse(step.id)}
                className={`w-full text-left p-5 border transition-all duration-300 relative z-10 flex flex-col justify-between min-h-[220px] active:scale-95 cursor-pointer ${step.glow} ${
                  isActive
                    ? "bg-neutral-900 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)] scale-[1.02]"
                    : "bg-neutral-900/40 border-neutral-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-neutral-500 font-bold">
                      0{step.id}
                    </span>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" : step.accent
                      }`}
                    />
                  </div>

                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {step.name}
                  </h4>
                  {step.subTag && (
                    <span className="font-mono text-[10px] text-neutral-400 block mb-2">
                      {step.subTag}
                    </span>
                  )}
                  <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-neutral-400 bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 mb-3">
                    {step.tag}
                  </span>

                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/60 mt-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
                  <span>{step.signal}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping shadow-[0_0_8px_#22d3ee]" />
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Signal Status Bar */}
      <div className="font-mono text-xs bg-neutral-900/80 border border-neutral-800 p-4 flex flex-wrap items-center justify-between gap-4 text-neutral-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span>STATUS: HARDWARE CIRCUIT ACTIVE (5V CONDUCTIVE THRESHOLD)</span>
        </div>
        <div className="text-[11px] text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          [CLICK ANY NODE ABOVE TO TRACE SIGNAL FLOW]
        </div>
      </div>
    </div>
  );
};
