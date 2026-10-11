// ─────────────────────────────────────────────────────────────
//  WEB-VERSE PORTFOLIO — Zustand Global Store
// ─────────────────────────────────────────────────────────────
import { create } from "zustand";
import type { SectionId, SkinMode } from "./constants";

export interface CursorState {
  x: number;
  y: number;
  velocity: number;
  isHovering: boolean;
  lastClickX: number;
  lastClickY: number;
}

interface WebVerseStore {
  // ── Scroll / Camera ─────────────────────────────────────────
  scrollProgress: number; // 0–1
  activeSection: SectionId;
  setScrollProgress: (p: number) => void;
  setActiveSection: (s: SectionId) => void;

  // ── Skin System ──────────────────────────────────────────────
  skin: SkinMode;
  setSkin: (s: SkinMode) => void;

  // ── SFX ──────────────────────────────────────────────────────
  sfxEnabled: boolean;
  toggleSfx: () => void;

  // ── Cursor ───────────────────────────────────────────────────
  cursor: CursorState;
  setCursor: (update: Partial<CursorState>) => void;

  // ── Loader ───────────────────────────────────────────────────
  sceneLoaded: boolean;
  setSceneLoaded: (v: boolean) => void;
}

export const useStore = create<WebVerseStore>((set) => ({
  // Scroll
  scrollProgress: 0,
  activeSection: "hero",
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setActiveSection: (s) => set({ activeSection: s }),

  // Skin
  skin: "classic",
  setSkin: (s) => set({ skin: s }),

  // SFX
  sfxEnabled: false,
  toggleSfx: () => set((state) => ({ sfxEnabled: !state.sfxEnabled })),

  // Cursor
  cursor: { x: 0, y: 0, velocity: 0, isHovering: false, lastClickX: 0, lastClickY: 0 },
  setCursor: (update) => set((state) => ({ cursor: { ...state.cursor, ...update } })),

  // Loader
  sceneLoaded: false,
  setSceneLoaded: (v) => set({ sceneLoaded: v }),
}));
