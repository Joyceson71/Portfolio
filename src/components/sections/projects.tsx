"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Shield, Bug, Terminal } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "VulnScan Pro",
    category: "Penetration Testing Tool",
    tag: "[OFFENSIVE]",
    desc: "Automated web vulnerability scanner with custom payload injection engine. Detects OWASP Top-10 vulnerabilities, generates executive-level reports, and integrates with Jira for issue tracking.",
    tech: ["Python", "Burp Suite API", "Docker", "FastAPI"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
  },
  {
    id: 2,
    title: "CTF Arsenal",
    category: "CTF & Exploitation",
    tag: "[CTF]",
    desc: "Personal toolkit and write-up repository for Capture the Flag competitions. Contains custom exploits, reverse engineering scripts, and 80+ documented solutions across HackTheBox and TryHackMe.",
    tech: ["Python", "Pwntools", "GDB", "Ghidra"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
  },
  {
    id: 3,
    title: "SecureDash",
    category: "Security Dashboard",
    tag: "[DEFENSIVE]",
    desc: "Real-time threat intelligence dashboard aggregating CVE feeds, IP reputation data, and honeypot alerts into a unified analyst workspace with severity scoring and team collaboration.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
  },
];


export function Projects() {
  return (
    <section id="projects" className="relative w-full py-24 md:py-32 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-green-600 tracking-[0.3em] uppercase mb-3"
          >
            $ ls projects/ -la
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Security</span> <span className="text-gradient-blue">Projects.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-green-700"
          >
            <span className="text-green-500/50">// </span>
            Tools I&apos;ve built for the offensive and defensive security community.
          </motion.p>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel overflow-hidden group flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="relative w-full md:w-2/5 h-56 md:h-auto overflow-hidden shrink-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "brightness(0.5) saturate(0.2) hue-rotate(80deg)" }}
                />
                {/* Green overlay */}
                <div className="absolute inset-0 bg-green-950/50 mix-blend-multiply" />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="hack-badge text-green-400">{p.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <p className="text-xs font-mono text-green-600 uppercase tracking-wider mb-2">{p.category}</p>
                <h3 className="text-2xl font-bold font-mono mb-4" style={{ color: "#00ff41", textShadow: "0 0 10px rgba(0,255,65,0.4)" }}>
                  {p.title}
                </h3>
                <p className="text-sm text-green-300/60 mb-6 leading-relaxed">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span key={t} className="hack-badge">{t}</span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-green-900/40">
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-green-500 hover:text-green-400 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> ./run_demo.sh
                  </a>
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-green-700 hover:text-green-500 transition-colors">
                    <Github className="w-3.5 h-3.5" /> view_source()
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
