"use client";

import { useRef } from "react";
import { View, Float, Box, Cylinder, Sphere } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Workspace3DScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#9d00ff" />
      <pointLight position={[-5, 5, -5]} intensity={2} color="#ff0033" />
      
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
            <meshStandardMaterial color="#050505" emissive="#9d00ff" emissiveIntensity={0.2} />
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
              <meshStandardMaterial color="#9d00ff" emissive="#9d00ff" emissiveIntensity={2} wireframe />
            </Sphere>
          </Float>
        </group>
      </Float>
    </>
  );
}

const timelineData = [
  {
    date: "Jan 2025 – Present",
    role: "Software Engineer Intern",
    company: "GoFloaters",
    desc: "Developing and maintaining web applications using modern JavaScript frameworks. Collaborating with cross-functional teams to deliver high-quality features.",
  },
  {
    date: "Aug 2023 – Dec 2024",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    desc: "Built custom websites for local businesses, focusing on SEO, performance, and accessible UI/UX design.",
  }
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div style={{ opacity, y }} className="mb-16">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">About Me</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mt-2">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow">Architect</span>
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
              <div className="p-6 glass-card rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-heading text-4xl font-bold text-foreground mb-2">01+</div>
                <div className="font-mono text-sm text-primary uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="p-6 glass-card rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-heading text-4xl font-bold text-foreground mb-2">10+</div>
                <div className="font-mono text-sm text-destructive uppercase tracking-wider">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* 3D Workspace */}
          <div className="relative w-full h-[500px] glass rounded-2xl overflow-hidden glow-border">
            <View className="w-full h-full">
              <Workspace3DScene />
            </View>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-sm tracking-widest text-destructive uppercase">Career Journey</span>
            <h3 className="font-heading text-3xl md:text-5xl font-bold uppercase mt-2">Professional Experience</h3>
          </div>

          <div className="relative border-l-2 border-white/10 pl-8 space-y-16">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Glowing Dot */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_var(--primary-glow)]" />
                
                <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="font-mono text-sm text-primary mb-2 block">{item.date}</span>
                  <h4 className="font-heading text-2xl font-bold text-foreground mb-1">{item.role}</h4>
                  <div className="text-lg font-semibold text-muted-foreground mb-4">{item.company}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
