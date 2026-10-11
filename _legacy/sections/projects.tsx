"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Cosmos Brand Site",
    category: "3D Web Experience",
    desc: "Interactive brand website featuring real-time particle systems and custom GLSL shaders.",
    tech: ["Three.js", "GLSL", "React"],
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Fluid Studio",
    category: "Interactive Art Direction",
    desc: "A digital art gallery showcasing generative artwork powered by WebGL and noise functions.",
    tech: ["WebGL", "Spline", "Framer"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    demo: "#",
    github: "#",
  },
];

export function Projects() {
  return (
    <div className="w-full flex flex-col md:flex-row h-full">
      
      {/* Sidebar Info */}
      <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/[0.05] bg-black/[0.02]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black mb-4">Selected Work</h2>
          <p className="text-black/60 text-sm leading-relaxed">
            A showcase of my recent 3D web experiences, focusing on WebGL performance, 
            immersive storytelling, and premium design execution.
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-xs font-bold uppercase tracking-widest text-black/40">Scroll to explore →</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="w-full md:w-2/3 p-8 md:p-12 overflow-x-auto flex gap-6 custom-scrollbar items-center">
        {projects.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-[300px] shrink-0 flex flex-col gap-4 group"
          >
            <div className="w-[300px] h-[200px] rounded-2xl overflow-hidden relative shadow-sm border border-black/[0.05]">
              <Image 
                src={p.image} 
                alt={p.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-black">{p.title}</h3>
              </div>
              <p className="text-xs text-black/50 font-semibold mb-2">{p.category}</p>
              
              <div className="flex gap-2 mb-4">
                {p.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-black/5 text-[10px] font-bold text-black/60">{t}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <a href={p.demo} className="text-xs font-semibold text-black hover:opacity-70 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3"/> Live Site
                </a>
                <a href={p.github} className="text-xs font-semibold text-black/60 hover:text-black flex items-center gap-1">
                  <Github className="w-3 h-3"/> Source
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
