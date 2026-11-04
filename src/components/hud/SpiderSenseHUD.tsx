"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

// ── Spider-Sense HUD Overlay ───────────────────────────────────
// Persistent top-right HUD showing: active section, scroll %, FPS, NYC coords.
// Cybernetic glass HUD panel with corner reticles & nanite mesh telemetry.

const NYC_LAT = "40.7128° N";
const NYC_LNG = "74.0060° W";

function useFPS() {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let last = performance.now();
    let count = 0;
    let rafId: number;

    function loop(now: number) {
      count++;
      if (now - last >= 1000) {
        setFps(count);
        count = 0;
        last = now;
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return fps;
}

export function SpiderSenseHUD() {
  const scrollProgress = useStore((s) => s.scrollProgress);
  const activeSection  = useStore((s) => s.activeSection);
  const skin           = useStore((s) => s.skin);
  const fps = useFPS();

  const scrollPct = Math.round(scrollProgress * 100);
  const sectionLabel = activeSection.toUpperCase();

  // Nanite integrity: maps to scroll (flavor text)
  const naniteIntegrity = Math.round(100 - scrollProgress * 30);

  return (
    <div
      className="fixed top-20 right-4 z-[200] pointer-events-none select-none hidden md:block"
      aria-hidden="true"
    >
      <div className="relative font-mono text-[9px] uppercase tracking-widest leading-relaxed text-right p-3 rounded-sm bg-[#080810]/85 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-hud-flicker space-y-1">
        {/* Tactical cyber corner reticles */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--skin-primary,#CC0000)]/70" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--skin-primary,#CC0000)]/70" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--skin-primary,#CC0000)]/70" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--skin-primary,#CC0000)]/70" />

        <div className="flex items-center justify-between gap-3 text-white/30 border-b border-white/[0.06] pb-1">
          <span className="text-[8px] text-[var(--skin-primary,#CC0000)] font-bold tracking-tight">● SPIDER-SENSE</span>
          <span className="text-[8px]">ONLINE</span>
        </div>

        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          SECTOR: <span className="text-white/70">{sectionLabel}</span>
        </div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          PROGRESS: <span className="text-white/70">{scrollPct}%</span>
        </div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          FPS: <span className={fps >= 50 ? "text-emerald-400" : fps >= 30 ? "text-amber-400" : "text-rose-400"}>{fps}</span>
        </div>

        <div className="text-white/15 my-0.5">──────────────</div>

        <div style={{ color: "var(--skin-accent, #0047FF)" }}>
          LAT: <span className="text-white/50">{NYC_LAT}</span>
        </div>
        <div style={{ color: "var(--skin-accent, #0047FF)" }}>
          LNG: <span className="text-white/50">{NYC_LNG}</span>
        </div>

        <div className="text-white/15 my-0.5">──────────────</div>

        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          SUIT: <span className="text-white/70">{skin.toUpperCase()}</span>
        </div>

        {/* Nanite Integrity Mini Bar */}
        <div className="pt-0.5">
          <div className="flex justify-between items-center text-[8px] mb-0.5 text-white/40">
            <span>NANITE MESH</span>
            <span className="text-white/70 font-semibold">{naniteIntegrity}%</span>
          </div>
          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${naniteIntegrity}%`,
                background: "var(--skin-primary, #CC0000)",
                boxShadow: "0 0 6px var(--skin-primary, #CC0000)",
              }}
            />
          </div>
        </div>

        <div className="pt-1 flex items-center justify-end gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-emerald-400/90 font-mono tracking-wider">SYS_NOMINAL</span>
        </div>
      </div>
    </div>
  );
}
