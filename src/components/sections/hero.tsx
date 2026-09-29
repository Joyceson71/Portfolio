"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, Terminal, Wifi, Lock } from "lucide-react";

const BOOT_LINES = [
  "[  0.000000] Booting secure OS kernel...",
  "[  0.082341] Loading intrusion detection modules...",
  "[  0.193521] Network interfaces: eth0 OK, lo OK",
  "[  0.421034] Firewall rules initialized [ OK ]",
  "[  0.609112] Mounting encrypted volumes [ OK ]",
  "[  0.811500] Establishing TOR circuit...",
  "[  1.003421] User: joyceson@0xh4ck — authentication passed",
  "[  1.200000] System ready. Welcome, operator.",
];

const STATS = [
  { icon: Shield, label: "CVEs Found",    value: "12+" },
  { icon: Lock,   label: "Certs",         value: "CEH" },
  { icon: Wifi,   label: "Pentests",      value: "30+" },
  { icon: Terminal, label: "CTF Solves",  value: "80+" },
];

export function Hero() {
  const [bootDone, setBootDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(() => setBootDone(true), 600);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">

      {/* Boot screen */}
      <AnimatePresence>
        {!bootDone && mounted && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] bg-[#030a03] flex flex-col justify-center px-8 md:px-24 font-mono"
          >
            <div className="max-w-3xl space-y-1">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs md:text-sm text-green-400/80"
                  style={{ textShadow: "0 0 6px rgba(0,255,65,0.5)" }}
                >
                  {line}
                </motion.p>
              ))}
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main hero content */}
      <AnimatePresence>
        {bootDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 hack-badge"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>root@j0yceson ~ — available for engagements</span>
            </motion.div>

            {/* ASCII-style name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4"
            >
              <p className="text-xs text-green-600 tracking-[0.3em] uppercase mb-3 font-mono">
                $ whoami
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-mono leading-none">
                <span className="text-gradient">Joyceson</span>
                <br />
                <span className="text-gradient-blue">Danielraj</span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-green-600 max-w-2xl mb-4 leading-relaxed font-mono"
            >
              <span className="text-green-400/50">// </span>
              Ethical Hacker · Penetration Tester · Security Researcher
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm text-green-700 max-w-xl mb-12 leading-relaxed"
            >
              I break into systems legally — finding vulnerabilities before the bad actors do.
              Specializing in web app pentesting, CTF competitions, and security-hardened engineering.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-2xl"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="glass-panel p-4 flex flex-col items-center gap-1"
                >
                  <stat.icon className="w-4 h-4 text-green-400 mb-1" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,65,0.7))" }} />
                  <span className="text-2xl font-bold text-green-400" style={{ textShadow: "0 0 10px rgba(0,255,65,0.6)" }}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-green-700 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="#projects" className="btn-primary w-full sm:w-auto">
                <Terminal className="w-4 h-4 mr-2" />
                ./view_exploits.sh
              </Link>
              <Link href="#contact" className="btn-secondary w-full sm:w-auto">
                <Lock className="w-4 h-4 mr-2" />
                initiate_contact()
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
