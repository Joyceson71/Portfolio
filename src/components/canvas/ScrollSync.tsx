"use client";

// ScrollSync lives inside the R3F Canvas tree.
// It reads Lenis scroll progress from the window and syncs it to the Zustand store
// via a non-reactive passive listener (no re-renders).

import { useEffect } from "react";
import { useStore } from "@/lib/store";

const SECTION_THRESHOLDS: { id: import("@/lib/constants").SectionId; min: number }[] = [
  { id: "hero",        min: 0.00 },
  { id: "origins",     min: 0.12 },
  { id: "arsenal",     min: 0.26 },
  { id: "work",        min: 0.42 },
  { id: "credentials", min: 0.58 },
  { id: "timeline",    min: 0.70 },
  { id: "reviews",     min: 0.82 },
  { id: "contact",     min: 0.92 },
];

export function ScrollSync() {
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const setActiveSection  = useStore((s) => s.setActiveSection);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      setScrollProgress(progress);

      // Update active section
      for (let i = SECTION_THRESHOLDS.length - 1; i >= 0; i--) {
        if (progress >= SECTION_THRESHOLDS[i].min) {
          setActiveSection(SECTION_THRESHOLDS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrollProgress, setActiveSection]);

  return null;
}
