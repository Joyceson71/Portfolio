"use client";

import { useRef, useState } from "react";
import { View, Float, Icosahedron, TorusKnot, Sphere, Box } from "@react-three/drei";
import { motion } from "framer-motion";
import { Code2, Monitor, Paintbrush, Database } from "lucide-react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SkillModelProps = {
  hovered: boolean;
  color: string;
  type: "cube" | "sphere" | "torus" | "icosahedron";
};

function Skill3DModel({ hovered, color, type }: SkillModelProps) {
  const meshRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetScale = hovered ? 1.2 : 1;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 8 * delta);
    }
  });

  const material = (
    <meshStandardMaterial 
      color={color} 
      emissive={color}
      emissiveIntensity={hovered ? 0.8 : 0.2}
      metalness={0.8}
      roughness={0.2}
      wireframe={hovered}
    />
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Float speed={hovered ? 4 : 2} rotationIntensity={hovered ? 2 : 1} floatIntensity={1}>
        <group ref={groupRef}>
          {type === "cube" && (
            <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
              {material}
            </Box>
          )}
          {type === "sphere" && (
            <Sphere ref={meshRef} args={[1, 32, 32]}>
              {material}
            </Sphere>
          )}
          {type === "torus" && (
            <TorusKnot ref={meshRef} args={[0.7, 0.2, 100, 16]}>
              {material}
            </TorusKnot>
          )}
          {type === "icosahedron" && (
            <Icosahedron ref={meshRef} args={[1, 0]}>
              {material}
            </Icosahedron>
          )}
        </group>
      </Float>
    </>
  );
}

const skillsData = [
  {
    title: "React & Next.js",
    icon: Monitor,
    color: "#9d00ff",
    type: "torus" as const,
    tags: ["Hooks", "Redux", "Context", "SSR", "App Router"],
    proficiency: 95,
  },
  {
    title: "JavaScript / TS",
    icon: Code2,
    color: "#ff0033",
    type: "icosahedron" as const,
    tags: ["ES6+", "TypeScript", "DOM", "Async"],
    proficiency: 90,
  },
  {
    title: "CSS & Animations",
    icon: Paintbrush,
    color: "#00d2ff",
    type: "sphere" as const,
    tags: ["GSAP", "Tailwind", "Framer Motion", "Three.js"],
    proficiency: 92,
  },
  {
    title: "Backend & DBs",
    icon: Database,
    color: "#ffaa00",
    type: "cube" as const,
    tags: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    proficiency: 85,
  }
];

export function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen py-32 overflow-hidden bg-background/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">Technical Arsenal</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mt-2">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow">Proficiencies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillsData.map((skill, index) => {
            const [hovered, setHovered] = useState(false);
            const Icon = skill.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full"
              >
                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
                />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div 
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-background border border-white/10 transition-colors duration-300"
                    style={{ borderColor: hovered ? skill.color : undefined }}
                  >
                    <Icon className="w-6 h-6 text-foreground" style={{ color: hovered ? skill.color : undefined }} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">{skill.title}</h3>
                </div>

                {/* 3D View integration inside the card */}
                <div className="w-full h-48 mb-6 relative z-10 rounded-xl overflow-hidden bg-black/20 border border-white/5">
                  <View className="w-full h-full">
                    <Skill3DModel hovered={hovered} color={skill.color} type={skill.type} />
                  </View>
                </div>

                <div className="mt-auto relative z-10">
                  <div className="flex justify-between items-center mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <span>Proficiency</span>
                    <span style={{ color: hovered ? skill.color : undefined }}>{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden mb-6">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="font-mono text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-muted-foreground transition-colors"
                        style={{ borderColor: hovered ? `${skill.color}40` : undefined, color: hovered ? '#fff' : undefined }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
