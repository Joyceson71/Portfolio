"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js",  level: 95, color: "#818cf8" },
      { name: "TypeScript",       level: 90, color: "#818cf8" },
      { name: "Tailwind CSS",     level: 93, color: "#818cf8" },
    ],
  },
  {
    category: "3D & Motion",
    items: [
      { name: "Three.js / R3F",   level: 80, color: "#fbbf24" },
      { name: "Framer Motion",    level: 88, color: "#fbbf24" },
      { name: "GSAP",             level: 75, color: "#fbbf24" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express",level: 82, color: "#fb7185" },
      { name: "PostgreSQL",       level: 78, color: "#fb7185" },
      { name: "Prisma",           level: 80, color: "#fb7185" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git / GitHub",     level: 92, color: "#22d3ee" },
      { name: "Docker",           level: 65, color: "#22d3ee" },
      { name: "Figma",            level: 85, color: "#22d3ee" },
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
    <div ref={ref} className="w-full h-px bg-border relative">
      <div
        className="absolute top-0 left-0 h-full transition-none"
        style={{
          width: `${w}%`,
          background: `linear-gradient(90deg, ${color}40, ${color})`,
          boxShadow: `0 0 8px ${color}60`,
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
      <span className="ax-num right-[-2vw] top-[10%]">03</span>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ax-label mb-16"
        >
          Technical Skills
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] tracking-tight text-foreground mb-20"
        >
          Precision<br />
          <span className="text-brand-2">toolset.</span>
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
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-bold text-foreground text-lg">{group.category}</h3>
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
                      <span className="font-sans font-medium text-sm text-foreground/80">{item.name}</span>
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
        <div className="mt-24 pt-12 border-t border-border overflow-hidden">
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
                style={{ color: i % 3 === 0 ? "rgba(129,140,248,0.2)" : i % 3 === 1 ? "rgba(251,191,36,0.2)" : "rgba(251,113,133,0.2)" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
