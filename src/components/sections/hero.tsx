"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";

/* ── Crystal Orb Scene (standalone canvas) ── */
function CrystalOrb() {
  const mainRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mainRef.current) {
      mainRef.current.rotation.y = t * 0.15;
      mainRef.current.rotation.z = t * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]}   color="#00d4ff" intensity={60} />
      <pointLight position={[-5, -5, 3]} color="#ff2d78" intensity={40} />
      <pointLight position={[0, 8, -5]}  color="#b400ff" intensity={30} />

      {/* Main orb */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.5}>
        <Sphere ref={mainRef} args={[1.8, 128, 128]}>
          <MeshDistortMaterial
            color="#ffffff"
            distort={0.45}
            speed={2.5}
            metalness={0.1}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.92}
            envMapIntensity={2}
          />
        </Sphere>
      </Float>

      {/* Inner glowing core */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere ref={innerRef} args={[0.9, 64, 64]}>
          <MeshDistortMaterial
            color="#00d4ff"
            distort={0.55}
            speed={3}
            metalness={0}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.7}
            emissive="#00d4ff"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>

      {/* Satellite orbs */}
      {[
        { pos: [-3, 1.5, 0],  r: 0.55, c: "#ff2d78", d: 0.5, s: 2   },
        { pos: [3,  -1.5, 1], r: 0.4,  c: "#b400ff", d: 0.4, s: 2.5 },
        { pos: [-2, -2, -1],  r: 0.3,  c: "#39ff14", d: 0.35, s: 3  },
      ].map((o, i) => (
        <Float key={i} speed={o.s} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[o.r, 32, 32]} position={o.pos as [number,number,number]}>
            <MeshDistortMaterial
              color={o.c}
              distort={o.d}
              speed={2}
              metalness={0.2}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0}
              transparent
              opacity={0.9}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

/* ── Animated character split ── */
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5 + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Section ghost number */}
      <span className="section-num right-[2vw] top-[15vh] select-none pointer-events-none z-0">
        01
      </span>

      {/* Standalone 3D Canvas — right half */}
      {mounted && (
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 pointer-events-none">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <CrystalOrb />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Diagonal color shard */}
      <div
        className="absolute bottom-0 right-0 w-[55%] h-[60%] z-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 40%, rgba(0,212,255,0.03) 100%)",
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          top: "40%",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.15) 30%, rgba(0,212,255,0.4) 50%, rgba(0,212,255,0.15) 70%, transparent 100%)",
        }}
      />

      {/* Main content — left half */}
      <div className="container mx-auto px-8 md:px-16 relative z-10 py-32 md:py-0">
        <div className="max-w-[640px]">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-[var(--crystal)]" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--crystal)]">
              Frontend Engineer · 2024
            </span>
          </motion.div>

          {/* Main headline — character split animation */}
          <h1 className="font-heading font-black leading-[0.92] tracking-tight mb-8 overflow-hidden"
              style={{ perspective: "800px" }}>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)] text-white">
              <SplitText text="Design." />
            </div>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)] text-white">
              <SplitText text="Engineer." />
            </div>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)]" style={{ overflow: "visible" }}>
              <SplitText
                text="Deploy."
                className="text-prism"
              />
            </div>
          </h1>

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="font-sans text-base md:text-lg text-[var(--muted-foreground)] max-w-md leading-relaxed mb-12"
          >
            I'm <strong className="text-white font-semibold">Joyceson Danielraj</strong> — building immersive, performant web experiences where design precision meets engineering depth.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#projects"
              className="group relative overflow-hidden flex items-center gap-2 px-7 py-4 font-sans font-semibold text-sm text-black rounded-none iridescent-border"
              style={{ background: "var(--crystal)", color: "var(--void)" }}
            >
              <span className="relative z-10">Explore Work</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
            </Link>

            <Link
              href="#contact"
              className="flex items-center gap-2 px-7 py-4 font-sans font-semibold text-sm border border-white/10 text-white hover:border-[var(--crystal)]/40 hover:text-[var(--crystal)] transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex gap-10 mt-16 pt-10 border-t border-white/5"
          >
            {[
              { num: "2+",  label: "Years Exp." },
              { num: "10+", label: "Projects" },
              { num: "∞",   label: "Commits" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading font-black text-2xl text-white">{s.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 flex items-center gap-3 z-10"
      >
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[var(--crystal)] to-transparent"
        />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
