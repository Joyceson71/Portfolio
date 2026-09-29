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
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = projects.find((p) => p.id === activeId);

  return (
    <section id="projects" className="relative w-full py-20 md:py-32 px-6 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="section-prompt">ls -la projects/</div>
        <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-3">
          <span className="text-gradient">SECURITY</span>{" "}
          <span className="text-green-900">PROJECTS</span>
        </h2>
        <p className="text-xs font-mono text-green-800">
          <span className="text-green-900">// </span>Tools built for the offensive and defensive security community.
        </p>
      </motion.div>

      {/* Project list + detail panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left: project list */}
        <div className="lg:col-span-2 space-y-3">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveId(activeId === p.id ? null : p.id)}
              className={`w-full text-left term-window p-5 transition-all group ${
                activeId === p.id ? "border-green-500/50" : ""
              }`}
              style={activeId === p.id ? { boxShadow: `0 0 20px rgba(0,255,65,0.08)` } : {}}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono px-1.5 py-0.5 border"
                      style={{ color: p.color, borderColor: p.color.replace("0.6", "0.3") }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  className="text-[9px] font-mono px-2 py-0.5"
                  style={{
                    color: SEVERITY_COLOR[p.severity],
                    border: `1px solid ${SEVERITY_COLOR[p.severity]}`,
                    textShadow: `0 0 6px ${SEVERITY_COLOR[p.severity]}`,
                  }}
                >
                  {p.severity}
                </span>
              </div>

              <h3
                className="text-base font-bold font-mono mb-1 group-hover:text-green-400 transition-colors"
                style={activeId === p.id ? { color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.5)" } : {}}
              >
                {p.title}
              </h3>
              <p className="text-[10px] font-mono text-green-800 mb-3 line-clamp-2">{p.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="hack-badge">{t}</span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="hack-badge">+{p.tech.length - 3}</span>
                  )}
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-all ${activeId === p.id ? "rotate-90 text-green-400" : "text-green-900"}`}
                />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="term-window h-full"
              >
                <div className="term-titlebar" data-title={`${active.slug}.md`}>
                  <span className="term-dot term-dot-red" />
                  <span className="term-dot term-dot-yellow" />
                  <span className="term-dot term-dot-green" />
                  <span className="ml-3 text-[10px] font-mono text-green-800">{active.slug}.md</span>
                </div>

                {/* Image with green tint */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(0.3) saturate(0.15) hue-rotate(80deg)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${active.color.replace("0.6","0.15")} 0%, transparent 60%)`,
                    }}
                  />
                  {/* Scan line */}
                  <div className="absolute inset-x-0 h-0.5 glow-bar" style={{ top: "50%" }} />
                  <div className="absolute bottom-4 left-5">
                    <h3
                      className="text-2xl font-bold font-mono"
                      style={{ color: active.color.replace("0.6","1"), textShadow: `0 0 16px ${active.color}` }}
                    >
                      {active.title}
                    </h3>
                    <p className="text-[10px] font-mono text-green-700">{active.category}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Finding list */}
                  <p className="text-[10px] font-mono text-green-900 uppercase tracking-widest mb-3">
                    $ cat findings.txt
                  </p>
                  <div className="space-y-2 mb-5">
                    {active.longDesc.map((line, i) => (
                      <div key={i} className="flex gap-2 text-xs font-mono">
                        <span className="text-green-800 shrink-0">[{String(i+1).padStart(2,"0")}]</span>
                        <span className="text-green-600">{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <p className="text-[10px] font-mono text-green-900 uppercase tracking-widest mb-2">
                    $ cat requirements.txt
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {active.tech.map((t) => (
                      <span key={t} className="hack-badge">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-green-900/30">
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-mono text-green-600 hover:text-green-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      ./run_demo.sh
                    </a>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-mono text-green-800 hover:text-green-500 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      view_source()
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="term-window h-full flex items-center justify-center min-h-64"
              >
                <div className="text-center">
                  <Terminal className="w-8 h-8 text-green-900 mx-auto mb-3" />
                  <p className="text-xs font-mono text-green-900">
                    Select a project to view details
                  </p>
                  <p className="text-[10px] font-mono text-green-900/50 mt-1">
                    {">"} click any item on the left<span className="cursor-blink" />
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
