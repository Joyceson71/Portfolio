"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ChevronRight, Box, Globe, Zap, Layers } from "lucide-react";

const projects = [
  {
    id: 1,
    slug: "cosmos-brand",
    title: "Cosmos Brand Site",
    category: "3D Web Experience",
    tags: ["Three.js", "Next.js", "GLSL"],
    desc: "Award-winning brand website featuring real-time particle systems, custom GLSL shaders, and scroll-driven 3D animations.",
    longDesc: [
      "Built a fully custom WebGL rendering pipeline with 2M+ particle simulations running at 60fps.",
      "Wrote custom vertex/fragment GLSL shaders for nebula-like effects that respond to user mouse movement.",
      "Implemented scroll-driven camera paths using GSAP ScrollTrigger and Lenis smooth scroll.",
      "Won Awwwards Site of the Day within 24 hours of launch.",
    ],
    tech: ["Three.js", "GSAP", "GLSL", "Next.js 16", "Lenis", "TypeScript"],
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
    demo: "https://cosmos.design",
    github: "https://github.com/joyceson71",
    icon: Box,
    accentColor: "#a855f7",
  },
  {
    id: 2,
    slug: "fluid-studio",
    title: "Fluid Studio",
    category: "Interactive Art Direction",
    tags: ["WebGL", "Spline", "Framer"],
    desc: "A digital art gallery where visitors walk through 3D rooms showcasing generative artwork powered by WebGL.",
    longDesc: [
      "Designed and coded an immersive first-person navigation system entirely in Three.js.",
      "Procedurally generated artwork using noise functions and GPU-based compute passes.",
      "Integrated Spline 3D models as interactive objects that visitors can rotate and explore.",
      "Built custom post-processing pipeline: bloom, depth of field, and chromatic aberration.",
    ],
    tech: ["React Three Fiber", "Drei", "Postprocessing", "Spline", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    demo: "https://fluid.studio",
    github: "https://github.com/joyceson71",
    icon: Globe,
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    slug: "neon-fintech",
    title: "Neon Fintech Dashboard",
    category: "UI/UX + Motion Design",
    tags: ["Figma", "Next.js", "GSAP"],
    desc: "Next-gen fintech dashboard with 3D data visualizations, real-time chart morphing, and a dark-mode-first design system.",
    longDesc: [
      "Designed a 40-component design system in Figma with 3D perspective cards and depth layers.",
      "Implemented Chart.js with custom 3D CSS transforms for a genuine depth effect on flat data.",
      "All chart transitions animated with GSAP with spring physics for a tactile, physical feel.",
      "Lighthouse performance score: 100/100 across all categories.",
    ],
    tech: ["Next.js", "TypeScript", "GSAP", "Chart.js", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    demo: "https://neon.finance",
    github: "https://github.com/joyceson71",
    icon: Zap,
    accentColor: "#f59e0b",
  },
  {
    id: 4,
    slug: "ethereal-agency",
    title: "Ethereal Agency",
    category: "Creative Agency Site",
    tags: ["Three.js", "GSAP", "ScrollTrigger"],
    desc: "Full creative agency website with scroll-hijacked 3D sequences, morphing typography, and GPU-accelerated background scenes.",
    longDesc: [
      "Built a custom scroll engine that maps scroll position to 3D camera animation curves.",
      "Text morphing effects using Troika Three Text with animated vertex displacement.",
      "Landing sequence features 500k+ particle system representing agency's global reach.",
      "Entire site accessible at AAA WCAG level despite heavy 3D usage.",
    ],
    tech: ["Three.js", "GSAP ScrollTrigger", "Troika Text", "Lenis", "TypeScript"],
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
    demo: "https://ethereal.agency",
    github: "https://github.com/joyceson71",
    icon: Layers,
    accentColor: "#ec4899",
  },
];

export function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <section id="work" className="w-full px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-label"
      >
        Selected Work
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 text-lg mb-16 max-w-xl"
      >
        A curated selection of immersive 3D web experiences and creative digital work.
      </motion.p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: project list */}
        <div className="lg:w-[380px] flex flex-col gap-3 shrink-0">
          {projects.map((p, i) => {
            const Icon = p.icon;
            const isActive = activeId === p.id;
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActiveId(p.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "border-purple-500/40 bg-purple-500/8"
                    : "border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                }`}
                style={
                  isActive
                    ? { boxShadow: `0 0 30px ${p.accentColor}20` }
                    : {}
                }
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${p.accentColor}18`,
                      border: `1px solid ${p.accentColor}30`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: p.accentColor }} />
                  </div>
                  <div>
                    <div
                      className={`text-sm font-bold transition-colors ${
                        isActive ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {p.title}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-medium">{p.category}</div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ml-auto transition-transform ${
                      isActive ? "translate-x-1 text-purple-400" : "text-zinc-600"
                    }`}
                  />
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{p.desc}</p>
                <div className="flex gap-1.5 flex-wrap mt-3">
                  {p.tags.map((t) => (
                    <span key={t} className="badge badge-purple !text-[10px] !py-0.5 !px-2">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right: detail panel */}
        <div className="flex-1 min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="card h-full flex flex-col overflow-hidden"
              style={{ borderColor: `${active.accentColor}25` }}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80 shrink-0 overflow-hidden">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="project-overlay" />

                {/* Overlay info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="badge !text-[11px]"
                      style={{
                        background: `${active.accentColor}18`,
                        borderColor: `${active.accentColor}40`,
                        color: active.accentColor,
                      }}
                    >
                      {active.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">{active.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-7 flex flex-col">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
                  Project Overview
                </h4>
                <ul className="space-y-3 mb-7 flex-1">
                  {active.longDesc.map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-[10px] font-bold"
                        style={{ background: `${active.accentColor}20`, color: active.accentColor }}
                      >
                        {i + 1}
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {active.tech.map((t) => (
                    <span key={t} className="badge !text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-5 border-t border-white/6">
                  <a
                    href={active.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary !py-2.5 !px-5 !text-sm flex-1 justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Site
                  </a>
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost !py-2.5 !px-5 !text-sm flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
