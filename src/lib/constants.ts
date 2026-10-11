// ─────────────────────────────────────────────────────────────
//  WEB-VERSE PORTFOLIO — Central content constants
//  All content lives here; sections import from this file.
// ─────────────────────────────────────────────────────────────

export type SectionId =
  | "hero"
  | "origins"
  | "arsenal"
  | "work"
  | "credentials"
  | "timeline"
  | "reviews"
  | "contact";

export type SkinMode = "classic" | "miles" | "venom" | "iron";

export type FilterId = "all" | "web app" | "ui/ux" | "3d" | "3d lab";

// ── Skins ──────────────────────────────────────────────────────
export const SKINS: Record<
  SkinMode,
  {
    label: string;
    tag: string;
    primary: string;
    accent: string;
    glow: string;
    bloomTint: string;
    chromaticOffset: number;
  }
> = {
  classic: {
    label: "Classic Peter",
    tag: "Crimson & Web",
    primary: "#CC0000",
    accent: "#0047FF",
    glow: "#CC0000",
    bloomTint: "#CC0000",
    chromaticOffset: 0.0007,
  },
  miles: {
    label: "Miles Morales",
    tag: "Stealth Bio-Shock",
    primary: "#9900ff",
    accent: "#CC0000",
    glow: "#6600ff",
    bloomTint: "#6600ff",
    chromaticOffset: 0.0012,
  },
  venom: {
    label: "Venom",
    tag: "Symbiote Override",
    primary: "#ffffff",
    accent: "#222222",
    glow: "#aaaaaa",
    bloomTint: "#333333",
    chromaticOffset: 0.0018,
  },
  iron: {
    label: "Iron Spider",
    tag: "Stark Nanotech",
    primary: "#CC0000",
    accent: "#eab308",
    glow: "#ff8800",
    bloomTint: "#ff6600",
    chromaticOffset: 0.0006,
  },
};

// ── Navigation ─────────────────────────────────────────────────
export const NAV_LINKS: { label: string; href: string; section: SectionId }[] = [
  { label: "Origins", href: "#origins", section: "origins" },
  { label: "Arsenal", href: "#arsenal", section: "arsenal" },
  { label: "Work", href: "#work", section: "work" },
  { label: "Credentials", href: "#credentials", section: "credentials" },
  { label: "Timeline", href: "#timeline", section: "timeline" },
  { label: "Reviews", href: "#reviews", section: "reviews" },
  { label: "Contact", href: "#contact", section: "contact" },
];

// ── Hero titles ────────────────────────────────────────────────
export const HERO_TITLES = [
  "FULL-STACK DEVELOPER",
  "3D WEB DESIGNER",
  "CREATIVE TECHNOLOGIST",
  "WEBGL ENGINEER",
];

// ── Projects ───────────────────────────────────────────────────
export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  filter: FilterId;
  tagline: string;
  desc: string;
  tech: string[];
  demo: string;
  github: string;
  year: string;
  metrics: string;
  architecture: string[];
  highlights: string[];
}

