"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js",  level: 95, color: "#00d4ff" },
      { name: "TypeScript",       level: 90, color: "#00d4ff" },
      { name: "Tailwind CSS",     level: 93, color: "#00d4ff" },
    ],
  },
  {
    category: "3D & Motion",
    items: [
      { name: "Three.js / R3F",   level: 80, color: "#ff2d78" },
      { name: "Framer Motion",    level: 88, color: "#ff2d78" },
      { name: "GSAP",             level: 75, color: "#ff2d78" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express",level: 82, color: "#b400ff" },
      { name: "PostgreSQL",       level: 78, color: "#b400ff" },
      { name: "Prisma",           level: 80, color: "#b400ff" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git / GitHub",     level: 92, color: "#39ff14" },
      { name: "Docker",           level: 65, color: "#39ff14" },
      { name: "Figma",            level: 85, color: "#39ff14" },
    ],
  },
];

function Bar({ level, color }: { level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setW((1 - Math.pow(1 - p, 3)) * level);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, level]);

  return (
    <div ref={ref} className="w-full h-px bg-white/5 relative">
      <div
        className="absolute top-0 left-0 h-full transition-none"
        style={{
          width: `${w}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
      {/* Animated tip dot */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-none"
        style={{
          left: `${w}%`,
          transform: `translateX(-50%) translateY(-50%)`,
          background: color,
          boxShadow: `0 0 10px ${color}`,
          opacity: inView ? 1 : 0,
        }}
      />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen py-32 md:py-40 overflow-hidden">
      {/* Ghost number */}
      <span className="section-num right-[-2vw] top-[10%]">03</span>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px w-12 bg-[var(--prism)]" style={{ background: "var(--prism)" }} />
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--prism)" }}>
            Technical Skills
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] tracking-tight text-white mb-20"
        >
          Precision<br />
          <span className="text-prism">toolset.</span>
        </motion.h2>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted-foreground)]">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-bold text-white text-lg">{group.category}</h3>
              </div>

              <div className="space-y-6">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + ii * 0.08 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-sans font-medium text-sm text-white/80">{item.name}</span>
                      <span className="font-mono text-[11px]" style={{ color: item.color }}>
                        {item.level}%
                      </span>
                    </div>
                    <Bar level={item.level} color={item.color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal marquee of tech */}
        <div className="mt-24 pt-12 border-t border-white/5 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[
              "React", "Next.js", "TypeScript", "Three.js", "Framer Motion",
              "Tailwind", "Node.js", "PostgreSQL", "Prisma", "GSAP", "Docker",
              "React", "Next.js", "TypeScript", "Three.js", "Framer Motion",
              "Tailwind", "Node.js", "PostgreSQL", "Prisma", "GSAP", "Docker",
            ].map((t, i) => (
              <span key={i} className="font-heading font-black text-2xl uppercase"
                style={{ color: i % 3 === 0 ? "rgba(0,212,255,0.15)" : i % 3 === 1 ? "rgba(255,45,120,0.15)" : "rgba(180,0,255,0.15)" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
