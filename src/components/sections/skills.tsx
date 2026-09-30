"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Three.js", pct: 95 },
  { name: "React Three Fiber", pct: 90 },
  { name: "WebGL / GLSL", pct: 85 },
  { name: "GSAP / Framer Motion", pct: 92 },
  { name: "React / Next.js", pct: 90 },
  { name: "Blender / Spline", pct: 80 },
];

export function Skills() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-6">Capabilities</h2>
        <p className="text-black/60 text-base leading-relaxed mb-8">
          My technical stack is entirely focused on delivering high-performance, visually stunning 
          web experiences. I bridge the gap between complex 3D math and smooth React UI.
        </p>
      </div>

      <div className="space-y-4">
        {skills.map((skill, i) => (
          <div key={skill.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-black/80 uppercase tracking-widest">
              <span>{skill.name}</span>
              <span>{skill.pct}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/[0.05] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="h-full bg-black rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
