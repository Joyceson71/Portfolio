"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, Preload, Sparkles, Float, Stars } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function GlobalEnvironment() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
      
      // React to mouse movement for parallax effect
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.5;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;

      // React to scroll
      const scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      groupRef.current.position.z = scrollY * 5; // Move forward through the particles as you scroll
    }
  });

  return (
    <group ref={groupRef}>
      {/* Immersive Particle Fields */}
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={500} scale={20} size={1} speed={0.2} opacity={0.5} color="#9d00ff" />
      <Sparkles count={500} scale={25} size={2} speed={0.1} opacity={0.3} color="#ff0033" />
      
      {/* Floating Geometric Wireframes in the deep background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={3}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 40, 
              (Math.random() - 0.5) * 40, 
              (Math.random() - 0.5) * 40 - 10
            ]}
          >
            <icosahedronGeometry args={[Math.random() * 2 + 1, 0]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#9d00ff" : "#ff0033"} wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function SceneProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      className="!fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <Suspense fallback={null}>
        {/* Global Immersive Elements */}
        <GlobalEnvironment />
        
        {/* View.Port renders the specific 3D elements scoped to individual DOM components */}
        <View.Port />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
