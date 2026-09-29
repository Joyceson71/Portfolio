"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01ハヒフヘホABCDEFGHIJKLMNOP0x{}[]<>/\\|;:".split("");
    let cols: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / 16);
      cols = Array(colCount).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 10, 3, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "13px monospace";

      cols.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;

        // Bright head
        if (y === cols[i]) {
          ctx.fillStyle = "#ccffcc";
          ctx.shadowColor = "#00ff41";
          ctx.shadowBlur = 8;
        } else {
          const alpha = Math.random() * 0.5 + 0.1;
          ctx.fillStyle = `rgba(0, ${Math.floor(Math.random() * 80 + 160)}, 50, ${alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y * 16);

        if (y * 16 > canvas.height && Math.random() > 0.975) {
          cols[i] = 0;
        }
        cols[i]++;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.18 }}
    />
  );
}
