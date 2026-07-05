"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const projectsData = [
  {
    id: 1,
    title: "Complete Quiz App",
    category: "web",
    desc: "A full-stack, highly interactive quiz application with real-time scoring, leaderboards, and comprehensive admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop",
    demo: "#",
    github: "#"
  },
  {
    id: 2,
    title: "Smart Learning Campus",
    category: "web",
    desc: "A comprehensive digital learning platform for colleges, integrating virtual classrooms, assignment tracking, and student analytics.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    demo: "#",
    github: "#"
  },
  {
    id: 3,
    title: "3D Interactive Portfolio",
    category: "ui",
    desc: "This very website. A futuristic, immersive 3D portfolio experience blending WebGL, Framer Motion, and Next.js.",
    tech: ["Three.js", "React Three Fiber", "GSAP", "Tailwind"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    demo: "#",
    github: "#"
  }
];

function ProjectCard({ project, index }: { project: typeof projectsData[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 2000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-card relative h-full flex flex-col rounded-2xl overflow-hidden group cursor-pointer border border-white/5"
      >
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-transparent to-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Holographic scanning line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_10px_var(--primary)] z-20 opacity-0 group-hover:opacity-100 -translate-y-full group-hover:animate-scan" />

        {/* Image Container with 3D translation */}
        <div 
          className="relative w-full h-64 overflow-hidden z-10 p-4 pb-0"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10">
            <Image 
              src={project.image}
              alt={project.title}
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Content */}
        <div 
          className="p-6 flex flex-col flex-grow z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span key={i} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-primary">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto">
            <a href={project.demo} className="flex items-center gap-2 font-heading uppercase text-xs tracking-widest text-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" /> Live
            </a>
            <a href={project.github} className="flex items-center gap-2 font-heading uppercase text-xs tracking-widest text-foreground hover:text-primary transition-colors">
              <FaGithub className="w-4 h-4" /> Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projectsData.filter((p) => 
    filter === "all" ? true : p.category.includes(filter)
  );

  return (
    <section id="projects" className="relative w-full min-h-screen py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">Portfolio</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mt-2">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow">Works</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {["all", "web", "ui"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-heading uppercase tracking-widest text-sm px-4 py-2 border-b-2 transition-colors ${
                  filter === f 
                    ? "border-primary text-foreground glow-border" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All Projects" : f === "web" ? "Web Apps" : "UI/UX"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
