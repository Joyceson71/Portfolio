"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, ShieldCheck, Crosshair } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

export function SpiderRadarHUD() {
  const [muted, setMuted] = useState(false);
  const [blipPos, setBlipPos] = useState({ x: 65, y: 35 });
  const coordinates = "40.7128° N, 74.0060° W";

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
    <div
      className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-sm bg-[#0d0d1a]/85 border backdrop-blur-md transition-colors duration-300 shadow-lg"
      style={{ borderColor: "var(--skin-border, rgba(204,0,0,0.25))" }}
    >
      {/* Corner bracket accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: "var(--skin-primary, #CC0000)" }} />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: "var(--skin-primary, #CC0000)" }} />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: "var(--skin-primary, #CC0000)" }} />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: "var(--skin-primary, #CC0000)" }} />

      {/* Left: Radar Graphic */}
      <div className="flex items-center gap-4">
        <div
          className="relative w-16 h-16 rounded-full border flex items-center justify-center bg-black/50 overflow-hidden shrink-0 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          style={{ borderColor: "var(--skin-border, rgba(204,0,0,0.4))" }}
        >
          {/* Concentric rings */}
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-4 rounded-full border border-white/10" />
          
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-white/10" />
          <div className="absolute h-full w-[1px] bg-white/10" />

          {/* Sweep beam */}
          <div className="absolute inset-0 animate-radar pointer-events-none">
            <div
              className="w-1/2 h-1/2 origin-bottom-right"
              style={{
                background: "linear-gradient(to top right, var(--skin-primary, #CC0000), transparent)",
                opacity: 0.35,
              }}
            />
          </div>

          {/* Active threat/friendly blip */}
          <div
            className="absolute w-2 h-2 rounded-full animate-ping"
            style={{
              left: `${blipPos.x}%`,
              top: `${blipPos.y}%`,
              transform: "translate(-50%, -50%)",
              background: "var(--skin-accent, #0047FF)",
              boxShadow: "0 0 8px var(--skin-accent, #0047FF)",
            }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${blipPos.x}%`,
              top: `${blipPos.y}%`,
              transform: "translate(-50%, -50%)",
              background: "var(--skin-accent, #0047FF)",
            }}
          />

          <Crosshair className="w-3.5 h-3.5 relative z-10 opacity-70" style={{ color: "var(--skin-primary, #CC0000)" }} />
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
          <span className="font-mono text-[10px] tracking-wider mt-0.5" style={{ color: "var(--skin-accent, #0047FF)" }}>
            NANITE INTEGRITY: 100% · READY TO SHIP
          </span>
        </div>
      </div>

      {/* Right: Sound & HUD Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.04] border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all text-xs font-mono"
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
              <span>SFX: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" style={{ color: "var(--skin-primary, #CC0000)" }} />
              <span style={{ color: "var(--skin-primary, #CC0000)" }}>SFX: ON</span>
            </>
          )}
        </button>

        <div
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-sm border font-mono text-xs"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "var(--skin-border, rgba(204,0,0,0.3))",
            color: "var(--skin-primary, #CC0000)",
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>V16.2 · 0 ERRORS</span>
        </div>
      </div>
    </div>
  );
}
