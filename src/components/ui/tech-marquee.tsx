"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Database, 
  Flame, 
  Globe, 
  Layers, 
  Sparkles, 
  Terminal, 
  Zap,
  Box,
  Server,
  Atom
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: any;
  color?: string;
}

const row1: TechItem[] = [
  { name: "React 19", category: "Core", icon: Atom, color: "#0047FF" },
  { name: "Next.js 16", category: "Framework", icon: Zap, color: "#CC0000" },
  { name: "TypeScript", category: "Language", icon: Code2, color: "#0047FF" },
  { name: "Three.js", category: "3D Graphics", icon: Box, color: "#CC0000" },
  { name: "Tailwind CSS v4", category: "Styling", icon: Flame, color: "#0047FF" },
  { name: "Framer Motion", category: "Animation", icon: Sparkles, color: "#CC0000" },
  { name: "Node.js", category: "Runtime", icon: Server, color: "#0047FF" },
  { name: "WebGL / GLSL", category: "Shaders", icon: Cpu, color: "#CC0000" },
];

const row2: TechItem[] = [
  { name: "PostgreSQL", category: "Database", icon: Database, color: "#0047FF" },
  { name: "Prisma ORM", category: "Data", icon: Layers, color: "#CC0000" },
  { name: "Docker", category: "DevOps", icon: Terminal, color: "#0047FF" },
  { name: "GraphQL", category: "API", icon: Globe, color: "#CC0000" },
  { name: "WebSockets", category: "Realtime", icon: Zap, color: "#0047FF" },
  { name: "Zustand", category: "State", icon: Box, color: "#CC0000" },
  { name: "GSAP", category: "Motion", icon: Sparkles, color: "#0047FF" },
  { name: "Git & CI/CD", category: "Workflow", icon: Terminal, color: "#CC0000" },
];

export function TechMarquee() {
  return (
    <div className="relative w-full py-10 overflow-hidden bg-[#080810]/60 border-y border-white/[0.04]">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#080810] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#080810] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Leftward Marquee */}
      <div className="flex overflow-hidden mb-4">
        <div className="animate-marquee-left flex gap-4 items-center">
          {[...row1, ...row1, ...row1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r1-${idx}`}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-sm bg-[#0c0c18] border border-white/[0.06] hover:border-[#CC0000]/60 transition-all duration-300 cursor-default shrink-0 shadow-lg"
              >
                <div 
                  className="w-7 h-7 rounded flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] text-white/35 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Rightward Marquee */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right flex gap-4 items-center">
          {[...row2, ...row2, ...row2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r2-${idx}`}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-sm bg-[#0c0c18] border border-white/[0.06] hover:border-[#0047FF]/60 transition-all duration-300 cursor-default shrink-0 shadow-lg"
              >
                <div 
                  className="w-7 h-7 rounded flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] text-white/35 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
