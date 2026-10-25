"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

// ── Spider-Sense HUD Overlay ───────────────────────────────────
// Persistent top-right HUD showing: active section, scroll %, FPS, NYC coords.
// Tasteful; collapses to a small badge on mobile.

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

  // Nanite integrity: maps to scroll (just flavor text)
  const naniteIntegrity = Math.round(100 - scrollProgress * 30);

  return (
    <div
      className="fixed top-20 right-4 z-[200] pointer-events-none select-none hidden md:block"
      aria-hidden="true"
    >
      <div className="font-mono text-[9px] uppercase tracking-widest leading-relaxed text-right space-y-0.5 animate-hud-flicker">
        <div className="text-white/20">{"// SPIDER-SENSE ACTIVE"}</div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          SECTION: <span className="text-white/60">{sectionLabel}</span>
        </div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          SCROLL: <span className="text-white/60">{scrollPct}%</span>
        </div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          FPS: <span className={fps >= 50 ? "text-green-400" : fps >= 30 ? "text-yellow-400" : "text-red-400"}>{fps}</span>
        </div>
        <div className="text-white/20">──────────────</div>
        <div style={{ color: "var(--skin-accent, #0047FF)" }}>
          LAT: <span className="text-white/50">{NYC_LAT}</span>
        </div>
        <div style={{ color: "var(--skin-accent, #0047FF)" }}>
          LNG: <span className="text-white/50">{NYC_LNG}</span>
        </div>
        <div className="text-white/20">──────────────</div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          SUIT: <span className="text-white/60">{skin.toUpperCase()}</span>
        </div>
        <div style={{ color: "var(--skin-primary, #CC0000)" }}>
          NANITE: <span className="text-white/60">{naniteIntegrity}%</span>
        </div>
        <div className="pt-1 flex items-center justify-end gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-emerald-400/80 font-mono">SYS_NOMINAL</span>
        </div>
      </div>
    </div>
  );
}
