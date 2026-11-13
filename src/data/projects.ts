export type Category = "Physical Computing" | "Creative Coding" | "Visual Identity";

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: Category;
  year: string;
  /** Academic / independent context, kept factual. */
  context: string;
  tools: string[];
  /** One line, used on cards. */
  summary: string;
  /** Short paragraph, used on the projects index. */
  description: string;
  highlights?: string[];
  hasCaseStudy: boolean;
  featured: boolean;
  mediaUrl: string;
  mediaType: "video" | "image";
  /** Live, playable version (p5.js web editor). */
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "jal-tarang",
    number: "01",
    title: "Jal Tarang",
    category: "Physical Computing",
    year: "2025",
    context: "Academic · Physical Computing course · Group project",
    tools: ["Arduino Uno", "TouchDesigner"],
    summary: "A traditional Indian instrument reimagined: tap six water-filled glasses to play sound and visuals.",
    description:
      "An interactive installation that reinterprets the Jal Tarang. Six water-filled glass vessels act as conductive touch inputs, each mapped to a note from Sa to Ni. An Arduino Uno senses each tap and TouchDesigner answers with sound and particle visuals in real time.",
    highlights: [
      "Six vessels mapped to Sa, Re, Ga, Pa, Dha, Ni (C4–B4)",
      "Arduino Uno touch sensing linked to TouchDesigner",
      "Exhibited as a working installation in 2025",
    ],
    hasCaseStudy: true,
    featured: true,
    mediaUrl: "/images/projects/jal-tarang.mp4",
    mediaType: "video",
  },
  {
    slug: "lap-replay",
    number: "02",
    title: "Lap Replay",
    category: "Creative Coding",
    year: "2026",
    context: "Independent · Data visualisation",
    tools: ["p5.js", "OpenF1 API", "Python"],
    summary: "Verstappen vs Hamilton's fastest Singapore laps, replayed from real F1 telemetry to show where 0.348s is won.",
    description:
      "An interactive replay that puts two drivers' fastest-ever laps at Marina Bay on the same track. Both cars move at true speed with live speed, gear and pedal data, the track can be coloured by speed or by who was faster in each of 25 mini-sectors, and a gap graph shows where the time is won and lost.",
    highlights: [
      "Built from real position and telemetry data (OpenF1)",
      "Smooth motion from ~4 readings a second, by modelling distance from speed",
      "Head-to-head gap compared at the same place on track, not the same time",
    ],
    hasCaseStudy: true,
    featured: true,
    mediaUrl: "/images/projects/lap-replay.jpg",
    mediaType: "image",
    liveUrl: "/lap-replay/index.html",
  },
  {
    slug: "motorsports-reaction-game",
    number: "03",
    title: "Reaction Time Game",
    category: "Creative Coding",
    year: "2026",
    context: "Independent",
    tools: ["p5.js"],
    summary: "An F1-style start-light sequence that measures your reaction time in milliseconds.",
    description:
      "A browser game built around the five red lights of a Formula 1 race start. Players wait for the lights to go out and react as fast as they can; audio cues and instant feedback recreate the tension of the grid.",
    hasCaseStudy: false,
    featured: true,
    mediaUrl: "/images/projects/reaction.mp4",
    mediaType: "video",
    liveUrl: "https://editor.p5js.org/Harsh_/full/_2pdXsYMu",
  },
  {
    slug: "interactive-clock",
    number: "04",
    title: "Interactive Clock",
    category: "Creative Coding",
    year: "2025",
    context: "Independent",
    tools: ["p5.js"],
    summary: "Telling time through geometric progression and kinetic typography instead of clock hands.",
    description:
      "An experiment in reading time differently. Hours, minutes and seconds are expressed through growing geometry and moving type, asking how a clock might feel rather than simply what it says.",
    hasCaseStudy: false,
    featured: true,
    mediaUrl: "/images/projects/clock.mp4",
    mediaType: "video",
    liveUrl: "https://editor.p5js.org/Harsh_/full/64PMwveIR",
  },
  {
    slug: "brand-identity",
    number: "05",
    title: "Personal Brand Identity",
    category: "Visual Identity",
    year: "2025",
    context: "Independent",
    tools: ["Illustrator", "InDesign", "Photoshop", "Canva"],
    summary: "A minimalist, typography-led identity system for a designer's personal brand.",
    description:
      "A grid-based visual identity for a designer, built on restrained typography. The system covers the logo and its application across a visiting card, letterhead and billboards.",
    highlights: ["Logo", "Visiting card", "Letterhead", "Billboards"],
    hasCaseStudy: false,
    featured: true,
    mediaUrl: "/images/projects/brand-identity.png",
    mediaType: "image",
  },
  {
    slug: "interactive-soup",
    number: "06",
    title: "Interactive Soup",
    category: "Creative Coding",
    year: "2025",
    context: "Independent",
    tools: ["p5.js"],
    summary: "A fluid-inspired generative sketch you stir with your cursor.",
    description:
      "A generative sketch where mouse gestures stir and reshape an evolving field of shapes and colours, exploring how simple input can produce organic, unpredictable motion.",
    hasCaseStudy: false,
    featured: false,
    mediaUrl: "/images/projects/soup.mp4",
    mediaType: "video",
    liveUrl: "https://editor.p5js.org/Harsh_/full/-daXLuqbT",
  },
  {
    slug: "motorsports-trivia-game",
    number: "07",
    title: "Motorsports Trivia",
    category: "Creative Coding",
    year: "2026",
    context: "",
    tools: ["p5.js"],
    summary: "A quiz game on racing history, aerodynamics and pit-stop strategy.",
    description:
      "A motorsport quiz with a clear question-to-result flow, testing players on racing history, aerodynamics and pit-stop strategy.",
    hasCaseStudy: false,
    featured: false,
    mediaUrl: "/images/projects/trivia.mp4",
    mediaType: "video",
    liveUrl: "https://editor.p5js.org/Harsh_/full/MFsViU3eF",
  },
];

/** Web work shown in the client-work section. Labelled honestly. */
export const webWork = [
  {
    slug: "vince-cafe",
    title: "Vince Café",
    place: "Ahmedabad",
    kind: "Self-initiated concept website",
    note: "Not the café's official site. Built as an example of what I can make for a local business.",
    features: ["Animated hero", "Filterable menu", "Gallery", "Order-online links", "Location & map"],
    mediaUrl: "/images/projects/vince-cafe.mp4",
  },
];

export const categories: Category[] = ["Physical Computing", "Creative Coding", "Visual Identity"];

export const notes = [
  { note: "Sa", western: "C4", hz: 261.63 },
  { note: "Re", western: "D4", hz: 293.66 },
  { note: "Ga", western: "E4", hz: 329.63 },
  { note: "Pa", western: "G4", hz: 392.0 },
  { note: "Dha", western: "A4", hz: 440.0 },
  { note: "Ni", western: "B4", hz: 493.88 },
];

export const site = {
  name: "Harsh Alambain",
  role: "Interaction Designer",
  email: "alambainharsh@gmail.com",
  linkedin: "https://www.linkedin.com/in/harsh-a-513a69246/",
  instagram: "https://instagram.com/harshgt250",
  resume: "/Harsh_Alambain_Resume.pdf",
  url: "https://harsh-portfolio-fawn.vercel.app",
};
