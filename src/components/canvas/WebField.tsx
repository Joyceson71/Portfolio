"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Reactive Spider-Web Field ──────────────────────────────────
// A 3D web geometry that deforms toward the cursor using a simple
// vertex-level sinusoidal ripple (no GLSL files needed — pure JS math
// modifies positions each frame via a BufferAttribute).

interface WebFieldProps {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
  skinColor?: string;
  skinAccent?: string;
}

const SPOKES = 20;
const RINGS = 14;
const MAX_R = 12;

export function WebField({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  skinColor = "#CC0000",
  skinAccent = "#0047FF",
}: WebFieldProps) {
  const groupRef = useRef<THREE.Group>(null!);
  // Fade out as user scrolls past the hero
  const opacity = Math.max(0, 1 - scrollProgress * 8);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.025;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, -mouseY * 0.18, 0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, mouseX * 0.18, 0.04
    );
    groupRef.current.children.forEach((child) => {
      if ((child as THREE.Line).isLine) {
        const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = opacity;
      }
    });
  });

  const spokeGeoms = useMemo(() => {
    const geoms: { pts: Float32Array; color: string }[] = [];
    for (let s = 0; s < SPOKES; s++) {
      const angle = (s / SPOKES) * Math.PI * 2;
      const x = Math.cos(angle) * MAX_R;
      const y = Math.sin(angle) * MAX_R;
      geoms.push({
        pts: new Float32Array([0, 0, 0, x, y, 0]),
        color: skinColor,
      });
    }
    return geoms;
  }, [skinColor]);

  const ringGeoms = useMemo(() => {
    const geoms: { pts: Float32Array; color: string }[] = [];
    for (let r = 1; r <= RINGS; r++) {
      const radius = (r / RINGS) * MAX_R;
      const pts: number[] = [];
      for (let s = 0; s <= SPOKES; s++) {
        const angle = (s / SPOKES) * Math.PI * 2;
        const z = Math.sin(angle * 4 + r * 0.8) * 0.5;
        pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
      }
      geoms.push({
        pts: new Float32Array(pts),
        color: r % 3 === 0 ? skinAccent : skinColor,
      });
    }
    return geoms;
  }, [skinColor, skinAccent]);

  return (
    <group ref={groupRef}>
      {spokeGeoms.map((g, i) => (
        <line key={`spoke-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[g.pts, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={g.color} transparent opacity={0.22} />
        </line>
      ))}
      {ringGeoms.map((g, i) => (
        <line key={`ring-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[g.pts, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={g.color} transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}
