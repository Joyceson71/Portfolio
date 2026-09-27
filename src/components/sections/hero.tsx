"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshTransmissionMaterial, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

/* ── Smooth Glass Orb Scene ── */
function GlassOrb() {
  const mainRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mainRef.current) {
      mainRef.current.rotation.x = t * 0.1;
      mainRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#0071e3" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={mainRef} args={[1.5, 64, 64]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#ffffff"
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
          />
        </Sphere>
      </Float>
    </>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      
      {/* 3D Glass Background */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full max-w-4xl mx-auto opacity-70">
            <Canvas dpr={[1, 2]}>
              <Suspense fallback={null}>
                <GlassOrb />
              </Suspense>
            </Canvas>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-white/80">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 max-w-4xl"
        >
          Building <span className="text-gradient">digital</span><br />
          <span className="text-gradient-blue">experiences.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          I'm Joyceson Danielraj, a frontend engineer obsessed with design precision, fluid animations, and robust performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="#projects" className="btn-primary w-full sm:w-auto">
            Explore Work
          </Link>
          <Link href="#contact" className="btn-secondary w-full sm:w-auto">
            Get in Touch
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
