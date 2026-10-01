"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const SpiderScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.SpiderScene),
  { ssr: false, loading: () => (
    <div className="w-full h-screen bg-[#080810] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#CC0000] rounded-full border-t-transparent animate-spin" />
        <p className="text-[#CC0000] font-mono text-xs uppercase tracking-widest">Loading Web...</p>
      </div>
    </div>
  )}
);

const projects = [
  {
    id: 1,
    title: "Kings LMS",
    category: "Web App",
    desc: "Digital learning platform with virtual classrooms, smart attendance, and student analytics.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
    year: "2025",
  },
  {
    id: 2,
    title: "Quiz Arena",
    category: "Web App",
    desc: "Real-time quiz platform with live scoring, leaderboards, and a full admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
    year: "2024",
  },
  {
    id: 3,
    title: "SmartBiz",
    category: "UI/UX",
    desc: "Business management platform with analytics, invoicing, and a responsive dashboard.",
    tech: ["React", "Next.js", "TypeScript"],
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
    year: "2024",
  },
];

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Three.js / R3F", level: 80 },
  { name: "Framer Motion", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "Tailwind CSS", level: 95 },
  { name: "PostgreSQL", level: 78 },
  { name: "Figma", level: 85 },
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="relative w-full bg-[#080810] overflow-x-hidden">

      {/* ══ NAVBAR ══ */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500 ${scrolled ? "bg-[#080810]/90 backdrop-blur-xl border-b border-[#CC0000]/10" : "bg-transparent"}`}>
        <Link href="/" className="font-bold text-lg text-white tracking-tight">
          JD<span className="text-[#CC0000]">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href="#contact" className="spider-btn hidden md:inline-flex text-xs py-2 px-5">
          Hire Me
        </a>
      </header>

      {/* ══ HERO SECTION ══ */}
      <section id="home" className="relative w-full h-screen overflow-hidden flex items-center">
        
        {/* 3D Spider Web */}
        <div className="absolute inset-0 z-0">
          <SpiderScene mouseX={mouse.x} mouseY={mouse.y} />
        </div>

        {/* Gradient vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, #080810 80%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to top, #080810 0%, transparent 100%)" }} />

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="web-label mb-6">Frontend Engineer · 2024</div>
            <h1 className="font-bold text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight mb-8 max-w-4xl">
              <span className="text-white">Building</span>
              {" "}
              <span className="text-spider">web</span>
              {" "}
              <span className="text-white">
                experi<span className="text-web">ences.</span>
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              I'm <strong className="text-white">Joyceson Danielraj</strong> — a frontend engineer who crafts immersive, 
              three-dimensional web experiences with precision and speed.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#work" className="spider-btn">
                View My Work <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="spider-btn-outline">
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-[#CC0000] to-transparent"
          />
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em]">scroll</span>
        </motion.div>
      </section>

      {/* ══ WORK SECTION ══ */}
      <section id="work" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">02</span>

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="web-label mb-5" style={{ color: "#0047FF" }}>
              <span style={{ background: "#0047FF" }} />
              Selected Projects
            </div>
            <h2 className="font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight">
              <span className="text-white">Work that</span>
              {" "}
              <span className="text-spider">ships.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="web-panel group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 hover:border-[#CC0000]/40 transition-all duration-300"
              >
                <div className="font-mono text-[#CC0000]/40 text-xl font-bold w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-white group-hover:text-[#CC0000] transition-colors">
                      {p.title}
                    </h3>
                    <span className="web-tag">{p.category}</span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed mb-4 max-w-lg">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="font-mono text-[10px] text-white/40 px-2 py-0.5 border border-white/10 rounded-sm uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#CC0000] transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <span className="font-mono text-[10px] text-white/20">{p.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS SECTION ══ */}
      <section id="skills" className="relative w-full py-24 md:py-32 overflow-hidden">
        <span className="web-num right-[-3vw] top-[-2vh]">03</span>

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="web-label mb-5">Technical Arsenal</div>
            <h2 className="font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight">
              <span className="text-white">Sharp</span>
              {" "}
              <span className="text-web">skills.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white/80">{skill.name}</span>
                  <span className="font-mono text-[11px] text-[#CC0000]">{skill.level}%</span>
                </div>
                <div className="h-px w-full bg-white/8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.07 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-0 h-full"
                    style={{ background: i % 2 === 0 ? "#CC0000" : "#0047FF", boxShadow: `0 0 8px ${i % 2 === 0 ? "#CC0000" : "#0047FF"}` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT SECTION ══ */}
      <section id="contact" className="relative w-full py-24 md:py-36 overflow-hidden">
        <span className="web-num left-[-3vw] top-[-2vh]">04</span>

        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="web-label">Let's Build</div>
            </div>
            <h2 className="font-bold text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] tracking-tight mb-6">
              <span className="text-white">Start a</span>
              {" "}
              <span className="text-spider">project.</span>
            </h2>
            <p className="text-white/55 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Open to freelance, full-time roles, and interesting collaborations. 
              If you've got something exciting, let's talk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="web-panel p-8 md:p-12 text-left"
          >
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Name</label>
                  <input type="text" required placeholder="Peter Parker" className="web-input" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Email</label>
                  <input type="email" required placeholder="hero@marvel.com" className="web-input" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Message</label>
                <textarea rows={4} required placeholder="I need a friendly neighborhood dev..." className="web-input resize-none" />
              </div>
              <button type="submit" className="spider-btn w-full justify-center py-4">
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/[0.06] py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-bold text-lg text-white tracking-tight">
          JD<span className="text-[#CC0000]">.</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">
          © 2024 Joyceson Danielraj
        </span>
        <div className="flex gap-4">
          <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
        </div>
      </footer>

    </main>
  );
}