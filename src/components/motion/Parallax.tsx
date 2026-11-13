"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Drifts its content slightly slower than the page while it passes through
 * the viewport. Slightly scaled up so the edges never show.
 */
export function Parallax({ children, distance = 6 }: { children: React.ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  return (
    <div ref={ref} className="h-full w-full overflow-hidden">
      <m.div style={reduced ? undefined : { y, scale: 1 + (distance * 2.2) / 100 }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
