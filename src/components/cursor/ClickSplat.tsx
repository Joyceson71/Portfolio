"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spiderAudio } from "@/lib/spider-audio";
import { useStore } from "@/lib/store";
import type { SkinMode } from "@/lib/constants";

interface Splat {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  skin: SkinMode;
}

let nextId = 0;

// ── Suit-Specific Decal SVGs ─────────────────────────────────

function ClassicWebSVG() {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Radial web spokes */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x2 = 38 + Math.cos(angle) * 34;
        const y2 = 38 + Math.sin(angle) * 34;
        return (
          <line
            key={i}
            x1="38"
            y1="38"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.85"
          />
        );
      })}
      {/* Concentric spiral web rings */}
      <circle cx="38" cy="38" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
      <circle cx="38" cy="38" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />
      <circle cx="38" cy="38" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      {/* Center nanite core */}
      <circle cx="38" cy="38" r="3.5" fill="currentColor" />
      {/* Crosshair accents */}
      <line x1="38" y1="2" x2="38" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="38" y1="68" x2="38" y2="74" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="38" x2="8" y2="38" stroke="currentColor" strokeWidth="1.5" />
      <line x1="68" y1="38" x2="74" y2="38" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MilesBioShockSVG() {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bio-electric zigzag lightning spokes */}
      <path
        d="M38 38 L48 24 L44 14 L54 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M38 38 L26 26 L30 16 L20 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M38 38 L50 48 L46 58 L58 68"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M38 38 L24 46 L30 56 L16 66"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M38 38 L56 34 L62 42 L72 36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M38 38 L18 36 L12 44 L4 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* High-voltage discharge rings */}
      <circle cx="38" cy="38" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 2" opacity="0.85" />
      <circle cx="38" cy="38" r="26" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
      <circle cx="38" cy="38" r="4" fill="currentColor" />
    </svg>
  );
}

function VenomSymbioteSVG() {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fluid organic symbiote tendrils */}
      <path
        d="M38 38 Q45 20 60 12 Q50 30 68 28 Q48 42 70 50 Q50 50 56 68 Q44 54 38 72 Q34 52 20 68 Q24 50 8 50 Q28 42 6 28 Q24 30 16 12 Q32 20 38 38 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M38 38 Q48 18 64 16 M38 38 Q60 40 72 38 M38 38 Q48 58 54 70 M38 38 Q24 58 14 68 M38 38 Q18 36 6 36 M38 38 Q22 18 16 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Symbiote droplet globules */}
      <circle cx="64" cy="16" r="2" fill="currentColor" />
      <circle cx="72" cy="38" r="2.5" fill="currentColor" />
      <circle cx="54" cy="70" r="2" fill="currentColor" />
      <circle cx="14" cy="68" r="2" fill="currentColor" />
      <circle cx="6"  cy="36" r="2.5" fill="currentColor" />
      <circle cx="16" cy="10" r="2" fill="currentColor" />
      <circle cx="38" cy="38" r="4.5" fill="currentColor" />
    </svg>
  );
}

function IronSpiderStarkSVG() {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stark nanotech hexagonal mesh */}
      <polygon
        points="38,8 64,23 64,53 38,68 12,53 12,23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <polygon
        points="38,18 54,27 54,49 38,58 22,49 22,27"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 2"
        opacity="0.6"
      />
      {/* Stark targeting reticle brackets */}
      <path d="M28 8 L38 8 L48 8" stroke="currentColor" strokeWidth="2" />
      <path d="M28 68 L38 68 L48 68" stroke="currentColor" strokeWidth="2" />
      <path d="M8 28 L8 38 L8 48" stroke="currentColor" strokeWidth="2" />
      <path d="M68 28 L68 38 L68 48" stroke="currentColor" strokeWidth="2" />
      {/* Repulsor core */}
      <circle cx="38" cy="38" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="38" cy="38" r="3" fill="currentColor" />
    </svg>
  );
}

function WebSplatDecal({ skin }: { skin: SkinMode }) {
  switch (skin) {
    case "miles":
      return <MilesBioShockSVG />;
    case "venom":
      return <VenomSymbioteSVG />;
    case "iron":
      return <IronSpiderStarkSVG />;
    case "classic":
    default:
      return <ClassicWebSVG />;
  }
}

export function ClickSplatLayer() {
  const [splats, setSplats] = useState<Splat[]>([]);
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const skin = useStore((s) => s.skin);

  const addSplat = useCallback((x: number, y: number) => {
    if (sfxEnabled) spiderAudio.playWebShoot();
    const id = nextId++;
    const rotation = (Math.random() - 0.5) * 60;
    const scale = 0.95 + Math.random() * 0.35;

    setSplats((prev) => [...prev.slice(-8), { id, x, y, rotation, scale, skin }]);

    // Auto garbage-collect splat from DOM after animation finishes
    setTimeout(() => {
      setSplats((prev) => prev.filter((s) => s.id !== id));
    }, 850);
  }, [sfxEnabled, skin]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => addSplat(e.clientX, e.clientY);
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [addSplat]);

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {splats.map((s) => (
          <div key={s.id}>
            {/* Decal Web Reticle (Suit adaptive) */}
            <motion.div
              initial={{ scale: 0.25 * s.scale, opacity: 1, rotate: s.rotation - 15 }}
              animate={{ scale: 1.5 * s.scale, opacity: 0, rotate: s.rotation + 25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: s.x - 38,
                top: s.y - 38,
                color: "var(--skin-primary, #CC0000)",
                filter: "drop-shadow(0 0 12px var(--skin-primary, #CC0000))",
              }}
            >
              <WebSplatDecal skin={s.skin} />
            </motion.div>

            {/* Inner High-Energy Shockwave Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 2.1 * s.scale, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: s.x - 24,
                top: s.y - 24,
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "2px solid var(--skin-primary, #CC0000)",
                boxShadow: "0 0 16px var(--skin-primary, #CC0000)",
              }}
            />

            {/* Outer Secondary Harmonic Ring */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0.7 }}
              animate={{ scale: 3.2 * s.scale, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
              style={{
                position: "absolute",
                left: s.x - 24,
                top: s.y - 24,
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "1px dashed var(--skin-accent, #0047FF)",
                boxShadow: "0 0 12px var(--skin-accent, #0047FF)",
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
