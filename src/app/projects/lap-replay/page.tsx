import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Maximize2 } from "lucide-react";
import { ProjectMedia } from "@/components/ProjectMedia";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/lap-replay" },
  title: "Lap Replay case study",
  description:
    "An interactive replay of Verstappen's and Hamilton's fastest-ever Singapore laps, built in p5.js from real F1 telemetry, showing where 0.348 seconds is won and lost.",
};

const facts = [
  { k: "Year", v: "2026" },
  { k: "Context", v: "Independent" },
  { k: "Team", v: "Solo" },
  { k: "Tools", v: "p5.js, OpenF1 API, Python" },
];

const flow = [
  { n: "01", t: "Find", d: "A Python script searches every Singapore session and picks each driver's fastest lap." },
  { n: "02", t: "Smooth", d: "Position points become a smooth racing line; speed data tells each car how far along it is." },
  { n: "03", t: "Show", d: "Both cars replay at true speed with live speed, gear, revs, throttle and brake." },
  { n: "04", t: "Compare", d: "The laps are compared at the same place on track to reveal where time is won." },
];

const process = [
  {
    t: "Drawing the track",
    d: "Scaled the raw position points to the screen and flipped the Y axis. The circuit isn't drawn from a map. It's the shape of where the cars actually drove.",
  },
  {
    t: "Making the cars move smoothly",
    d: "Position data arrives only about four times a second, so the cars jumped between points. I turned the points into a smooth racing line, added up the speed readings to know exactly how far along the lap each car was, and placed it there. A frame-by-frame check then found a stutter caused by two readings 0.02s apart, which I filtered out.",
  },
  {
    t: "Live telemetry",
    d: "Each driver gets a card with speed, gear, rev lights, throttle, brake and a speed trace that draws as the lap plays. Gear and brake jump between values while speed and RPM blend, because blending gears would show '4.6th gear', which doesn't exist.",
  },
  {
    t: "Colouring the track by speed",
    d: "The racing line paints in behind the car from blue (65 km/h) to red (315 km/h), on one shared scale so both drivers compare fairly. Redrawing thousands of segments every frame was too slow, so the heatmap moved onto its own layer that only adds what's new.",
  },
  {
    t: "Head-to-head",
    d: "At any given moment the two cars are in different places, so comparing them at the same time is misleading. Instead, for every point on the lap I compare when each driver got there. That drives the gap graph, the 25 mini-sectors coloured by who was faster, and tags on the three biggest swings. Nothing is revealed until both cars have passed, so the story unfolds as you watch.",
  },
];

const findings = [
  { big: "0.348s", small: "Verstappen's margin over the full lap" },
  { big: "16 / 25", small: "Mini-sectors won by Verstappen (Hamilton won 9)" },
  { big: "0.004s", small: "The most Hamilton is ever ahead" },
  { big: "~0.2s", small: "Hamilton's biggest gain, early in the lap" },
];

const learnings = [
  {
    t: "Model the data, don't fake the motion",
    d: "Smooth movement came from working out distance from speed correctly, not from adding easing on top.",
  },
  {
    t: "What you compare changes what it says",
    d: "Switching from same-time to same-place comparison turned a misleading graph into an honest one.",
  },
  {
    t: "Know the limits of your data",
    d: "With about four readings a second, single mini-sector gaps are approximate (about ±0.1s). I cross-checked the biggest swing with a second method before trusting it.",
  },
];

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line py-14 md:grid-cols-12 md:py-20">
      <div className="md:col-span-4" data-reveal>
        <p className="label">{label}</p>
        <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </section>
  );
}

