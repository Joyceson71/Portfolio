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
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[10px] font-mono">
        <span className="text-green-600">{name}</span>
        <span className="text-green-900">{pct}%</span>
      </div>
      <div className="relative h-px bg-green-900/30">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color.replace("0.7", "0.4")})`,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
        <motion.div
          initial={{ left: 0 }}
          whileInView={{ left: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[-3px] w-1.5 h-1.5 rounded-full"
          style={{ transform: "translateX(-50%)", background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-20 md:py-32 px-6 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="section-prompt">cat skills.log</div>
        <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-3">
          <span className="text-gradient">SKILL</span>{" "}
          <span className="text-green-900">MATRIX</span>
        </h2>
        <p className="text-xs font-mono text-green-800">
          <span className="text-green-900">// </span>Arsenal of tools, techniques, and technologies.
        </p>
      </motion.div>

      {/* Skill bars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {categories.map((cat, gi) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
            className="term-window"
          >
            <div className="term-titlebar" data-title={`${cat.prefix} ${cat.name}`}>
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span
                className="ml-3 text-[10px] font-mono font-bold tracking-widest"
                style={{ color: cat.color }}
              >
                {cat.prefix}
              </span>
              <span className="ml-2 text-[10px] font-mono text-green-800">{cat.name}</span>
            </div>
            <div className="p-6 space-y-4">
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  color={cat.color}
                  delay={gi * 0.1 + si * 0.08}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tools arsenal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="term-window"
      >
        <div className="term-titlebar" data-title="tools —arsenal">
          <span className="term-dot term-dot-red" />
          <span className="term-dot term-dot-yellow" />
          <span className="term-dot term-dot-green" />
          <span className="ml-3 text-[10px] font-mono text-green-800">$ ls /usr/local/tools/</span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="hack-badge cursor-default hover:border-green-500/50 hover:text-green-400 transition-colors"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
