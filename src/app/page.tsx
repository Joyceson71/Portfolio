"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Terminal } from "lucide-react";

// Load the 3D scene only on the client side
const SpatialScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.SpatialScene),
  { ssr: false, loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center text-[#00ffcc] font-mono text-xs uppercase">
      [ INITIALIZING_WEBGL_ENGINE ]
    </div>
  )}
);

export default function Home() {
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const int = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}:${d.getMilliseconds().toString().padStart(3,'0')}`);
    }, 50);
    
    const handleMove = (e: MouseEvent) => setCoords({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    
    return () => {
      clearInterval(int);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* Post-processing scanline overlay */}
      <div className="scanline" />

      {/* 3D Engine Layer */}
      <div className="absolute inset-0 z-0">
        <SpatialScene />
      </div>

      {/* Extreme Complexity HUD Overlay */}
      <div className="ui-layer">
        
        {/* LEFT COLUMN */}
        <div className="col-start-1 row-span-3 flex flex-col justify-between p-6 border-r border-[#00ffcc]/20 bg-black/40 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Terminal className="w-5 h-5 text-[#00ffcc]" />
              <h1 className="text-white font-bold text-xl tracking-tighter">SYS.OP</h1>
            </div>
            
            <div className="space-y-6">
              <div className="tech-panel p-4">
                <h2 className="tech-title">ID_PROTOCOL</h2>
                <p className="tech-text">JOYCESON DANIELRAJ</p>
                <p className="tech-text mt-1 text-white/50">3D WEB ARCHITECT</p>
                <p className="tech-text mt-1 text-[#00ffcc]/30">CLASS: MASTER</p>
              </div>

              <div className="tech-panel p-4">
                <h2 className="tech-title">SYSTEM_STATUS</h2>
                <div className="flex justify-between tech-text mb-1">
                  <span>CPU_LOAD</span>
                  <span>[ 34.2% ]</span>
                </div>
                <div className="flex justify-between tech-text mb-1">
                  <span>GPU_MEM</span>
                  <span>[ 1024MB ]</span>
                </div>
                <div className="flex justify-between tech-text">
                  <span>FPS_TARGET</span>
                  <span>[ 60.0 ]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tech-panel p-4 mt-auto">
            <h2 className="tech-title">NAVIGATION</h2>
            <nav className="flex flex-col gap-2">
              <a href="/work" className="interactive text-xs font-bold text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black transition-colors px-2 py-1 border border-[#00ffcc]/30">&gt; DATABASE_WORK</a>
              <a href="/about" className="interactive text-xs font-bold text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black transition-colors px-2 py-1 border border-[#00ffcc]/30">&gt; MODULE_ABOUT</a>
              <a href="/contact" className="interactive text-xs font-bold text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black transition-colors px-2 py-1 border border-[#00ffcc]/30">&gt; UPLINK_CONTACT</a>
            </nav>
          </div>
        </div>

        {/* TOP ROW MIDDLE */}
        <div className="col-start-2 row-start-1 flex justify-center items-start p-4">
          <div className="tech-panel px-6 py-2 flex gap-8">
            <div className="tech-text">SYS_TIME: <span className="text-white">{time}</span></div>
            <div className="tech-text">TARGET_LOCK: <span className="text-white">TRUE</span></div>
          </div>
        </div>

        {/* BOTTOM ROW MIDDLE */}
        <div className="col-start-2 row-start-3 flex justify-center items-end p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[400px] h-1 bg-[#00ffcc]/20 relative">
              <div className="absolute top-0 left-0 h-full bg-[#00ffcc] w-1/3 shadow-[0_0_10px_#00ffcc]" />
            </div>
            <span className="tech-text">LOADING CORE MODULES...</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-start-3 row-span-3 flex flex-col justify-between p-6 border-l border-[#00ffcc]/20 bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-end text-right">
            <div className="tech-panel p-4 w-full">
              <h2 className="tech-title text-right">ENV_TELEMETRY</h2>
              <div className="flex justify-between tech-text mb-1">
                <span>POS_X</span>
                <span className="text-white">{coords.x}</span>
              </div>
              <div className="flex justify-between tech-text mb-1">
                <span>POS_Y</span>
                <span className="text-white">{coords.y}</span>
              </div>
              <div className="flex justify-between tech-text">
                <span>SECTOR</span>
                <span className="text-white">ALPHA_09</span>
              </div>
            </div>
          </div>

          {/* Random data scroll */}
          <div className="tech-panel p-4 h-[200px] overflow-hidden flex flex-col justify-end">
            <h2 className="tech-title text-right">EVENT_LOG</h2>
            <div className="flex flex-col gap-1 text-[8px] font-mono text-[#00ffcc]/50 text-right uppercase">
              <p>&gt; Connection established.</p>
              <p>&gt; Handshake verified.</p>
              <p>&gt; WebGL context created.</p>
              <p>&gt; Shaders compiled successfully.</p>
              <p>&gt; Loading geometries...</p>
              <p>&gt; Textures mounted.</p>
              <p className="text-white">&gt; SYSTEM ONLINE.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}