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
    <section id="about" className="relative w-full py-20 md:py-32 px-6 md:px-12">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="section-prompt">cat about.md</div>
        <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-3">
          <span className="text-gradient">WHO AM I</span>
        </h2>
        <p className="text-xs font-mono text-green-800">
          <span className="text-green-900">// </span>Offensive security specialist. I think like an attacker to defend like a pro.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="term-window p-5 text-center group hover:border-green-500/30 transition-all"
          >
            <div
              className="text-3xl font-bold font-mono mb-1"
              style={{ color: "#00ff41", textShadow: "0 0 16px rgba(0,255,65,0.6)" }}
            >
              {s.value}
            </div>
            <div className="text-[10px] font-mono text-green-800 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bio terminal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 term-window scan-sweep"
        >
          <div className="term-titlebar" data-title="about.md — vim">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="ml-3 text-[10px] font-mono text-green-800">about.md</span>
          </div>
          <div className="p-7">
            <div className="space-y-1 mb-6 text-xs font-mono">
              <p className="text-green-900">{"# Joyceson Danielraj — Ethical Hacker"}</p>
              <p className="text-green-900 mb-3">{"---"}</p>
              <p className="text-green-700 leading-relaxed">
                I&apos;m an <span className="text-green-400 font-bold">offensive security specialist</span> who
                breaks into systems legally — finding vulnerabilities before the bad actors do.
              </p>
              <p className="text-green-800 leading-relaxed mt-2">
                My journey started with a curiosity about how systems fail. That curiosity turned into
                a career: web application pentesting, network recon, exploit development, and responsible
                vulnerability disclosure.
              </p>
              <p className="text-green-800 leading-relaxed mt-2">
                I also build security-hardened web applications — because understanding how to break
                things makes me a better builder.
              </p>
            </div>

            {/* Expertise grid */}
            <div className="mt-6">
              <p className="text-[10px] font-mono text-green-900 uppercase tracking-widest mb-4">
                $ ls expertise/ --detail
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertise.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 p-3 border border-green-900/30 hover:border-green-700/50 transition-colors group"
                    >
                      <Icon
                        className="w-4 h-4 text-green-700 shrink-0 mt-0.5 group-hover:text-green-400 transition-colors"
                        style={{ filter: "drop-shadow(0 0 4px rgba(0,255,65,0.3))" }}
                      />
                      <div>
                        <div className="text-xs font-mono text-green-500 font-bold">{item.label}</div>
                        <div className="text-[10px] font-mono text-green-800 mt-0.5">{item.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-900/30">
              <Link
                href="#contact"
                className="text-xs font-mono text-green-700 hover:text-green-400 transition-colors"
              >
                <span className="text-green-900">$ </span>./initiate_contact.sh<span className="cursor-blink" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="term-window"
        >
          <div className="term-titlebar" data-title="timeline.log">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="ml-3 text-[10px] font-mono text-green-800">timeline.log</span>
          </div>
          <div className="p-6">
            <p className="text-[10px] font-mono text-green-900 uppercase tracking-widest mb-5">
              $ git log --oneline
            </p>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-green-900/50" />
              <div className="space-y-5">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 }}
                      className="relative pl-8 flex flex-col gap-0.5"
                    >
                      <div
                        className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-green-900 border border-green-700 flex items-center justify-center"
                        style={{ boxShadow: "0 0 6px rgba(0,255,65,0.3)" }}
                      >
                        <Icon className="w-1.5 h-1.5 text-green-400" />
                      </div>
                      <span className="text-[10px] font-mono text-green-800 tracking-widest">{item.year}</span>
                      <span className="text-xs font-mono text-green-600">{item.event}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-900/30 space-y-1">
              <p className="text-[10px] font-mono text-green-900 uppercase tracking-widest">certs</p>
              {["CEH", "CompTIA Security+", "TryHackMe Top 1%", "HackTheBox Pro"].map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-600 rounded-full" />
                  <span className="text-[10px] font-mono text-green-700">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
