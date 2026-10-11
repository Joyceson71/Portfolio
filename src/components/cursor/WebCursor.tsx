"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "./CursorProvider";

// ── Custom web-shooter reticle cursor ─────────────────────────
// Replaces native cursor. Two layers:
//   1. Center dot — instant, no lag
//   2. Outer HUD reticle — spring-damped follow
// Hides itself on touch devices (pointer:coarse).

export function WebCursor() {
  const { x, y, isHovering, isClicking, velocity } = useCursor();
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spring = { stiffness: 420, damping: 28 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  // Spider-Sense: high velocity triggers brief glow pulse
  const spiderSenseActive = velocity > 18;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    mx.set(x);
    my.set(y);
  }, [x, y, mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* ── Center dot (instant) ── */}
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 1.8 : 1,
            backgroundColor: isHovering ? "var(--skin-accent, #0047FF)" : "var(--skin-primary, #CC0000)",
            boxShadow: spiderSenseActive
              ? "0 0 16px 4px var(--skin-primary, #CC0000)"
              : "0 0 6px 0 var(--skin-primary, #CC0000)",
          }}
          transition={{ duration: 0.12 }}
          style={{ width: 8, height: 8, borderRadius: "50%" }}
        />
      </motion.div>

      {/* ── Outer HUD reticle (spring follow) ── */}
      <motion.div
        className="fixed z-[9998] pointer-events-none"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
        }}
      >
        <motion.div
          animate={{
            width:  isClicking ? 24 : isHovering ? 52 : 36,
            height: isClicking ? 24 : isHovering ? 52 : 36,
            borderColor: isHovering ? "var(--skin-accent, #0047FF)" : "var(--skin-primary, #CC0000)",
            rotate: isHovering ? 45 : 0,
            opacity: isHovering ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            borderRadius: "50%",
            border: "1px dashed",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Corner ticks */}
          {["top", "bottom", "left", "right"].map((pos) => {
            const s: React.CSSProperties = { position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "currentcolor", opacity: 0.6 };
            if (pos === "top")    { s.top = "-1.5px"; s.left = "50%"; s.transform = "translateX(-50%)"; }
            if (pos === "bottom") { s.bottom = "-1.5px"; s.left = "50%"; s.transform = "translateX(-50%)"; }
            if (pos === "left")   { s.left = "-1.5px"; s.top = "50%"; s.transform = "translateY(-50%)"; }
            if (pos === "right")  { s.right = "-1.5px"; s.top = "50%"; s.transform = "translateY(-50%)"; }
            return <div key={pos} style={s} />;
          })}

          {/* Hover pulse ring */}
          {isHovering && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0.4 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid var(--skin-accent, #0047FF)",
              }}
            />
          )}

          {/* Spider-Sense burst */}
          {spiderSenseActive && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid var(--skin-primary, #CC0000)",
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
