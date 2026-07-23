"use client";

import { useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import dynamic from "next/dynamic";

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
  ssr: false,
});

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
  
  return <span ref={ref}>{count < 10 && count > 0 ? `0${count}` : count}</span>;
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-secondary)',
        padding: '6rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AboutScene />
      </div>

      <div className={`container mx-auto max-w-5xl fade-up relative z-10 ${isVisible ? 'in-view' : ''}`}>
        
        {/* Section Label */}
        <div 
          style={{ 
            fontFamily: 'var(--font-cinzel)', 
            color: 'var(--accent-bronze)',
            letterSpacing: '0.2em'
          }}
          className="uppercase font-bold mb-12"
        >
          About Me
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Column 1: Image & Brackets */}
          <div className="flex justify-center lg:justify-start">
            <div 
              className="relative group transition-all duration-300"
              style={{
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '380/500',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(26,26,46,0.2)' // placeholder bg
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-bronze)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Optional: Add real image here later using <img src="..." className="w-full h-full object-cover opacity-80" /> */}
              
              {/* Brackets */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: 'var(--accent-bronze)' }} />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: 'var(--accent-bronze)' }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: 'var(--accent-bronze)' }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: 'var(--accent-bronze)' }} />
            </div>
          </div>

          {/* Column 2: Text & Stats */}
          <div className="flex flex-col gap-8">
            <h2 
              style={{ 
                fontFamily: 'var(--font-cinzel-dec)', 
                color: 'var(--text-primary)',
                fontSize: '2.5rem'
              }}
            >
              The <span style={{ color: 'var(--accent-bronze)' }}>Founder</span>
            </h2>
            
            <div 
              style={{ 
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.9
              }}
              className="space-y-4"
            >
              <p>
                I am a Frontend Developer passionate about creating interactive, accessible, and high-performance web applications. My expertise lies in translating complex designs into seamless digital realities.
              </p>
              <p>
                With a strong foundation in modern JavaScript frameworks and a keen eye for UI/UX, I bridge the gap between design and engineering. Exceptional products are born from continuous learning and meticulous attention to detail.
              </p>
            </div>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { count: 2, label: "Years Experience", suffix: "+" },
                { count: 10, label: "Projects Completed", suffix: "+" },
                { count: 5, label: "Tech Stacks", suffix: "+" },
                { count: 100, label: "Commitment", suffix: "%" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  style={{
                    backgroundColor: 'rgba(26,26,46,0.6)',
                    border: '1px solid var(--border-color)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    transition: 'border-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(193,127,58,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <h3 
                    style={{
                      color: 'var(--accent-bronze)',
                      fontSize: '2.5rem',
                      fontFamily: 'var(--font-cinzel-dec)',
                      fontWeight: 700
                    }}
                  >
                    <Counter from={0} to={stat.count} />{stat.suffix}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      fontFamily: 'var(--font-cinzel)',
                      textTransform: 'uppercase',
                      marginTop: '0.5rem'
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
