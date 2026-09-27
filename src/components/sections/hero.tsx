"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";

/* ── Axiom Orb Scene (standalone canvas) ── */
function AxiomOrb() {
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
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]}   color="#818cf8" intensity={50} /> {/* Indigo */}
      <pointLight position={[-5, -5, 3]} color="#fbbf24" intensity={35} /> {/* Amber */}
      <pointLight position={[0, 8, -5]}  color="#fb7185" intensity={25} /> {/* Rose */}

      {/* Main orb */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
        <Sphere ref={mainRef} args={[1.8, 128, 128]}>
          <MeshDistortMaterial
            color="#08080f"
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={2}
          />
        </Sphere>
      </Float>

      {/* Inner glowing core */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere ref={innerRef} args={[0.9, 64, 64]}>
          <MeshDistortMaterial
            color="#818cf8"
            distort={0.6}
            speed={3}
            metalness={0}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.8}
            emissive="#818cf8"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Satellite orbs */}
      {[
        { pos: [-3, 1.5, 0],  r: 0.55, c: "#fbbf24", d: 0.5, s: 2   },
        { pos: [3,  -1.5, 1], r: 0.4,  c: "#fb7185", d: 0.4, s: 2.5 },
        { pos: [-2, -2, -1],  r: 0.3,  c: "#818cf8", d: 0.35, s: 3  },
      ].map((o, i) => (
        <Float key={i} speed={o.s} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[o.r, 32, 32]} position={o.pos as [number,number,number]}>
            <MeshDistortMaterial
              color={o.c}
              distort={o.d}
              speed={2}
              metalness={0.4}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0}
              transparent
              opacity={0.8}
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
      <span className="ax-num right-[2vw] top-[15vh]">
        01
      </span>

      {/* Standalone 3D Canvas — right half */}
      {mounted && (
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 pointer-events-none">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <AxiomOrb />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Main content — left half */}
      <div className="container mx-auto px-8 md:px-16 relative z-10 py-32 md:py-0">
        <div className="max-w-[640px]">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="ax-label mb-10"
          >
            Frontend Engineer · 2024
          </motion.div>

          {/* Main headline — character split animation */}
          <h1 className="font-heading font-black leading-[0.92] tracking-tight mb-8 overflow-hidden"
              style={{ perspective: "800px" }}>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)] text-foreground">
              <SplitText text="Design." />
            </div>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)] text-foreground">
              <SplitText text="Engineer." />
            </div>
            <div className="text-[clamp(3.5rem,8vw,6.5rem)]" style={{ overflow: "visible" }}>
              <SplitText
                text="Deploy."
                className="text-brand"
              />
            </div>
          </h1>

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="font-sans text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-12"
          >
            I'm <strong className="text-foreground font-semibold">Joyceson Danielraj</strong> — building immersive, performant web experiences where design precision meets engineering depth.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="#projects" className="ax-btn group">
              <span className="relative z-10 flex items-center gap-2">
                Explore Work
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </Link>

            <Link href="#contact" className="ax-btn-ghost group">
              Get In Touch
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex gap-10 mt-16 pt-10 border-t border-border"
          >
            {[
              { num: "2+",  label: "Years Exp." },
              { num: "10+", label: "Projects" },
              { num: "∞",   label: "Commits" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading font-black text-2xl text-foreground">{s.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
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
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
