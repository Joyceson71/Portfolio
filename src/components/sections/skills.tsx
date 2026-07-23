"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const SkillsScene = dynamic(() => import("@/components/three/SkillsScene").then(m => m.SkillsScene), { ssr: false });

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-obsidian flex flex-col items-center justify-center pointer-events-auto min-h-[60vh]"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SkillsScene />
      </div>

      <div 
        className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none mt-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <div className="text-center flex flex-col items-center bg-smoke/40 backdrop-blur-md p-6 lg:p-8 rounded-[2px] border border-white/5 shadow-2xl max-w-2xl mx-auto">
          <span className="font-cinzel text-sm tracking-[0.3em] text-titan-bronze uppercase shadow-titan">
            Technical Arsenal
          </span>
          <div className="w-[60px] h-[1px] bg-titan-bronze mt-2 mb-4 shadow-[0_0_10px_rgba(193,127,58,0.8)]" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white drop-shadow-md">
            Core Proficiencies
          </h2>
        </div>
      </div>
    </section>
  );
}
