"use client";

import { motion } from "framer-motion";
import { Projects } from "@/components/sections/projects";

export default function WorkPage() {
  return (
    <main className="w-full min-h-screen px-4 md:px-8 lg:px-12 pt-32 pb-24 flex justify-center">
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-black">
            Selected <span className="gradient-text-premium">Works</span>
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-medium">
            A deep dive into my recent projects. Combining aesthetic design with high-performance WebGL rendering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-0 overflow-hidden w-full"
        >
           <Projects />
        </motion.div>

        {/* Additional works grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {["Client A - WebGL Landing", "Client B - 3D Product Configurator", "Internal R&D - Shaders", "Client C - Immersive Storytelling", "Client D - 3D Data Viz", "Client E - AR/VR Web"].map((title, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className="glass-card p-6 flex flex-col gap-4 aspect-square justify-center items-center text-center cursor-pointer hover:bg-white/50"
             >
               <h3 className="font-bold text-lg text-black">{title}</h3>
               <p className="text-sm text-black/50">Case study coming soon.</p>
             </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
