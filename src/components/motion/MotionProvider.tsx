"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Loads Motion's feature bundle once and makes every animation respect the
 * visitor's reduced-motion setting (movement is dropped, fades stay).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 380, damping: 34 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
