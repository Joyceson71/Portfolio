"use client";

import { useStore } from "@/lib/store";
import { SKINS, type SkinMode } from "@/lib/constants";
import { spiderAudio } from "@/lib/spider-audio";

// ── Skin / Suit Switcher (upgraded: 4 skins + Venom) ──────────

export function SkinSwitcher() {
  const skin    = useStore((s) => s.skin);
  const setSkin = useStore((s) => s.setSkin);
  const sfxEnabled = useStore((s) => s.sfxEnabled);

  const skins = (Object.entries(SKINS) as [SkinMode, typeof SKINS[SkinMode]][]);

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-md bg-[#0c0c18]/90 border border-white/10 backdrop-blur-md shadow-inner"
      data-interactive
    >
      <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 px-1.5 hidden sm:inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--skin-primary, #CC0000)" }} />
        Suit:
      </span>
      {skins.map(([id, config]) => {
        const isActive = skin === id;
        return (
          <button
            key={id}
            id={`skin-${id}`}
            aria-label={`Switch to ${config.label} skin`}
            onClick={() => {
              if (sfxEnabled) spiderAudio.playBlip(isActive ? 600 : 850, 0.04);
              setSkin(id);
            }}
            className={`font-mono text-[9px] px-2.5 py-1 rounded transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
              isActive
                ? "bg-white/15 text-white font-bold border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                : "text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
              style={{
                background: id === "venom" ? "linear-gradient(135deg, #ffffff 40%, #a855f7 100%)" : config.primary,
                boxShadow: isActive
                  ? id === "venom"
                    ? "0 0 8px #ffffff, 0 0 14px #a855f7"
                    : `0 0 10px ${config.primary}`
                  : "none",
              }}
            />
            <span className="hidden sm:inline">{config.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