export const PROJECTS: ProjectDetail[] = [
  {
    id: 1,
    title: "Kings LMS",
    category: "Web App",
    filter: "web app",
    tagline: "Enterprise Digital Learning Platform",
    desc: "Full-stack LMS engineered for high-concurrency academic institutions. Features live virtual lectures, automated biometric attendance, role-based access control, and student performance predictive analytics — backed by PostgreSQL with Prisma ORM.",
    tech: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Resend"],
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
    year: "2025",
    metrics: "2.4k+ Active Students · 99.8% Uptime",
    architecture: [
      "Next.js 16 App Router with React 19 Server Actions for zero-latency form mutations",
      "PostgreSQL connection pooling via Prisma with strict foreign key constraints and zero-downtime migrations",
      "Sub-50ms response times on grading submissions using edge caching + CDN strategies",
    ],
    highlights: [
      "Designed role-based access matrix separating Students, Faculty, and Administrators",
      "Integrated automated PDF report card and invoice generation pipelines",
      "Zero-downtime database migrations with automated schema rollback guards",
    ],
  },
  {
    id: 2,
    title: "Quiz Arena",
    category: "Web App",
    filter: "web app",
    tagline: "Real-Time Multiplayer Combat Quiz",
    desc: "Low-latency multiplayer trivia battleground built on WebSockets and Node.js, featuring live socket-synchronized rounds, instant leaderboard sorting, and a custom question creation suite. Anti-cheat timer sync prevents client-side manipulation.",
    tech: ["React", "Node.js", "MongoDB", "WebSockets", "JWT", "Tailwind CSS"],
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
    year: "2024",
    metrics: "<30ms Latency · Live WebSockets",
    architecture: [
      "Bi-directional WebSocket streaming enabling simultaneous 500+ participant quiz sync",
      "In-memory Redis cache for millisecond leaderboard scoring calculation",
      "Stateless JWT auth tokens with automatic token rotation",
    ],
    highlights: [
      "Custom anti-cheat timer synchronization preventing client-side clock tampering",
      "Interactive audio feedback and dynamic particle confetti animations",
      "Admin analytics panel displaying question drop-off rates and difficulty tiers",
    ],
  },
  {
    id: 3,
    title: "SmartBiz OS",
    category: "UI/UX",
    filter: "ui/ux",
    tagline: "Executive Financial & Analytics Engine",
    desc: "Modern operational cockpit for growth businesses, providing cashflow visualizers, automated tax calculations, and one-click PDF invoice dispatching. Built with a modular design system achieving a perfect 100 Lighthouse score.",
    tech: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS", "Docker"],
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
    year: "2024",
    metrics: "100 Lighthouse Score · Zero Layout Shift",
    architecture: [
      "Strict client-side memoization preventing unneeded re-renders on financial charts",
      "Modular design system with reusable typography, button tokens, and card containers",
      "Optimistic UI updates delivering immediate tactile feedback on invoice creation",
    ],
    highlights: [
      "Dynamic dark-mode and custom high-contrast accessibility color palettes",
      "Exportable CSV/Excel transaction history with instantaneous data aggregation",
      "Seamless mobile responsive viewports tested across 15+ real hardware configurations",
    ],
  },
  {
    id: 4,
    title: "Spider-Verse 3D Web",
    category: "3D & Creative",
    filter: "3d",
    tagline: "WebGL Interactive Canvas Simulation",
    desc: "Mathematical 3D spiderweb geometry simulation built with Three.js, React Three Fiber, and custom GLSL post-processing shaders — responding in real-time to cursor physics with verlet-rope dynamics, bloom, and chromatic aberration.",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "PostProcessing", "WebGL"],
    demo: "#home",
    github: "https://github.com/Joyceson71/Portfolio",
    year: "2025",
    metrics: "60 FPS Stable · GPU Accelerated",
    architecture: [
      "BufferGeometry allocation with dynamic Float32Array coordinates for zero GC overhead",
      "Multi-pass Bloom and Chromatic Aberration post-processing composers",
      "Camera rig with exponential lerp parallax interpolation along CatmullRomCurve3 spline",
    ],
    highlights: [
      "8 articulated spider legs with synchronized rotational oscillation",
      "Mouse-driven point light casting dynamic specular highlights across wireframes",
      "Swarming nanite field simulating orbital particle physics",
    ],
  },
  {
    id: 5,
    title: "GLSL Hologram Playground",
    category: "3D Lab",
    filter: "3d lab",
    tagline: "Custom Vertex & Fragment Shader Sandbox",
    desc: "Real-time WebGL shader lab testing scanline displacement, chromatic aberration noise, and holographic fresnel emission on 3D meshes. Features procedural mathematical noise and real-time uniform manipulation. [TODO: Browser-based live GLSL code editor & audio-reactive uniform binding]",
    tech: ["GLSL", "WebGL", "Three.js", "R3F", "ShaderMaterial"],
    demo: "#home",
    github: "https://github.com/Joyceson71/Portfolio",
    year: "2025",
    metrics: "Custom Shaders · Realtime Uniforms",
    architecture: [
      "Dual-pass render target capturing scene luminance for bloom thresholding",
      "Custom fragment shader evaluating per-pixel sine scanlines and edge fresnel falloff",
      "Vertex displacement driven by mouse distance field with exponential dampening",
    ],
    highlights: [
      "TODO: Interactive GUI controls for scanline frequency and noise speed",
      "TODO: Audio spectrum analyser linking mic input to shader amplitude",
      "GPU-accelerated procedural scanlines with zero CPU overhead",
    ],
  },
  {
    id: 6,
    title: "Verlet Web Physics Sim",
    category: "3D Lab",
    filter: "3d lab",
    tagline: "Kinematic Rope Dynamics & Gravity Simulation",
    desc: "Verlet integration solver simulating dynamic web strands connecting interactive anchor points to the cursor. Features relaxation iterations, tensile stiffness, and gravitational sag. [Integrated live into the portfolio cursor system]",
    tech: ["Canvas2D", "Verlet Physics", "TypeScript", "MathUtils"],
    demo: "#home",
    github: "https://github.com/Joyceson71/Portfolio",
    year: "2025",
    metrics: "20 Nodes · 60 FPS Verlet Solver",
    architecture: [
      "Verlet particle integration: pos = pos + (pos - oldPos) + accel * dt^2",
      "Distance constraint relaxation with multiple solver iterations per frame",
      "Skin-colored quadratic bezier curve interpolation between nodes",
    ],
    highlights: [
      "Interactive cursor anchor responding to mouse movement and clicks",
      "Natural catenary sag under simulated gravitational forces",
      "Zero garbage collection allocations during solver loop",
    ],
  },
  {
    id: 7,
    title: "Nanotech Suit Turntable",
    category: "3D Lab",
    filter: "3d lab",
    tagline: "Interactive 3D Stark Armor Model Viewer",
    desc: "Procedural 3D model viewer featuring orbital drag navigation, wireframe toggle, Stark nanotech metallic shaders, and real-time environment reflection mapping. [TODO: High-poly GLTF asset loader with Draco compression & exploded-part view]",
    tech: ["Three.js", "R3F", "PBR Materials", "Draco"],
    demo: "#home",
    github: "https://github.com/Joyceson71/Portfolio",
    year: "2025",
    metrics: "PBR Metallic · 360° Orbit",
    architecture: [
      "Standard PBR metallic/roughness workflow with custom environment map",
      "Instanced nanite glow particles floating in armor aura",
      "Touch and pointer orbit inertia controls",
    ],
    highlights: [
      "TODO: Exploded assembly animation showing internal nanite circuitry",
      "TODO: Draco mesh compression for sub-500KB asset payload",
      "Instant suit skin shader swap between Stark Gold and Symbiote Black",
    ],
  },
  {
    id: 8,
    title: "Spider-Signal Raytracer",
    category: "3D Lab",
    filter: "3d lab",
    tagline: "Volumetric Spotlight & Particle Burst Engine",
    desc: "Volumetric light cone and upward particle beam simulation lighting the NYC night sky. Features pulsing emissive core, instanced particles, and dynamic spotlight tracking. [Live in portfolio Contact section]",
    tech: ["Three.js", "InstancedMesh", "R3F", "Volumetric Lighting"],
    demo: "#contact",
    github: "https://github.com/Joyceson71/Portfolio",
    year: "2025",
    metrics: "80 Instanced Beams · Volumetric Cone",
    architecture: [
      "Octagonal cone geometry with double-sided additive blending material",
      "Instanced mesh particle burst driven by trigonometric clock phases",
      "Skin-synced spotlight casting dynamic illumination on city buildings",
    ],
    highlights: [
      "Custom emissive pulse cycle synchronized with contact signal status",
      "Instanced matrix transformation without heap allocations",
      "Integrated with Web Audio transmission sound synthesis",
    ],
  },
];

