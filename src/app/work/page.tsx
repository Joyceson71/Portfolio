"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react";
import { PROJECTS, type FilterId, type ProjectDetail } from "@/lib/constants";
import { useStore } from "@/lib/store";
import { spiderAudio } from "@/lib/spider-audio";

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web app", label: "Web Apps" },
  { id: "ui/ux", label: "UI / UX" },
  { id: "3d", label: "3D & WebGL" },
  { id: "3d lab", label: "3D Labs" },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const sfxEnabled = useStore((s) => s.sfxEnabled);

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.filter === activeFilter);

  return (
    <main className="relative w-full min-h-screen bg-[#080810] px-6 md:px-16 py-24 md:py-28 text-white overflow-hidden">
      {/* Background ambient radial gradients */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--skin-primary, #CC0000) 0%, transparent 70%)" }}
      />
      <div 
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--skin-accent, #0047FF) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link 
          href="/" 
          onClick={() => { if (sfxEnabled) spiderAudio.playBlip(700, 0.02); }}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[var(--skin-primary,#CC0000)] transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Base
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="web-label mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[var(--skin-primary,#CC0000)]" />
            <span>Project Archives</span>
          </div>
          <h1 className="font-bold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.9] tracking-tight">
            <span>Engineering &</span>{" "}
            <span style={{ color: "var(--skin-primary, #CC0000)" }}>Deployments.</span>
          </h1>
          <p className="text-white/60 font-mono text-xs md:text-sm mt-4 max-w-2xl leading-relaxed">
            Full-stack web applications, interactive 3D WebGL experiences, and production-grade architectures built with Next.js 16, React 19, and Three.js.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/[0.08]">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (sfxEnabled) spiderAudio.playBlip(isActive ? 600 : 820, 0.02);
                  setActiveFilter(tab.id);
                }}
                className={`font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/15 text-white font-bold border border-white/20 shadow-md"
                    : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                }`}
                style={isActive ? { borderColor: "var(--skin-primary, #CC0000)" } : {}}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p: ProjectDetail, i: number) => {
              const isExternal = p.demo.startsWith("http");
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative p-6 md:p-8 rounded-sm bg-[#0c0c18]/90 border border-white/[0.08] hover:border-[var(--skin-primary,#CC0000)]/60 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle corner reticles */}
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--skin-primary,#CC0000)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--skin-primary,#CC0000)] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        {p.category} · {p.year}
                      </span>
                      <span 
                        className="font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-white/10"
                        style={{ color: "var(--skin-primary, #CC0000)", borderColor: "var(--skin-primary, #CC0000)33" }}
                      >
                        {p.metrics}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--skin-primary,#CC0000)] transition-colors mb-2">
                      {p.title}
                    </h2>
                    <p className="font-mono text-xs text-white/50 mb-4">{p.tagline}</p>
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6">
                      {p.desc}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tech.map((t) => (
                        <span 
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => { if (sfxEnabled) spiderAudio.playBlip(750, 0.02); }}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-white/50 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    <a
                      href={p.demo}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      onClick={() => { if (sfxEnabled) spiderAudio.playWebShoot(); }}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold hover:underline"
                      style={{ color: "var(--skin-primary, #CC0000)" }}
                    >
                      <span>{isExternal ? "Live Demo" : "Inspect In-Scene"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
