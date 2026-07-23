"use client";

import { useRef } from "react";
import { View, Environment, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function CameraShake() {
  useFrame((state) => {
    // Subtle but intense continuous rumbling effect
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.03;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 18) * 0.03;
  });
  return null;
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
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            (i - 5.5) * 3, 
            -2, 
            -15 - (Math.random() * 10)
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
            className="inline-block px-4 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary text-sm font-mono tracking-widest"
          >
            PORTFOLIO 2026
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-4"
          >
            Joyceson<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow inline-block mt-2">
              Danielraj
            </span>
          </motion.h1>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-mono text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Frontend Developer <span className="text-primary">|</span> UI/UX Engineer
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } }
            }}
            className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
          >
            I specialize in building exceptional digital experiences. By combining modern web technologies with deep design principles, I craft interfaces that leave a lasting impact.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-heading uppercase tracking-widest text-sm overflow-hidden rounded-md hover:shadow-[0_0_30px_var(--primary)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a 
              href="#about"
              className="px-8 py-4 border border-white/20 font-heading uppercase tracking-widest text-sm rounded-md hover:bg-white/5 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              About Me
            </a>
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
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
