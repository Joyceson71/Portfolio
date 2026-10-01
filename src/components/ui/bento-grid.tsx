"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Clock, 
  Activity, 
  Cpu, 
  Globe2, 
  GitCommit, 
  CheckCircle,
  Shield,
  Layers
} from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

export function BentoGrid() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* ── CARD 1: Core Philosophy & Suit OS (Col span 2) ── */}
      <motion.div
        whileHover={{ y: -4 }}
        onMouseEnter={() => spiderAudio.playBlip(620, 0.04)}
        className="md:col-span-2 p-6 md:p-8 rounded-sm bg-[#0c0c18] border border-[#CC0000]/30 hover:border-[#CC0000]/70 transition-all duration-300 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#CC0000]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#CC0000]/20 transition-all" />
        
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#CC0000]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#CC0000]">
            Peter's Principle // Engineering Ethos
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
          "With great computing power comes great responsiveness."
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
          I build web applications that don't just function — they react with spider-like reflexes. 
          Zero jank, 60 FPS Three.js scenes, pixel-strict accessibility, and production architecture that holds under high load.
        </p>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold text-white">99+</span>
            <span className="font-mono text-[10px] text-white/40 uppercase">Performance</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold text-[#0047FF]">100%</span>
            <span className="font-mono text-[10px] text-white/40 uppercase">Type Safety</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold text-[#CC0000]">&lt; 50ms</span>
            <span className="font-mono text-[10px] text-white/40 uppercase">Render Latency</span>
          </div>
        </div>
      </motion.div>

      {/* ── CARD 2: Live Status & Clock ── */}
      <motion.div
        whileHover={{ y: -4 }}
        onMouseEnter={() => spiderAudio.playBlip(780, 0.04)}
        className="p-6 rounded-sm bg-[#0c0c18] border border-white/[0.08] hover:border-[#0047FF]/60 transition-all duration-300 relative flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0047FF]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Local Clock</span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

        <div className="my-auto py-4 text-center">
          <div className="font-mono text-3xl font-bold tracking-widest text-white group-hover:text-[#0047FF] transition-colors">
            {time || "00:00:00"}
          </div>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1 block">
            UTC / REMOTE READY
          </span>
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="font-mono text-[11px] text-white/60">Availability</span>
          <span className="font-mono text-[11px] text-emerald-400 font-bold">ONLINE</span>
        </div>
      </motion.div>

      {/* ── CARD 3: 3D Dimension Canvas ── */}
      <motion.div
        whileHover={{ y: -4 }}
        onMouseEnter={() => spiderAudio.playBlip(840, 0.04)}
        className="p-6 rounded-sm bg-[#0c0c18] border border-white/[0.08] hover:border-[#CC0000]/60 transition-all duration-300 relative flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#CC0000]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">3D Graphics</span>
          </div>
          <span className="font-mono text-[9px] text-[#CC0000] border border-[#CC0000]/30 px-1.5 py-0.5 rounded">R3F</span>
        </div>

        <div className="relative py-4 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-dashed border-[#CC0000]/40 flex items-center justify-center animate-spin" style={{ animationDuration: "12s" }}>
            <div className="w-12 h-12 rounded-full border border-dashed border-[#0047FF]/50 flex items-center justify-center animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }}>
              <Cpu className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-1">WebGL & Shaders</h4>
          <p className="text-white/40 text-xs">Transforming flat websites into dimensional living ecosystems.</p>
        </div>
      </motion.div>

      {/* ── CARD 4: Commit Matrix / Shipping Velocity (Col span 2) ── */}
      <motion.div
        whileHover={{ y: -4 }}
        onMouseEnter={() => spiderAudio.playBlip(550, 0.04)}
        className="md:col-span-2 p-6 rounded-sm bg-[#0c0c18] border border-white/[0.08] hover:border-[#CC0000]/50 transition-all duration-300 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-[#CC0000]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
              Web Sling Velocity // Active Commits
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/40">100+ pushes this year</span>
        </div>

        {/* Heatmap visualization */}
        <div className="grid grid-cols-12 gap-1.5 my-3">
          {Array.from({ length: 48 }).map((_, idx) => {
            const intensity = idx % 5 === 0 ? "bg-[#CC0000]" : idx % 3 === 0 ? "bg-[#CC0000]/60" : idx % 2 === 0 ? "bg-[#0047FF]/40" : "bg-white/10";
            return (
              <div
                key={idx}
                className={`h-4 rounded-xs ${intensity} hover:scale-125 transition-transform`}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-white/40 font-mono mt-3">
          <span>Frontend Architecture</span>
          <span className="text-white/80 font-semibold">Continuous Delivery</span>
        </div>
      </motion.div>

      {/* ── CARD 5: Spider-Sense Fullstack Stack (Col span 2) ── */}
      <motion.div
        whileHover={{ y: -4 }}
        onMouseEnter={() => spiderAudio.playBlip(700, 0.04)}
        className="md:col-span-2 p-6 rounded-sm bg-[#0c0c18] border border-white/[0.08] hover:border-[#0047FF]/50 transition-all duration-300 relative flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0047FF]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
              Stack Resilience
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#0047FF]">STARK TIER ARCHITECTURE</span>
        </div>

        <div className="space-y-2.5 my-2">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-white/70">App Router & Server Actions</span>
              <span className="text-[#CC0000]">Next.js 16</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[96%] h-full bg-[#CC0000]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-white/70">Reactive Concurrency & Hooks</span>
              <span className="text-[#0047FF]">React 19</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[92%] h-full bg-[#0047FF]" />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
          <span>Fully compliant with strict TypeScript</span>
          <span className="text-white font-mono">0 any types</span>
        </div>
      </motion.div>
    </div>
  );
}
