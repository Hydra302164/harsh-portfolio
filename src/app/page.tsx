import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { JalTarang } from "@/components/JalTarang";
import { ProjectMedia } from "@/components/ProjectMedia";
import { LiveDot } from "@/components/LiveDot";
import { EnquiryLink } from "@/components/ContactForm";
import { projects, site, webWork } from "@/data/projects";

const services = [
  { title: "Design & build", body: "Professional, animated, interactive websites for local businesses, from concept to launch." },
  { title: "Deploy & SEO", body: "Going live, set up properly, and easy to find on search engines." },
  { title: "Penetration testing", body: "Checking client sites for security weaknesses before and after launch." },
  { title: "Fix & upgrade", body: "Repairing, redesigning and improving existing business websites." },
];

const practice = [
  {
    n: "01",
    title: "Physical",
    body: "Everyday objects as interfaces: water, glass and touch, sensed by Arduino and answered with sound and light.",
  },
  {
    n: "02",
    title: "Screen",
    body: "Interactive sketches, small games and websites where motion and feedback make the interaction feel alive.",
  },
  {
    n: "03",
    title: "Visual",
    body: "Identity systems and layouts built on typography and the grid, designed to hold together across formats.",
  },
];

const now = [
  { k: "Studying", v: "B.Des, Interaction & Communication Design, Anant National University (Year 3)" },
  { k: "Freelancing", v: "Designing and developing websites for local businesses, since July 2026" },
  { k: "Leading", v: "Co-founder of the Anant Motorsports Club, running race screenings on campus" },
  { k: "Exploring", v: "Projection mapping and larger-scale interactive installations" },
];

export default function Home() {
  const featured = projects.find((p) => p.slug === "jal-tarang")!;
  const rest = projects.filter((p) => p.featured && p.slug !== "jal-tarang");

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-5 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="inline-flex items-center gap-2 text-[14px] text-ink-2">
              <LiveDot />
              Interaction Designer · Open to internships
            </p>
            <h1
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
              className="mt-6 font-display text-[clamp(2.75rem,7.2vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
            >
              I design interactions you can <span className="text-accent">touch</span>, play and see.
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "160ms" }}
              className="mt-8 max-w-[34rem] text-[17px] md:text-[19px] leading-relaxed text-ink-2"
            >
              I&apos;m Harsh Alambain, an Interaction &amp; Communication Design student at Anant National University.
              I build physical–digital prototypes, interactive web experiences and visual identities, and I design and
              develop websites for local businesses.
            </p>
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "240ms" }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#work"
                className="pop glow group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-paper"
              >
                See selected work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener"
                className="pop inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3.5 text-[15px] hover:border-ink"
              >
                Download résumé
              </a>
            </div>
          </div>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "300ms" }}
            className="lg:col-span-5 rounded-[10px] border border-line bg-paper-2/60 p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between">
              <p className="label">Try it · Jal Tarang</p>
              <p className="label hidden sm:block">Tap a glass or press 1–6</p>
            </div>
            <div className="mt-6">
              <JalTarang />
            </div>
            <Link
              href="/projects/jal-tarang"
              className="mt-6 inline-flex items-center gap-1 text-[14px] text-ink-2 link-underline hover:text-ink"
            >
              How the real installation works
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="mx-auto max-w-[1280px] px-5 md:px-10 pb-24 md:pb-32">
        <div className="flex items-end justify-between border-t border-line pt-8 mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Selected work</h2>
          <Link href="/projects" className="text-[15px] link-underline inline-flex items-center gap-1">
            All projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ProjectCard project={featured} size="large" />

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* CLIENT WORK */}
      <section className="bg-paper-2/70 border-y border-line">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-20 md:py-28 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="label">Client work · July 2026 – present</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.02]">
              Freelance web design &amp; development
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-2">
              I help local businesses get online with websites that feel crafted, not templated: animated, interactive
              and built to work hard for the business.
            </p>
            <EnquiryLink
              topic="Website samples"
              className="pop glow mt-8 inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[15px] hover:border-ink"
            >
              Ask me for more samples <ArrowUpRight className="h-4 w-4" />
            </EnquiryLink>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-line rounded-[8px] overflow-hidden border border-line">
            {services.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="group bg-paper p-6 md:p-8 transition-colors hover:bg-paper-2"
              >
                <p className="label">0{i + 1}</p>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {webWork.map((w) => (
          <div key={w.slug} className="mx-auto max-w-[1280px] px-5 md:px-10 pb-20 md:pb-28">
            <div data-reveal className="grid gap-8 rounded-[10px] border border-white/5 bg-night p-4 md:p-6 text-day lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8 overflow-hidden rounded-[6px] bg-black aspect-[16/9]">
                <ProjectMedia src={w.mediaUrl} type="video" alt={`${w.title} concept website walkthrough`} autoplayInView />
              </div>
              <div className="lg:col-span-4 flex flex-col p-2 md:p-4">
                <p className="label text-day/50!">{w.kind}</p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em]">
                  {w.title}
                  <span className="text-day/40">, {w.place}</span>
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {w.features.map((f) => (
                    <li key={f} className="rounded-full border border-day/20 px-3 py-1 text-[13px] text-day/80">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 text-[13px] leading-relaxed text-day/50">{w.note}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PRACTICE */}
      <section className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-32">
        <h2 data-reveal className="max-w-3xl font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
          One practice across three surfaces: the physical, the screen and the visual.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {practice.map((p, i) => (
            <div
              key={p.n}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="border-t border-ink pt-5"
            >
              <p className="label">{p.n}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOW */}
      <section className="mx-auto max-w-[1280px] px-5 md:px-10 pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 border-t border-line pt-8">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em]">Right now</h2>
            <Link href="/about" className="mt-4 inline-flex items-center gap-1 text-[15px] link-underline">
              More about me <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <dl className="lg:col-span-8 divide-y divide-line">
            {now.map((row, i) => (
              <div
                key={row.k}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="label pt-1">{row.k}</dt>
                <dd className="text-[17px] leading-snug">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
