"use client";

import { useRef } from "react";
import { View, Environment, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Hero3DScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#9d00ff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff0033" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={["#030303", 5, 20]} />

      <Sparkles count={300} scale={12} size={2} speed={0.4} opacity={0.5} color="#9d00ff" />

      {/* Floating geometric object (Prison Realm inspired cube) */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial 
            color="#050505" 
            roughness={0.2} 
            metalness={0.8}
            emissive="#1a0033"
            emissiveIntensity={0.5}
          />
          {/* Inner core visible through wireframe layer */}
          <mesh>
            <icosahedronGeometry args={[1.2, 0]} />
            <meshBasicMaterial color="#ff0033" wireframe />
          </mesh>
        </mesh>
      </Float>
      
      {/* Background fragments */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={2}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 10, 
              (Math.random() - 0.5) * 10, 
              (Math.random() - 0.5) * 10 - 2
            ]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#111" emissive="#220033" roughness={0.3} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D View Layer - Covers the whole section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <View className="w-full h-full">
          <Hero3DScene />
        </View>
      </div>

      {/* DOM Layer */}
      <div className="container relative z-10 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary text-sm font-mono tracking-widest">
            PORTFOLIO 2026
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-4">
            Joyceson<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow">
              Danielraj
            </span>
          </h1>
          
          <div className="font-mono text-xl md:text-2xl text-muted-foreground mb-8">
            Frontend Developer <span className="text-primary">|</span> UI/UX Engineer
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
            I specialize in building exceptional digital experiences. By combining modern web technologies with deep design principles, I craft interfaces that leave a lasting impact.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-heading uppercase tracking-widest text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a 
              href="#about"
              className="px-8 py-4 border border-white/20 font-heading uppercase tracking-widest text-sm hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              About Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
