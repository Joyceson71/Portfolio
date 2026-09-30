"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({ position, color, speed = 1, distort = 0.4 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus({ position, color, speed = 0.8 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={speed} floatIntensity={0.6}>
      <Torus ref={ref} args={[1, 0.35, 32, 100]} position={position}>
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </Torus>
    </Float>
  );
}

function FloatingCube({ position, color, speed = 1.2 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
  });
  return (
    <Float speed={speed} floatIntensity={1}>
      <Box ref={ref} args={[1.2, 1.2, 1.2]} position={position}>
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </Box>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a855f7" size={0.06} transparent opacity={0.6} />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 10, -10]} intensity={0.8} color="#f59e0b" />

      <ParticleField />

      <FloatingSphere position={[-3.5, 1, -2]} color="#a855f7" speed={1.2} distort={0.5} />
      <FloatingSphere position={[3.5, -1, -1]} color="#06b6d4" speed={0.9} distort={0.3} />
      <FloatingSphere position={[0, 2.5, -3]} color="#f59e0b" speed={1.4} distort={0.6} />

      <FloatingTorus position={[-2, -2, 0]} color="#a855f7" speed={0.7} />
      <FloatingTorus position={[4, 1.5, -2]} color="#06b6d4" speed={1.1} />

      <FloatingCube position={[2, -2.5, 1]} color="#f59e0b" speed={0.8} />
      <FloatingCube position={[-4, 1.5, -1]} color="#ec4899" speed={1.0} />
    </Canvas>
  );
}

export function SkillSphere({ color, label }: { color: string; label: string }) {
  return (
    <div className="w-full h-32">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={color} />
        <Float speed={2} floatIntensity={1.2} rotationIntensity={1}>
          <Sphere args={[0.9, 64, 64]}>
            <MeshDistortMaterial
              color={color}
              distort={0.4}
              speed={3}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
