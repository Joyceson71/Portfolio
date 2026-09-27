"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const projects = [
  {
    id: 1,
    idx: "01",
    title: "Kings LMS",
    category: "web",
    desc: "A digital learning platform with virtual classrooms, smart attendance, assignment tracking, and student analytics dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    color: "#818cf8", // indigo
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
  },
  {
    id: 2,
    idx: "02",
    title: "Quiz Arena",
    category: "web",
    desc: "Real-time quiz platform with live scoring, global leaderboards, and a full admin management dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop",
    color: "#fbbf24", // amber
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
  },
  {
    id: 3,
    idx: "03",
    title: "SmartBiz",
    category: "ui",
    desc: "Modern business management platform with analytics, invoicing, and a sleek responsive dashboard interface.",
    tech: ["React", "Next.js", "Tailwind", "TypeScript"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    color: "#fb7185", // rose
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
  },
];

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useTransform(useSpring(y, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["8deg", "-8deg"]);
  const rY = useTransform(useSpring(x, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["-8deg", "8deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${p.color}25, transparent 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1600 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        className="ax-card relative overflow-hidden group cursor-pointer rounded-lg"
      >
        {/* Spotlight */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background: spotlight }} />
        
        {/* Index badge */}
        <div className="absolute top-5 left-5 z-20 font-mono text-[10px] tracking-widest uppercase opacity-80" style={{ color: p.color }}>
          {p.idx}
        </div>

        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden border-b border-border" style={{ transform: "translateZ(20px)" }}>
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          />
          {/* Color wash */}
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay"
            style={{ background: `linear-gradient(135deg, ${p.color}, transparent)` }}
          />
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
          />
        </div>

        {/* Content */}
        <div className="p-7 relative z-10" style={{ transform: "translateZ(30px)" }}>
          <h3 className="font-heading font-black text-xl text-foreground mb-3 transition-colors duration-300" style={{ color: "var(--foreground)" }}>
            <span className="group-hover:text-primary transition-colors">{p.title}</span>
          </h3>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-6">
            {p.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {p.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 border border-border text-muted-foreground"
                style={{ borderColor: `${p.color}30`, color: p.color }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-5 pt-4 border-t border-border">
            <a href={p.demo} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link">
              <ExternalLink className="w-3.5 h-3.5" /> Live
            </a>
            <a href={p.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <FaGithub className="w-3.5 h-3.5" /> Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<"all"|"web"|"ui">("all");
  const filtered = projects.filter(p => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="relative w-full min-h-screen py-32 md:py-40 overflow-hidden">
      <span className="ax-num left-[-2vw] bottom-[5%]">04</span>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="ax-label mb-16"
        >
          Selected Work
        </motion.div>

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] tracking-tight text-foreground"
          >
            Work that<br />
            <span className="text-brand">ships.</span>
          </motion.h2>

          {/* Filter pills */}
          <div className="flex gap-2 border border-border p-1 rounded-sm">
            {(["all", "web", "ui"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 transition-all duration-200"
                style={{ color: filter === f ? "var(--bg)" : "var(--muted-foreground)" }}
              >
                {filter === f && (
                  <motion.div
                    layoutId="filterBg"
                    className="absolute inset-0 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f === "all" ? "All" : f === "web" ? "Web" : "UI/UX"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
