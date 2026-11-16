"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

// ── Central Nanotech Core (Spider Nanocore from original scene) ─
// Upgraded: dynamic click shock impulse, 4 orbiting Stark micro-satellites,
// smooth exponential damping and scroll-based hero fade.

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
  const dronesRef = useRef<(THREE.Mesh | null)[]>([]);
  const clickImpulse = useRef(0);

  // Fade out as user scrolls past the hero
  const opacity = Math.max(0, 1 - scrollProgress * 6);
  const baseScale = 0.3 + opacity * 0.7;

  useEffect(() => {
    const onDown = () => {
      clickImpulse.current = 1.0;
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    clickImpulse.current = THREE.MathUtils.damp(clickImpulse.current, 0, 4.5, delta);
    const impulse = clickImpulse.current;

    if (ring1.current) {
      ring1.current.rotation.x += delta * (0.8 + impulse * 2.5);
      ring1.current.rotation.y += delta * (0.5 + impulse * 2.0);
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * (0.7 + impulse * 2.2);
      ring2.current.rotation.z += delta * (0.6 + impulse * 1.8);
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.3;
      icosaRef.current.rotation.y = t * 0.4;
      const s = 1.15 + Math.sin(t * 2) * 0.05 + impulse * 0.12;
      icosaRef.current.scale.set(s, s, s);
    }

    // Orbiting Stark Nanite Drones
    dronesRef.current.forEach((drone, idx) => {
      if (!drone) return;
      const orbitSpeed = 1.2 + idx * 0.2;
      const angle = t * orbitSpeed + (idx * Math.PI) / 2;
      const r = 1.85 + Math.sin(t * 2 + idx) * 0.15;
      const tilt = (idx % 2 === 0 ? 1 : -1) * 0.4;

      drone.position.x = Math.cos(angle) * r;
      drone.position.y = Math.sin(angle) * r * Math.cos(tilt) + Math.sin(t * 3 + idx) * 0.25;
      drone.position.z = Math.sin(angle) * r * Math.sin(tilt) + Math.cos(t * 2 + idx) * 0.2;
      drone.rotation.x += delta * 2;
      drone.rotation.y += delta * 2;
    });

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, mouseX * 0.8, 0.06
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y, -mouseY * 0.8, 0.06
      );
      const currentScale = baseScale * (1 + impulse * 0.08);
      groupRef.current.scale.setScalar(currentScale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Torus Ring */}
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

      {/* Inner Torus Ring */}
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

      {/* Wireframe Icosahedron */}
      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color={skinColor}
          wireframe
          transparent
          opacity={0.35 * opacity}
        />
      </mesh>

      {/* Core Nanotech Sphere */}
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

      {/* Inner White Singularity */}
      <Sphere args={[0.18, 16, 16]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={4}
          transparent
          opacity={opacity}
        />
      </Sphere>

      {/* 4 Orbiting Stark Nanite Drones */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            dronesRef.current[i] = el;
          }}
        >
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? skinAccent : skinColor}
            emissive={i % 2 === 0 ? skinAccent : skinColor}
            emissiveIntensity={4}
            transparent
            opacity={0.9 * opacity}
          />
        </mesh>
      ))}
    </group>
  );
}
