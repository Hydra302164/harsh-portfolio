import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Harsh Alambain across physical computing, creative coding and visual identity, including the Jal Tarang interactive installation.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-10 pt-32 md:pt-40 pb-24">
      <p className="label">Work · 2025–2026</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
        Physical computing, creative coding and visual identity.
      </h1>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
        Hover over a project to bring it to life, or press play to try the p5.js sketches right here. Filter by
        discipline to focus on what you&apos;re hiring for.
      </p>
      <div className="mt-12">
        <ProjectsIndex />
      </div>
    </div>
  );
}
