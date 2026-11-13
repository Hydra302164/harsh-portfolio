"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  type: "video" | "image";
  alt: string;
  /** Whether the parent card is hovered (desktop hover-to-play). */
  active?: boolean;
  /** Always play while on screen (used for the featured project). */
  autoplayInView?: boolean;
  className?: string;
};

/**
 * Videos stay paused on their first frame and play on hover (desktop),
 * or while on screen on touch devices. Saves bandwidth and keeps the
 * page calm until someone shows interest.
 */
export function ProjectMedia({ src, type, alt, active = false, autoplayInView = false, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const touch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldPlay = !reduced && inView && (active || autoplayInView || touch);
    if (shouldPlay) v.play().catch(() => {});
    else v.pause();
  }, [inView, active, autoplayInView]);

  if (type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <video
      ref={ref}
      src={`${src}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
