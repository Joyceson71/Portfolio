"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Terminal, Shield, ChevronDown } from "lucide-react";

/* ── Typewriter lines ── */
const TERMINAL_LINES = [
  { delay: 0,    text: "Initializing secure environment..." },
  { delay: 600,  text: "Loading exploit modules [OK]" },
  { delay: 1100, text: "Network recon: passive mode [ACTIVE]" },
  { delay: 1600, text: "Connecting to TOR exit node [OK]" },
  { delay: 2000, text: "Authentication: joyceson@0xh4ck [OK]" },
  { delay: 2400, text: "" },
  { delay: 2500, text: "> whoami" },
  { delay: 3000, text: "  joyceson — ethical hacker / security researcher" },
  { delay: 3300, text: "" },
  { delay: 3400, text: "> cat mission.txt" },
  { delay: 3800, text: "  Break things legally. Fix them permanently." },
  { delay: 4100, text: "  Turning vulnerabilities into victories." },
  { delay: 4400, text: "" },
  { delay: 4500, text: "> status --check" },
];

const STATUS_ITEMS = [
  { key: "USER",       value: "joyceson@0xh4ck" },
  { key: "ROLE",       value: "Ethical Hacker / Pentester" },
  { key: "OS",         value: "Kali Linux 2026.1 x86_64" },
  { key: "UPTIME",     value: "2+ years" },
  { key: "CVEs",       value: "12 discovered" },
  { key: "CTF_RANK",   value: "Top 1% TryHackMe" },
  { key: "BUG_BOUNTY", value: "30+ targets pentested" },
  { key: "STATUS",     value: "AVAILABLE FOR HIRE" },
];

function TypewriterTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase >= TERMINAL_LINES.length) {
      setDone(true);
      return;
    }
    const { delay, text } = TERMINAL_LINES[phase];
    const timer = setTimeout(() => {
      if (!text) {
        setLines((prev) => [...prev, ""]);
        setPhase((p) => p + 1);
        return;
      }
      // Type character by character
      let i = 0;
      setCurrentTyping("");
      const charTimer = setInterval(() => {
        i++;
        setCurrentTyping(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(charTimer);
          setLines((prev) => [...prev, text]);
          setCurrentTyping("");
          setPhase((p) => p + 1);
        }
      }, 28);
      return () => clearInterval(charTimer);
    }, delay);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, currentTyping]);

  return (
    <div className="term-window h-full flex flex-col scan-sweep">
      <div className="term-titlebar" data-title="terminal — bash">
        <span className="term-dot term-dot-red" />
        <span className="term-dot term-dot-yellow" />
        <span className="term-dot term-dot-green" />
        <span className="ml-3 text-[10px] font-mono text-green-800">joyceson@0xh4ck: ~</span>
      </div>
      <div className="flex-1 p-5 overflow-y-auto text-xs font-mono leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith(">")
                ? "text-green-400"
                : line.startsWith("  ")
                ? "text-green-600"
                : "text-green-800"
            }`}
          >
            {line || "\u00a0"}
          </div>
        ))}
        {currentTyping && (
          <div className="text-green-400">
            {currentTyping}
            <span className="animate-pulse">█</span>
          </div>
        )}
        {done && (
          <div className="mt-1">
            <div className="text-green-400">
              {">"} <span className="cursor-blink" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

function StatusPanel() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r >= STATUS_ITEMS.length) { clearInterval(id); return r; }
        return r + 1;
      });
    }, 350);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="term-window h-full flex flex-col">
      <div className="term-titlebar" data-title="neofetch — profile">
        <span className="term-dot term-dot-red" />
        <span className="term-dot term-dot-yellow" />
        <span className="term-dot term-dot-green" />
        <span className="ml-3 text-[10px] font-mono text-green-800">system info</span>
      </div>
      <div className="flex-1 p-5">
        {/* ASCII logo */}
        <pre className="text-[9px] leading-tight mb-5 select-none" style={{ color: "rgba(0,255,65,0.25)", textShadow: "0 0 6px rgba(0,255,65,0.2)" }}>
{`  ██╗ ██████╗ ██╗   ██╗
  ██║██╔═══██╗╚██╗ ██╔╝
  ██║██║   ██║ ╚████╔╝ 
 ██╔╝██║   ██║ ██╔██╗  
 ██║ ╚██████╔╝██╔╝ ██╗ 
 ╚═╝  ╚═════╝ ╚═╝  ╚═╝`}
        </pre>
        {/* System stats */}
        <div className="space-y-2">
          {STATUS_ITEMS.slice(0, revealed).map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 text-xs font-mono"
            >
              <span className="text-green-700 w-24 shrink-0">{item.key}</span>
              <span className="text-green-800">:</span>
              <span
                className={item.key === "STATUS" ? "text-green-400 font-bold" : "text-green-500"}
                style={item.key === "STATUS" ? { textShadow: "0 0 8px rgba(0,255,65,0.6)" } : {}}
              >
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Glow bar separator */}
        {revealed >= STATUS_ITEMS.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <div className="glow-bar w-full mb-4" />
            <p className="text-[10px] font-mono text-green-800 leading-relaxed">
              Certified Ethical Hacker (CEH) · CompTIA Security+<br />
              TryHackMe Top 1% · HackTheBox Pro Hacker<br />
              OWASP Top-10 Specialist · Bug Bounty Hunter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 py-16 md:py-24"
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-8"
      >
        <Shield
          className="w-4 h-4 text-green-400"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,255,65,0.8))" }}
        />
        <span className="text-[10px] font-mono text-green-700 tracking-[0.3em] uppercase">
          Authorized Access Only — Ethical Hacker Portfolio
        </span>
        <span className="h-px flex-1 bg-green-900/50" />
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] font-mono text-green-700">ONLINE</span>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono leading-none tracking-tighter mb-3 glitch"
          data-text="JOYCESON"
          style={{ color: "rgba(0,255,65,0.9)", textShadow: "0 0 30px rgba(0,255,65,0.4)" }}
        >
          JOYCESON
        </h1>
        <h2
          className="text-2xl md:text-4xl font-mono font-bold tracking-widest"
          style={{ color: "rgba(0,204,51,0.6)", textShadow: "0 0 16px rgba(0,204,51,0.3)" }}
        >
          DANIELRAJ
        </h2>
        <p className="mt-4 text-xs font-mono text-green-800 tracking-[0.25em] uppercase">
          Ethical Hacker · Penetration Tester · Security Researcher
        </p>
      </motion.div>

      {/* Two-panel terminal layout */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10"
          style={{ height: "clamp(280px, 35vh, 380px)" }}
        >
          <TypewriterTerminal />
          <StatusPanel />
        </motion.div>
      )}

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap items-center gap-4"
      >
        <Link href="#projects" className="btn-primary">
          <Terminal className="w-4 h-4" />
          ./view_projects.sh
        </Link>
        <Link href="#contact" className="btn-secondary">
          <Shield className="w-4 h-4" />
          initiate_contact()
        </Link>
        <span className="text-xs font-mono text-green-900 hidden md:block">
          — scroll down to explore ↓
        </span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-green-900"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
