"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 4}px`;
        cursorRef.current.style.top  = `${e.clientY - 4}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot — crisp spider eye */}
      <div
        ref={cursorRef}
        className="fixed z-[9999] w-2 h-2 rounded-full bg-[#CC0000] pointer-events-none mix-blend-difference"
        style={{ position: "fixed", transform: "translate(-50%,-50%)" }}
      />
      {/* Ring — web swing trail */}
      <motion.div
        className="fixed z-[9998] w-10 h-10 rounded-full border border-[#CC0000]/50 pointer-events-none"
        style={{ left: springX, top: springY, translateX: 0, translateY: 0 }}
      />
    </>
  );
}
