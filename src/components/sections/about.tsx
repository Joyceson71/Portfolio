"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const tech = [
  "Next.js 16", "React 19", "TypeScript", 
  "Tailwind CSS", "Three.js", "Framer Motion", 
  "Node.js", "PostgreSQL"
];

export function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Left Column - Text */}
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Crafting <span className="text-gradient">interfaces</span><br />
              with <span className="text-gradient-blue">purpose.</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              <p>
                As a <strong className="text-foreground font-medium">Frontend Engineer</strong>, my focus is on bridging the gap between exceptional design and robust engineering. Every pixel is intentional, every animation serves a purpose.
              </p>
              <p>
                I build scalable web applications using the latest web technologies, specializing in the React ecosystem. My goal is to create seamless, intuitive, and performant user experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <Link href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
                Let's collaborate <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Stats / Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 flex flex-col justify-between"
            >
              <h3 className="text-5xl font-bold mb-2">2+</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 flex flex-col justify-between"
            >
              <h3 className="text-5xl font-bold mb-2">10+</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects Shipped</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 col-span-1 sm:col-span-2"
            >
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm font-medium text-white/90">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
