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
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simple radial web spokes */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x2 = 30 + Math.cos(angle) * 26;
        const y2 = 30 + Math.sin(angle) * 26;
        return (
          <line key={i} x1="30" y1="30" x2={x2} y2={y2}
            stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
        );
      })}
      {/* Concentric rings */}
      <circle cx="30" cy="30" r="8"  fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="30" cy="30" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      {/* Center dot */}
      <circle cx="30" cy="30" r="2.5" fill="currentColor" />
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
              left: s.x - 30,
              top: s.y - 30,
              color: "var(--skin-primary, #CC0000)",
              filter: "drop-shadow(0 0 4px var(--skin-primary, #CC0000))",
            }}
          >
            <WebSplatSVG />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
