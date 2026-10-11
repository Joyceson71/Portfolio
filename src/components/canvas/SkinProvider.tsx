"use client";

// SkinProvider: reads skin from Zustand → writes data-skin attr on <html>
// This is a Client Component mounted in the root layout.
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { SKINS } from "@/lib/constants";

export function SkinProvider() {
  const skin = useStore((s) => s.skin);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-skin", skin);

    // Also write CSS vars directly so transition works immediately
    const config = SKINS[skin];
    html.style.setProperty("--skin-primary", config.primary);
    html.style.setProperty("--skin-accent",  config.accent);
    html.style.setProperty("--skin-glow",    config.glow);
  }, [skin]);

  return null;
}
