import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: { absolute: "About Harsh Alambain | Interaction Designer, Ahmedabad" },
  description:
    "About Harsh Alambain: B.Des Interaction & Communication Design student at Anant National University, freelance web designer and co-founder of the Anant Motorsports Club.",
};

const timeline = [
  {
    when: "July 2026 – Present",
    what: "Freelance Web Designer & Developer",
    where: "Self-employed, Ahmedabad",
    body: "Designing and developing animated, interactive websites for local businesses, including deployment, SEO, penetration testing and fixes to existing sites.",
  },
  {
    when: "July 2026 – Present",
    what: "Co-founder, Anant Motorsports Club",
    where: "Anant National University",
    body: "Co-founded a student club hosting race screenings on campus (3+ so far). I run the club's Instagram, design screening posters and help with promotions.",
  },
  {
    when: "2024 – 2028 (Expected)",
    what: "B.Des, Interaction & Communication Design",
    where: "Anant National University, Ahmedabad",
    body: "Relevant coursework: Website Development, Creative Coding, User Interface Design (Figma), Communication Design, Physical Computing.",
  },
  {
    when: "2024",
    what: "Class XII, Humanities",
    where: "Bhartiya Vidya Bhavan Vidyashram, Jaipur · CBSE",
    body: "",
  },
];

const skills = [
  { group: "Design", items: ["Figma", "Adobe Illustrator", "Adobe InDesign", "Canva"] },
  { group: "Familiar with", items: ["Blender", "Photoshop", "Premiere Pro", "After Effects"] },
  { group: "Creative tech", items: ["TouchDesigner", "Arduino", "p5.js"] },
  { group: "Web", items: ["Web design & development", "Tailwind CSS", "Deployment", "SEO", "Penetration testing"] },
  { group: "AI development", items: ["Cursor", "Claude Code", "Codex", "Google Antigravity"] },
  {
    group: "AI creative",
    items: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Hermes", "Higgsfield", "ElevenLabs", "Google Flow"],
  },
];

const interests = ["Projection mapping", "Interactive installations", "Physical computing", "Motorsports", "Typography"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-10 pt-32 md:pt-40 pb-24">
      <p className="label">About</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.5rem,6.4vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
        I like making things people can touch, play with and respond to.
      </h1>

      <div className="mt-16 grid gap-12 border-t border-line pt-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6 text-[18px] leading-relaxed text-ink-2" data-reveal>
          <p>
            I&apos;m Harsh, an Interaction &amp; Communication Design student at Anant National University in Ahmedabad,
            originally from Jaipur.
          </p>
          <p>
            My work sits between physical objects, technology and visual design. I&apos;ve turned water-filled glasses
            into a playable instrument, built browser games around the tension of an F1 race start, and designed identity
            systems built on typography and the grid.
          </p>
          <p>
            Alongside my degree, I design and develop websites for local businesses, which has taught me to balance
            craft with what a real client needs. I work with an AI-assisted workflow, using tools like Cursor and Claude
            Code to move from idea to working prototype quickly.
          </p>
          <p>
            Next, I want to take interaction off the screen and into space, starting with projection mapping and
            larger-scale interactive installations.
          </p>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" data-reveal>
          <dl className="divide-y divide-line border-y border-line text-[15px]">
            {[
              ["Based in", "Ahmedabad & Jaipur, India"],
              ["Studying", "B.Des, Year 3"],
              ["Looking for", "Internships in interaction design, UI/UX and creative technology"],
              ["Languages", "English, Hindi"],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <dt className="label pt-0.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener"
            className="pop glow group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-paper"
          >
            Download résumé (PDF)
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </aside>
      </div>

      <section className="mt-24">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em]">Experience &amp; education</h2>
        <ol className="mt-10">
          {timeline.map((t, i) => (
            <li
              key={t.what}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="group grid gap-2 border-t border-line py-7 md:grid-cols-12 md:gap-10"
            >
              <p className="label md:col-span-3 pt-1">{t.when}</p>
              <div className="md:col-span-9">
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {t.what}
                </h3>
                <p className="mt-1 text-[15px] text-muted">{t.where}</p>
                {t.body && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-2">{t.body}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em]">Tools</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <div key={s.group} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="border-t border-ink pt-4">
              <h3 className="label">{s.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full border border-line px-3 py-1 text-[14px] transition-colors hover:border-ink">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-8">
        <h2 className="label">Interested in</h2>
        <p className="mt-4 font-display text-2xl md:text-4xl font-semibold leading-snug tracking-[-0.02em]">
          {interests.map((it, i) => (
            <span key={it}>
              <span className="transition-colors hover:text-accent">{it}</span>
              {i < interests.length - 1 && <span className="text-line"> / </span>}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}
