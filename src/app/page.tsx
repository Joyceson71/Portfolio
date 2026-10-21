"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Github, ExternalLink, Sparkles, Send,
  ArrowUp, Mail, Info, Award, Linkedin, MapPin, Menu, X,
} from "lucide-react";

// HUD
import { SkinSwitcher } from "@/components/hud/SkinSwitcher";
import { SfxToggle } from "@/components/hud/SfxToggle";

// Existing UI (shadcn-layer, untouched)
import { ScrambleText } from "@/components/ui/scramble-text";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { SpiderRadarHUD } from "@/components/ui/spider-radar";
import { BentoGrid } from "@/components/ui/bento-grid";
import { CareerTimeline } from "@/components/ui/timeline";
import { DailyBugleReviews } from "@/components/ui/daily-bugle";
import { CredentialsSection } from "@/components/ui/credentials";
import { ProjectDetailModal } from "@/components/ui/project-detail-modal";

// Store & constants
import { useStore } from "@/lib/store";
import { spiderAudio } from "@/lib/spider-audio";
import { NAV_LINKS, HERO_TITLES, PROJECTS, SKILLS, type ProjectDetail } from "@/lib/constants";

// 3D Canvas — ssr:false, wrapped in Suspense
const SceneRoot = dynamic(
  () => import("@/components/canvas/SceneRoot").then((m) => m.SceneRoot),
  { ssr: false, loading: () => null }
);

