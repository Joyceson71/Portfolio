"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Code2, 
  Cpu, 
  Briefcase, 
  Send, 
  ArrowUp,
  Mail,
  FileText,
  Info,
  Award
} from "lucide-react";

import { ScrambleText } from "@/components/ui/scramble-text";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { SpiderRadarHUD } from "@/components/ui/spider-radar";
import { BentoGrid } from "@/components/ui/bento-grid";
import { CareerTimeline } from "@/components/ui/timeline";
import { DailyBugleReviews } from "@/components/ui/daily-bugle";
import { CredentialsSection } from "@/components/ui/credentials";
import { ProjectDetailModal, ProjectDetail } from "@/components/ui/project-detail-modal";
import { SuitSelector, SuitMode } from "@/components/ui/suit-selector";
import { spiderAudio } from "@/lib/spider-audio";

const SpiderScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.SpiderScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#080810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#CC0000] rounded-full border-t-transparent animate-spin" />
          <p className="text-[#CC0000] font-mono text-xs uppercase tracking-widest">
            Calibrating Nanotech Web...
          </p>
        </div>
      </div>
    ),
  }
);

const heroTitles = [
  "FRONTEND ENGINEER",
  "3D WEB ARCHITECT",
  "CREATIVE DEVELOPER",
  "FULL-STACK BUILDER",
];

const projects: ProjectDetail[] = [
  {
    id: 1,
    title: "Kings LMS",
    category: "Web App",
    tagline: "Enterprise Digital Learning Platform",
    desc: "Comprehensive learning management system engineered for high-concurrency academic institutions. Features live virtual lectures, automated biometric attendance, and student performance predictive metrics.",
    tech: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
    year: "2025",
    metrics: "2.4k+ Active Students · 99.8% Uptime",
    architecture: [
      "Next.js 16 App Router with React 19 Server Actions for instantaneous form mutations",
      "PostgreSQL connection pooling via Prisma with strict foreign key constraints",
      "Sub-50ms response times on grading submissions using edge caching strategies"
    ],
    highlights: [
      "Designed role-based access matrix separating Students, Faculty, and Administrators",
      "Integrated automated PDF report card and invoice generation pipelines",
      "Zero-downtime database migrations with automated schema rollback guards"
    ]
  },
  {
    id: 2,
    title: "Quiz Arena",
    category: "Web App",
    tagline: "Real-Time Multiplayer Combat Quiz",
    desc: "Low-latency multiplayer trivia battleground featuring live socket synchronized rounds, instant leaderboard sorting, and custom question creation suite.",
    tech: ["React", "Node.js", "MongoDB", "WebSockets", "Tailwind CSS"],
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
    year: "2024",
    metrics: "<30ms Latency · Live WebSockets",
    architecture: [
      "Bi-directional WebSocket streaming enabling simultaneous 500+ participant quiz sync",
      "In-memory Redis cache for millisecond leaderboard scoring calculation",
      "Stateless JWT auth tokens with automatic token rotation"
    ],
    highlights: [
      "Custom anti-cheat timer synchronization preventing client-side clock tampering",
      "Interactive audio feedback and dynamic particle confetti animations",
      "Admin analytics panel displaying question drop-off rates and difficulty tiers"
    ]
  },
  {
    id: 3,
    title: "SmartBiz OS",
    category: "UI/UX & SaaS",
    tagline: "Executive Financial & Analytics Engine",
    desc: "Modern operational cockpit for growth businesses, providing cashflow visualizers, automated tax calculations, and one-click PDF invoice dispatching.",
    tech: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS"],
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
    year: "2024",
    metrics: "100 Lighthouse Score · Zero Layout Shift",
    architecture: [
      "Strict client-side memoization preventing unneeded re-renders on financial charts",
      "Modular design system with reusable typography, button tokens, and card containers",
      "Optimistic UI updates delivering immediate tactile feedback on invoice creation"
    ],
    highlights: [
      "Dynamic dark-mode and custom high-contrast accessibility color palettes",
      "Exportable CSV/Excel transaction history with instantaneous data aggregation",
      "Seamless mobile responsive viewports tested across 15+ real hardware configurations"
    ]
  },
  {
    id: 4,
    title: "Spider-Verse 3D Web",
    category: "3D & Creative",
    tagline: "WebGL Interactive Canvas Simulation",
    desc: "Mathematical 3D spiderweb geometry simulation built with Three.js and custom GLSL post-processing shaders, responding in real-time to cursor physics.",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "PostProcessing"],
    demo: "#home",
    github: "https://github.com/Joyceson71/Portfolio",
    year: "2025",
    metrics: "60 FPS Stable · GPU Accelerated",
    architecture: [
      "BufferGeometry allocation with dynamic Float32Array coordinates for zero garbage collection overhead",
      "Multi-pass Bloom and Chromatic Aberration post-processing composers",
      "Camera rig with exponential lerp parallax interpolation"
    ],
    highlights: [
      "8 articulated spider legs with synchronized rotational oscillation",
      "Mouse-driven point light casting dynamic specular highlights across wireframes",
      "Swarming nanite field simulating orbital particle physics"
    ]
  },
];

