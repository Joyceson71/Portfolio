"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Bug, Key, Server, Eye, Terminal, Award, Clock, Target, Zap } from "lucide-react";

const expertise = [
  { icon: Shield, label: "Web App Pentesting",    desc: "OWASP Top-10, API attacks"  },
  { icon: Bug,    label: "Vuln Research",          desc: "CVE discovery & disclosure" },
  { icon: Key,    label: "Privilege Escalation",   desc: "Linux / Windows privesc"    },
  { icon: Server, label: "Network Security",       desc: "Recon, lateral movement"    },
  { icon: Eye,    label: "OSINT",                  desc: "Passive recon & profiling"  },
  { icon: Terminal, label: "CTF / Red Team",       desc: "HackTheBox, TryHackMe"      },
];

const timeline = [
  { year: "2022", event: "Started ethical hacking journey", icon: Zap },
  { year: "2023", event: "Obtained CEH & Security+ certs", icon: Award },
  { year: "2023", event: "First CVE submission accepted",   icon: Bug },
  { year: "2024", event: "Reached TryHackMe Top 1%",       icon: Target },
  { year: "2025", event: "30+ pentests completed",          icon: Shield },
  { year: "2026", event: "Full-time security researcher",   icon: Clock },
];

const stats = [
  { value: "12+",    label: "CVEs Found"      },
  { value: "30+",    label: "Pentests Done"   },
  { value: "80+",    label: "CTF Challenges"  },
  { value: "Top 1%", label: "THM Rank"        },
];

export function About() {
  return (
    <div className="w-full h-full flex flex-col gap-4 text-[var(--fg)] font-mono">
      <div className="mb-2">
        <h3 className="text-2xl font-bold tracking-tight text-[var(--cyber-cyan)] uppercase">
          Joyceson Danielraj
        </h3>
        <p className="text-[10px] text-[var(--cyber-pink)] uppercase tracking-widest mt-1">
          // SYS_CLASS: Offensive_Security_Specialist
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="border border-[var(--color-border)] p-2 text-center bg-black/40 hover:bg-[var(--cyber-cyan)] hover:text-black transition-colors group cursor-default"
          >
            <div className="text-xl font-bold text-[var(--cyber-cyan)] group-hover:text-black mb-1">
              {s.value}
            </div>
            <div className="text-[9px] text-[var(--cyber-pink)] group-hover:text-black font-medium uppercase tracking-widest">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {/* Bio terminal */}
        <div className="bg-black/40 border border-[var(--color-border)] p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 text-[8px] text-[var(--cyber-cyan)]/50 bg-[var(--cyber-cyan)]/10">ID_BIO_DATA</div>
          
          <div className="space-y-2 text-[11px] leading-relaxed mb-6 text-gray-400">
            <p>
              <span className="text-[var(--cyber-cyan)] font-bold">»</span> I extract unauthorized data from systems legally. Finding vulnerabilities before they become headline news.
            </p>
            <p>
              <span className="text-[var(--cyber-cyan)] font-bold">»</span> Expertise in web application pentesting, advanced network recon, and stealth exploit deployment.
            </p>
            <p>
              <span className="text-[var(--cyber-cyan)] font-bold">»</span> My defensive strategy is built strictly from an attacker's perspective.
            </p>
          </div>

          {/* Expertise grid */}
          <div>
            <h4 className="text-[10px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest mb-3">
              [ Core_Vectors ]
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {expertise.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-2 bg-[var(--cyber-cyan)]/5 border border-[var(--color-border)] hover:bg-[var(--cyber-cyan)]/20 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[var(--cyber-cyan)] shrink-0" />
                    <div>
                      <div className="text-[10px] font-bold text-white">{item.label}</div>
                      <div className="text-[9px] text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-black/40 border border-[var(--color-border)] p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 text-[8px] text-[var(--cyber-cyan)]/50 bg-[var(--cyber-cyan)]/10">ID_LOG_FILE</div>
          <h3 className="text-[10px] font-bold text-[var(--cyber-yellow)] uppercase tracking-widest mb-4">[ Op_Timeline ]</h3>
          
          <div className="relative">
            <div className="absolute left-2.5 top-0 bottom-0 w-[1px] bg-[var(--cyber-cyan)]/30" />
            <div className="space-y-4">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-[3px] top-1 w-3 h-3 bg-black border border-[var(--cyber-cyan)] flex items-center justify-center transform rotate-45">
                    </div>
                    <div className="text-[9px] font-bold text-[var(--cyber-cyan)] mb-0.5">{item.year}</div>
                    <div className="text-[11px] text-gray-300">{item.event}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--color-border)] space-y-2">
            <p className="text-[9px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest mb-2">[ Certs_Acquired ]</p>
            {["CEH", "CompTIA Security+", "TryHackMe Top 1%", "HackTheBox Pro"].map((c) => (
              <div key={c} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[var(--cyber-cyan)] rounded-full" />
                <span className="text-[10px] text-gray-400">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
