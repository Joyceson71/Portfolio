"use client";

import { useOS } from "./DesktopContext";
import { Window } from "./Window";
import { Wifi, Battery, Search, User } from "lucide-react";
import { useEffect, useState } from "react";

export function DesktopEnvironment() {
  const { windows, openWindow, minimizeWindow, focusWindow } = useOS();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (id: string) => {
    const win = windows[id];
    if (win.isOpen) {
      if (win.isMinimized) {
        focusWindow(id); // unminimize
      } else {
        // If it's open and not minimized, focus it. 
        // If it's already focused, minimize it.
        focusWindow(id);
      }
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden os-wallpaper text-white select-none">
      {/* Top Bar */}
      <div className="os-topbar absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <div className="font-bold">Joyceson OS</div>
          <div className="hidden md:flex gap-3 text-xs font-medium opacity-80">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </div>
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <Search className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>

      {/* Desktop Icons Area */}
      <div className="absolute top-10 left-4 flex flex-col gap-4 z-10">
        {Object.values(windows).map(win => (
          <div 
            key={`icon-${win.id}`}
            className="os-desktop-icon" 
            onDoubleClick={() => openWindow(win.id)}
          >
            <div className="os-desktop-icon-img">
              {win.icon}
            </div>
            <div className="os-desktop-label">{win.title}</div>
          </div>
        ))}
      </div>

      {/* Windows Area */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="relative w-full h-full pointer-events-auto">
          {Object.values(windows).map(win => (
            <Window key={win.id} id={win.id} />
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="os-dock">
          {Object.values(windows).map(win => (
            <div 
              key={`dock-${win.id}`}
              className="os-dock-item"
              data-label={win.title}
              onClick={() => handleAppClick(win.id)}
            >
              {win.icon}
              {win.isOpen && <div className="os-dock-dot" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
