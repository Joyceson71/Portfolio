"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const skillsData = [
  { name: "React / Next.js", level: 95, tags: ["Hooks", "SSR", "RSC", "Framer Motion"] },
  { name: "TypeScript", level: 90, tags: ["Generics", "Interfaces", "Type Safety"] },
  { name: "CSS / Animations", level: 92, tags: ["Tailwind", "GSAP", "CSS Variables", "Keyframes"] },
  { name: "Databases", level: 85, tags: ["PostgreSQL", "MongoDB", "Prisma", "Redis"] },
  { name: "Backend / API", level: 82, tags: ["Node.js", "Express", "REST", "GraphQL"] },
  { name: "Dev Tools", level: 88, tags: ["Git", "Docker", "Webpack", "Vite"] },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-secondary)',
        padding: '6rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className={`container mx-auto max-w-6xl fade-up ${isVisible ? 'in-view' : ''}`}>
        
        {/* Section Label & H2 */}
        <div className="mb-12">
          <div 
            style={{ 
              fontFamily: 'var(--font-cinzel)', 
              color: 'var(--accent-bronze)',
              letterSpacing: '0.2em'
            }}
            className="uppercase font-bold mb-4"
          >
            Technical Arsenal
          </div>
          <h2 
            style={{ 
              fontFamily: 'var(--font-cinzel-dec)', 
              color: 'var(--text-primary)',
              fontSize: '2.5rem'
            }}
          >
            Core Proficiencies
          </h2>
          <p 
            style={{ 
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              marginTop: '1rem'
            }}
          >
            Organized by project usage and expertise level.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {skillsData.map((skill, index) => (
            <div 
              key={index}
              className="group"
              style={{
                backgroundColor: 'rgba(15,15,26,0.9)',
                border: '1px solid var(--border-color)',
                padding: '2rem',
                borderRadius: '4px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(193,127,58,0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <span 
                  style={{ 
                    fontFamily: 'var(--font-cinzel)',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.03em'
                  }}
                >
                  {skill.name}
                </span>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-cinzel)',
                    color: 'var(--accent-bronze)'
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Bar */}
              <div 
                style={{
                  height: '3px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  marginBottom: '1.5rem',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="progress-bar-fill"
                  style={{
                    height: '100%',
                    width: isVisible ? `${skill.level}%` : '0%',
                    background: 'linear-gradient(90deg, var(--accent-teal), var(--accent-bronze))',
                    transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skill.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: 'rgba(193,127,58,0.1)',
                      border: '1px solid rgba(193,127,58,0.2)',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '2px',
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(193,127,58,0.2)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(193,127,58,0.1)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
