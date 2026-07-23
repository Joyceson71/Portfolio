"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { View, Environment, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

function CameraShake() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.03;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 18) * 0.03;
  });
  return null;
}

function MarchingMonoliths() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh: any) => {
        mesh.position.z += delta * 1.5; // March forward
        if (mesh.position.z > 5) {
          mesh.position.z = -30 - (Math.random() * 10); // Reset far back in the fog
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (i - 5.5) * 3, 
            -2, 
            -15 - (Math.random() * 20)
          ]}
        >
          <boxGeometry args={[2.5, 30, 2.5]} />
          <meshStandardMaterial 
            color="#050101" 
            roughness={0.9} 
            metalness={0.1}
            emissive="#330000"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Hero3DScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <CameraShake />
      
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ff3300" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#990000" />
      
      {/* Apocalyptic Fog */}
      <fog attach="fog" args={["#1a0000", 5, 30]} />

      {/* Falling Ash and Embers */}
      <Sparkles count={1500} scale={20} size={3} speed={0.8} opacity={0.8} color="#ff4400" />

      {/* The Wall Titans (Monoliths) */}
      <MarchingMonoliths />
      
      {/* Background Debris */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={`debris-${i}`} speed={2 + Math.random()} rotationIntensity={3} floatIntensity={3}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 15 - 5
            ]}
          >
            <octahedronGeometry args={[Math.random() * 0.8 + 0.2, 0]} />
            <meshStandardMaterial color="#111" emissive="#440000" roughness={0.8} />
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
      {/* Colossal Titan Background Art (Breathing Animation) */}
      <motion.div 
        className="absolute inset-0 z-[-1] pointer-events-none opacity-30 mix-blend-screen"
        animate={{ 
          scale: [1, 1.05, 1],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image 
          src="/images/titan.png" 
          alt="The Rumbling" 
          fill 
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* 3D Scrolling Marquee Background */}
      <div className="absolute w-[160%] -left-[30%] top-[45%] pointer-events-none z-0 opacity-20" style={{ transform: "perspective(1200px) rotateX(25deg) rotateY(-18deg) rotateZ(-5deg)" }}>
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <span className="font-heading font-black text-[120px] uppercase tracking-widest text-transparent pr-12" style={{ WebkitTextStroke: "2px rgba(255, 51, 0, 0.8)", textShadow: "0 0 40px rgba(255, 51, 0, 0.5)" }}>
            THE RUMBLING HAS BEGUN • SCOUT REGIMENT • THE RUMBLING HAS BEGUN • SCOUT REGIMENT • 
          </span>
          <span className="font-heading font-black text-[120px] uppercase tracking-widest text-transparent pr-12" style={{ WebkitTextStroke: "2px rgba(255, 51, 0, 0.8)", textShadow: "0 0 40px rgba(255, 51, 0, 0.5)" }}>
            THE RUMBLING HAS BEGUN • SCOUT REGIMENT • THE RUMBLING HAS BEGUN • SCOUT REGIMENT • 
          </span>
        </motion.div>
      </div>

      {/* 3D View Layer - Covers the whole section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <View className="w-full h-full">
          <Hero3DScene />
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
            className="inline-block px-4 py-1.5 mb-6 border border-primary/40 rounded-full bg-primary/10 text-primary text-xs font-mono tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,51,0,0.3)]"
          >
            TACTICAL ODM INTERFACE
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
            Frontend Developer <span className="text-primary mx-2">|</span> UI/UX Engineer
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } }
            }}
            className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed font-sans"
          >
            Welcome to the Tactical ODM Interface. I specialize in building exceptional digital experiences, combining modern web technologies with high-performance 3D graphics to craft interfaces that leave a lasting impact.
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
              className="group relative px-8 py-4 bg-gradient-to-br from-primary to-accent text-white font-heading uppercase tracking-widest text-sm rounded-md shadow-[0_0_30px_rgba(255,51,0,0.3)] hover:shadow-[0_0_40px_rgba(153,0,0,0.5)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative flex items-center gap-2">
                View Expeditions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/about"
              className="px-8 py-4 border border-border bg-card/50 backdrop-blur-sm font-heading uppercase tracking-widest text-sm rounded-md hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,51,0,0.2)]"
            >
              Founder Profile
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
