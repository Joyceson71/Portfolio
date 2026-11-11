"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import { useStore } from "@/lib/store";
import { spiderAudio } from "@/lib/spider-audio";

export default function AboutPage() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);

  return (
    <main className="w-full min-h-screen px-6 pt-24 pb-24 max-w-4xl mx-auto flex flex-col justify-center text-white">
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
        className="mb-8"
      >
        <div className="web-label mb-3 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[var(--skin-primary,#CC0000)]" />
          <span>Engineer Dossier</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span>I am</span>{" "}
          <span style={{ color: "var(--skin-primary, #CC0000)" }}>Joyceson Danielraj.</span>
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl space-y-6"
      >
        <p>
          I am a full-stack engineer and 3D web technologist focused on crafting immersive, spatial experiences for the modern browser.
        </p>
        <p>
          My craft bridges systems engineering and creative direction — architecting high-performance applications with React 19, Next.js 16, TypeScript, Node.js, and PostgreSQL, while orchestrating real-time 3D environments with Three.js, React Three Fiber, and custom GLSL shaders.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-sm bg-[#0c0c18]/90 border border-white/[0.08] relative"
        >
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--skin-primary,#CC0000)]" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[var(--skin-primary,#CC0000)]" />
            <span>Core Capabilities</span>
          </h2>
          <ul className="space-y-3 font-mono text-xs text-white/80">
            {[
              "Full-Stack Web Architectures (Next.js 16 / React 19)",
              "WebGL Shaders & Three.js 3D Visualizations",
              "Real-Time WebSockets & Streaming AI Applications",
              "Micro-Interactions, GSAP & Framer Motion Physics",
              "Database Architecture (PostgreSQL, Prisma, Supabase)",
            ].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--skin-primary, #CC0000)" }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-sm bg-[#0c0c18]/90 border border-white/[0.08] relative flex flex-col justify-between"
        >
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--skin-accent,#0047FF)]" />
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--skin-accent,#0047FF)]" />
              <span>Tech Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js 16", "React 19", "TypeScript", "Three.js", "R3F",
                "GLSL", "Node.js", "PostgreSQL", "Prisma", "Supabase",
                "Tailwind v4", "Docker", "OpenAI API", "Anthropic API",
              ].map((t) => (
                <span key={t} className="px-3 py-1 rounded-sm bg-white/[0.04] border border-white/10 font-mono text-[11px] text-white/80">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-4">
            <a 
              href="https://github.com/Joyceson71" 
              target="_blank" 
              rel="noreferrer"
              onClick={() => { if (sfxEnabled) spiderAudio.playBlip(750, 0.02); }}
              className="font-mono text-xs text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/joyceson-danielraj" 
              target="_blank" 
              rel="noreferrer"
              onClick={() => { if (sfxEnabled) spiderAudio.playBlip(800, 0.02); }}
              className="font-mono text-xs text-white/50 hover:text-[#0A66C2] flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:joycesondanielraj71@gmail.com" 
              onClick={() => { if (sfxEnabled) spiderAudio.playBlip(850, 0.02); }}
              className="font-mono text-xs text-white/50 hover:text-[var(--skin-primary,#CC0000)] flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
