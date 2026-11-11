"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { spiderAudio } from "@/lib/spider-audio";

// ── Spider-Sense HUD Overlay ───────────────────────────────────
// Persistent HUD showing: active section, scroll %, FPS, NYC coords.
// Cybernetic glass HUD panel on desktop + sleek telemetry pill on mobile.

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
  const sfxEnabled     = useStore((s) => s.sfxEnabled);
  const fps = useFPS();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const scrollPct = Math.round(scrollProgress * 100);
  const sectionLabel = activeSection.toUpperCase();

  // Nanite integrity: maps to scroll (flavor text)
  const naniteIntegrity = Math.round(100 - scrollProgress * 30);

  const toggleCollapse = () => {
    if (sfxEnabled) spiderAudio.playBlip(isCollapsed ? 880 : 640, 0.03);
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile compact HUD badge */}
      <div
        className="fixed top-20 right-3 z-[200] pointer-events-none select-none md:hidden"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#080810]/90 backdrop-blur-md border border-white/[0.08] font-mono text-[8px] uppercase tracking-wider shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span style={{ color: "var(--skin-primary, #CC0000)" }}>{sectionLabel}</span>
          <span className="text-white/20">|</span>
          <span className={fps >= 50 ? "text-emerald-400" : "text-amber-400"}>{fps} FPS</span>
        </div>
      </div>

      {/* Desktop cyber glass telemetry panel */}
      <div
        className="fixed top-20 right-4 z-[200] select-none hidden md:block"
      >
        {isCollapsed ? (
          <button
            onClick={toggleCollapse}
            aria-label="Expand Spider-Sense telemetry HUD"
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#080810]/90 backdrop-blur-md border border-white/[0.1] hover:border-[var(--skin-primary,#CC0000)]/60 font-mono text-[9px] uppercase tracking-wider shadow-lg text-white/80 transition-all cursor-pointer pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--skin-primary, #CC0000)" }} />
            <span>HUD</span>
            <span className="text-white/30">|</span>
            <span style={{ color: "var(--skin-primary, #CC0000)" }}>{sectionLabel}</span>
            <span className="text-white/30 font-bold ml-1">[+]</span>
          </button>
        ) : (
          <div className="relative font-mono text-[9px] uppercase tracking-widest leading-relaxed text-right p-3 rounded-sm bg-[#080810]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-hud-flicker space-y-1 pointer-events-auto">
            {/* Tactical cyber corner reticles */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--skin-primary,#CC0000)]/70" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--skin-primary,#CC0000)]/70" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--skin-primary,#CC0000)]/70" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--skin-primary,#CC0000)]/70" />

            <div className="flex items-center justify-between gap-3 text-white/30 border-b border-white/[0.06] pb-1">
              <span className="text-[8px] text-[var(--skin-primary,#CC0000)] font-bold tracking-tight">● SPIDER-SENSE</span>
              <button
                onClick={toggleCollapse}
                aria-label="Collapse HUD"
                className="text-[8px] text-white/40 hover:text-white transition-colors cursor-pointer px-1"
              >
                [—]
              </button>
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
        )}
      </div>
    </>
  );
}