// ── Skills ─────────────────────────────────────────────────────
export type SkillCluster = "frontend" | "creative" | "backend" | "devops";

export interface Skill {
  name: string;
  level: number;
  cluster: SkillCluster;
  color: string;
}

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React 19 & Next.js 16", level: 96, cluster: "frontend", color: "#61dafb" },
  { name: "TypeScript (Strict)", level: 92, cluster: "frontend", color: "#3178c6" },
  { name: "Tailwind CSS v4", level: 95, cluster: "frontend", color: "#38bdf8" },
  { name: "Framer Motion", level: 90, cluster: "frontend", color: "#ff0080" },
  // Creative / 3D
  { name: "Three.js / R3F", level: 86, cluster: "creative", color: "#CC0000" },
  { name: "WebGL & GLSL Shaders", level: 78, cluster: "creative", color: "#9900ff" },
  { name: "GSAP & ScrollTrigger", level: 88, cluster: "creative", color: "#88ce02" },
  // Backend
  { name: "Node.js & REST APIs", level: 84, cluster: "backend", color: "#6cc24a" },
  { name: "PostgreSQL & Prisma", level: 80, cluster: "backend", color: "#336791" },
  { name: "WebSockets & Realtime", level: 76, cluster: "backend", color: "#eab308" },
  { name: "GraphQL", level: 72, cluster: "backend", color: "#e535ab" },
  // DevOps
  { name: "Docker & CI/CD", level: 74, cluster: "devops", color: "#2496ed" },
  { name: "Git & GitHub Actions", level: 88, cluster: "devops", color: "#f05032" },
];

