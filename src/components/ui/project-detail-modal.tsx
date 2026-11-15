"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Sparkles, Layers } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
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

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        spiderAudio.playBlip(600, 0.05);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            spiderAudio.playBlip(600, 0.05);
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="web-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-sm relative bg-[#0c0c18] shadow-2xl border"
          style={{ borderColor: "var(--skin-primary, #CC0000)55" }}
        >
          {/* Close button */}
          <button
            onClick={() => {
              spiderAudio.playBlip(600, 0.05);
              onClose();
            }}
            aria-label="Close project modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
            style={{ borderColor: "var(--skin-primary, #CC0000)40" }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-bold" style={{ color: "var(--skin-primary, #CC0000)" }}>
                PROJECT DOSSIER // 0{project.id}
              </span>
              <span className="web-tag">{project.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="font-mono text-xs mt-1" style={{ color: "var(--skin-accent, #0047FF)" }}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            {project.desc}
          </p>

          {/* Key Metrics */}
          <div className="p-3.5 rounded bg-white/[0.03] border border-white/10 flex items-center gap-2 mb-6 text-xs font-mono text-white/90">
            <Sparkles className="w-4 h-4" style={{ color: "var(--skin-primary, #CC0000)" }} />
            <span>Operational Stat: {project.metrics}</span>
          </div>

          {/* Architecture Highlights */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: "var(--skin-accent, #0047FF)" }}>
              <Cpu className="w-3.5 h-3.5" />
              <span>System &amp; Architectural Strategy</span>
            </div>
            <ul className="space-y-2">
              {project.architecture.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--skin-accent, #0047FF)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Engineering Accomplishments */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: "var(--skin-primary, #CC0000)" }}>
              <Layers className="w-3.5 h-3.5" />
              <span>Core Deliverables</span>
            </div>
            <ul className="space-y-2">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--skin-primary, #CC0000)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Tech Stack */}
          <div className="mb-8 pt-4 border-t border-white/[0.06]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
              Technologies Utilized
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-white/60 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
            {project.demo.startsWith("#") ? (
              <a
                href={project.demo}
                onClick={() => {
                  spiderAudio.playWebShoot();
                  onClose();
                }}
                className="spider-btn text-xs py-2.5 px-6 flex items-center gap-2 cursor-pointer"
              >
                Experience 3D Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => spiderAudio.playWebShoot()}
                className="spider-btn text-xs py-2.5 px-6 flex items-center gap-2 cursor-pointer"
              >
                Launch Live App <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="spider-btn-outline text-xs py-2.5 px-6 flex items-center gap-2 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" /> View Source Code
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
