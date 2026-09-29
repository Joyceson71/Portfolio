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
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-300">
        <span>{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="relative h-[2px] bg-white/10 w-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <div className="w-full h-full flex flex-col gap-4 font-mono text-gray-300">
      
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-2 mb-2">
        <h3 className="text-xl font-bold tracking-tight text-[var(--cyber-cyan)] uppercase">
          Neural Uplink_
        </h3>
      </div>

      {/* Skill bars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, gi) => (
          <div
            key={cat.name}
            className="border border-[var(--color-border)] bg-black/40 p-4 relative"
          >
            <div className="absolute top-0 right-0 p-1 text-[8px] bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)]">SEC_BLOCK_{gi}</div>
            
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 border"
                style={{ borderColor: cat.color.replace('0.7', '0.5'), color: cat.color.replace('0.7', '1') }}
              >
                {cat.prefix}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">{cat.name}</span>
            </div>
            
            <div className="space-y-4">
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
          </div>
        ))}
      </div>

      {/* Tools arsenal */}
      <div className="border border-[var(--color-border)] bg-black/40 p-4 relative mt-2">
        <div className="absolute top-0 right-0 p-1 text-[8px] bg-[var(--cyber-yellow)]/10 text-[var(--cyber-yellow)]">TOOLS_ARRAY</div>
        <div className="text-[10px] font-bold text-[var(--cyber-yellow)] uppercase tracking-widest mb-3">[ Utilities & Frameworks ]</div>
        
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, i) => (
            <span
              key={tool}
              className="px-2 py-1 bg-[var(--cyber-cyan)]/5 border border-[var(--color-border)] text-[9px] uppercase tracking-wider hover:bg-[var(--cyber-cyan)]/20 transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
