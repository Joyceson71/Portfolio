"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Frontend Architecture",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    category: "Creative Engineering",
    items: [
      { name: "Three.js / R3F", level: 80 },
      { name: "Framer Motion", level: 88 },
      { name: "GSAP", level: 75 },
    ],
  },
  {
    category: "Backend Integration",
    items: [
      { name: "Node.js", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "Prisma", level: 80 },
    ],
  },
  {
    category: "Tools & Ecosystem",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "Figma", level: 85 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-24 md:py-32 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Technical <span className="text-gradient">Precision.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Tools and technologies I use to bridge the gap between design and scalable engineering.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">{group.category}</h3>
              <div className="space-y-5">
                {group.items.map((item) => (
                  <div key={item.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-white/90">{item.name}</span>
                      <span className="text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: gi * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
