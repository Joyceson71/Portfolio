"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { spiderAudio } from "@/lib/spider-audio";
import { SKINS, type SkinMode } from "@/lib/constants";
import { Keyboard, X } from "lucide-react";

export function KeyboardShortcuts() {
  const skin = useStore((s) => s.skin);
  const setSkin = useStore((s) => s.setSkin);
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const toggleSfx = useStore((s) => s.toggleSfx);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const showToast = (msg: string) => {
      setToastMessage(msg);
      clearTimeout(timeout);
      timeout = setTimeout(() => setToastMessage(null), 2200);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or editable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Handle Escape for cheat sheet
      if (e.key === "Escape" && showCheatSheet) {
        setShowCheatSheet(false);
        return;
      }

      const key = e.key.toLowerCase();

      // Suit switching keys: 1, 2, 3, 4
      if (key === "1") {
        setSkin("classic");
        if (sfxEnabled) spiderAudio.playBlip(750, 0.05);
        showToast("Suit Override: Classic Peter (Crimson & Web)");
      } else if (key === "2") {
        setSkin("miles");
        if (sfxEnabled) spiderAudio.playBlip(960, 0.05);
        showToast("Suit Override: Miles Morales (Stealth Bio-Shock)");
      } else if (key === "3") {
        setSkin("venom");
        if (sfxEnabled) spiderAudio.playBlip(380, 0.05);
        showToast("Suit Override: Venom (Symbiote)");
      } else if (key === "4") {
        setSkin("iron");
        if (sfxEnabled) spiderAudio.playBlip(1150, 0.05);
        showToast("Suit Override: Iron Spider (Stark Nanotech)");
      } else if (key === "m") {
        toggleSfx();
        showToast(sfxEnabled ? "Audio Muted" : "Audio Protocols Active");
      } else if (key === "?" || (e.shiftKey && key === "/")) {
        setShowCheatSheet((prev) => !prev);
        if (sfxEnabled) spiderAudio.playBlip(800, 0.04);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [skin, setSkin, sfxEnabled, toggleSfx, showCheatSheet]);

  return (
    <>
      {/* Dynamic Keypress Tactical Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[9990] pointer-events-none select-none"
            aria-live="polite"
          >
            <div
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-sm bg-[#080812]/95 backdrop-blur-md border shadow-[0_4px_20px_rgba(0,0,0,0.6)] font-mono text-xs text-white"
              style={{ borderColor: "var(--skin-primary, #CC0000)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ background: "var(--skin-primary, #CC0000)" }}
              />
              <span className="font-semibold text-[11px] tracking-wide">
                {toastMessage}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Overlay Modal (triggered with '?') */}
      <AnimatePresence>
        {showCheatSheet && (
          <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.2 }}
              className="web-panel w-full max-w-md p-6 rounded-sm bg-[#0c0c18] border shadow-2xl relative"
              style={{ borderColor: "var(--skin-primary, #CC0000)60" }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider">
                  <Keyboard className="w-4 h-4" style={{ color: "var(--skin-primary, #CC0000)" }} />
                  <span>Web-Verse Hotkeys</span>
                </div>
                <button
                  onClick={() => setShowCheatSheet(false)}
                  className="text-white/50 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                  aria-label="Close hotkeys panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="text-[10px] uppercase text-white/40 tracking-widest">Suit Switcher</div>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(SKINS) as [SkinMode, (typeof SKINS)[SkinMode]][]).map(([id, config], idx) => (
                    <div
                      key={id}
                      className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06]"
                    >
                      <span className="text-white/80">{config.label}</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px] border border-white/20">
                        {idx + 1}
                      </kbd>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] uppercase text-white/40 tracking-widest pt-2">System Controls</div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-white/80">Toggle Sound FX (SFX)</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px] border border-white/20">
                      M
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-white/80">Toggle HUD Telemetry</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px] border border-white/20">
                      H
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-white/80">Toggle Hotkey Reference</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px] border border-white/20">
                      ?
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-white/80">Dismiss Popups / Modals</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px] border border-white/20">
                      ESC
                    </kbd>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-center text-[10px] font-mono text-white/40">
                Press <span className="text-white">ESC</span> or click outside to close
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
