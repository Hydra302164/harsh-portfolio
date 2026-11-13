"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { notes } from "@/data/projects";

let sharedCtx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    sharedCtx = new Ctor();
  }
  if (sharedCtx.state === "suspended") void sharedCtx.resume();
  return sharedCtx;
}

/** A struck-glass tone: fundamental plus quiet inharmonic partials, long decay. */
function strike(hz: number) {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(0.32, t + 0.008);
  master.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
  master.connect(ctx.destination);

  const partials: [number, number][] = [
    [1, 1],
    [2.32, 0.18],
    [4.25, 0.07],
  ];
  for (const [mult, amp] of partials) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(hz * mult, t);
    g.gain.value = amp;
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + 2.5);
  }
}

type Props = {
  /** "compact" for the hero, "full" for the case study. */
  variant?: "compact" | "full";
};

export function JalTarang({ variant = "compact" }: Props) {
  const [hits, setHits] = useState<number[]>(() => notes.map(() => 0));
  const [last, setLast] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const full = variant === "full";

  const play = useCallback((i: number) => {
    strike(notes[i].hz);
    setLast(i);
    setHits((h) => h.map((v, j) => (j === i ? v + 1 : v)));
    setTimeout(() => setLast((cur) => (cur === i ? null : cur)), 650);
  }, []);

  // Keys 1–6 play the glasses while the instrument is on screen.
  useEffect(() => {
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (rootRef.current) io.observe(rootRef.current);
    const onKey = (e: KeyboardEvent) => {
      if (!visible || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 6) play(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [play]);

  return (
    <div ref={rootRef} className="select-none">
      <div
        className={`grid grid-cols-6 items-end ${full ? "gap-3 sm:gap-5 h-64 sm:h-80" : "gap-2 sm:gap-3 h-44 sm:h-52"}`}
        role="group"
        aria-label="Playable Jal Tarang: six glasses"
      >
        {notes.map((n, i) => {
          // More water = lower pitch, like the real instrument.
          const fill = 78 - i * 9;
          const height = full ? 100 - i * 4 : 100 - i * 5;
          return (
            <button
              key={n.note}
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                play(i);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  play(i);
                }
              }}
              aria-label={`Play ${n.note} (${n.western})`}
              className="group flex h-full flex-col items-center outline-none"
            >
              <span className="relative flex w-full flex-1 items-end">
              {/* ripple ring */}
              {hits[i] > 0 && (
                <span
                  key={hits[i]}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border border-accent"
                  style={{
                    width: "120%",
                    aspectRatio: "1",
                    bottom: `${(fill * height) / 100 - 30}%`,
                    animation: "ring 0.9s ease-out forwards",
                  }}
                />
              )}
              {/* glass */}
              <span
                className={`relative mx-auto w-[72%] overflow-hidden rounded-b-[22px] rounded-t-[3px] border bg-white/40 dark:bg-white/[0.06] backdrop-blur-[1px] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-ink/60 group-focus-visible:border-accent group-focus-visible:ring-2 group-focus-visible:ring-accent/40 group-active:scale-[0.97] ${
                  last === i ? "border-accent/80 shadow-[0_0_32px_-2px_var(--glow)]" : "border-ink/25"
                }`}
                style={{ height: `${height}%` }}
              >
                {/* glass highlight */}
                <span aria-hidden className="absolute left-[14%] top-[6%] bottom-[10%] w-[6%] rounded-full bg-white/70" />
                {/* water */}
                <span
                  key={hits[i]}
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 origin-bottom transition-colors duration-500 ${
                    last === i ? "bg-accent/80" : "bg-water/55 group-hover:bg-water/75"
                  }`}
                  style={{
                    height: `${fill}%`,
                    animation: hits[i] ? "slosh 0.9s ease-out" : undefined,
                  }}
                >
                  <span className="absolute inset-x-0 top-0 h-[3px] bg-white/50" />
                </span>
              </span>
              </span>
              <span className="mt-3 flex flex-col items-center leading-tight">
                <span className={`font-display font-semibold ${full ? "text-lg" : "text-sm"} ${last === i ? "text-accent" : ""}`}>
                  {n.note}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {full ? `${n.western} · ${n.hz.toFixed(0)} Hz` : i + 1}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
