"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type WindowData = {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  width: number;
  height: number;
  defaultX?: number;
  defaultY?: number;
};

type OSContextType = {
  windows: Record<string, WindowData>;
  openWindow: (id: string, windowData?: Partial<WindowData>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  activeWindowId: string | null;
};

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children, initialWindows }: { children: ReactNode, initialWindows: Record<string, WindowData> }) {
  const [windows, setWindows] = useState<Record<string, WindowData>>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZ, setMaxZ] = useState(10);

  const openWindow = (id: string, overrides?: Partial<WindowData>) => {
    setWindows(prev => {
      const current = prev[id];
      if (!current) return prev;
      return {
        ...prev,
        [id]: {
          ...current,
          ...overrides,
          isOpen: true,
          isMinimized: false,
          zIndex: maxZ + 1
        }
      };
    });
    setMaxZ(z => z + 1);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized, zIndex: maxZ + 1 }
    }));
    setMaxZ(z => z + 1);
    setActiveWindowId(id);
  };

  const focusWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZ + 1, isMinimized: false }
    }));
    setMaxZ(z => z + 1);
    setActiveWindowId(id);
  };

  return (
    <OSContext.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within OSProvider");
  return context;
}
