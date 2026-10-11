"use client";

import { Box, Layers, Zap, Brush } from "lucide-react";

const services = [
  { icon: Box, label: "3D Experiences", desc: "Interactive Three.js & WebGL scenes." },
  { icon: Layers, label: "Motion Design", desc: "GSAP scroll animations & Framer Motion." },
  { icon: Brush, label: "Creative UI/UX", desc: "Pixel-perfect, award-winning layouts." },
  { icon: Zap, label: "Performance Opt", desc: "Optimized GPU-friendly web code." },
];

export function About() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-6">About Me</h2>
        <p className="text-black/60 text-base leading-relaxed mb-8">
          I am Joyceson Danielraj, a 3D web designer and creative developer based in Chennai. 
          I specialize in transforming brands into immersive digital worlds, merging 
          artistry with cutting-edge browser technologies like React Three Fiber, GSAP, and GLSL.
        </p>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Core Focus</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div key={svc.label} className="p-4 rounded-2xl bg-black/[0.03] border border-black/[0.05]">
                <Icon className="w-5 h-5 text-black mb-3" />
                <h4 className="font-semibold text-black text-sm mb-1">{svc.label}</h4>
                <p className="text-xs text-black/50">{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
