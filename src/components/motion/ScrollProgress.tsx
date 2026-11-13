"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Thin accent bar along the top edge that fills as you scroll, on every page.
 * Only transform and opacity change, so it stays on the compositor and
 * runs smoothly on phones too. It fades out at the very top of the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.0005 });
  const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);

  return (
    <m.div
      aria-hidden
      style={{ scaleX, opacity }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent will-change-transform"
    />
  );
}
