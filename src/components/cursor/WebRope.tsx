"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "./CursorProvider";

// ── Verlet-rope web strand ────────────────────────────────────
// A Canvas2D overlay that draws a sagging web rope from the last
// click point to the current cursor. Uses simple Euler integration
// with gravity to create a natural droop.

const SEGMENTS = 18;
const GRAVITY = 0.22;
const DAMPING = 0.96;
const STIFFNESS = 0.35;

interface Node {
  x: number;
  y: number;
  px: number; // previous x
  py: number; // previous y
  pinned: boolean;
}

function makeChain(x0: number, y0: number, x1: number, y1: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    nodes.push({
      x: x0 + (x1 - x0) * t,
      y: y0 + (y1 - y0) * t,
      px: x0 + (x1 - x0) * t,
      py: y0 + (y1 - y0) * t,
      pinned: i === 0 || i === SEGMENTS,
    });
  }
  return nodes;
}

export function WebRope() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const { x, y, lastClickX, lastClickY } = useCursor();

  // Rebuild chain when click position changes
  useEffect(() => {
    if (lastClickX === 0 && lastClickY === 0) return;
    nodesRef.current = makeChain(lastClickX, lastClickY, x, y);
  }, [lastClickX, lastClickY]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update the cursor-end pin every frame
  useEffect(() => {
    if (nodesRef.current.length === 0) return;
    const last = nodesRef.current[nodesRef.current.length - 1];
    last.x = x;
    last.y = y;
    last.px = x;
    last.py = y;
  }, [x, y]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function simulate() {
      const nodes = nodesRef.current;
      if (nodes.length < 2) return;

      // Verlet integration
      for (const n of nodes) {
        if (n.pinned) continue;
        const vx = (n.x - n.px) * DAMPING;
        const vy = (n.y - n.py) * DAMPING;
        n.px = n.x;
        n.py = n.y;
        n.x += vx;
        n.y += vy + GRAVITY;
      }

      // Constraint relaxation (3 iterations)
      const segLen = Math.hypot(
        nodes[0].x - nodes[nodes.length - 1].x,
        nodes[0].y - nodes[nodes.length - 1].y
      ) / SEGMENTS;

      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < nodes.length - 1; i++) {
          const a = nodes[i];
          const b = nodes[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1;
          const diff = (d - segLen) / d * STIFFNESS;
          if (!a.pinned) { a.x += dx * diff; a.y += dy * diff; }
          if (!b.pinned) { b.x -= dx * diff; b.y -= dy * diff; }
        }
      }
    }

    function draw() {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      if (nodes.length < 2) return;

      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--skin-primary").trim() || "#CC0000";

      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.55;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    function loop() {
      simulate();
      draw();
      animFrameRef.current = requestAnimationFrame(loop);
    }

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9995] pointer-events-none"
      aria-hidden="true"
    />
  );
}
