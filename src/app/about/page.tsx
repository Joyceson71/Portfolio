"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen px-6 pt-32 pb-24 max-w-4xl mx-auto flex flex-col justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-8"
      >
        I am Joyceson.
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-white/70 text-lg leading-relaxed max-w-2xl space-y-6"
      >
        <p>
          I am a 3D web designer and creative developer focused on crafting immersive, spatial experiences for the modern web.
        </p>
        <p>
          My expertise lies at the intersection of design and engineering—utilizing WebGL, Three.js, and advanced motion libraries to turn flat interfaces into living, breathing digital worlds.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="dark-card p-8"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Capabilities</h2>
          <ul className="space-y-4">
            {["3D Web Experiences", "Creative Direction", "Motion Design", "Shader Programming"].map(s => (
              <li key={s} className="text-white text-sm font-medium">{s}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="dark-card p-8"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {["Three.js", "React Three Fiber", "WebGL", "GLSL", "GSAP", "Next.js", "Blender"].map(t => (
              <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/70">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