const skills = [
  { name: "React 19 & Next.js 16", level: 96, category: "frontend" },
  { name: "TypeScript (Strict)", level: 92, category: "frontend" },
  { name: "Three.js / React Three Fiber", level: 86, category: "creative" },
  { name: "Tailwind CSS v4 & Vanilla CSS", level: 95, category: "frontend" },
  { name: "Framer Motion & GSAP", level: 90, category: "creative" },
  { name: "Node.js & Express / REST", level: 84, category: "backend" },
  { name: "PostgreSQL & Prisma ORM", level: 80, category: "backend" },
  { name: "WebGL & Post-Processing Shaders", level: 78, category: "creative" },
];

const navLinks = [
  { label: "Origins", href: "#origins" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Work", href: "#work" },
  { label: "Credentials", href: "#credentials" },
  { label: "Timeline", href: "#timeline" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectDetail | null>(null);
  const [suitMode, setSuitMode] = useState<SuitMode>("classic");

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const onScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);

    // Hero title cycler
    const titleInterval = setInterval(() => {
      setHeroTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 3500);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      clearInterval(titleInterval);
    };
  }, []);

  const handleCopyEmail = () => {
    spiderAudio.playBlip(920, 0.08);
    navigator.clipboard.writeText("joycesondanielraj71@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects = selectedFilter === "all"
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <main className="relative w-full bg-[#080810] text-[#e8e8ec] overflow-x-hidden cyber-grid">
      
      {/* ══ TOP SCANLINES ══ */}
      <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-40" />

      {/* ══ NAVBAR ══ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500 ${
          scrolled
            ? "bg-[#080810]/92 backdrop-blur-xl border-b border-[#CC0000]/15 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <Link 
          href="/" 
          onClick={() => spiderAudio.playBlip(800, 0.05)}
          className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#CC0000] shadow-[0_0_8px_#CC0000] group-hover:scale-125 transition-transform" />
          <span>JD</span>
          <span className="text-[#CC0000]">.</span>
          <span className="font-mono text-[9px] text-white/30 hidden sm:inline ml-1 uppercase">
            // Spider-Verse OS
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onMouseEnter={() => spiderAudio.playBlip(700, 0.02)}
              className="text-xs font-mono tracking-wider uppercase text-white/60 hover:text-[#CC0000] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SuitSelector currentSuit={suitMode} onSelectSuit={setSuitMode} />

          <a
            href="#contact"
            onClick={() => spiderAudio.playWebShoot()}
            className="spider-btn text-xs py-2 px-5 hidden sm:inline-flex"
          >
            Launch Web
          </a>
        </div>
      </header>

      {/* ══ HERO SECTION ══ */}
      <section id="home" className="relative w-full min-h-screen overflow-hidden flex items-center pt-20">
        
        {/* Upgraded 3D Spider Canvas */}
        <div className="absolute inset-0 z-0">
          <SpiderScene mouseX={mouse.x} mouseY={mouse.y} />
        </div>

        {/* Cinematic Vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 20%, #080810 85%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to top, #080810 0%, transparent 100%)" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Role Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0c0c18]/85 border border-[#CC0000]/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(204,0,0,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#CC0000] animate-ping" />
              <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                <ScrambleText text={heroTitles[heroTitleIndex]} triggerKey={heroTitleIndex} />
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[10px] text-[#0047FF] tracking-wider uppercase hidden sm:inline">
                Available for Q2/Q3 Roles
              </span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-[clamp(2.8rem,8.5vw,7.5rem)] leading-[0.92] tracking-tight mb-8 max-w-5xl">
              <span className="text-white">Weaving</span>{" "}
              <span className="text-spider">immense</span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-white">digital</span>{" "}
              <span className="text-web">realities.</span>
            </h1>

            {/* Bio intro */}
            <p className="text-white/70 text-base md:text-xl max-w-2xl mb-8 leading-relaxed font-normal">
              I'm <strong className="text-white font-semibold">Joyceson Danielraj</strong> — an engineer crafting high-velocity, 
              three-dimensional web applications. Combining mathematical precision with cinematic motion to construct interfaces that leave lasting impressions.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mb-10 p-4 rounded-sm bg-[#0c0c18]/60 border border-white/[0.06] backdrop-blur-sm">
              <div>
                <span className="font-mono text-xl md:text-2xl font-bold text-white">4+ Yrs</span>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Engineering</p>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2xl font-bold text-[#CC0000]">60 FPS</span>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">WebGL Standard</p>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2xl font-bold text-[#0047FF]">100%</span>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Type Safe</p>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2xl font-bold text-white">15+</span>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Shipped Apps</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                onClick={() => spiderAudio.playWebShoot()}
                className="spider-btn"
              >
                Inspect Vault <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#credentials"
                onClick={() => spiderAudio.playBlip(750, 0.05)}
                className="spider-btn-outline flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-[#CC0000]" />
                View Credentials
              </a>
              <button
                onClick={handleCopyEmail}
                className="font-mono text-xs text-white/60 hover:text-white px-4 py-3 rounded border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                {copiedEmail ? "Copied Email!" : "Copy Direct Email"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-[#CC0000] via-[#0047FF] to-transparent"
          />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em]">
            EXPLORE THE VERSE
          </span>
        </motion.div>
      </section>

      {/* ══ SPIDER-SENSE RADAR HUD BAR ══ */}
      <section className="container mx-auto px-6 md:px-12 max-w-7xl -mt-8 relative z-20">
        <SpiderRadarHUD />
      </section>

      {/* ══ ORIGINS / BENTO GRID SECTION ══ */}
      <section id="origins" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">01</span>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="web-label mb-4">Origins & Matrix</div>
            <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="text-white">Architected for</span>{" "}
              <span className="text-spider">impact.</span>
            </h2>
          </motion.div>

          <BentoGrid />
        </div>
      </section>

      {/* ══ INFINITE TECH ARSENAL MARQUEE ══ */}
      <section id="arsenal" className="relative w-full py-12">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-6">
          <div className="flex items-center justify-between">
            <div className="web-label" style={{ color: "#0047FF" }}>
              <span style={{ background: "#0047FF" }} />
              Active Weapons & Frameworks
            </div>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline">
              SCROLL FOR CONTINUOUS DEPLOYMENT
            </span>
          </div>
        </div>
        <TechMarquee />
      </section>

      {/* ══ FLAGSHIP WORK / MULTIVERSE VAULT ══ */}
      <section id="work" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">02</span>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="web-label mb-4">The Multiverse Vault</div>
              <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
                <span className="text-white">Selected</span>{" "}
                <span className="text-spider">creations.</span>
              </h2>
            </motion.div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["all", "web app", "ui/ux", "3d"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    spiderAudio.playBlip(750, 0.03);
                    setSelectedFilter(filter);
                  }}
                  className={`font-mono text-xs uppercase px-3 py-1.5 rounded transition-all ${
                    selectedFilter === filter
                      ? "bg-[#CC0000] text-white font-bold shadow-[0_0_12px_rgba(204,0,0,0.5)]"
                      : "bg-[#0c0c18] text-white/50 border border-white/10 hover:text-white hover:border-white/30"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => spiderAudio.playBlip(650 + i * 50, 0.03)}
                  className="web-panel group p-6 md:p-8 rounded-sm hover:border-[#CC0000]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#CC0000] via-[#0047FF] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="font-mono text-xs text-[#CC0000] font-bold">
                        0{p.id} // {p.year}
                      </span>
                      <span className="web-tag">{p.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-[#CC0000] transition-colors mb-1">
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs text-[#0047FF] mb-3">{p.tagline}</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">{p.desc}</p>

                    {/* Metrics Badge & Deep Dive CTA */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
                        <Sparkles className="w-3 h-3 text-[#CC0000]" />
                        <span>{p.metrics}</span>
                      </div>
                      <button
                        onClick={() => {
                          spiderAudio.playBlip(800, 0.04);
                          setActiveProjectModal(p);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0047FF] hover:underline"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Architecture Deep-Dive</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06] mb-6">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-white/50 px-2 py-0.5 rounded bg-white/[0.03] border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/60 hover:text-[#CC0000] transition-colors flex items-center gap-1.5 text-xs font-mono"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Prototype</span>
                        </a>
                      </div>
                      <button
                        onClick={() => setActiveProjectModal(p)}
                        className="text-white/30 hover:text-[#CC0000] transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ CREDENTIALS & CERTIFICATIONS (NEW SECTION) ══ */}
      <section id="credentials" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">03</span>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="web-label mb-4">Official Verification</div>
            <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="text-white">Credentials &</span>{" "}
              <span className="text-web">certifications.</span>
            </h2>
          </motion.div>

          <CredentialsSection />
        </div>
      </section>

      {/* ══ TECHNICAL SKILLS ARSENAL ══ */}
      <section id="skills" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">04</span>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="web-label mb-4">Precision Engineering</div>
            <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="text-white">Technical</span>{" "}
              <span className="text-spider">proficiency.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                onMouseEnter={() => spiderAudio.playBlip(780, 0.02)}
                className="group"
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: i % 2 === 0 ? "#CC0000" : "#0047FF" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                
                {/* Meter track */}
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: i % 2 === 0
                        ? "linear-gradient(90deg, #CC0000, #ff4d4d)"
                        : "linear-gradient(90deg, #0047FF, #4d80ff)",
                      boxShadow: `0 0 10px ${i % 2 === 0 ? "#CC0000" : "#0047FF"}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CAREER TIMELINE / WEB TRAJECTORY ══ */}
      <section id="timeline" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">05</span>

        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="web-label mb-4">Web Trajectory</div>
            <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="text-white">Career</span>{" "}
              <span className="text-web">milestones.</span>
            </h2>
          </motion.div>

          <CareerTimeline />
        </div>
      </section>

      {/* ══ THE DAILY BUGLE / MULTIVERSE REVIEWS ══ */}
      <section id="reviews" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">06</span>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="web-label mb-4">Public Reaction</div>
            <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="text-white">What they</span>{" "}
              <span className="text-spider">say.</span>
            </h2>
          </motion.div>

          <DailyBugleReviews />
        </div>
      </section>

      {/* ══ CONTACT / INITIATE CONNECTION ══ */}
      <section id="contact" className="relative w-full py-24 md:py-36 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">07</span>

        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <div className="web-label">Signal Beacon</div>
            </div>
            <h2 className="font-bold text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.9] tracking-tight mb-6">
              <span className="text-white">Fire up a</span>{" "}
              <span className="text-spider">conversation.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Available for high-stakes frontend engineering, Three.js 3D web contracts, and fullstack products.
              Drop a note or shoot an encrypted transmission below.
            </p>
          </motion.div>

          {/* Contact Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="web-panel p-8 md:p-12 text-left rounded-sm"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                spiderAudio.playWebShoot();
                alert("Spider transmission delivered! Joyceson will get back to you shortly.");
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    Your Name // Alias
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Peter Parker / Miles Morales"
                    className="web-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    Frequency // Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="hero@avengers.org"
                    className="web-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Mission Brief // Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your vision, timeline, and tech stack requirements..."
                  className="web-input resize-none"
                />
              </div>

              <button
                type="submit"
                onClick={() => spiderAudio.playWebShoot()}
                className="spider-btn w-full justify-center py-4 flex items-center gap-2"
              >
                Transmit Signal <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>DIRECT DISPATCH: joycesondanielraj71@gmail.com</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-[#CC0000] hover:underline"
              >
                {copiedEmail ? "Copied to Clipboard!" : "Click to Copy Email"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/[0.08] bg-[#06060c] py-12 px-6 md:px-12 relative z-20">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#CC0000]" />
              <span>JOYCESON DANIELRAJ</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Frontend Engineer · Three.js Specialist · React 19 · Next.js 16
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Joyceson71"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => spiderAudio.playBlip(800, 0.02)}
              className="text-white/40 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:joycesondanielraj71@gmail.com"
              onMouseEnter={() => spiderAudio.playBlip(840, 0.02)}
              className="text-white/40 hover:text-[#CC0000] transition-colors flex items-center gap-2 font-mono text-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Transmission</span>
            </a>
          </div>

          <button
            onClick={() => {
              spiderAudio.playWebShoot();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 hover:border-[#CC0000] text-white/60 hover:text-white text-xs font-mono transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#CC0000]" />
          </button>
        </div>
      </footer>

      {/* ══ INTERACTIVE ARCHITECTURAL MODAL ══ */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />

    </main>
  );
}