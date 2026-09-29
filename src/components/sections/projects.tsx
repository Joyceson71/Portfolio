"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ChevronRight, Terminal } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "VulnScan Pro",
    slug: "vulnscan-pro",
    category: "Penetration Testing Tool",
    tags: ["[OFFENSIVE]", "[PYTHON]"],
    severity: "CRITICAL",
    desc: "Automated web vulnerability scanner with custom payload injection engine. Detects OWASP Top-10 vulnerabilities, generates executive-level reports, and integrates with Jira for issue tracking.",
    longDesc: [
      "Built a modular payload injection engine covering SQLi, XSS, SSRF, XXE, and command injection",
      "Auto-generates executive and technical reports in PDF/HTML format",
      "Integrates with Jira, Slack, and Bugzilla for workflow automation",
      "Supports authenticated scanning via session cookie injection",
    ],
    tech: ["Python", "FastAPI", "Burp Suite API", "Docker", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    demo: "https://kings-lms.vercel.app/",
    github: "https://github.com/Joyceson71/kings-lms",
    color: "rgba(255,80,80,0.6)",
  },
  {
    id: 2,
    title: "CTF Arsenal",
    slug: "ctf-arsenal",
    category: "CTF & Exploitation",
    tags: ["[CTF]", "[PWNTOOLS]"],
    severity: "HIGH",
    desc: "Personal toolkit and write-up repository for Capture the Flag competitions. Contains custom exploits, reverse engineering scripts, and 80+ documented solutions across HackTheBox and TryHackMe.",
    longDesc: [
      "80+ documented CTF solutions with full methodology explanations",
      "Custom ROP chain generators and heap exploitation helpers",
      "Automated reconnaissance script suite for initial foothold",
      "Ghidra/GDB helper scripts for binary reverse engineering",
    ],
    tech: ["Python", "Pwntools", "GDB", "Ghidra", "Bash"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    demo: "https://quizarena71.vercel.app/",
    github: "https://github.com/Joyceson71/Quiz-app",
    color: "rgba(255,180,0,0.6)",
  },
  {
    id: 3,
    title: "SecureDash",
    slug: "securedash",
    category: "Security Dashboard",
    tags: ["[DEFENSIVE]", "[NEXT.JS]"],
    severity: "MEDIUM",
    desc: "Real-time threat intelligence dashboard aggregating CVE feeds, IP reputation data, and honeypot alerts into a unified analyst workspace with severity scoring and team collaboration.",
    longDesc: [
      "Aggregates NVD, Shodan, AbuseIPDB, and GreyNoise feeds in real-time",
      "Custom severity scoring engine with CVSS v3.1 integration",
      "Team workspace with role-based access and audit logs",
      "Automated alerting via PagerDuty, Slack, and email",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "WebSockets"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    demo: "https://smart-biz-inky.vercel.app/",
    github: "https://github.com/Joyceson71/smart_biz",
    color: "rgba(0,180,255,0.6)",
  },
];

const SEVERITY_COLOR: Record<string, string> = {
  CRITICAL: "rgba(255,60,60,0.8)",
  HIGH:     "rgba(255,160,0,0.8)",
  MEDIUM:   "rgba(0,180,255,0.8)",
  LOW:      "rgba(0,255,65,0.8)",
};

export function Projects() {
  const [activeId, setActiveId] = useState<number | null>(projects[0].id);
  const active = projects.find((p) => p.id === activeId);

  return (
    <div className="w-full h-full flex flex-col text-slate-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
          Security Projects
        </h2>
        <p className="text-sm text-slate-400">
          Tools built for the offensive and defensive security community.
        </p>
      </motion.div>

      {/* Project list + detail panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Left: project list */}
        <div className="lg:w-1/3 flex flex-col gap-3 overflow-y-auto pr-2">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveId(p.id)}
              className={`w-full text-left p-4 rounded-xl transition-all border ${
                activeId === p.id 
                  ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                  : "bg-slate-900/40 border-white/5 hover:bg-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-slate-300"
                    >
                      {t.replace('[', '').replace(']', '')}
                    </span>
                  ))}
                </div>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: SEVERITY_COLOR[p.severity].replace('0.8', '0.2'), color: SEVERITY_COLOR[p.severity].replace('0.8', '1') }}
                >
                  {p.severity}
                </span>
              </div>

              <h3
                className={`text-base font-bold mb-1 transition-colors ${
                  activeId === p.id ? "text-blue-400" : "text-slate-200"
                }`}
              >
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{p.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {p.tech.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">{t}</span>
                  ))}
                  {p.tech.length > 2 && (
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">+{p.tech.length - 2}</span>
                  )}
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${activeId === p.id ? "translate-x-1 text-blue-400" : "text-slate-600"}`}
                />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="lg:w-2/3 h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/40 border border-white/10 rounded-xl h-full flex flex-col overflow-hidden"
              >
                {/* Image Header */}
                <div className="relative h-48 sm:h-56 shrink-0">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(0.5)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {active.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-400">{active.category}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {/* Finding list */}
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Key Features & Findings
                  </h4>
                  <div className="space-y-3 mb-8">
                    {active.longDesc.map((line, i) => (
                      <div key={i} className="flex gap-3 text-sm text-slate-300">
                        <span className="text-blue-500 font-bold mt-0.5 shrink-0">•</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Tech Stack & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {active.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
