"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Loading screen with a real progress bar ────────────────────
// Uses a fake timer-based progress since drei useProgress isn't
// accessible outside R3F. For the real scene, R3F Suspense handles
// in-canvas fallback; this covers the initial HTML load.

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const start = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.round(p));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-[#080810] flex flex-col items-center justify-center"
          aria-live="polite"
          aria-label="Loading Web-Verse portfolio"
        >
          {/* Web SVG animation */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="mb-8"
            aria-hidden="true"
          >
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <motion.line
                  key={i}
                  x1="40" y1="40"
                  x2={40 + Math.cos(angle) * 36}
                  y2={40 + Math.sin(angle) * 36}
                  stroke="var(--skin-primary, #CC0000)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 0.8, pathLength: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                />
              );
            })}
            {[12, 22, 32].map((r, i) => (
              <motion.circle
                key={r}
                cx="40" cy="40" r={r}
                fill="none"
                stroke="var(--skin-primary, #CC0000)"
                strokeWidth="1"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.5, pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: "easeOut" }}
              />
            ))}
            <circle cx="40" cy="40" r="4" fill="var(--skin-primary, #CC0000)" />
          </svg>

          <p className="font-mono text-xs text-[var(--skin-primary,#CC0000)] uppercase tracking-[0.3em] mb-4">
            Calibrating Nanotech Web...
          </p>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: "var(--skin-primary, #CC0000)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="font-mono text-[10px] text-white/30 mt-2 tabular-nums">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
