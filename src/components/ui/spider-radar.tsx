"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Radio, ShieldCheck, Crosshair } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

export function SpiderRadarHUD() {
  const [muted, setMuted] = useState(false);
  const [blipPos, setBlipPos] = useState({ x: 65, y: 35 });
  const [coordinates, setCoordinates] = useState("40.7128° N, 74.0060° W");

  useEffect(() => {
    const interval = setInterval(() => {
      // Random subtle blip relocation simulating city radar signals
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 25;
      setBlipPos({
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    spiderAudio.isMuted = next;
    if (!next) {
      spiderAudio.playBlip(750, 0.1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded bg-[#0d0d1a]/80 border border-[#CC0000]/25 backdrop-blur-md">
      {/* Left: Radar Graphic */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full border border-[#CC0000]/40 flex items-center justify-center bg-black/40 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(204,0,0,0.15)]">
          {/* Concentric rings */}
          <div className="absolute inset-2 rounded-full border border-[#CC0000]/20" />
          <div className="absolute inset-4 rounded-full border border-[#CC0000]/20" />
          
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-[#CC0000]/20" />
          <div className="absolute h-full w-[1px] bg-[#CC0000]/20" />

          {/* Sweep beam */}
          <div className="absolute inset-0 animate-radar pointer-events-none">
            <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tr from-[#CC0000]/40 to-transparent" />
          </div>

          {/* Active threat/friendly blip */}
          <div
            className="absolute w-2 h-2 rounded-full bg-[#0047FF] shadow-[0_0_8px_#0047FF] animate-ping"
            style={{ left: `${blipPos.x}%`, top: `${blipPos.y}%`, transform: "translate(-50%, -50%)" }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#0047FF]"
            style={{ left: `${blipPos.x}%`, top: `${blipPos.y}%`, transform: "translate(-50%, -50%)" }}
          />

          <Crosshair className="w-3 h-3 text-[#CC0000]/60 relative z-10" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Spider-Sense HUD: Active
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/40 tracking-wider">
            SECTOR: NYC-QUEENS // {coordinates}
          </span>
          <span className="font-mono text-[10px] text-[#0047FF] tracking-wider mt-0.5">
            NANITE INTEGRITY: 100% · READY TO SHIP
          </span>
        </div>
      </div>

      {/* Right: Sound & HUD Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 hover:border-[#CC0000]/50 text-white/80 hover:text-white transition-all text-xs font-mono"
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
              <span>SFX: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#CC0000] animate-pulse" />
              <span className="text-[#CC0000]">SFX: ON</span>
            </>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-[#CC0000]/10 border border-[#CC0000]/30 text-[#CC0000] font-mono text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>V16.2 · 0 ERRORS</span>
        </div>
      </div>
    </div>
  );
}
