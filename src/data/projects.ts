export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  technology: string[];
  techString: string;
  summary: string;
  description: string;
  slug: string;
  hasCaseStudy: boolean;
  year: string;
  featured: boolean;
  placeholderLabel: string;
  glowColor?: "cyan" | "magenta" | "yellow" | "emerald" | "purple" | "amber";
  mediaUrl: string;
  mediaType: "video" | "image";
  details?: {
    clientOrContext?: string;
    role?: string;
    deliverables?: string[];
    link?: string;
  };
}

export const projects: Project[] = [
  {
    id: "jal-tarang",
    number: "01",
    title: "JAL TARANG (Arduino + TouchDesigner)",
    subtitle: "Physical Computing / Interactive Sound",
    category: "Physical Computing",
    technology: ["Arduino Uno", "TouchDesigner", "Physical Sensors", "Conductive Audio"],
    techString: "Arduino Uno, TouchDesigner",
    summary: "An interactive Jal Tarang installation that turns physical interaction with glass vessels into sound.",
    description: "Reinterpreting the traditional Indian acoustic instrument 'Jal Tarang' into a contemporary physical computing installation. Water-filled glass vessels act as capacitive/conductive inputs, detected via Arduino Uno upon contact with metal chopsticks, triggering generative audio-visual synth patches inside TouchDesigner.",
    slug: "jal-tarang",
    hasCaseStudy: true,
    year: "2024",
    featured: true,
    placeholderLabel: "01 — JAL TARANG INSTALLATION",
    glowColor: "cyan",
    mediaUrl: "/images/projects/jal-tarang.mp4",
    mediaType: "video",
    details: {
      clientOrContext: "Academic Interactive System Architecture",
      role: "Lead Interaction Designer & Hardware Developer",
      deliverables: ["Physical Hardware Circuit", "Arduino Sensor Firmware", "TouchDesigner Sound & Visual Patch", "Exhibition Unit"],
    },
  },
  {
    id: "interactive-soup",
    number: "02",
    title: "INTERACTIVE SOUP (p5.js)",
    subtitle: "Creative Coding",
    category: "Creative Coding",
    technology: ["p5.js", "JavaScript", "HTML5 Canvas", "WebGL"],
    techString: "p5.js",
    summary: "A fluid-dynamics inspired algorithmic simulation where user gestures stir an evolving digital broth of shapes and colors.",
    description: "An experimental creative coding project built with p5.js that models fluid viscosity, particle attraction, and color mixing. Users interact with cursor velocity and click impulses to stir, boil, and reshape dynamic organic soup patterns in real-time.",
    slug: "interactive-soup",
    hasCaseStudy: false,
    year: "2024",
    featured: true,
    placeholderLabel: "02 — INTERACTIVE SOUP VISUAL",
    glowColor: "magenta",
    mediaUrl: "/images/projects/soup.mp4",
    mediaType: "video",
    details: {
      clientOrContext: "Generative Art Experiment",
      role: "Creative Coder",
      deliverables: ["Interactive Canvas", "p5.js Particle System", "Fluid Physics Model"],
    },
  },
  {
    id: "interactive-clock",
    number: "03",
    title: "INTERACTIVE CLOCK (p5.js)",
    subtitle: "Creative Coding",
    category: "Creative Coding",
    technology: ["p5.js", "Mathematical Visualizations", "Custom Algorithms"],
    techString: "p5.js",
    summary: "Reimagining time perception through abstract geometric progression and kinetic typography instead of traditional hands.",
    description: "A digital clock experiment exploring non-standard time visualization. Hours, minutes, and seconds are represented as expanding concentric geometric topographies and harmonic orbital rings, challenging how we feel the passage of time.",
    slug: "interactive-clock",
    hasCaseStudy: false,
    year: "2024",
    featured: true,
    placeholderLabel: "03 — INTERACTIVE CLOCK VISUAL",
    glowColor: "yellow",
    mediaUrl: "/images/projects/clock.mp4",
    mediaType: "video",
    details: {
      clientOrContext: "Time & Perception Exploration",
      role: "Creative Coder / Designer",
      deliverables: ["Kinetic Time System", "p5.js Algorithm", "Custom UI Canvas"],
    },
  },
  {
    id: "motorsports-reaction-game",
    number: "04",
    title: "MOTORSPORTS REACTION TIME GAME (p5.js)",
    subtitle: "Creative Coding",
    category: "Creative Coding",
    technology: ["p5.js", "Microsecond Precision Engine", "Audio Feedback"],
    techString: "p5.js",
    summary: "An F1-inspired starting gantry reaction time test measuring driver reflexes down to the millisecond.",
    description: "Simulates the iconic five-red-lights starting gantry of Formula 1 racing. Players must react instantly when lights go out, testing reaction speed, false-start penalty detection, and telemetry tracking against global driver benchmarks.",
    slug: "motorsports-reaction-game",
    hasCaseStudy: false,
    year: "2023",
    featured: false,
    placeholderLabel: "04 — REACTION GAME TELEMETRY",
    glowColor: "emerald",
    mediaUrl: "/images/projects/reaction.mp4",
    mediaType: "video",
    details: {
      clientOrContext: "Motorsports Interactive Project",
      role: "Game Logic & Visual Designer",
      deliverables: ["Gantry Light Sequence", "Millisecond Timer", "Leaderboard Metrics"],
    },
  },
  {
    id: "motorsports-trivia-game",
    number: "05",
    title: "MOTORSPORTS TRIVIA GAME (p5.js)",
    subtitle: "Creative Coding",
    category: "Creative Coding",
    technology: ["p5.js", "Interactive UI", "State Machine Logic"],
    techString: "p5.js",
    summary: "A high-octane trivia game testing racing history, track aerodynamics, and legendary team pit-stop strategies.",
    description: "A fast-paced interactive quiz game featuring custom vector graphics of iconic racetracks and racing cars. Designed with time-attack rounds, dynamic pit-stop bonus questions, and rich sound effects for racing enthusiasts.",
    slug: "motorsports-trivia-game",
    hasCaseStudy: false,
    year: "2023",
    featured: false,
    placeholderLabel: "05 — TRIVIA GAME UI",
    glowColor: "purple",
    mediaUrl: "/images/projects/trivia.mp4",
    mediaType: "video",
    details: {
      clientOrContext: "Interactive Quiz Application",
      role: "UI/UX & Creative Coder",
      deliverables: ["State Machine Architecture", "p5.js Graphic Interface", "Sound Effects Engine"],
    },
  },
  {
    id: "ronit-oulkar-brand-identity",
    number: "06",
    title: "PERSONAL BRAND IDENTITY — RONIT OULKAR (Graphic Design)",
    subtitle: "Visual Identity",
    category: "Visual Identity",
    technology: ["Graphic Design", "Typography", "Brand Strategy", "Grid Systems"],
    techString: "Graphic Design",
    summary: "A minimalist typography and grid-based visual identity system for creative designer Ronit Oulkar.",
    description: "A comprehensive brand identity project featuring clean modular typography, custom monogram design, print collaterals, digital brand guidelines, and spatial layout rules centered on minimalist aesthetic principles.",
    slug: "ronit-oulkar-brand-identity",
    hasCaseStudy: false,
    year: "2023",
    featured: false,
    placeholderLabel: "06 — BRAND IDENTITY GUIDELINES",
    glowColor: "amber",
    mediaUrl: "/images/projects/brand-identity.png",
    mediaType: "image",
    details: {
      clientOrContext: "Brand Identity Design",
      role: "Visual Identity & Graphic Designer",
      deliverables: ["Logo & Monogram System", "Typography Spec Sheet", "Stationery & Brand Collateral"],
    },
  },
];

