"use client";

import React from "react";

// 1. SYSTEM FLOW DIAGRAM COMPONENT (Replaces Concept Diagram)
export const JalTarangSystemFlow: React.FC = () => {
  const steps = [
    { title: "GLASS & CHOPSTICK", label: "Conductive Touch Input" },
    { title: "ARDUINO UNO R4", label: "Threshold & Serial Output" },
    { title: "TOUCHDESIGNER", label: "CHOP Audio & Visual Patch" },
    { title: "AUDIO OUTPUT", label: "Polyphonic Sound Generation" },
  ];

  return (
    <div className="w-full bg-neutral-900/80 border border-neutral-800 p-5 md:p-8 rounded-xl shadow-lg relative overflow-hidden group hover:border-cyan-500/60 transition-all duration-300">
      <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-6 flex items-center justify-between border-b border-neutral-800 pb-3">
        <span>SYSTEM ARCHITECTURE // SIGNAL FLOW</span>
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]" />
          <span className="text-neutral-400 font-semibold">ACTIVE LOOP</span>
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            {/* Box Node */}
            <div className="flex-1 w-full bg-neutral-950 border border-cyan-500/60 p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.2)] text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              <span className="font-mono text-xs md:text-sm font-bold text-cyan-300 block tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                {step.title}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 block mt-1 uppercase">
                {step.label}
              </span>
            </div>

            {/* Connecting Arrow Line with Pulse Animation */}
            {idx < steps.length - 1 && (
              <div className="flex md:flex-col items-center justify-center my-1 md:my-0 relative">
                {/* Horizontal line for desktop */}
                <div className="hidden md:flex items-center space-x-1 relative w-6 lg:w-10">
                  <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/40 via-cyan-400 to-cyan-500/40 relative overflow-hidden">
                    <div className="absolute inset-0 w-1/2 bg-cyan-300 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                  </div>
                  <svg
                    className="w-4 h-4 text-cyan-400 shrink-0 -ml-1 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Vertical arrow for mobile */}
                <div className="flex md:hidden flex-col items-center my-1">
                  <div className="w-[2px] h-6 bg-cyan-500/60 relative overflow-hidden">
                    <div className="absolute inset-0 h-1/2 bg-cyan-300 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                  </div>
                  <svg
                    className="w-4 h-4 text-cyan-400 transform rotate-90 -mt-1 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// 2. CIRCUIT VISUALIZER (Breadboard & Resistor Matrix)
export const CircuitVisualizer: React.FC = () => {
  return (
    <div className="aspect-video w-full bg-neutral-950 border border-neutral-800 rounded-lg relative overflow-hidden flex flex-col justify-between p-4 bg-[radial-gradient(#27272a_1.5px,transparent_1.5px)] [background-size:16px_16px] group/circuit hover:border-cyan-500/60 transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10 bg-neutral-950/80 px-2 py-1 rounded border border-neutral-800">
        <span className="text-cyan-400 font-bold">[ CIRCUIT MATRIX ]</span>
        <span className="text-neutral-500">PULL-DOWN RESISTORS</span>
      </div>

      {/* SVG Connecting Trace Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <line x1="20%" y1="35%" x2="50%" y2="50%" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="50%" y1="50%" x2="80%" y2="40%" stroke="rgba(217, 70, 239, 0.5)" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="40%" y2="75%" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1.5" />
        <line x1="80%" y1="40%" x2="70%" y2="75%" stroke="rgba(251, 191, 36, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      {/* Interactive Circuit Nodes */}
      <div className="relative w-full h-full z-10 my-auto">
        {/* Node 1: Glass Tap Input (Cyan Pulsing Node) */}
        <div className="absolute top-[25%] left-[18%] flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-cyan-400/30 animate-ping" />
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] border border-white" />
          </div>
          <span className="font-mono text-[9px] text-cyan-300 mt-1 bg-neutral-950/90 px-1 border border-cyan-800">
            CHOPSTICK_INPUT_01
          </span>
        </div>

        {/* Node 2: Central Microcontroller Bus */}
        <div className="absolute top-[42%] left-[46%] flex flex-col items-center">
          <div className="w-4 h-4 rounded-sm bg-neutral-900 border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)] flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
          </div>
          <span className="font-mono text-[9px] text-neutral-300 mt-1 bg-neutral-950/90 px-1 border border-neutral-800">
            MCU_BUS
          </span>
        </div>

        {/* Node 3: Magenta Threshold Sensing Node */}
        <div className="absolute top-[32%] left-[76%] flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#e879f9] border border-white animate-pulse" />
          <span className="font-mono text-[9px] text-fuchsia-300 mt-1 bg-neutral-950/90 px-1 border border-fuchsia-900">
            SENSE_THRESH_5V
          </span>
        </div>

        {/* Node 4: Amber Ground Loop */}
        <div className="absolute top-[68%] left-[36%] flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          <span className="font-mono text-[9px] text-amber-300 mt-1 bg-neutral-950/90 px-1 border border-amber-900">
            GND_MATRIX
          </span>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 z-10 bg-neutral-950/90 px-2 py-1 border-t border-neutral-800">
        <span className="text-emerald-400 font-semibold">STATUS: HARDWARE TAP DETECTED</span>
        <span>ADC: 1024 READ</span>
      </div>
    </div>
  );
};

// 3. ARDUINO TERMINAL (Serial Code Monitor)
export const ArduinoTerminal: React.FC = () => {
  return (
    <div className="aspect-video w-full bg-black border border-neutral-800 rounded-lg relative overflow-hidden flex flex-col justify-between font-mono text-xs shadow-inner group/terminal hover:border-emerald-500/60 transition-all">
      {/* Code Editor Title Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-3 py-2 flex items-center justify-between select-none">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-neutral-400 ml-2 font-bold tracking-wider">
            Arduino Serial Monitor — 115200 baud
          </span>
        </div>
        <span className="text-[9px] text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded bg-emerald-950/60">
          ONLINE
        </span>
      </div>

      {/* Serial Output Text Body */}
      <div className="p-4 space-y-1.5 text-emerald-400 text-[11px] leading-relaxed my-auto overflow-hidden">
        <p className="text-neutral-500">&gt; Initializing Arduino Uno R4 firmware...</p>
        <p className="text-neutral-400">&gt; Calibrating capacitive threshold matrix [OK]</p>
        <p className="text-emerald-300 font-semibold">&gt; Tap detected: Glass 01 (Sa / C4)</p>
        <p className="text-emerald-400 font-bold drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]">
          &gt; Signal sent: 1 [MIDI_NOTE_ON: 60]
        </p>
        <div className="flex items-center space-x-1">
          <span className="text-emerald-400">&gt; Reading sensors...</span>
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-neutral-950 px-3 py-1.5 border-t border-neutral-900 flex justify-between items-center text-[9px] text-neutral-500">
        <span>C++ FIRMWARE v2.4</span>
        <span>LATENCY: &lt; 2ms</span>
      </div>
    </div>
  );
};

// 4. TOUCHDESIGNER NODES (Node-based Patching Visual)
export const TouchDesignerNodes: React.FC = () => {
  return (
    <div className="aspect-video w-full bg-neutral-950 border border-neutral-800 rounded-lg relative overflow-hidden flex flex-col justify-between p-4 group/td hover:border-fuchsia-500/60 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10 bg-neutral-950/90 px-2 py-1 rounded border border-neutral-800">
        <span className="text-fuchsia-400 font-bold">[ TOUCHDESIGNER CHOP PATCH ]</span>
        <span className="text-neutral-500">REALTIME DSP</span>
      </div>

      {/* Glowing Curved SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="td-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        {/* Curve from Node 1 to Node 2 */}
        <path
          d="M 100 80 C 150 80, 160 80, 200 80"
          stroke="url(#td-gradient)"
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300 group-hover/td:stroke-cyan-300 group-hover/td:drop-shadow-[0_0_10px_#22d3ee]"
        />
        {/* Curve from Node 2 to Node 3 */}
        <path
          d="M 270 80 C 310 80, 320 80, 360 80"
          stroke="url(#td-gradient)"
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300 group-hover/td:stroke-fuchsia-300 group-hover/td:drop-shadow-[0_0_10px_#e879f9]"
        />
      </svg>

      {/* Node Boxes Container */}
      <div className="relative z-10 flex items-center justify-around my-auto">
        {/* Node 1: AudioIn */}
        <div className="bg-neutral-900 border border-cyan-500/80 p-2.5 rounded shadow-[0_0_12px_rgba(6,182,212,0.3)] text-center transition-all duration-300 group-hover/td:scale-105">
          <span className="font-mono text-[9px] text-cyan-400 font-bold block">AudioIn CHOP</span>
          <span className="font-mono text-[8px] text-neutral-400 block mt-0.5">Serial Input 01</span>
        </div>

        {/* Node 2: Math Operator */}
        <div className="bg-neutral-900 border border-fuchsia-500/80 p-2.5 rounded shadow-[0_0_12px_rgba(217,70,239,0.3)] text-center transition-all duration-300 group-hover/td:scale-105">
          <span className="font-mono text-[9px] text-fuchsia-400 font-bold block">Math CHOP</span>
          <span className="font-mono text-[8px] text-neutral-400 block mt-0.5">Gain &amp; Filter</span>
        </div>

        {/* Node 3: AudioPlay */}
        <div className="bg-neutral-900 border border-amber-400/80 p-2.5 rounded shadow-[0_0_12px_rgba(251,191,36,0.3)] text-center transition-all duration-300 group-hover/td:scale-105">
          <span className="font-mono text-[9px] text-amber-300 font-bold block">AudioPlay Out</span>
          <span className="font-mono text-[8px] text-neutral-400 block mt-0.5">60 FPS Render</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 z-10 bg-neutral-950/90 px-2 py-1 border-t border-neutral-800">
        <span className="text-fuchsia-400">GRAPHIC PATCH ACTIVE</span>
        <span>SAMPLE RATE: 44.1 kHz</span>
      </div>
    </div>
  );
};

// 5. TESTING WAVEFORM (Audio Signal Visualizer)
export const TestingWaveform: React.FC = () => {
  return (
    <div className="aspect-video w-full bg-neutral-950 border border-neutral-800 rounded-lg relative overflow-hidden flex flex-col justify-between p-4 group/wave hover:border-amber-400/60 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10 bg-neutral-950/90 px-2 py-1 rounded border border-neutral-800">
        <span className="text-amber-400 font-bold">[ ACOUSTIC SPECTRUM ]</span>
        <span className="text-neutral-500">WATER LEVEL TUNING</span>
      </div>

      {/* Audio Waveform Bars */}
      <div className="flex items-end justify-center space-x-2 my-auto h-24 relative z-10">
        <div className="w-3 sm:w-4 bg-cyan-400 rounded-t shadow-[0_0_10px_#22d3ee] animate-[pulse_1.2s_infinite]" style={{ height: "45%" }} />
        <div className="w-3 sm:w-4 bg-cyan-300 rounded-t shadow-[0_0_10px_#22d3ee] animate-[pulse_0.9s_infinite]" style={{ height: "80%" }} />
        <div className="w-3 sm:w-4 bg-fuchsia-400 rounded-t shadow-[0_0_10px_#e879f9] animate-[pulse_1.5s_infinite]" style={{ height: "60%" }} />
        <div className="w-3 sm:w-4 bg-emerald-400 rounded-t shadow-[0_0_10px_#34d399] animate-[pulse_0.7s_infinite]" style={{ height: "95%" }} />
        <div className="w-3 sm:w-4 bg-amber-400 rounded-t shadow-[0_0_10px_#fbbf24] animate-[pulse_1.1s_infinite]" style={{ height: "70%" }} />
        <div className="w-3 sm:w-4 bg-cyan-400 rounded-t shadow-[0_0_10px_#22d3ee] animate-[pulse_1.4s_infinite]" style={{ height: "50%" }} />
        <div className="w-3 sm:w-4 bg-fuchsia-400 rounded-t shadow-[0_0_10px_#e879f9] animate-[pulse_0.8s_infinite]" style={{ height: "75%" }} />
      </div>

      {/* Footer Readout */}
      <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 z-10 bg-neutral-950/90 px-2 py-1 border-t border-neutral-800">
        <span className="text-amber-300 font-semibold">TUNING: 440 Hz (Dha)</span>
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>RESONANCE OK</span>
        </span>
      </div>
    </div>
  );
};
