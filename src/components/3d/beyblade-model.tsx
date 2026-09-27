"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BeybladeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const energyRingRef = useRef<THREE.Mesh>(null);
  const fusionWheelRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Energy Ring spins fast at 6 rad/s
    if (energyRingRef.current) {
      energyRingRef.current.rotation.y += 0.1; // ~6 rad/s at 60fps
    }

    // Fusion Wheel spins faster at 8 rad/s
    if (fusionWheelRef.current) {
      fusionWheelRef.current.rotation.y += 0.133;
    }

    // Group-level precession wobble
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Energy Ring — outer torus, spins 6 rad/s, blue with emissive glow */}
      <mesh ref={energyRingRef} position={[0, 0.18, 0]}>
        <torusGeometry args={[1.2, 0.18, 24, 80]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00aaff"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      {/* Fusion Wheel — main body disc, spins 8 rad/s, metallic silver */}
      <mesh ref={fusionWheelRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.1, 0.18, 12]} />
        <meshStandardMaterial
          color="#c8d0e0"
          metalness={0.95}
          roughness={0.05}
          emissive="#3050a0"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Spin Track — static central shaft, dark navy */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.45, 32]} />
        <meshStandardMaterial color="#0c1024" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Performance Tip — static gold cone at bottom */}
      <mesh position={[0, -0.58, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.55, 12]} />
        <meshStandardMaterial
          color="#d4a017"
          metalness={0.9}
          roughness={0.05}
          emissive="#d4a017"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Face Wheel — top disc, purple with emissive */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.38, 0.35, 0.15, 24]} />
        <meshStandardMaterial
          color="#9d4edd"
          emissive="#9d4edd"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Lights */}
      <pointLight color="#00aaff" intensity={2} position={[3, 3, 3]} />
      <pointLight color="#9d4edd" intensity={1} position={[-3, -1, -2]} />
      <ambientLight intensity={0.3} />
    </group>
  );
}
