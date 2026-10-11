"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useStore } from "@/lib/store";

export function SfxToggle() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const toggleSfx  = useStore((s) => s.toggleSfx);

  return (
    <button
      id="sfx-toggle"
      aria-label={sfxEnabled ? "Mute sound effects" : "Enable sound effects"}
      onClick={toggleSfx}
      className="flex items-center gap-1 px-2 py-1 rounded bg-[#0c0c18]/90 border border-white/10 hover:border-white/30 transition-all font-mono text-[9px] uppercase tracking-wider text-white/50 hover:text-white backdrop-blur-sm"
      data-interactive
    >
      {sfxEnabled
        ? <Volume2 className="w-3 h-3 text-[var(--skin-primary,#CC0000)]" />
        : <VolumeX className="w-3 h-3" />
      }
      <span className="hidden sm:inline">{sfxEnabled ? "SFX ON" : "SFX OFF"}</span>
    </button>
  );
}
