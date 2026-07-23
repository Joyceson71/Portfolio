"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const ProjectsScene = dynamic(() => import("@/components/three/ProjectsScene").then(m => m.ProjectsScene), { ssr: false });

export function Projects() {
  const containerRef = useRef(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0 z-0">
        <ProjectsScene />
      </div>

      <div 
        className="absolute top-0 left-0 w-full p-6 md:p-12 z-10 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mt-16 md:mt-0">
          <div>
            <span className="font-cinzel text-sm tracking-[0.3em] text-titan-bronze uppercase shadow-titan">
              Portfolio
            </span>
            <div className="w-[60px] h-[1px] bg-titan-bronze mt-2 mb-4 shadow-[0_0_10px_rgba(193,127,58,0.8)]" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white drop-shadow-md">
              Selected Works
            </h2>
          </div>
          
          <div className="hidden md:block pointer-events-auto bg-smoke/80 backdrop-blur-sm border border-border p-4 rounded-[2px] max-w-xs text-right shadow-2xl">
            <p className="font-cinzel text-xs text-titan-bronze tracking-widest uppercase mb-1">Navigation Protocol</p>
            <p className="font-sans text-[10px] text-parchment-dim leading-relaxed">
              Scroll to traverse the forest. Hover and click targets to initiate deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
