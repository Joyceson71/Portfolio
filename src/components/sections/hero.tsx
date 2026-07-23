"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { ParticleNetwork } from "@/components/ui/particle-network";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <ParticleNetwork />
      
      <div 
        ref={ref}
        className={`w-full max-w-[900px] mx-auto px-6 flex flex-col items-center text-center fade-up ${isVisible ? 'in-view' : ''}`}
      >
        <div 
          style={{ 
            fontFamily: 'var(--font-cinzel)', 
            color: 'var(--accent-bronze)', 
            fontSize: '0.7rem', 
            letterSpacing: '0.4em' 
          }}
          className="uppercase font-bold mb-6"
        >
          Survey Corps • 104th Squad
        </div>
        
        <h1 style={{ lineHeight: 0.9, fontWeight: 900 }}>
          <div 
            style={{ 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-cinzel-dec)' 
            }}
            className="text-[3rem] md:text-[5rem]"
          >
            Joyceson
          </div>
          <div 
            style={{ 
              color: 'var(--accent-bronze)', 
              fontFamily: 'var(--font-cinzel-dec)' 
            }}
            className="text-[3rem] md:text-[5rem]"
          >
            Danielraj
          </div>
        </h1>
        
        <p 
          style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.05rem', 
            lineHeight: 1.8 
          }}
          className="mt-8 mb-12 max-w-[520px] font-sans font-light"
        >
          Frontend Developer & UI/UX Engineer translating complex designs into seamless digital realities.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Link 
            href="#projects"
            style={{
              backgroundColor: 'var(--accent-bronze)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.9rem',
              padding: '0.9rem 2.5rem',
              borderRadius: '2px'
            }}
            className="uppercase font-bold hover:-translate-y-[2px] transition-transform w-full md:w-auto"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-bronze)'}
          >
            View Projects
          </Link>
          
          <Link 
            href="#about"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--accent-bronze)',
              color: 'var(--accent-bronze)',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.9rem',
              padding: '0.9rem 2.5rem',
              borderRadius: '2px',
              transition: 'all 0.3s'
            }}
            className="uppercase font-bold w-full md:w-auto"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(193,127,58,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            More About Me
          </Link>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
        <span 
          style={{ 
            fontFamily: 'var(--font-cinzel)', 
            fontSize: '0.7rem', 
            letterSpacing: '0.2em',
            color: 'var(--text-muted)'
          }}
          className="uppercase"
        >
          Scroll
        </span>
        <ArrowDown size={16} color="var(--text-muted)" />
      </div>
    </section>
  );
}
