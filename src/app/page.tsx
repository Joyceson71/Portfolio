"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Load the 3D scene only on the client side
const SpatialScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.SpatialScene),
  { ssr: false, loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center text-white/50 text-sm tracking-widest uppercase">
      Loading Spatial Engine...
    </div>
  )}
);

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 3D Engine Layer */}
      <div className="absolute inset-0 z-0">
        <SpatialScene />
      </div>

      {/* HTML UI Overlay */}
      <div className="ui-layer flex flex-col justify-between p-6 md:p-12">
        
        {/* Header */}
        <header className="flex justify-between items-center w-full interactive">
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-xl tracking-tighter">JOYCESON.</h1>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Creative Developer</p>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/work" className="nav-link">Work</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>
        </header>

        {/* Footer / Instructions */}
        <footer className="flex justify-between items-end w-full">
          <div className="max-w-sm hidden md:block">
            <p className="text-white/60 text-xs leading-relaxed font-medium">
              Interact with the geometric shards to explore featured case studies. Move your cursor to shift the perspective.
            </p>
          </div>
          
          <Link href="/contact" className="interactive flex items-center gap-3 group">
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">Start a Project</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </footer>

      </div>
    </main>
  );
}