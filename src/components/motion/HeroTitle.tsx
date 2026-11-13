"use client";

import { Fragment } from "react";
import { m } from "motion/react";

type Word = { text: string; accent?: boolean };

const words: Word[] = [
  { text: "I" },
  { text: "design" },
  { text: "interactions" },
  { text: "you" },
  { text: "can" },
  { text: "touch,", accent: true },
  { text: "play" },
  { text: "and" },
  { text: "see." },
];

/**
 * Each word rises from behind its own mask, one after another. The full
 * sentence stays in the aria-label so screen readers hear it as one line.
 */
export function HeroTitle({ className = "" }: { className?: string }) {
  const label = words.map((w) => w.text).join(" ");

  return (
    <h1 aria-label={label} className={className}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <m.span
              className={`inline-block ${w.accent ? "text-accent" : ""}`}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ type: "spring", stiffness: 140, damping: 22, delay: 0.1 + i * 0.055 }}
            >
              {/* Accent applies to the word only, not its trailing comma */}
              {w.accent ? (
                <>
                  {w.text.replace(",", "")}
                  <span className="text-ink">,</span>
                </>
              ) : (
                w.text
              )}
            </m.span>
          </span>
          {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
