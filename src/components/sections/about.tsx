"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1400, 1);
        setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

const facts = [
  { label: "Next.js", detail: "App Router · RSC" },
  { label: "React",   detail: "19 · Concurrent" },
  { label: "Three.js",detail: "R3F · Drei · Shaders" },
  { label: "TypeScript", detail: "Strict · Zod" },
  { label: "Design",  detail: "Figma · Motion" },
];

export function About() {
  return (
    <section id="about" className="relative w-full min-h-screen py-32 md:py-40 overflow-hidden">
      {/* Ghost number */}
      <span className="ax-num left-[-2vw] top-[10%]">02</span>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ax-label mb-16"
        >
          About
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">
          {/* Text column */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-heading font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] tracking-tight text-foreground mb-10"
            >
              I engineer interfaces<br />
              <span className="text-brand">that breathe.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5 font-sans text-base leading-relaxed text-muted-foreground max-w-xl"
            >
              <p>
                As a <strong className="text-foreground">Frontend Engineer</strong>, I obsess over the gap between what's designed and what's built — and I close it completely. Every component is deliberate, every animation purposeful.
              </p>
              <p>
                My stack is sharp: Next.js 16, React 19, TypeScript strict mode, Three.js for 3D, and Framer Motion for fluid animation systems. I think in design systems and ship production-grade code.
              </p>
            </motion.div>

            {/* Tech stack list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 border-t border-border"
            >
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between py-4 border-b border-border group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{f.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{f.detail}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              href="#contact"
              className="inline-flex items-center gap-2 mt-10 font-mono text-xs tracking-widest uppercase text-primary hover:text-foreground transition-colors group"
            >
              Start a project
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Stats column */}
          <div className="space-y-4">
            {[
              { val: 2,  suffix: "+", label: "Years of experience" },
              { val: 10, suffix: "+", label: "Projects shipped" },
              { val: 3,  suffix: "k+", label: "GitHub commits" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="ax-card p-8 rounded-lg"
              >
                <div className="font-heading font-black text-5xl text-foreground mb-2">
                  <Counter to={s.val} />
                  <span className="text-primary">{s.suffix}</span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
