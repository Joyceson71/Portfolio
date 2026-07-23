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
      className="relative w-full h-[120vh] overflow-hidden bg-obsidian flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SkillsScene />
      </div>

      <div 
        className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none mt-auto pb-24"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <div className="text-center flex flex-col items-center">
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
