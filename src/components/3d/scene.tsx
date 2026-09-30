"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sphere, Torus, Box, Edges } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere({ position, color, speed = 1, distort = 0.4 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere args={[1.2, 64, 64]} position={position}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={distort}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color={color}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function FloatingGeometry({ position, color, speed = 0.8, type = "torus" }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  type?: "torus" | "box";
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  
  return (
    <Float speed={speed} floatIntensity={1}>
      {type === "torus" ? (
        <Torus ref={ref} args={[1, 0.3, 32, 64]} position={position}>
          <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.2} clearcoat={1} />
        </Torus>
      ) : (
        <Box ref={ref} args={[1.5, 1.5, 1.5]} position={position}>
           <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.2} clearcoat={1} />
        </Box>
      )}
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#fbcfe8" />

      {/* Glass elements */}
      <GlassSphere position={[-4, 1.5, -2]} color="#fecdd3" speed={1.2} distort={0.5} />
      <GlassSphere position={[4, -1.5, -1]} color="#bfdbfe" speed={0.9} distort={0.3} />
      <GlassSphere position={[0, 3, -4]} color="#fed7aa" speed={1.4} distort={0.6} />

      {/* Solid elements */}
      <FloatingGeometry position={[-3, -2, -1]} color="#f472b6" speed={0.7} type="torus" />
      <FloatingGeometry position={[3, 2, -3]} color="#60a5fa" speed={1.1} type="box" />
      
      {/* Tiny decorative spheres */}
      <FloatingGeometry position={[1, -3, 2]} color="#fb923c" speed={1.5} type="box" />
    </Canvas>
  );
}
