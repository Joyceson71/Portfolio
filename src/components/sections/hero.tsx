"use client";

import { useRef } from "react";
import Link from "next/link";
import { View, Environment, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

function CameraShake() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 1.5) * 0.05;
  });
  return null;
}

function SystemCore3DScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
      <CameraShake />
      
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#3B82F6" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#7C3AED" />
      
      <fog attach="fog" args={["#0A0A12", 10, 40]} />

      <Sparkles count={800} scale={25} size={2} speed={0.5} opacity={0.6} color="#3B82F6" />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh>
            <torusGeometry args={[5, 0.05, 16, 100]} />
            <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={2} />
          </mesh>
        </Float>
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[6, 0.02, 16, 100]} />
            <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} />
          </mesh>
        </Float>
        
        {/* Floating Data Cubes */}
        {Array.from({ length: 40 }).map((_, i) => (
          <Float key={`cube-${i}`} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={2}>
            <mesh 
              position={[
                (Math.random() - 0.5) * 25, 
                (Math.random() - 0.5) * 25, 
                (Math.random() - 0.5) * 25
              ]}
            >
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial 
                color="#0A0A12" 
                roughness={0.1} 
                metalness={0.8}
                emissive="#3B82F6"
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>
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
      {/* 3D Scrolling Marquee Background */}
      <div className="absolute w-[160%] -left-[30%] top-[45%] pointer-events-none z-0 opacity-20" style={{ transform: "perspective(1200px) rotateX(25deg) rotateY(-18deg) rotateZ(-5deg)" }}>
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <span className="font-heading font-black text-[120px] uppercase tracking-widest text-transparent pr-12" style={{ WebkitTextStroke: "2px rgba(124, 58, 237, 0.8)", textShadow: "0 0 40px rgba(124, 58, 237, 0.5)" }}>
            SYSTEM INTERFACE ONLINE • S-RANK HUNTER • SYSTEM INTERFACE ONLINE • S-RANK HUNTER • 
          </span>
          <span className="font-heading font-black text-[120px] uppercase tracking-widest text-transparent pr-12" style={{ WebkitTextStroke: "2px rgba(124, 58, 237, 0.8)", textShadow: "0 0 40px rgba(124, 58, 237, 0.5)" }}>
            SYSTEM INTERFACE ONLINE • S-RANK HUNTER • SYSTEM INTERFACE ONLINE • S-RANK HUNTER • 
          </span>
        </motion.div>
      </div>

      {/* 3D View Layer - Covers the whole section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <View className="w-full h-full">
          <SystemCore3DScene />
        </View>
      </div>

      {/* DOM Layer */}
      <div className="container relative z-10 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="flex flex-col items-start"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="inline-block px-4 py-1.5 mb-6 border border-primary/40 rounded-full bg-primary/10 text-primary text-xs font-mono tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            S-RANK SYSTEM INITIALIZED
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-4"
          >
            Joyceson<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow inline-block mt-2">
              Danielraj
            </span>
          </motion.h1>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-mono text-xl md:text-2xl text-muted-foreground mb-8 uppercase tracking-wider"
          >
            S-Rank Developer <span className="text-primary mx-2">|</span> UI Architect
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } }
            }}
            className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed font-sans"
          >
            Welcome to the S-Rank Developer System Interface. I specialize in building exceptional digital experiences, combining modern web technologies with high-performance 3D graphics to craft interfaces that dominate the web.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              href="/projects"
              className="group relative px-8 py-4 bg-gradient-to-br from-primary to-accent text-white font-heading uppercase tracking-widest text-sm rounded-md shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative flex items-center gap-2">
                Open Quest Log <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/about"
              className="px-8 py-4 border border-border bg-card/50 backdrop-blur-sm font-heading uppercase tracking-widest text-sm rounded-md hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              System Profile
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
