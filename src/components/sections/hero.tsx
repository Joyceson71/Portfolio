"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then(m => m.HeroScene), { ssr: false });

function Typewriter({ text, delay = 80 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
}

export function Hero() {
  return (
    <section id="home" className="relative w-full h-[200vh] bg-obsidian">
      {/* 3D Canvas Background (Sticky) */}
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0">
        <HeroScene />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
        
        <div className="container px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <div className="mb-6 font-heading text-[0.6rem] tracking-[0.5em] text-titan-bronze uppercase shadow-titan">
            <Typewriter text="THE WALLS HAVE FALLEN" delay={80} />
          </div>
          
          <h1 
            className="font-heading font-bold uppercase leading-[0.9] text-white"
            style={{ 
              fontSize: "clamp(3rem, 8vw, 7rem)", 
              textShadow: "0 0 40px rgba(255,100,0,0.4)" 
            }}
          >
            Joyceson<br/>Danielraj
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center mt-12 pointer-events-auto">
            <Link 
              href="#projects"
              className="group relative px-8 py-4 bg-titan-bronze/10 border border-titan-bronze text-titan-bronze font-cinzel font-bold uppercase tracking-[0.2em] text-sm rounded-[2px] hover:bg-titan-bronze hover:text-obsidian transition-colors duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                Deploy Gear <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="#about"
              className="px-8 py-4 border border-white/20 text-white font-cinzel uppercase tracking-[0.2em] text-sm rounded-[2px] hover:border-white transition-colors duration-300 backdrop-blur-sm"
            >
              View Coordinates
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-titan-bronze shadow-titan">Descend</span>
          <div className="w-[1px] h-[60px] bg-titan-bronze animate-pulse shadow-[0_0_10px_rgba(193,127,58,0.8)]" />
        </div>
      </div>
    </section>
  );
}
