"use client";

import { useState } from "react";
import { Shield, Sparkles } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

export type SuitMode = "classic" | "miles" | "iron";

interface SuitSelectorProps {
  currentSuit: SuitMode;
  onSelectSuit: (suit: SuitMode) => void;
}

export function SuitSelector({ currentSuit, onSelectSuit }: SuitSelectorProps) {
  const suits: { id: SuitMode; name: string; tag: string; color: string }[] = [
    { id: "classic", name: "Classic Peter", tag: "Crimson & Web", color: "#CC0000" },
    { id: "miles", name: "Miles Venom", tag: "Stealth Bio-Shock", color: "#0047FF" },
    { id: "iron", name: "Iron Spider", tag: "Stark Nanotech", color: "#eab308" },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 rounded bg-[#0c0c18] border border-white/10">
      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 px-2 hidden sm:inline">
        Suit OS:
      </span>
      {suits.map((suit) => {
        const isActive = currentSuit === suit.id;
        return (
          <button
            key={suit.id}
            onClick={() => {
              spiderAudio.playBlip(isActive ? 600 : 850, 0.04);
              onSelectSuit(suit.id);
            }}
            className={`font-mono text-[10px] px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
              isActive
                ? "bg-white/10 text-white font-bold shadow-sm"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: suit.color, boxShadow: isActive ? `0 0 6px ${suit.color}` : "none" }}
            />
            <span>{suit.name}</span>
          </button>
        );
      })}
    </div>
  );
}
