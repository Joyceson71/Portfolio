"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

export default function Home() {
  return (
    <main className="relative w-full min-h-screen px-4 md:px-8 lg:px-12 pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-[-1] opacity-70">
        <HeroScene />
      </div>

      <div className="w-full max-w-[1000px] mx-auto z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-24 flex flex-col justify-center items-center text-center relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-8">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold text-black/60 uppercase tracking-widest">Digital Craftsman</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-balance text-black">
            I build <span className="gradient-text-premium">3D experiences</span><br/>for the web.
          </h1>
          
          <p className="text-xl text-black/60 max-w-2xl text-balance font-medium mb-12">
            Hi, I'm Joyceson Danielraj. A creative developer bridging the gap between flat design and immersive spatial interfaces using WebGL and Three.js.
          </p>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/work" className="btn-premium">
              Explore Work <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-ghost-premium">
              Learn More About Me
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}