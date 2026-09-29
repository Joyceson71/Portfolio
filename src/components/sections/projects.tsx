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
    <div className="w-full h-full flex flex-col font-mono text-[var(--fg)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-2 mb-4">
        <h3 className="text-xl font-bold tracking-tight text-[var(--cyber-yellow)] uppercase">
          Op_History_
        </h3>
      </div>

      {/* Project list + detail panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Left: project list */}
        <div className="lg:w-1/3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`w-full text-left p-3 transition-all border ${
                activeId === p.id 
                  ? "bg-[var(--cyber-yellow)]/10 border-[var(--cyber-yellow)] shadow-[inset_0_0_10px_rgba(252,238,10,0.2)]" 
                  : "bg-black/40 border-[var(--color-border)] hover:bg-[var(--cyber-yellow)]/5 hover:border-[var(--cyber-yellow)]/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-1 flex-wrap">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[8px] uppercase tracking-widest px-1 py-0.5 bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]"
                    >
                      {t.replace('[', '').replace(']', '')}
                    </span>
                  ))}
                </div>
                <span
                  className="text-[8px] font-bold px-1.5 py-0.5"
                  style={{ backgroundColor: SEVERITY_COLOR[p.severity].replace('0.8', '0.2'), color: SEVERITY_COLOR[p.severity].replace('0.8', '1'), border: `1px solid ${SEVERITY_COLOR[p.severity]}` }}
                >
                  {p.severity}
                </span>
              </div>

              <h3
                className={`text-sm font-bold uppercase tracking-wider mb-1 transition-colors ${
                  activeId === p.id ? "text-[var(--cyber-yellow)]" : "text-white"
                }`}
              >
                {p.title}
              </h3>
              <p className="text-[10px] text-gray-500 mb-2 line-clamp-2 leading-relaxed">{p.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {p.tech.slice(0, 2).map((t) => (
                    <span key={t} className="text-[8px] uppercase tracking-wider border border-[var(--color-border)] text-gray-400 px-1 py-0.5">{t}</span>
                  ))}
                  {p.tech.length > 2 && (
                    <span className="text-[8px] uppercase tracking-wider border border-[var(--color-border)] text-gray-400 px-1 py-0.5">+{p.tech.length - 2}</span>
                  )}
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${activeId === p.id ? "translate-x-1 text-[var(--cyber-yellow)]" : "text-gray-600"}`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="lg:w-2/3 h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-black/60 border border-[var(--cyber-yellow)] h-full flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[var(--cyber-yellow)] text-black text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest z-10">
                  {active.slug}.dat
                </div>

                {/* Image Header */}
                <div className="relative h-48 sm:h-56 shrink-0 border-b border-[var(--cyber-yellow)]">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-wider text-shadow-sm shadow-[var(--cyber-yellow)]">
                      {active.title}
                    </h3>
                    <p className="text-[10px] font-bold text-[var(--cyber-yellow)] uppercase tracking-widest">[{active.category}]</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  {/* Finding list */}
                  <h4 className="text-[10px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest mb-4">
                    [ Tactical_Overview ]
                  </h4>
                  <div className="space-y-3 mb-8 border-l border-[var(--color-border)] pl-3">
                    {active.longDesc.map((line, i) => (
                      <div key={i} className="flex gap-3 text-[11px] text-gray-300">
                        <span className="text-[var(--cyber-cyan)] font-bold mt-0.5 shrink-0">{'>'}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <h4 className="text-[10px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest mb-4">
                    [ Subroutines ]
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {active.tech.map((t) => (
                      <span key={t} className="px-2 py-1 bg-[var(--cyber-yellow)]/10 border border-[var(--cyber-yellow)]/30 text-[9px] uppercase tracking-wider text-[var(--cyber-yellow)]">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-[var(--color-border)] mt-auto">
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="cyber-btn text-[10px]"
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Execute_Demo
                    </a>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="cyber-btn text-[10px]"
                      style={{ borderColor: 'var(--cyber-pink)', color: 'var(--cyber-pink)' }}
                    >
                      <Github className="w-3 h-3 mr-2" />
                      View_Source
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
