"use client";

import { motion } from "framer-motion";
import { Shield, Terminal, Bug, Key, Server, Eye } from "lucide-react";
import Link from "next/link";

const expertise = [
  { icon: Shield, label: "Web App Pentesting" },
  { icon: Bug,    label: "Vulnerability Research" },
  { icon: Key,    label: "Privilege Escalation" },
  { icon: Server, label: "Network Security" },
  { icon: Eye,    label: "OSINT" },
  { icon: Terminal, label: "CTF / Red Team" },
];

const certs = ["CEH", "CompTIA Security+", "TryHackMe Top 1%", "HackTheBox Pro"];


export function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-green-600 tracking-[0.3em] uppercase mb-3"
          >
            $ cat about.txt
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Ethical Hacker.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-sm text-green-700 max-w-xl leading-relaxed"
          >
            <span className="text-green-500/50">// </span>
            Offensive security specialist. I think like an attacker to defend like a pro.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

          {/* Left — Bio */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 mb-6"
            >
              <p className="text-xs text-green-600 mb-3 font-mono">/* bio */</p>
              <p className="text-sm text-green-200/70 leading-relaxed mb-4">
                I&apos;m <strong className="text-green-400">Joyceson Danielraj</strong>, an ethical hacker and
                security researcher passionate about breaking things (legally) to understand how
                they work — and how to defend them.
              </p>
              <p className="text-sm text-green-200/70 leading-relaxed">
                I specialize in web application penetration testing, network reconnaissance,
                and vulnerability disclosure. I actively participate in CTF competitions,
                bug bounty programs, and responsible disclosure.
              </p>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="glass-panel p-6"
            >
              <p className="text-xs text-green-600 mb-4 font-mono">$ ls certifications/</p>
              <div className="flex flex-wrap gap-2">
                {certs.map((c) => (
                  <span key={c} className="hack-badge">{c}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Expertise grid */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-green-600 tracking-[0.2em] uppercase mb-4 font-mono"
            >
              $ ls expertise/
            </motion.p>
            <div className="grid grid-cols-2 gap-4">
              {expertise.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="glass-panel p-5 flex items-start gap-3 group"
                >
                  <item.icon
                    className="w-5 h-5 text-green-400 mt-0.5 shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all"
                    style={{ filter: "drop-shadow(0 0 4px rgba(0,255,65,0.4))" }}
                  />
                  <span className="text-sm text-green-300/80 font-mono">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Link href="#contact" className="inline-flex items-center gap-2 text-sm font-mono text-green-500 hover:text-green-400 transition-colors">
                <span className="text-green-700">$</span> ./initiate_contact.sh<span className="cursor-blink" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
