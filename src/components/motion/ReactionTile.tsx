"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { m } from "motion/react";

type Phase = "idle" | "lights" | "wait" | "go" | "result" | "jump";

const LIGHT_STEP = 520; // ms between each red light
const BEST_KEY = "reaction-best";

/**
 * A tiny F1 start you can play inside the grid: five reds light up, they go
 * out after a random pause, and you tap as fast as you can.
 */
export function ReactionTile({ gameHref }: { gameHref: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState(0);
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const goAt = useRef(0);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn: () => void, t: number) => timers.current.push(window.setTimeout(fn, t));
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = () => {
    clear();
    // Pick up a best time saved on an earlier visit
    if (best === null) {
      try {
        const b = Number(localStorage.getItem(BEST_KEY));
        if (b) setBest(b);
      } catch {}
    }
    setMs(null);
    setLit(0);
    setPhase("lights");
    for (let i = 1; i <= 5; i++) later(() => setLit(i), i * LIGHT_STEP);
    later(() => setPhase("wait"), 5 * LIGHT_STEP);
    // Lights out after a random hold, like a real start
    later(() => {
      setLit(0);
      setPhase("go");
      goAt.current = performance.now();
    }, 5 * LIGHT_STEP + 400 + Math.random() * 2000);
  };

  const press = () => {
    if (phase === "idle" || phase === "result" || phase === "jump") return start();
    if (phase === "lights" || phase === "wait") {
      clear();
      setLit(0);
      return setPhase("jump");
    }
    if (phase === "go") {
      const t = Math.round(performance.now() - goAt.current);
      setMs(t);
      setPhase("result");
      if (best === null || t < best) {
        setBest(t);
        try {
          localStorage.setItem(BEST_KEY, String(t));
        } catch {}
      }
    }
  };

  const message: Record<Phase, string> = {
    idle: "Tap to start",
    lights: "Wait for it…",
    wait: "Wait for it…",
    go: "GO!",
    result: "Tap to try again",
    jump: "Jump start! Tap to retry",
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-night text-day dark:bg-[#1b1b19]">
      <button
        type="button"
        onPointerDown={(e) => {
          // React on press, not release: every millisecond counts
          if (e.pointerType !== "mouse" || e.button === 0) press();
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            if (!e.repeat) press();
          }
        }}
        aria-label="Reaction test. Press when the five red lights go out."
        className="absolute inset-0 flex flex-col justify-between p-4 text-left md:p-5"
      >
        <span className="label pr-10 text-day/50!"><span className="hidden sm:inline">Try it · </span>Reaction test</span>

        {/* Start lights */}
        <span className="flex justify-center gap-[6%]" aria-hidden>
          {[1, 2, 3, 4, 5].map((i) => (
            <m.span
              key={i}
              className="aspect-square w-[13%] rounded-full border border-white/10"
              animate={{
                backgroundColor: lit >= i ? "#e10600" : "#262626",
                boxShadow: lit >= i ? "0 0 18px rgb(225 6 0 / 0.75)" : "0 0 0 rgb(0 0 0 / 0)",
              }}
              transition={{ duration: lit >= i ? 0.08 : 0.04 }}
            />
          ))}
        </span>

        <span aria-live="polite">
          {phase === "result" && ms !== null ? (
            <m.span
              key={ms}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="block font-display text-4xl font-semibold tabular-nums tracking-[-0.03em] md:text-5xl"
            >
              {ms}
              <span className="ml-1 text-lg text-day/60">ms</span>
            </m.span>
          ) : (
            <span
              className={`block font-display text-lg font-semibold leading-tight tracking-[-0.02em] sm:text-xl md:text-2xl ${
                phase === "go" ? "text-[#3ddc84]" : phase === "jump" ? "text-[#ff5b36]" : ""
              }`}
            >
              {message[phase]}
            </span>
          )}
          <span className="mt-1 block text-[11px] leading-snug text-day/50 sm:text-[12px]">
            {phase === "result" ? message.result : best ? `Your best: ${best} ms` : "Five lights, then lights out"}
          </span>
        </span>
      </button>

      <Link
        href={gameHref}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-day/10 text-day transition-colors hover:bg-day hover:text-night"
        aria-label="Open the full Reaction Time Game"
        title="Full game"
      >
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
