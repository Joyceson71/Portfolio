"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AboutScene = dynamic(() => import("@/components/three/AboutScene").then(m => m.AboutScene), { ssr: false });

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5, triggerOnce: true });
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * (to - from) + from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, from, to, duration]);
  
  return <div ref={ref}>{count < 10 && count > 0 ? `0${count}` : count}</div>;
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.12, triggerOnce: true });

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-obsidian flex flex-col justify-center items-center"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AboutScene />
      </div>

      <div 
        className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <div className="text-center flex flex-col items-center mb-12 pointer-events-auto">
          <span className="font-cinzel text-sm tracking-[0.3em] text-titan-bronze uppercase shadow-titan">
            About Me
          </span>
          <div className="w-[60px] h-[1px] bg-titan-bronze mt-2 mb-4 shadow-[0_0_10px_rgba(193,127,58,0.8)]" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white drop-shadow-md">
            The Founder
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 pointer-events-auto bg-smoke/60 backdrop-blur-md p-8 lg:p-12 border border-white/10 rounded-[2px] shadow-2xl text-center">
          <div className="space-y-4 text-parchment leading-relaxed font-sans font-light text-lg">
            <p>
              I am a <strong className="text-white font-medium">Frontend Developer</strong> passionate about creating interactive, accessible, and high-performance web applications. My expertise lies in translating complex designs into seamless digital realities.
            </p>
            <p>
              With a strong foundation in modern JavaScript frameworks and a keen eye for UI/UX, I bridge the gap between design and engineering. Exceptional products are born from continuous learning and meticulous attention to detail.
            </p>
          </div>
          
          {/* 4-col Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
            {[
              { count: 2, label: "Years Exp", suffix: "+" },
              { count: 10, label: "Projects", suffix: "+" },
              { count: 5, label: "Tech Stacks", suffix: "+" },
              { count: 100, label: "Commitment", suffix: "%" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-4 bg-obsidian/60 border border-border group hover:border-titan-bronze transition-colors duration-300 relative overflow-hidden backdrop-blur-md flex flex-col items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-titan-bronze/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 flex">
                  <Counter from={0} to={stat.count} />{stat.suffix}
                </div>
                <div className="font-cinzel text-[10px] text-titan-bronze uppercase tracking-[0.2em] text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
