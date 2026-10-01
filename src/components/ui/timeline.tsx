"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Award, ChevronRight } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  type: "crimson" | "blue";
}

const experiences: ExperienceItem[] = [
  {
    year: "2024 — Present",
    role: "Lead Frontend & Creative Engineer",
    company: "Freelance / High-Impact Ventures",
    location: "Remote",
    description: "Designing and engineering 3D immersive web experiences, SaaS enterprise dashboards, and high-conversion e-commerce systems.",
    achievements: [
      "Engineered real-time virtual education platforms scaling to thousands of concurrent students",
      "Integrated Three.js / React Three Fiber interactive scenes delivering 60 FPS across desktop & mobile",
      "Boosted client Core Web Vitals to 95+ performance scores with zero layout shift"
    ],
    tech: ["Next.js 16", "React 19", "Three.js", "TypeScript", "Tailwind CSS v4"],
    type: "crimson",
  },
  {
    year: "2023 — 2024",
    role: "Full-Stack Web Developer",
    company: "Kings Tech & Quiz Arena",
    location: "Remote / Hybrid",
    description: "Architected end-to-end fullstack systems with automated grading engines, analytics charts, and PostgreSQL persistence.",
    achievements: [
      "Built Quiz Arena real-time battle system with dynamic score calculations and leaderboards",
      "Spearheaded database schema design in Prisma with zero migration downtime",
      "Designed dark-mode UI systems with responsive touch controls"
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Prisma", "MongoDB", "WebSockets"],
    type: "blue",
  },
  {
    year: "2022 — 2023",
    role: "Frontend Engineer Apprentice",
    company: "SmartBiz Solutions",
    location: "Chennai, India",
    description: "Crafted modular UI component libraries, client dashboards, and interactive invoicing tooling.",
    achievements: [
      "Developed 40+ reusable design system components adopted across 3 internal web products",
      "Reduced bundle footprint by 35% through tree-shaking and modern dynamic imports"
    ],
    tech: ["JavaScript (ES6+)", "React", "CSS Modules", "Figma", "REST APIs"],
    type: "crimson",
  },
];

export function CareerTimeline() {
  return (
    <div className="relative pl-6 md:pl-10">
      {/* Central web filament line */}
      <div 
        className="absolute left-2 md:left-4 top-4 bottom-4 w-px bg-gradient-to-b from-[#CC0000] via-[#0047FF] to-transparent shadow-[0_0_8px_rgba(204,0,0,0.5)]" 
      />

      <div className="space-y-12">
        {experiences.map((exp, idx) => {
          const isCrimson = exp.type === "crimson";
          const accentColor = isCrimson ? "#CC0000" : "#0047FF";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={() => spiderAudio.playBlip(720 + idx * 40, 0.04)}
              className="relative group"
            >
              {/* Web node connector */}
              <div 
                className="absolute -left-6 md:-left-10 top-1.5 w-5 h-5 rounded-full bg-[#080810] border-2 flex items-center justify-center transition-transform group-hover:scale-125 z-10"
                style={{ borderColor: accentColor }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                />
              </div>

              {/* Card content */}
              <div className="web-panel p-6 md:p-8 rounded-sm hover:border-[#CC0000]/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span 
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded"
                    style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
                  >
                    {exp.year}
                  </span>
                  <span className="font-mono text-xs text-white/40">{exp.location}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#CC0000] transition-colors">
                  {exp.role}
                </h3>
                <h4 className="text-sm font-semibold text-white/70 mb-4">{exp.company}</h4>

                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Achievements list */}
                <ul className="space-y-2 mb-6">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/75">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accentColor }} />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {exp.tech.map((t) => (
                    <span 
                      key={t}
                      className="font-mono text-[10px] text-white/50 px-2 py-0.5 rounded bg-white/[0.03] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
