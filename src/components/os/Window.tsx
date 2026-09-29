"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "./DesktopContext";
import { Maximize2, Minus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Window({ id }: { id: string }) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useOS();
  const win = windows[id];
  const windowRef = useRef<HTMLDivElement>(null);
  
  // To keep track of drag state if we want to reset it on maximize
  const [dragEnabled, setDragEnabled] = useState(true);

  if (!win || !win.isOpen) return null;

  const isActive = activeWindowId === id;

  // Variants for opening/closing
  const variants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: win.isMinimized ? 0 : 1, 
      scale: win.isMinimized ? 0.8 : 1, 
      y: win.isMinimized ? 100 : 0,
      pointerEvents: win.isMinimized ? "none" as const : "auto" as const
    },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  const style = win.isMaximized 
    ? { top: 28, left: 0, width: "100%", height: "calc(100vh - 28px - 80px)", borderRadius: 0 } // 28px topbar, 80px dock space
    : { width: win.width, height: win.height, borderRadius: 12 };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          ref={windowRef}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag={!win.isMaximized}
          dragMomentum={false}
          dragElastic={0}
          onPointerDown={() => focusWindow(id)}
          className={`absolute os-window flex flex-col shadow-2xl ${isActive ? 'ring-1 ring-white/20' : ''}`}
          style={{ 
            zIndex: win.zIndex,
            ...style,
            left: win.isMaximized ? 0 : (win.defaultX || '10%'),
            top: win.isMaximized ? 28 : (win.defaultY || '10%'),
          }}
        >
          {/* Titlebar */}
          <div 
            className="os-titlebar cursor-move shrink-0"
            onDoubleClick={() => maximizeWindow(id)}
          >
            <div className="os-controls">
              <button 
                className="os-btn os-close" 
                onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
              >
                <X />
              </button>
              <button 
                className="os-btn os-minimize" 
                onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
              >
                <Minus />
              </button>
              <button 
                className="os-btn os-maximize" 
                onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
              >
                <Maximize2 />
              </button>
            </div>
            <div className="os-title">{win.title}</div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-slate-900/50 relative p-0 m-0">
            {win.content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
