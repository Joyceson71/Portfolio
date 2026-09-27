"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import * as THREE from "three";

/* ── Axiom Orb Scene ── */
function AxiomOrb({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const mainRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Parallax effect based on mouse
    const targetX = (mouseX.get() / window.innerWidth - 0.5) * 3;
    const targetY = -(mouseY.get() / window.innerHeight - 0.5) * 3;

    if (mainRef.current) {
      mainRef.current.position.x += (targetX - mainRef.current.position.x) * 0.05;
      mainRef.current.position.y += (targetY - mainRef.current.position.y) * 0.05;
      mainRef.current.rotation.y = t * 0.15;
      mainRef.current.rotation.z = t * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.position.x += (targetX - innerRef.current.position.x) * 0.05;
      innerRef.current.position.y += (targetY - innerRef.current.position.y) * 0.05;
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]}   color="#818cf8" intensity={80} />
      <pointLight position={[-5, -5, 3]} color="#fbbf24" intensity={60} />
      <pointLight position={[0, 8, -5]}  color="#fb7185" intensity={50} />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
        <Sphere ref={mainRef} args={[2.2, 128, 128]}>
          <MeshDistortMaterial
            color="#2a2a40"
            distort={0.4}
            speed={2}
            metalness={0.6}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere ref={innerRef} args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color="#818cf8"
            distort={0.6}
            speed={3}
            metalness={0.2}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.9}
            emissive="#818cf8"
            emissiveIntensity={0.6}
          />
        </Sphere>
      </Float>
    </>
  );
}

/* ── Glitch Text Component ── */
function GlitchText({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * 0.2 }
    })
  };

  const child = {
    visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", transition: { type: "spring" as const, damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 50, rotateX: -90, filter: "blur(10px)" }
  };

  return (
    <motion.span variants={container} initial="hidden" animate="visible" className="inline-flex whitespace-nowrap" style={{ perspective: "800px" }}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={child as any} className="inline-block origin-bottom">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative w-full min-h-screen bg-background overflow-hidden flex items-center">
      
      {/* 3D Canvas Background */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <AxiomOrb mouseX={mouseX} mouseY={mouseY} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Top-Right Decorative Element */}
        <motion.div 
          className="absolute right-6 top-[15vh] hidden md:flex flex-col items-end gap-2 text-right"
          style={{ y: y2 }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary border border-primary px-3 py-1">
            Status: Active
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Coord: {mounted ? "34.0522° N, 118.2437° W" : "LOADING..."}
          </span>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-20">
          
          <motion.div style={{ y: y1, opacity }} className="max-w-[800px] flex-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary font-semibold">
                Frontend Engineer
              </span>
            </div>

            <h1 className="font-heading font-black leading-[0.85] tracking-tighter uppercase select-none mb-10 flex flex-col">
              <span className="text-[clamp(3.5rem,9vw,8rem)] text-foreground block overflow-hidden">
                <GlitchText text="Immersive" delay={0.5} />
              </span>
              <span className="text-[clamp(3.5rem,9vw,8rem)] text-brand block overflow-hidden" style={{ marginLeft: "clamp(2rem, 5vw, 6rem)"}}>
                <GlitchText text="Digital" delay={1.5} />
              </span>
              <span className="text-[clamp(3.5rem,9vw,8rem)] text-foreground block overflow-hidden text-outline">
                <GlitchText text="Realities" delay={2.5} />
              </span>
            </h1>

            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
              <p className="font-sans text-base md:text-lg text-muted-foreground max-w-sm leading-relaxed border-l-2 border-border pl-6">
                Joyceson Danielraj crafts interactive web experiences where architectural design precision meets highly scalable engineering depth.
              </p>

              <div className="flex flex-col gap-4">
                <Link href="#projects" className="ax-btn group text-center inline-flex justify-center w-48">
                  <span className="relative z-10 flex items-center gap-2">
                    View Systems <ArrowDownRight className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
                  </span>
                </Link>
                <Link href="#contact" className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors inline-flex items-center gap-2 px-2">
                  Initialize Contact <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Vertical Title Indicator */}
      <motion.div 
        className="absolute left-6 bottom-12 flex flex-col items-center gap-4 hidden md:flex"
        style={{ opacity }}
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Portfolio.2024
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
