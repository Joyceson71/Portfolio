"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Kings LMS",
    category: "Web Application",
    desc: "A digital learning platform with virtual classrooms, smart attendance, assignment tracking, and an analytics dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
  },
  {
    id: 2,
    title: "Quiz Arena",
    category: "Web Application",
    desc: "Real-time quiz platform with live scoring, global leaderboards, and a comprehensive admin management interface.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop",
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
  },
  {
    id: 3,
    title: "SmartBiz",
    category: "UI / UX Design",
    desc: "Modern business management platform with analytics, invoicing, and a sleek responsive dashboard interface.",
    tech: ["React", "Next.js", "Tailwind", "TypeScript"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative w-full py-24 md:py-32 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Selected <span className="text-gradient">Work.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground"
          >
            A collection of robust, scalable applications.
          </motion.p>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel overflow-hidden group flex flex-col md:flex-row"
            >
              {/* Image Container */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                  {p.category}
                </p>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {p.title}
                </h3>
                <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Site
                  </a>
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-4 h-4" /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
