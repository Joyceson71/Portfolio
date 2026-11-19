"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ShieldCheck, Crosshair, Radio } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";
import { useStore } from "@/lib/store";

interface RadarBlip {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

export function SpiderRadarHUD() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const toggleSfx = useStore((s) => s.toggleSfx);

  const [blips, setBlips] = useState<RadarBlip[]>([
    { id: "prime", name: "Joyceson (Prime)", x: 65, y: 35, color: "var(--skin-primary, #CC0000)" },
    { id: "miles", name: "Bio-Shock Node", x: 32, y: 68, color: "var(--skin-accent, #0047FF)" },
    { id: "stark", name: "Stark Sat Link", x: 70, y: 72, color: "#eab308" },
  ]);

  const [isPinging, setIsPinging] = useState(false);
  const [telemetryMessage, setTelemetryMessage] = useState("NANITE INTEGRITY: 100% · READY TO SHIP");
  const coordinates = "40.7128° N, 74.0060° W";

  useEffect(() => {
    const interval = setInterval(() => {
      // Gentle dynamic drift for radar blips simulating living city telemetry
      setBlips((prev) =>
        prev.map((b, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 18 + Math.random() * 22;
          const centerShift = i === 0 ? 50 : i === 1 ? 45 : 55;
          return {
            ...b,
            x: Math.min(85, Math.max(15, centerShift + Math.cos(angle) * radius)),
            y: Math.min(85, Math.max(15, centerShift + Math.sin(angle) * radius)),
          };
        })
      );
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleManualPing = useCallback(() => {
    if (sfxEnabled) {
      spiderAudio.playRadarPing();
    }
    setIsPinging(true);
    setTelemetryMessage("RADAR SCAN: 3 NODES VERIFIED · LATENCY 8ms");
    setTimeout(() => {
      setIsPinging(false);
      setTelemetryMessage("NANITE INTEGRITY: 100% · READY TO SHIP");
    }, 2800);
  }, [sfxEnabled]);

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
          onClick={handleManualPing}
          title="Click to emit Radar Ping"
          className="relative w-16 h-16 rounded-full border flex items-center justify-center bg-black/50 overflow-hidden shrink-0 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer group"
          style={{ borderColor: "var(--skin-border, rgba(204,0,0,0.4))" }}
        >
          {/* Concentric rings */}
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-4 rounded-full border border-white/10" />

          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-white/10" />
          <div className="absolute h-full w-[1px] bg-white/10" />

          {/* Sweep beam */}
          <div className={`absolute inset-0 pointer-events-none ${isPinging ? "animate-spin" : "animate-radar"}`} style={{ animationDuration: isPinging ? "1s" : "4s" }}>
            <div
              className="w-1/2 h-1/2 origin-bottom-right"
              style={{
                background: "linear-gradient(to top right, var(--skin-primary, #CC0000), transparent)",
                opacity: isPinging ? 0.6 : 0.35,
              }}
            />
          </div>

          {/* Ping ripple effect */}
          {isPinging && (
            <div
              className="absolute inset-0 rounded-full border border-[var(--skin-primary,#CC0000)] animate-ping opacity-60"
            />
          )}

          {/* Active multi-node blips */}
          {blips.map((blip) => (
            <div
              key={blip.id}
              className="absolute pointer-events-none"
              style={{
                left: `${blip.x}%`,
                top: `${blip.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-ping absolute -inset-0.5 opacity-70"
                style={{ background: blip.color }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full relative"
                style={{
                  background: blip.color,
                  boxShadow: `0 0 6px ${blip.color}`,
                }}
              />
            </div>
          ))}

          <Crosshair className="w-3.5 h-3.5 relative z-10 opacity-70 group-hover:scale-125 transition-transform" style={{ color: "var(--skin-primary, #CC0000)" }} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Spider-Sense HUD: Active
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/10 text-white/40">
              3 NODES
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/40 tracking-wider">
            SECTOR: NYC-QUEENS // {coordinates}
          </span>
          <span className="font-mono text-[10px] tracking-wider mt-0.5 transition-colors" style={{ color: isPinging ? "var(--skin-primary, #CC0000)" : "var(--skin-accent, #0047FF)" }}>
            {telemetryMessage}
          </span>
        </div>
      </div>

      {/* Right: Sound, Ping & HUD Control */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleManualPing}
          title="Emit radar ping sweep"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-white/[0.04] border border-white/10 hover:border-[var(--skin-primary,#CC0000)]/60 text-white/80 hover:text-white transition-all text-xs font-mono"
        >
          <Radio className={`w-3.5 h-3.5 ${isPinging ? "animate-pulse text-[var(--skin-primary,#CC0000)]" : "text-white/50"}`} />
          <span className="hidden sm:inline">PING</span>
        </button>

        <button
          onClick={toggleSfx}
          className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.04] border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all text-xs font-mono"
        >
          {!sfxEnabled ? (
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