// ── Tech Marquee ───────────────────────────────────────────────
export const TECH_STACK_ROW1 = [
  "React 19", "Next.js 16", "TypeScript", "Three.js", "Tailwind v4",
  "Framer Motion", "Node.js", "WebGL/GLSL", "PostgreSQL", "Prisma",
];
export const TECH_STACK_ROW2 = [
  "Docker", "GraphQL", "WebSockets", "Zustand", "GSAP",
  "Git/CI-CD", "React Three Fiber", "Resend", "Zod", "Vercel",
];

// ── Timeline ───────────────────────────────────────────────────
export interface TimelineEvent {
  year: string;
  title: string;
  sub: string;
  desc: string;
  color: string;
  icon: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2021",
    title: "First Line of Code",
    sub: "Self-Taught Origins",
    desc: "Started programming journey with HTML, CSS, and vanilla JavaScript. Built the first interactive portfolio from scratch, igniting a passion for the web.",
    color: "#CC0000",
    icon: "⚡",
  },
  {
    year: "2022",
    title: "React & the Component Era",
    sub: "Frontend Mastery",
    desc: "Deep-dived into React and modern frontend tooling. Built production-grade UIs with reusable component architectures and responsive design systems.",
    color: "#0047FF",
    icon: "⚛️",
  },
  {
    year: "2023",
    title: "Full-Stack Engineering",
    sub: "Backend & Databases",
    desc: "Expanded into Node.js, PostgreSQL, Prisma, and REST API design. Shipped multi-tenant SaaS products with role-based auth and production CI/CD pipelines.",
    color: "#6cc24a",
    icon: "🗄️",
  },
  {
    year: "2024",
    title: "3D & WebGL Frontier",
    sub: "Three.js & Creative Code",
    desc: "Discovered Three.js and React Three Fiber. Mastered GLSL shader programming, post-processing pipelines, and physics-driven cursor interactions.",
    color: "#9900ff",
    icon: "🌐",
  },
  {
    year: "2025",
    title: "The Web-Verse Era",
    sub: "Full-Stack · 3D Designer · Available",
    desc: "Building at the intersection of full-stack engineering and 3D design — architecting immersive, production-ready web experiences that push the limits of the browser.",
    color: "#eab308",
    icon: "🕷️",
  },
];

// ── Reviews ────────────────────────────────────────────────────
export interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  date: string;
  headline: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Product Lead",
    company: "TechCorp",
    headline: "WEB-VERSE ENGINEER STUNS INDUSTRY",
    quote: "Joyceson delivered a 3D interactive dashboard that left the entire product team speechless. The attention to animation detail and full-stack architecture was leagues ahead of what we expected.",
    rating: 5,
    date: "Sept 2025",
  },
  {
    id: 2,
    name: "Marcus R.",
    role: "CTO",
    company: "StartupOS",
    headline: "FULL-STACK SPEED MEETS 3D CREATIVITY",
    quote: "From API design to GLSL shaders in the same sprint. Joyceson is a rare engineer who bridges back-end rigor with front-end artistry. The Kings LMS shipped on time and under budget.",
    rating: 5,
    date: "Aug 2025",
  },
  {
    id: 3,
    name: "Priya N.",
    role: "UX Director",
    company: "DesignLab",
    headline: "ANIMATIONS THAT DEFY REALITY",
    quote: "Working with Joyceson was like having a creative director and a systems engineer in one. Every micro-interaction was intentional and the performance stayed at 60 FPS throughout.",
    rating: 5,
    date: "Jun 2025",
  },
];

// ── Cluster positions for StackGraph (local 3D coords) ─────────
export const CLUSTER_CENTERS: Record<SkillCluster, [number, number, number]> = {
  frontend: [-3, 2, 0],
  creative: [3, 2, 0],
  backend: [-3, -2, 0],
  devops: [3, -2, 0],
};
