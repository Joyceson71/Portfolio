"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";

interface CursorContextValue {
  x: number;
  y: number;
  normalX: number;  // -1 to 1
  normalY: number;  // -1 to 1
  velocity: number;
  isHovering: boolean;
  isClicking: boolean;
  lastClickX: number;
  lastClickY: number;
}

const CursorContext = createContext<CursorContextValue>({
  x: 0, y: 0, normalX: 0, normalY: 0,
  velocity: 0, isHovering: false, isClicking: false,
  lastClickX: 0, lastClickY: 0,
});

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const setCursor = useStore((s) => s.setCursor);
  const [ctx, setCtx] = useState<CursorContextValue>({
    x: 0, y: 0, normalX: 0, normalY: 0,
    velocity: 0, isHovering: false, isClicking: false,
    lastClickX: 0, lastClickY: 0,
  });

  const prevX = useRef(0);
  const prevY = useRef(0);

  useEffect(() => {
    // Only activate on fine-pointer (non-touch) devices
    if (typeof window === "undefined") return;
    const isFinePonter = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePonter) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - prevX.current;
      const dy = e.clientY - prevY.current;
      const vel = Math.sqrt(dx * dx + dy * dy);
      prevX.current = e.clientX;
      prevY.current = e.clientY;

      const isHovering = Boolean(
        (e.target as HTMLElement)?.closest(
          "a, button, input, textarea, select, [role='button'], .cursor-pointer, [data-interactive]"
        )
      );

      const normalX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalY = (e.clientY / window.innerHeight - 0.5) * 2;

      setCtx((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        normalX,
        normalY,
        velocity: vel,
        isHovering,
      }));

      setCursor({ x: e.clientX, y: e.clientY, velocity: vel, isHovering });
    };

    const onDown = (e: MouseEvent) => {
      setCtx((prev) => ({
        ...prev,
        isClicking: true,
        lastClickX: e.clientX,
        lastClickY: e.clientY,
      }));
      setCursor({ lastClickX: e.clientX, lastClickY: e.clientY });
    };

    const onUp = () => setCtx((prev) => ({ ...prev, isClicking: false }));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [setCursor]);

  return (
    <CursorContext.Provider value={ctx}>
      {children}
    </CursorContext.Provider>
  );
}