// ── Skill Bar (replaces old skills section) ──────────────────────
function SkillBar({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs font-bold" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.04 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
            boxShadow: `0 0 10px ${skill.color}`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Skill Cluster metadata ────────────────────────────────────────
const CLUSTER_ICONS: Record<string, string> = {
  frontend: "⚡",
  creative: "🌐",
  backend: "🖥️",
  devops: "🚀",
};
const CLUSTER_LABELS: Record<string, string> = {
  frontend: "Frontend & UI",
  creative: "3D & Creative",
  backend: "Backend & Data",
  devops: "DevOps & Tooling",
};

// ── Project Card ─────────────────────────────────────────────────
function ProjectCard({
  p, i, onOpen,
}: {
  p: ProjectDetail;
  i: number;
  onOpen: (p: ProjectDetail) => void;
}) {
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(650 + i * 50, 0.03); }}
      className="web-panel card-shimmer group p-6 md:p-8 rounded-sm hover:border-[var(--skin-primary,#CC0000)]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--skin-primary,#CC0000)] via-[var(--skin-accent,#0047FF)] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-xs font-bold" style={{ color: "var(--skin-primary,#CC0000)" }}>
            0{p.id} {"//"} {p.year}
          </span>
          <span className="web-tag">{p.category}</span>
        </div>

        <h3 className="text-2xl font-bold text-white group-hover:text-[var(--skin-primary,#CC0000)] transition-colors mb-1">
          {p.title}
        </h3>
        <p className="font-mono text-xs mb-3" style={{ color: "var(--skin-accent,#0047FF)" }}>{p.tagline}</p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{p.desc}</p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
            <Sparkles className="w-3 h-3" style={{ color: "var(--skin-primary,#CC0000)" }} />
            <span>{p.metrics}</span>
          </div>
          <button
            onClick={() => { if (sfxEnabled) spiderAudio.playBlip(800, 0.04); onOpen(p); }}
            className="inline-flex items-center gap-1.5 text-xs font-mono hover:underline"
            style={{ color: "var(--skin-accent,#0047FF)" }}
          >
            <Info className="w-3.5 h-3.5" />
            Architecture Deep-Dive
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06] mb-6">
          {p.tech.map((t) => (
            <span key={t} className="font-mono text-[10px] text-white/50 px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <a href={p.github} target="_blank" rel="noreferrer"
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono">
              <Github className="w-4 h-4" /><span>Code</span>
            </a>
            <a href={p.demo} target="_blank" rel="noreferrer"
              className="text-white/60 hover:text-[var(--skin-primary,#CC0000)] transition-colors flex items-center gap-1.5 text-xs font-mono">
              <ExternalLink className="w-4 h-4" /><span>Live</span>
            </a>
          </div>
          <button onClick={() => onOpen(p)} className="text-white/30 hover:text-[var(--skin-primary,#CC0000)] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────
function ContactForm() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: "" }), // honeypot empty
      });
      const data = await res.json();
      if (!res.ok) { setStatus("error"); setErrorMsg(data.error || "Unknown error."); return; }
      if (sfxEnabled) spiderAudio.playWebShoot();
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }, [form, sfxEnabled]);

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-5xl mb-4">🕷️</div>
        <h3 className="text-2xl font-bold text-white mb-2">Transmission Delivered!</h3>
        <p className="text-white/60 font-mono text-sm">Joyceson will get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            Your Name // Alias
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Peter Parker / Miles Morales"
            className="web-input"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            Frequency // Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="hero@avengers.org"
            className="web-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          Mission Brief // Project Details
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell me about your vision, timeline, and tech stack requirements..."
          className="web-input resize-none"
        />
      </div>

      {status === "error" && (
        <p className="font-mono text-xs text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="spider-btn w-full justify-center py-4 flex items-center gap-2 disabled:opacity-60"
      >
        {status === "sending" ? "Transmitting..." : "Transmit Signal"}
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectDetail | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sfxEnabled = useStore((s) => s.sfxEnabled);

  // Keep spiderAudio mute flag in sync with store
  useEffect(() => { spiderAudio.syncWithStore(sfxEnabled); }, [sfxEnabled]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const onScroll = () => setScrolled(window.scrollY > 60);
    const titleInterval = setInterval(() => {
      setHeroTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
    }, 3500);

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      clearInterval(titleInterval);
    };
  }, []);

  const handleCopyEmail = () => {
    if (sfxEnabled) spiderAudio.playBlip(920, 0.08);
    navigator.clipboard.writeText("joycesondanielraj71@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects =
    selectedFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filter === selectedFilter);

  return (
    <main className="relative w-full bg-[#080810] text-[#e8e8ec] overflow-x-hidden cyber-grid">

      {/* ══ FIXED 3D CANVAS ══ */}
      <div className="scene-canvas" aria-hidden="true">
        <SceneRoot mouseX={mouse.x} mouseY={mouse.y} />
      </div>

      {/* ══ NAVBAR ══ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500 ${
          scrolled
            ? "bg-[#080810]/92 backdrop-blur-xl border-b border-[var(--skin-primary,#CC0000)]/15 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          onClick={() => { if (sfxEnabled) spiderAudio.playBlip(800, 0.05); }}
          className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_var(--skin-primary,#CC0000)] group-hover:scale-125 transition-transform"
            style={{ background: "var(--skin-primary,#CC0000)" }} />
          <span>JD</span>
          <span style={{ color: "var(--skin-primary,#CC0000)" }}>.</span>
          <span className="font-mono text-[9px] text-white/30 hidden sm:inline ml-1 uppercase">
            {"// Web-Verse OS"}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(700, 0.02); }}
              className="text-xs font-mono tracking-wider uppercase text-white/60 hover:text-[var(--skin-primary,#CC0000)] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: "var(--skin-primary,#CC0000)" }} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SfxToggle />
          <SkinSwitcher />
          <a
            href="#contact"
            onClick={() => { if (sfxEnabled) spiderAudio.playWebShoot(); }}
            className="spider-btn text-xs py-2 px-5 hidden sm:inline-flex"
          >
            Signal
          </a>
          {/* Mobile hamburger */}
          <button
            id="mobile-nav-toggle"
            aria-label="Toggle mobile navigation"
            onClick={() => { setMobileNavOpen((v) => !v); if (sfxEnabled) spiderAudio.playBlip(700, 0.03); }}
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] text-white/70 hover:text-white transition-colors"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : (
              <>
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* ══ MOBILE NAV DRAWER ══ */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080810]/96 backdrop-blur-2xl border-b border-[var(--skin-primary,#CC0000)]/20 py-6 px-8 flex flex-col gap-5"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => { setMobileNavOpen(false); if (sfxEnabled) spiderAudio.playBlip(700, 0.02); }}
                className="font-mono text-sm tracking-wider uppercase text-white/70 hover:text-[var(--skin-primary,#CC0000)] transition-colors flex items-center gap-3"
              >
                <span className="w-4 h-px" style={{ background: "var(--skin-primary,#CC0000)" }} />
                {l.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => { setMobileNavOpen(false); if (sfxEnabled) spiderAudio.playWebShoot(); }}
              className="spider-btn text-xs py-2.5 px-5 self-start mt-2"
            >
              Signal
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      <section id="home" className="relative w-full min-h-screen overflow-hidden flex items-center pt-20">
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 20%, #080810 85%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to top, #080810 0%, transparent 100%)" }}
        />

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Role Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0c0c18]/85 border border-[var(--skin-primary,#CC0000)]/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(204,0,0,0.15)]">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ background: "var(--skin-primary,#CC0000)" }} />
              <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                <ScrambleText text={HERO_TITLES[heroTitleIndex]} triggerKey={heroTitleIndex} />
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[10px] tracking-wider uppercase hidden sm:inline" style={{ color: "var(--skin-accent,#0047FF)" }}>
                Available for Q4/Q1 Roles
              </span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-[clamp(2.8rem,8.5vw,7.5rem)] leading-[0.92] tracking-tight mb-8 max-w-5xl">
              <span className="text-white">I build</span>{" "}
              <span className="text-spider">the web,</span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-white">and the</span>{" "}
              <span className="text-web">worlds inside it.</span>
            </h1>

            <p className="text-white/70 text-base md:text-xl max-w-2xl mb-8 leading-relaxed font-normal">
              I&apos;m <strong className="text-white font-semibold">Joyceson Danielraj</strong> — an ECE 3rd-year engineering undergrad, full-stack developer, and 3D designer.
              I architect APIs, databases, and realtime systems by day; and craft immersive WebGL scenes, shaders, and motion by night.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mb-10 p-4 rounded-sm bg-[#0c0c18]/60 border border-white/[0.06] backdrop-blur-sm">
              {[
                { val: "4+ Yrs", label: "Engineering", color: "text-white" },
                { val: "60 FPS", label: "WebGL Standard", color: "text-[var(--skin-primary,#CC0000)]" },
                { val: "100%", label: "Type Safe", color: "text-[var(--skin-accent,#0047FF)]" },
                { val: "15+", label: "Shipped Apps", color: "text-white" },
              ].map(({ val, label, color }) => (
                <div key={label}>
                  <span className={`font-mono text-xl md:text-2xl font-bold ${color}`}>{val}</span>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="#work" onClick={() => { if (sfxEnabled) spiderAudio.playWebShoot(); }} className="spider-btn">
                Inspect Vault <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#credentials" onClick={() => { if (sfxEnabled) spiderAudio.playBlip(750, 0.05); }}
                className="spider-btn-outline flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: "var(--skin-primary,#CC0000)" }} />
                Credentials
              </a>
              <button
                onClick={handleCopyEmail}
                className="font-mono text-xs text-white/60 hover:text-white px-4 py-3 rounded border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                {copiedEmail ? "Copied!" : "Copy Email"}
              </button>
              <a
                href="https://linkedin.com/in/joyceson-danielraj"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(820, 0.03); }}
                className="font-mono text-xs text-white/60 hover:text-[#0A66C2] px-4 py-3 rounded border border-white/10 hover:border-[#0A66C2]/50 transition-all flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-2 mt-2">
              <span className="animate-pin-bounce inline-flex">
                <MapPin className="w-3.5 h-3.5" style={{ color: "var(--skin-primary,#CC0000)" }} />
              </span>
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Chennai, India · Remote Available</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-[var(--skin-primary,#CC0000)] via-[var(--skin-accent,#0047FF)] to-transparent"
          />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em]">EXPLORE THE VERSE</span>
        </motion.div>
      </section>

      {/* ══ SPIDER-SENSE RADAR HUD BAR ══ */}
      <section className="container mx-auto px-6 md:px-12 max-w-7xl -mt-8 relative z-20">
        <SpiderRadarHUD />
      </section>

      {/* ══ ORIGINS / BENTO GRID ══ */}
      <section id="origins" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">01</span>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-14"
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

      {/* ══ ARSENAL MARQUEE ══ */}
      <section id="arsenal" className="relative w-full py-12">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-6">
          <div className="flex items-center justify-between">
            <div className="web-label" style={{ color: "var(--skin-accent,#0047FF)" }}>
              <span style={{ background: "var(--skin-accent,#0047FF)" }} />
              Active Weapons & Frameworks
            </div>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline">
              SCROLL FOR CONTINUOUS DEPLOYMENT
            </span>
          </div>
        </div>
        <TechMarquee />
      </section>

      {/* ══ SKILL PROFICIENCY ══ */}
      <section id="skills" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">03</span>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16"
          >
            <div className="web-label mb-4">Precision Engineering</div>
            <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="text-white">Technical</span>{" "}
              <span className="text-spider">proficiency.</span>
            </h2>
          </motion.div>

          {/* Grouped by cluster */}
          {(["frontend", "creative", "backend", "devops"] as const).map((cluster) => {
            const clusterSkills = SKILLS.filter((s) => s.cluster === cluster);
            if (!clusterSkills.length) return null;
            return (
              <div key={cluster} className="mb-12">
                <div className="skill-cluster-label">
                  <span>{CLUSTER_ICONS[cluster]}</span>
                  <span>{CLUSTER_LABELS[cluster]}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                  {clusterSkills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={SKILLS.indexOf(skill)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ WORK / MULTIVERSE VAULT ══ */}
      <section id="work" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">02</span>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
            >
              <div className="web-label mb-4">The Multiverse Vault</div>
              <h2 className="font-bold text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
                <span className="text-white">Selected</span>{" "}
                <span className="text-spider">creations.</span>
              </h2>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {(["all", "web app", "ui/ux", "3d", "3d lab"] as const).map((f) => (
                <button
                  key={f}
                  id={`filter-${f.replace("/", "-")}`}
                  onClick={() => { if (sfxEnabled) spiderAudio.playBlip(750, 0.03); setSelectedFilter(f); }}
                  className={`font-mono text-xs uppercase px-3.5 py-1.5 rounded transition-all font-semibold ${
                    selectedFilter === f
                      ? "border border-white/20"
                      : "bg-[#0c0c18] text-white/50 border border-white/10 hover:text-white hover:border-white/30"
                  }`}
                  style={
                    selectedFilter === f
                      ? {
                          background: "var(--skin-primary, #CC0000)",
                          color: "var(--skin-btn-text, #ffffff)",
                          boxShadow: "0 0 16px var(--skin-glow, rgba(204,0,0,0.5))",
                        }
                      : {}
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} onOpen={setActiveProjectModal} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ CREDENTIALS ══ */}
      <section id="credentials" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">04</span>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-14"
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

      {/* ══ TIMELINE ══ */}
      <section id="timeline" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">05</span>
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16"
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

      {/* ══ REVIEWS / DAILY BUGLE ══ */}
      <section id="reviews" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">06</span>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-14"
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

      {/* ══ CONTACT / SIGNAL BEACON ══ */}
      <section id="contact" className="relative w-full py-24 md:py-36 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">07</span>
        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <div className="web-label">Signal Beacon</div>
            </div>
            <h2 className="font-bold text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.9] tracking-tight mb-6">
              <span className="text-white">Fire up a</span>{" "}
              <span className="text-spider">conversation.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Available for full-stack engineering, Three.js 3D contracts, and product consulting.
              Drop a note or shoot a transmission below.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="web-panel p-8 md:p-12 text-left rounded-sm"
          >
            <ContactForm />

            <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>DIRECT DISPATCH: joycesondanielraj71@gmail.com</span>
              </span>
              <button onClick={handleCopyEmail} style={{ color: "var(--skin-primary,#CC0000)" }} className="hover:underline">
                {copiedEmail ? "Copied!" : "Click to Copy Email"}
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
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--skin-primary,#CC0000)" }} />
              <span>JOYCESON DANIELRAJ</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Full-Stack Developer · 3D Designer · React 19 · Next.js 16
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer"
              onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(800, 0.02); }}
              className="social-link text-white/40 font-mono text-xs">
              <Github className="w-4 h-4" /><span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/joyceson-danielraj" target="_blank" rel="noreferrer"
              onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(820, 0.02); }}
              className="social-link text-white/40 font-mono text-xs" style={{ "--hover-color": "#0A66C2" } as React.CSSProperties}>
              <Linkedin className="w-4 h-4" /><span>LinkedIn</span>
            </a>
            <a href="mailto:joycesondanielraj71@gmail.com"
              onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(840, 0.02); }}
              className="social-link text-white/40 font-mono text-xs">
              <Mail className="w-4 h-4" /><span>Transmission</span>
            </a>
          </div>

          <button
            onClick={() => {
              if (sfxEnabled) spiderAudio.playWebShoot();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 hover:border-[var(--skin-primary,#CC0000)] text-white/60 hover:text-white text-xs font-mono transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" style={{ color: "var(--skin-primary,#CC0000)" }} />
          </button>
        </div>
      </footer>

      {/* ══ PROJECT DETAIL MODAL ══ */}
      <ProjectDetailModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
    </main>
  );
}