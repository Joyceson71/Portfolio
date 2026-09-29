"use client";

import { motion } from "framer-motion";

const categories = [
  {
    name: "Offensive Security",
    prefix: "[ATK]",
    color: "rgba(255,80,80,0.7)",
    skills: [
      { name: "Web App Pentesting",   pct: 92 },
      { name: "SQL Injection / XSS",  pct: 90 },
      { name: "Privilege Escalation", pct: 85 },
      { name: "Buffer Overflow",      pct: 76 },
      { name: "Reverse Engineering",  pct: 72 },
    ],
  },
  {
    name: "Recon & OSINT",
    prefix: "[RCN]",
    color: "rgba(255,180,0,0.7)",
    skills: [
      { name: "Nmap / Shodan",    pct: 92 },
      { name: "Burp Suite",       pct: 90 },
      { name: "Metasploit",       pct: 84 },
      { name: "Maltego / OSINT",  pct: 80 },
      { name: "Wireshark",        pct: 78 },
    ],
  },
  {
    name: "Defensive",
    prefix: "[DEF]",
    color: "rgba(0,180,255,0.7)",
    skills: [
      { name: "Secure Code Review", pct: 87 },
      { name: "Firewall / IDS",     pct: 80 },
      { name: "SIEM / Splunk",      pct: 74 },
      { name: "Threat Modelling",   pct: 76 },
    ],
  },
  {
    name: "Programming",
    prefix: "[PRG]",
    color: "rgba(0,255,65,0.7)",
    skills: [
      { name: "Python / Scripting",   pct: 90 },
      { name: "Bash / PowerShell",    pct: 87 },
      { name: "JavaScript / Next.js", pct: 92 },
      { name: "C / Assembly",         pct: 68 },
    ],
  },
];

const tools = [
  "Burp Suite", "Metasploit", "Nmap", "Wireshark", "OWASP ZAP",
  "Kali Linux", "John the Ripper", "Hashcat", "Ghidra", "pwntools",
  "Shodan", "Maltego", "Nikto", "SQLmap", "Hydra",
  "Gobuster", "BloodHound", "Mimikatz", "Netcat", "tmux",
];

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs font-medium">
        <span className="text-slate-300">{name}</span>
        <span className="text-slate-500">{pct}%</span>
      </div>
      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <div className="w-full h-full flex flex-col gap-8 text-slate-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-2"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
          Skill Matrix
        </h2>
        <p className="text-sm text-slate-400">
          Arsenal of tools, techniques, and technologies.
        </p>
      </motion.div>

      {/* Skill bars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, gi) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
            className="bg-slate-900/40 border border-white/10 rounded-xl overflow-hidden"
          >
            <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center gap-3">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: cat.color.replace('0.7', '0.2'), color: cat.color.replace('0.7', '1') }}
              >
                {cat.prefix}
              </span>
              <span className="text-sm font-semibold text-white">{cat.name}</span>
            </div>
            <div className="p-5 space-y-5">
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  color={cat.color.replace('0.7', '1')}
                  delay={gi * 0.1 + si * 0.08}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tools arsenal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900/40 border border-white/10 rounded-xl overflow-hidden mt-2"
      >
        <div className="bg-white/5 px-4 py-3 border-b border-white/5">
          <span className="text-sm font-semibold text-white">Tools & Utilities</span>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
