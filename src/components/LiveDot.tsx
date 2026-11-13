/** Blinking "available" indicator. */
export function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
      <span className="live-halo absolute inline-flex h-full w-full rounded-full bg-accent" />
      <span className="live-dot relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}
