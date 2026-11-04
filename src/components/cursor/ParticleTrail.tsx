"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "./CursorProvider";

// ── Particle trail following the cursor ───────────────────────
// Canvas2D approach: ~30 particles that lerp toward the cursor
// and fade out. On click, they scatter radially.
// Web filament connector lines between nearby particles.

interface Particle {
  x: number;
  y: number;
  life: number;   // 0–1
  vx: number;
  vy: number;
  size: number;
}

const MAX_PARTICLES = 30;

export function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const { x, y, isClicking } = useCursor();
  const mouseRef = useRef({ x: 0, y: 0, clicking: false });

  useEffect(() => {
    mouseRef.current = { x, y, clicking: isClicking };
  }, [x, y, isClicking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Scatter on click
    const onDown = (e: MouseEvent) => {
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4.5;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3,
        });
      }
    };
    window.addEventListener("mousedown", onDown);

    let spawnTimer = 0;

    function loop(ts: number) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--skin-primary").trim() || "#CC0000";

      // Spawn a trail particle every ~28ms
      if (ts - spawnTimer > 28) {
        spawnTimer = ts;
        if (particlesRef.current.length < MAX_PARTICLES) {
          particlesRef.current.push({
            x: mx + (Math.random() - 0.5) * 6,
            y: my + (Math.random() - 0.5) * 6,
            life: 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: 1.5 + Math.random() * 2,
          });
        }
      }

      // Update & draw
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.01);
      const particles = particlesRef.current;

      // Web filaments: draw interconnecting threads between close trail nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 2300) { // ~48px
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 0.75;
            ctx.globalAlpha = (1 - dist / 48) * Math.min(p1.life, p2.life) * 0.35;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= 0.035;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size * p.life), 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = p.life * 0.65;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9994] pointer-events-none"
      aria-hidden="true"
    />
  );
}
