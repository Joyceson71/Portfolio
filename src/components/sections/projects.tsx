"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const projectsData = [
  {
    id: 1,
    title: "Kings LMS",
    category: "Full-Stack",
    image: "/images/armored.png", 
    description: "A comprehensive Learning Management System built for scale. Features role-based access control, course management, and interactive assessments.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    github: "#",
    demo: "https://kings-lms.vercel.app/"
  },
  {
    id: 2,
    title: "Quiz Arena",
    category: "UI",
    image: "/images/levi.png",
    description: "A highly interactive quiz platform with real-time scoring, custom animations, and a sleek user interface designed for maximum engagement.",
    tech: ["React", "CSS Animations", "Zustand", "Vite"],
    github: "#",
    demo: "https://quizarena71.vercel.app/"
  },
  {
    id: 3,
    title: "SmartBiz",
    category: "Full-Stack",
    image: "/images/mikasa.png",
    description: "Modern business intelligence dashboard with real-time data visualization, predictive analytics, and automated reporting systems.",
    tech: ["Next.js", "D3.js", "Node.js", "PostgreSQL"],
    github: "#",
    demo: "https://smart-biz-inky.vercel.app/"
  }
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState("All Projects");

  const filteredProjects = filter === "All Projects" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        padding: '6rem 1.5rem',
      }}
    >
      <div className={`container mx-auto max-w-6xl fade-up ${isVisible ? 'in-view' : ''}`}>
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div 
            style={{ 
              fontFamily: 'var(--font-cinzel)', 
              color: 'var(--accent-bronze)',
              letterSpacing: '0.2em'
            }}
            className="uppercase font-bold mb-4"
          >
            Portfolio
          </div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-cinzel-dec)', 
              color: 'var(--text-primary)',
              fontSize: '2.5rem'
            }}
          >
            Selected Works
          </h2>
        </div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {["All Projects", "Full-Stack", "UI"].map(btn => {
            const isActive = filter === btn;
            return (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                style={{
                  backgroundColor: isActive ? 'rgba(193,127,58,0.08)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--accent-bronze)' : 'var(--border-color)'}`,
                  color: isActive ? 'var(--accent-bronze)' : 'var(--text-muted)',
                  padding: '0.5rem 1.4rem',
                  fontFamily: 'var(--font-cinzel)',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s'
                }}
                className="hover:border-[var(--accent-bronze)] hover:text-[var(--accent-bronze)] hover:bg-[rgba(193,127,58,0.08)]"
              >
                {btn}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="group"
              style={{
                backgroundColor: 'rgba(15,15,26,0.9)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(193,127,58,0.4)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image Section */}
              <div 
                style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'saturate(0.8) brightness(0.9)',
                    transition: 'all 0.4s ease'
                  }}
                  className="group-hover:scale-[1.06] group-hover:saturate-100 group-hover:brightness-100"
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '40%',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(15,15,26,1) 100%)'
                  }}
                />
              </div>

              {/* Text Section */}
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-cinzel)', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {project.title}
                </h3>
                
                <p 
                  style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.85rem', 
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                    flexGrow: 1
                  }}
                >
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {project.tech.map(t => (
                    <span 
                      key={t}
                      style={{
                        backgroundColor: 'rgba(42,122,106,0.15)',
                        border: '1px solid rgba(42,122,106,0.3)',
                        color: 'var(--accent-teal)',
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        borderRadius: '2px'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-cinzel)',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      transition: 'color 0.3s'
                    }}
                    className="hover:text-[var(--accent-bronze)]"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-cinzel)',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      transition: 'color 0.3s'
                    }}
                    className="hover:text-[var(--accent-bronze)]"
                  >
                    <GithubIcon size={14} /> Source
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
