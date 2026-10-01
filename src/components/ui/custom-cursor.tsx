"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer reticle
  const springConfig = { stiffness: 450, damping: 32 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over interactive targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── 1. Sharp Center Spider Core Dot (Instant, No Lag) ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? "#0047FF" : "#CC0000",
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
        />
      </motion.div>

      {/* ── 2. Outer Spider-Sense HUD Reticle (Smooth Spring Follow) ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 28 : isHovered ? 52 : 36,
            height: isClicking ? 28 : isHovered ? 52 : 36,
            borderColor: isHovered ? "#0047FF" : "#CC0000",
            rotate: isHovered ? 45 : 0,
            opacity: isHovered ? 0.9 : 0.45,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative rounded-full border border-dashed flex items-center justify-center"
        >
          {/* 4 HUD Corner Ticks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full opacity-60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-current rounded-full opacity-60" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full opacity-60" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full opacity-60" />

          {/* Glowing pulse ring when hovering */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 0.4 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-[#0047FF]"
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