export default function LapReplayPage() {
  const next = projects.find((p) => p.slug === "motorsports-reaction-game")!;

  return (
    <article className="mx-auto max-w-[1280px] px-5 md:px-10 pt-28 md:pt-36 pb-24">
      <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] text-ink-2 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>

      <header className="mt-10">
        <p className="label" data-reveal>Case study · Data visualisation</p>
        <h1
          data-reveal
          className="mt-4 font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
        >
          Lap Replay
        </h1>
        <p data-reveal className="mt-8 max-w-2xl text-[19px] md:text-[22px] leading-relaxed text-ink-2">
          Verstappen&apos;s and Hamilton&apos;s fastest-ever laps at Singapore, replayed side by side from real F1
          telemetry, to find where 0.348 seconds is won and lost.
        </p>
        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="label">{f.k}</dt>
              <dd className="mt-1.5 text-[15px]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div data-reveal className="mt-12 aspect-[16/10] overflow-hidden rounded-[8px] bg-[#0d0d10]">
        <ProjectMedia
          src="/images/projects/lap-replay.jpg"
          type="image"
          alt="Lap Replay at the finish line: the Singapore track coloured blue and red by which driver was faster in each mini-sector, with telemetry cards and a gap graph"
        />
      </div>

      <Section label="01 · Question" title="Where does a third of a second go?">
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-2 max-w-2xl">
          <p>
            Verstappen&apos;s best lap at Marina Bay is 1:29.340. Hamilton&apos;s is 1:29.688. Both were set in 2025
            qualifying. On TV the two laps look the same, yet one is a third of a second quicker.
          </p>
          <p>
            I wanted to see exactly where that time comes from: which corners, which straights, and whether Hamilton is
            ever ahead. The data comes from OpenF1, a free public API with each car&apos;s position and telemetry. It
            starts in 2023, the same year Singapore changed its layout, so every lap compared runs on the same track.
          </p>
        </div>
      </Section>

      <Section label="02 · System" title="From raw data to a race you can read">
        <ol className="grid gap-px overflow-hidden rounded-[8px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="relative bg-paper p-6"
            >
              <p className="label">{s.n}</p>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.d}</p>
              {i < flow.length - 1 && (
                <span aria-hidden className="absolute right-4 top-6 hidden text-accent lg:block">→</span>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section label="03 · Play it" title="Watch the lap yourself">
        <div data-reveal className="flex flex-col items-start gap-5">
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2">
            Click the replay to play or pause, and drag the bar at the bottom to scrub. Once it&apos;s focused: ← → to
            skip, 1–4 for speed, C to change the track colour, P to save an image. Best on a laptop.
          </p>
          <a
            href="/lap-replay/index.html"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] hover:border-ink"
          >
            <Maximize2 className="h-4 w-4" /> Open full screen
          </a>
        </div>
      </Section>

      {/* Full width, so the replay has room for its telemetry panel */}
      <div data-reveal className="relative -mt-4 mb-14 aspect-[4/3] overflow-hidden rounded-[8px] border border-line bg-[#0d0d10] md:aspect-[16/10]">
        <iframe
          src="/lap-replay/index.html"
          title="Lap Replay, interactive p5.js sketch"
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="fullscreen"
        />
      </div>

      <Section label="04 · Process" title="How I built it, in five stages">
        <ol className="space-y-0">
          {process.map((s, i) => (
            <li
              key={s.t}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 first:pt-0"
            >
              <span className="font-mono text-[13px] text-accent">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <figure data-reveal className="mt-10">
          <div className="aspect-[16/10] overflow-hidden rounded-[8px] bg-[#0d0d10]">
            <ProjectMedia
              src="/images/projects/lap-replay-heatmap.jpg"
              type="image"
              alt="Verstappen's lap as a speed heatmap: slow corners in blue, fast straights in red"
            />
          </div>
          <figcaption className="mt-3 text-[14px] text-muted">
            Stage 4: Verstappen&apos;s lap as a speed heatmap. Any frame can be saved as a poster.
          </figcaption>
        </figure>
      </Section>

      <Section label="05 · Outcome" title="What the data showed">
        <div className="grid gap-px overflow-hidden rounded-[8px] border border-line bg-line sm:grid-cols-2">
          {findings.map((f, i) => (
            <div
              key={f.small}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="bg-paper p-6"
            >
              <p className="font-display text-4xl font-semibold tracking-[-0.03em]">{f.big}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.small}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Verstappen leads for almost the entire lap. Hamilton claws back time early on, then Verstappen rebuilds the gap
          through the middle and final sectors.
        </p>
      </Section>

      <Section label="06 · Reflection" title="What I learned">
        <div className="grid gap-8 sm:grid-cols-3">
          {learnings.map((l, i) => (
            <div key={l.t} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }} className="border-t border-ink pt-4">
              <h3 className="font-display text-lg font-semibold leading-snug">{l.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{l.d}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-10 max-w-2xl text-[15px] leading-relaxed text-muted">
          Built with an AI-assisted workflow (Claude Code). The decisions about what to compare, how to show it and which
          data to trust were mine. Next, I&apos;d like to project this replay onto a physical model of the track.
        </p>
      </Section>

      <Link
        href={`/projects#${next.slug}`}
        className="pop glow group mt-6 flex items-end justify-between gap-6 rounded-[10px] border border-white/5 bg-night p-8 md:p-12 text-day"
      >
        <div>
          <p className="label text-day/50!">Next project</p>
          <p className="mt-3 font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-accent">
            {next.title}
          </p>
        </div>
        <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </article>
  );
}
