"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Offensive Security",
    prefix: "[attack]",
    items: [
      { name: "Web App Pentesting",    level: 92 },
      { name: "SQL Injection / XSS",   level: 90 },
      { name: "Privilege Escalation",  level: 85 },
      { name: "Reverse Engineering",   level: 75 },
    ],
  },
  {
    category: "Recon & OSINT",
    prefix: "[recon]",
    items: [
      { name: "Nmap / Shodan",       level: 90 },
      { name: "Burp Suite",          level: 88 },
      { name: "Maltego / OSINT",     level: 80 },
      { name: "Metasploit",          level: 82 },
    ],
  },
  {
    category: "Defensive & Hardening",
    prefix: "[defend]",
    items: [
      { name: "Firewall / IDS",       level: 78 },
      { name: "SIEM / Log Analysis",  level: 74 },
      { name: "Secure Code Review",   level: 85 },
    ],
  },
  {
    category: "Programming",
    prefix: "[code]",
    items: [
      { name: "Python / Scripting",   level: 88 },
      { name: "Bash / PowerShell",    level: 85 },
      { name: "JavaScript / Next.js", level: 92 },
    ],
  },
];


export function Skills() {
  return (
    <section id="skills" className="relative w-full py-24 md:py-32 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-green-600 tracking-[0.3em] uppercase mb-3"
          >
            $ cat skills.log
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Skill</span> <span className="text-gradient-blue">Matrix.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-green-700 max-w-xl"
          >
            <span className="text-green-500/50">// </span>
            Tools, techniques, and technologies in my arsenal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-green-600 text-xs font-mono">{group.prefix}</span>
                <h3 className="text-sm font-semibold text-green-300 font-mono uppercase tracking-wider">{group.category}</h3>
              </div>
              <div className="space-y-5">
                {group.items.map((item) => (
                  <div key={item.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-green-400/80">{item.name}</span>
                      <span className="text-green-700">{item.level}%</span>
                    </div>
                    <div className="w-full h-px bg-green-900/50 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: gi * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full absolute top-0 left-0"
                        style={{
                          background: "linear-gradient(90deg, #00ff41, #00cc33)",
                          boxShadow: "0 0 8px rgba(0,255,65,0.8)",
                        }}
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
