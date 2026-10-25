"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spiderAudio } from "@/lib/spider-audio";
import { useStore } from "@/lib/store";

interface Splat {
  id: number;
  x: number;
  y: number;
}

let nextId = 0;

// ── Web splat decal on click ──────────────────────────────────
function WebSplatSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Radial web spokes */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x2 = 36 + Math.cos(angle) * 32;
        const y2 = 36 + Math.sin(angle) * 32;
        return (
          <line key={i} x1="36" y1="36" x2={x2} y2={y2}
            stroke="currentColor" strokeWidth="1.2" opacity="0.85" />
        );
      })}
      {/* Concentric rings */}
      <circle cx="36" cy="36" r="9"  fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
      <circle cx="36" cy="36" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />
      <circle cx="36" cy="36" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      {/* Center nanite core */}
      <circle cx="36" cy="36" r="3" fill="currentColor" />
      {/* Crosshair accents */}
      <line x1="36" y1="2" x2="36" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="36" y1="64" x2="36" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="36" x2="8" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="64" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ClickSplatLayer() {
  const [splats, setSplats] = useState<Splat[]>([]);
  const sfxEnabled = useStore((s) => s.sfxEnabled);

  const addSplat = useCallback((x: number, y: number) => {
    if (sfxEnabled) spiderAudio.playWebShoot();
    setSplats((prev) => [...prev.slice(-6), { id: nextId++, x, y }]);
  }, [sfxEnabled]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => addSplat(e.clientX, e.clientY);
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [addSplat]);

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {splats.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ scale: 1.4, opacity: 0, rotate: 20 }}
            exit={{}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: s.x - 36,
              top: s.y - 36,
              color: "var(--skin-primary, #CC0000)",
              filter: "drop-shadow(0 0 6px var(--skin-primary, #CC0000))",
            }}
          >
            <WebSplatSVG />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
