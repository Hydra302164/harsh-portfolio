import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JalTarang } from "@/components/JalTarang";
import { ProjectMedia } from "@/components/ProjectMedia";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/jal-tarang" },
  title: "Jal Tarang case study",
  description:
    "An interactive installation reinterpreting the Jal Tarang: six water-filled glasses, sensed by an Arduino Uno and answered with sound and visuals in TouchDesigner.",
};

const facts = [
  { k: "Year", v: "2025" },
  { k: "Context", v: "Physical Computing course" },
  { k: "Team", v: "Group project" },
  { k: "Tools", v: "Arduino Uno, TouchDesigner" },
];

const flow = [
  { n: "01", t: "Touch", d: "A player taps a water-filled glass, closing a low-voltage circuit." },
  { n: "02", t: "Sense", d: "The Arduino Uno detects which glass was touched." },
  { n: "03", t: "Respond", d: "TouchDesigner receives the signal and triggers that glass's note and visuals." },
  { n: "04", t: "Hear & see", d: "Sound and particle visuals answer the tap in real time." },
];

const process = [
  {
    t: "Building the touch circuit",
    d: "Wired the six glasses into a sensing circuit on the Arduino Uno so each vessel could act as its own input.",
  },
  {
    t: "Connecting sound and visuals",
    d: "Linked the Arduino to TouchDesigner, mapping each glass to a note and a burst of particle visuals.",
  },
  {
    t: "Tuning the water",
    d: "Adjusted water levels and touch thresholds glass by glass, balancing reliable sensing with the look of the instrument.",
  },
  {
    t: "Testing with people",
    d: "Watched how people naturally approached and played the glasses, and refined the setup so every tap registered.",
  },
];

const learnings = [
  {
    t: "Familiar objects need no instructions",
    d: "People already know how to tap a glass. Using an everyday object as the interface made the installation instantly approachable.",
  },
  {
    t: "Feedback has to feel immediate",
    d: "Sound and visuals had to answer the touch straight away. Any perceptible delay breaks the feeling of playing an instrument.",
  },
  {
    t: "Physical sensing is noisy",
    d: "Water, skin and wiring all affect the signal. Careful calibration mattered as much as the design itself.",
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

export default function JalTarangPage() {
  const next = projects.find((p) => p.slug === "lap-replay")!;

  return (
    <article className="mx-auto max-w-[1280px] px-5 md:px-10 pt-28 md:pt-36 pb-24">
      <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] text-ink-2 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>

      <header className="mt-10">
        <p className="label" data-reveal>Case study · Physical computing</p>
        <h1
          data-reveal
          className="mt-4 font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
        >
          Jal Tarang
        </h1>
        <p data-reveal className="mt-8 max-w-2xl text-[19px] md:text-[22px] leading-relaxed text-ink-2">
          A centuries-old Indian instrument of water-filled bowls, reimagined as an interactive installation where touching
          the glass plays sound and light.
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

      <div data-reveal className="mt-12 aspect-[16/9] overflow-hidden rounded-[8px] bg-ink">
        <ProjectMedia src="/images/projects/jal-tarang.mp4" type="video" alt="The Jal Tarang installation being played" autoplayInView />
      </div>

      <Section label="01 · Idea" title="Can a traditional instrument become a digital interface?">
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-2 max-w-2xl">
          <p>
            In a traditional Jal Tarang, the amount of water in each bowl sets its pitch. More water, lower note. We kept
            that relationship visible and turned each glass into a touch input, so the instrument still looks and feels
            like itself, but now plays through code.
          </p>
          <p>
            Six glasses map to the notes Sa, Re, Ga, Pa, Dha and Ni (C4 to B4), giving players a familiar scale to play
            with.
          </p>
        </div>
      </Section>

      <Section label="02 · System" title="From a tap to sound and light">
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

      <Section label="03 · Play it" title="Try the scale yourself">
        <div data-reveal className="rounded-[10px] border border-line bg-paper-2/60 p-6 md:p-10">
          <JalTarang variant="full" />
          <p className="mt-8 text-[14px] text-muted">
            A web version of the installation&apos;s scale. Click or tap a glass, or press keys 1–6.
          </p>
        </div>
      </Section>

      <Section label="04 · Process" title="How we built it">
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
      </Section>

      <Section label="05 · Outcome" title="Exhibited as a working installation">
        <p data-reveal className="max-w-2xl text-[17px] leading-relaxed text-ink-2">
          The finished installation was exhibited in 2025, with the hardware and software running together so visitors
          could play it for themselves.
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
      </Section>

      <Link
        href={next.hasCaseStudy ? `/projects/${next.slug}` : `/projects#${next.slug}`}
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
