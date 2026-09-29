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
    <div className="w-full h-full flex flex-col gap-6 text-slate-200">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
          Who Am I
        </h2>
        <p className="text-sm text-slate-400">
          Offensive security specialist. I think like an attacker to defend like a pro.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
          >
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {s.value}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bio terminal */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="xl:col-span-2 bg-slate-900/40 border border-white/10 rounded-xl p-6"
        >
          <div className="space-y-3 text-sm text-slate-300 leading-relaxed mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Background</h3>
            <p>
              I&apos;m an <span className="text-blue-400 font-medium">offensive security specialist</span> who
              breaks into systems legally — finding vulnerabilities before the bad actors do.
            </p>
            <p>
              My journey started with a curiosity about how systems fail. That curiosity turned into
              a career: web application pentesting, network recon, exploit development, and responsible
              vulnerability disclosure.
            </p>
            <p>
              I also build security-hardened web applications — because understanding how to break
              things makes me a better builder.
            </p>
          </div>

          {/* Expertise grid */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Core Expertise
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {expertise.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-200">{item.label}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/40 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Timeline</h3>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-6">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-10"
                  >
                    <div
                      className="absolute left-[3px] top-1 w-5 h-5 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center"
                    >
                      <Icon className="w-2.5 h-2.5 text-blue-400" />
                    </div>
                    <div className="text-xs font-semibold text-blue-400 mb-0.5">{item.year}</div>
                    <div className="text-sm text-slate-300">{item.event}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Certifications</p>
            {["CEH", "CompTIA Security+", "TryHackMe Top 1%", "HackTheBox Pro"].map((c) => (
              <div key={c} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-sm text-slate-300">{c}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
