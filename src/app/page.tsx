"use client";

import { motion } from "framer-motion";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Target, Crosshair, Cpu, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

function HUDHeader() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const tick = () => setTime(new Date().toISOString());
    tick();
    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full border-b border-[var(--color-border)] p-4 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Target className="w-6 h-6 text-[var(--cyber-cyan)] animate-spin-slow" />
        <div>
          <h1 className="text-xl font-bold font-mono cyber-glitch-text uppercase tracking-widest">
            SYS.OP // Joyceson
          </h1>
          <div className="text-[10px] font-mono text-[var(--cyber-cyan)] uppercase tracking-[0.2em]">
            Threat Intel & Offsec
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6 font-mono text-[10px] text-[var(--cyber-cyan)]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" /> CPU_OPT: NOMINAL
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" /> UPLINK: SECURE
        </div>
        <div>
          SYS_TIME: {time}
        </div>
      </div>
    </header>
  );
}

function HUDFooter() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] p-2 flex justify-between items-center bg-black/50 font-mono text-[10px] text-[var(--cyber-cyan)] uppercase mt-20">
      <div>END_OF_TRANSMISSION</div>
      <div>SEC_LEVEL: ALPHA</div>
      <div>©2026 // ALL_RIGHTS_RESERVED</div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative w-full min-h-screen px-4 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-[1400px] flex flex-col relative">
        <HUDHeader />
        
        {/* Main Content Grid */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6 pb-20">
          
          {/* Left Column (Stats & Skills) */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="cyber-container flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 mb-2">
                <Crosshair className="w-4 h-4 text-[var(--cyber-cyan)]" />
                <h2 className="text-xs font-mono text-[var(--cyber-cyan)] uppercase tracking-widest">
                  Identity_Matrix
                </h2>
              </div>
              <About />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="cyber-container flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 mb-2">
                <Cpu className="w-4 h-4 text-[var(--cyber-pink)]" />
                <h2 className="text-xs font-mono text-[var(--cyber-pink)] uppercase tracking-widest">
                  Neural_Uplink
                </h2>
              </div>
              <Skills />
            </motion.div>
          </div>

          {/* Right Column (Projects & Contact) */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="cyber-container flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 mb-2">
                <Target className="w-4 h-4 text-[var(--cyber-yellow)]" />
                <h2 className="text-xs font-mono text-[var(--cyber-yellow)] uppercase tracking-widest">
                  Op_History
                </h2>
              </div>
              <Projects />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="cyber-container flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 mb-2">
                <Wifi className="w-4 h-4 text-[var(--cyber-cyan)]" />
                <h2 className="text-xs font-mono text-[var(--cyber-cyan)] uppercase tracking-widest">
                  Comm_Link
                </h2>
              </div>
              <Contact />
            </motion.div>
          </div>

        </div>

        <HUDFooter />
      </div>
    </main>
  );
}