export const projectsData = projects;

export const jalTarangCaseStudyData = {
  title: "JAL TARANG (Arduino + TouchDesigner)",
  category: "Physical Computing / Interactive Sound",
  technologyStack: ["Arduino Uno", "TouchDesigner"],
  overview: "An interactive Jal Tarang installation that turns physical interaction with glass vessels into sound.",
  concept: "The project is a digital reinterpretation of Jal Tarang—a traditional South Asian percussion instrument consisting of water-filled ceramic or glass bowls. By transforming ordinary liquid vessels into capacitive and conductive switches, physical touch is digitized into MIDI/serial control signals, mapping physical water levels and taps into atmospheric acoustic and synthesized soundscapes.",
  interaction: "Users hold or tap metal chopsticks connected to a low-voltage sensing network. When a chopstick makes contact with the water or metal edge of a glass vessel, a conductive path is closed. The threshold drop is instantly detected by an Arduino Uno microcontroller, sending ultra-low latency serial packets to TouchDesigner to trigger specific polyphonic pitch layers.",
  flowDiagram: [
    { id: 1, step: "GLASS + METAL CHOPSTICK", role: "Conductive Input Sensor", desc: "User taps glass vessel with metal chopstick to close physical circuit" },
    { id: 2, step: "ARDUINO UNO", role: "Microcontroller / ADC", desc: "Reads analog threshold change & sends serial MIDI signals" },
    { id: 3, step: "TOUCHDESIGNER", role: "Real-time DSP Engine", desc: "Processes serial triggers, generates visuals & triggers audio patch" },
    { id: 4, step: "SOUND OUTPUT (LAPTOP SPEAKER)", role: "Acoustic Output", desc: "Outputs tuned polyphonic Jal Tarang tones in real time" },
  ],
  soundMappings: [
    { glass: "Glass 01", note: "Sa (C4)", frequency: "261.63 Hz", sound: "Resonant Bronze Bowl Sound 01" },
    { glass: "Glass 02", note: "Re (D4)", frequency: "293.66 Hz", sound: "Resonant Water Ripple Sound 02" },
    { glass: "Glass 03", note: "Ga (E4)", frequency: "329.63 Hz", sound: "Harmonic Glass Strike Sound 03" },
    { glass: "Glass 04", note: "Pa (G4)", frequency: "392.00 Hz", sound: "Deep Acoustic Water Sound 04" },
    { glass: "Glass 05", note: "Dha (A4)", frequency: "440.00 Hz", sound: "Ethereal Ambient Synth Sound 05" },
    { glass: "Glass 06", note: "Ni (B4)", frequency: "493.88 Hz", sound: "Crystalline High Chime Sound 06" },
  ],
  processImages: [
    { label: "[ CIRCUIT ]", title: "Breadboard & Resistor Matrix", caption: "Soldering pull-down resistors and capacitive wire harnesses for high sensitivity without false triggers." },
    { label: "[ ARDUINO ]", title: "Serial Firmware & Calibration", caption: "Programming Arduino C++ firmware with noise filtering and debounce algorithms for crisp tap signals." },
    { label: "[ TOUCHDESIGNER ]", title: "Node-based Patching & Audio Engine", caption: "Constructing TouchDesigner CHOPs and OSC sound samplers mapped to dynamic particle visual feedback." },
    { label: "[ TESTING ]", title: "User Ergonomics & Water Level Tuning", caption: "Calibrating water volumes per glass to tune fundamental acoustic frequencies and testing conductivity." },
  ],
  reflection: "Developing Jal Tarang reinforced fundamental interaction design principles at the boundary of physical computing and digital sound synthesis. Key learnings included managing electrical noise in capacitive/conductive sensing, creating intuitive physical affordances with everyday objects (chopsticks & glassware), and ensuring zero perceived latency between tactile contact and acoustic feedback to achieve a natural, bodily interaction loop.",
};
