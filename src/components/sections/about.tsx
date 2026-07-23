"use client";

import { useEffect, useState, useRef } from "react";
import { View, Float, Box, Cylinder, Sphere } from "@react-three/drei";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, duration]);
  
  return <span ref={ref}>{count < 10 && count > 0 ? `0${count}` : count}</span>;
}

function Workspace3DScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ff3300" />
      <pointLight position={[-5, 5, -5]} intensity={3} color="#990000" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, -1, 0]}>
          {/* Desk Base */}
          <Box args={[6, 0.2, 3]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </Box>
          
          {/* Laptop Base */}
          <Box args={[1.5, 0.05, 1]} position={[-1, 0.125, 0.5]}>
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
          </Box>
          {/* Laptop Screen */}
          <Box args={[1.5, 1, 0.05]} position={[-1, 0.6, 0]} rotation={[-0.2, 0, 0]}>
            <meshStandardMaterial color="#050505" emissive="#ff3300" emissiveIntensity={0.3} />
          </Box>
          
          {/* Monitor */}
          <Box args={[2.5, 1.5, 0.1]} position={[1.5, 1, -0.2]} rotation={[0, -0.2, 0]}>
            <meshStandardMaterial color="#000" emissive="#ff0033" emissiveIntensity={0.1} />
          </Box>
          {/* Monitor Stand */}
          <Cylinder args={[0.1, 0.3, 1]} position={[1.5, 0.5, -0.3]}>
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </Cylinder>
          
          {/* Coffee Mug */}
          <Cylinder args={[0.15, 0.15, 0.3]} position={[-2.2, 0.25, 0.8]}>
            <meshStandardMaterial color="#f4f4f5" />
          </Cylinder>

          {/* Glowing Sphere (Hologram) */}
          <Float speed={4} rotationIntensity={2} floatIntensity={2}>
            <Sphere args={[0.2, 16, 16]} position={[1.5, 1, 0.5]}>
              <meshStandardMaterial color="#ff3300" emissive="#ff0000" emissiveIntensity={2.5} wireframe />
            </Sphere>
          </Float>
        </group>
      </Float>
    </>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen py-32 overflow-x-hidden bg-background">
      {/* Armored Titan Background Art */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        animate={{ 
          scale: [1, 1.03, 1],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image 
          src="/images/armored.png" 
          alt="Armored Titan" 
          fill 
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-primary uppercase">About Me</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mt-2">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow">Founder</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am a <strong className="text-foreground">Frontend Developer</strong> passionate about creating interactive, accessible, and high-performance web applications. My expertise lies in translating complex designs into seamless digital realities.
            </p>
            <p>
              With a strong foundation in modern JavaScript frameworks and a keen eye for UX/UI, I aim to bridge the gap between design and engineering. I believe that exceptional products are born from continuous learning and meticulous attention to detail.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-6 glass-card rounded-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-heading text-4xl font-bold text-foreground mb-2">
                  <Counter from={0} to={1} />+
                </div>
                <div className="font-mono text-sm text-primary uppercase tracking-wider">Years Experience</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-6 glass-card rounded-lg relative overflow-hidden group border border-destructive/20 hover:border-destructive"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-heading text-4xl font-bold text-foreground mb-2">
                  <Counter from={0} to={10} />+
                </div>
                <div className="font-mono text-sm text-destructive uppercase tracking-wider">Projects Completed</div>
              </motion.div>
            </div>
          </div>

          {/* 3D Workspace */}
          <div className="relative w-full h-[500px] glass rounded-2xl overflow-hidden glow-border">
            <View className="w-full h-full">
              <Workspace3DScene />
            </View>
          </div>
        </div>
      </div>
    </section>
  );
}
