"use client";

import { motion } from "framer-motion";

const projects = [
  { title: "Cosmos Brand", desc: "WebGL • React", year: "2026" },
  { title: "Fluid Studio", desc: "GLSL • Motion", year: "2025" },
  { title: "Ethereal Agency", desc: "Three.js • GSAP", year: "2025" },
  { title: "Neon Fintech", desc: "UI/UX • Data Viz", year: "2024" },
];

export default function WorkPage() {
  return (
    <main className="w-full min-h-screen px-6 pt-32 pb-24 max-w-5xl mx-auto flex flex-col justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-12"
      >
        Selected Archive.
      </motion.h1>

      <div className="flex flex-col gap-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row md:items-center justify-between p-6 dark-card cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{p.title}</h2>
              <p className="text-white/50 text-sm mt-1 uppercase tracking-widest">{p.desc}</p>
            </div>
            <div className="mt-4 md:mt-0">
               <span className="text-white/30 font-mono text-sm">{p.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
