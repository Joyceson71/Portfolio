"use client";

import { motion } from "framer-motion";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

export default function Home() {
  return (
    <main className="relative w-full min-h-screen px-4 md:px-8 lg:px-12 pt-32 pb-24 flex flex-col items-center">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-[-1] opacity-70">
        <HeroScene />
      </div>

      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        
        {/* Hero Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-24 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-black/60 uppercase tracking-widest">Available for Freelance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-balance text-black">
            I build <span className="gradient-text-premium">3D experiences</span><br/>for the web.
          </h1>
          
          <p className="text-xl text-black/60 max-w-2xl text-balance font-medium mb-10">
            Hi, I'm Joyceson Danielraj. A creative developer bridging the gap between flat design and immersive spatial interfaces.
          </p>
          
          <a href="#projects" className="btn-premium">
            Explore Work <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* About */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-12"
            id="about"
          >
            <About />
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-12 flex flex-col"
            id="contact"
          >
            <Contact />
          </motion.div>

        </div>

        {/* Projects (Full Width) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-0 overflow-hidden"
          id="projects"
        >
          <Projects />
        </motion.div>

        {/* Footer */}
        <footer className="w-full py-12 text-center text-sm font-medium text-black/40">
          <p>© {new Date().getFullYear()} Joyceson Danielraj. Crafted with Three.js & Next.js.</p>
        </footer>
      </div>
    </main>
  );
}