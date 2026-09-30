"use client";

import { motion } from "framer-motion";

const categories = [
  {
    name: "3D & Graphics",
    color: "#a855f7",
    skills: [
      { name: "Three.js",    pct: 97 },
      { name: "WebGL / GLSL", pct: 88 },
      { name: "React Three Fiber", pct: 94 },
      { name: "Blender",    pct: 80 },
      { name: "Spline 3D",  pct: 90 },
    ],
  },
  {
    name: "Frontend",
    color: "#06b6d4",
    skills: [
      { name: "React / Next.js", pct: 96 },
      { name: "TypeScript",      pct: 90 },
      { name: "Tailwind CSS",    pct: 95 },
      { name: "Framer Motion",   pct: 93 },
      { name: "GSAP",            pct: 88 },
    ],
  },
  {
    name: "Design",
    color: "#f59e0b",
    skills: [
      { name: "Figma",           pct: 95 },
      { name: "UI/UX Design",    pct: 90 },
      { name: "Motion Design",   pct: 85 },
      { name: "Brand Identity",  pct: 82 },
      { name: "Typography",      pct: 88 },
    ],
  },
  {
    name: "Tools & Backend",
    color: "#ec4899",
    skills: [
      { name: "Node.js",         pct: 78 },
      { name: "Git & GitHub",    pct: 92 },
      { name: "Vercel / AWS",    pct: 85 },
      { name: "Prisma + PgSQL",  pct: 72 },
      { name: "Performance Opt", pct: 90 },
    ],
  },
];

const tools = [
  "Three.js", "React Three Fiber", "Drei", "WebGL", "GLSL Shaders",
  "GSAP", "Framer Motion", "Blender", "Spline", "Figma",
  "Next.js 16", "TypeScript", "Tailwind CSS", "Node.js", "Prisma",
  "Vercel", "AWS S3", "GitHub Actions", "Lenis Scroll", "ScrollTrigger",
  "Postprocessing", "Shader Forge", "Adobe CC", "Rive", "Lottie",
];

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-zinc-300">{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})`, boxShadow: `0 0 12px ${color}60` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="w-full px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-label"
      >
        Skill Matrix
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
      >
        My Tech <span className="gradient-text">Arsenal</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 text-lg mb-16 max-w-xl"
      >
        A carefully curated stack for crafting performance-first, visually extraordinary web experiences.
      </motion.p>

      {/* Skill categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat, gi) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: gi * 0.1 }}
            className="card p-7"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-7">
              <div
                className="w-2 h-8 rounded-full"
                style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}80` }}
              />
              <h3 className="text-base font-bold">{cat.name}</h3>
            </div>

            <div className="space-y-5">
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  color={cat.color}
                  delay={gi * 0.1 + si * 0.07}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tools cloud */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card p-8"
      >
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6">
          Full Toolbox
        </h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="badge cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
