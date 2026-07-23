"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple Wings SVG approximation for the loader
const WingsSVG = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-titan-bronze animate-pulse">
    <path fill="currentColor" d="M50 10 L45 30 L10 50 L40 60 L50 90 L60 60 L90 50 L55 30 Z" />
    <path fill="transparent" stroke="currentColor" strokeWidth="2" d="M10 50 Q 50 20 90 50 Q 50 80 10 50" />
  </svg>
);

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We'll simulate loading or just leave it for a few seconds 
    // In a real app, this might coordinate with Three.js useProgress
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-obsidian flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <WingsSVG />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center"
          >
            <h2 className="font-cinzel text-titan-bronze tracking-[0.3em] uppercase text-sm font-bold">
              Preparing the Expedition...
            </h2>
            <div className="w-48 h-1 bg-smoke mt-4 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-titan-bronze"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
