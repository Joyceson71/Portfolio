"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

// ── Central Nanotech Core (Spider Nanocore from original scene) ─
// Upgraded: the core fades out as the user scrolls past the hero.

interface CoreNanotechProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
  skinColor?: string;
  skinAccent?: string;
}

export function CoreNanotech({
  mouseX,
  mouseY,
  scrollProgress,
  skinColor = "#CC0000",
  skinAccent = "#0047FF",
}: CoreNanotechProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const icosaRef = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  // Fade out as user scrolls
  const opacity = Math.max(0, 1 - scrollProgress * 6);
  const scale = 0.3 + opacity * 0.7;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.8;
      ring1.current.rotation.y += delta * 0.5;
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.7;
      ring2.current.rotation.z += delta * 0.6;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.3;
      icosaRef.current.rotation.y = t * 0.4;
      const s = 1.15 + Math.sin(t * 2) * 0.05;
      icosaRef.current.scale.set(s, s, s);
    }
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, mouseX * 0.8, 0.06
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y, -mouseY * 0.8, 0.06
      );
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.035, 16, 100]} />
        <meshStandardMaterial
          color={skinColor}
          emissive={skinColor}
          emissiveIntensity={3}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      <mesh ref={ring2}>
        <torusGeometry args={[1.1, 0.025, 16, 100]} />
        <meshStandardMaterial
          color={skinAccent}
          emissive={skinAccent}
          emissiveIntensity={3.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color={skinColor}
          wireframe
          transparent
          opacity={0.35 * opacity}
        />
      </mesh>

      <Sphere args={[0.42, 32, 32]}>
        <meshStandardMaterial
          color={skinColor}
          emissive={skinColor}
          emissiveIntensity={2.2}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={opacity}
        />
      </Sphere>

      <Sphere args={[0.18, 16, 16]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={4}
          transparent
          opacity={opacity}
        />
      </Sphere>
    </group>
  );
}
