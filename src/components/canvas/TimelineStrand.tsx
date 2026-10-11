"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Timeline Strand ────────────────────────────────────────────
// A glowing CatmullRom spline running along the camera path,
// with milestone sphere nodes that pulse as the camera passes.

const MILESTONE_POSITIONS: [number, number, number][] = [
  [-4, 0, -2],
  [-2, 1, -3],
  [0,  0, -2],
  [2, -1, -3],
  [4,  1, -2],
];

const MILESTONE_COLORS = ["#CC0000", "#0047FF", "#6cc24a", "#9900ff", "#eab308"];

interface TimelineStrandProps {
  scrollProgress: number;
}

export function TimelineStrand({ scrollProgress }: TimelineStrandProps) {
  const groupRef = useRef<THREE.Group>(null!);
  // Visible in 0.72–0.84 range
  const localT = Math.max(0, Math.min(1, (scrollProgress - 0.72) / 0.12));
  const fadeOut = scrollProgress > 0.84 ? Math.max(0, 1 - (scrollProgress - 0.84) / 0.08) : 1;
  const opacity = localT * fadeOut;

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      MILESTONE_POSITIONS.map((p) => new THREE.Vector3(...p))
    );
  }, []);

  const tubeGeom = useMemo(() => {
    return new THREE.TubeGeometry(curve, 80, 0.025, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;
    children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const t = state.clock.elapsedTime + i * 1.2;
      mesh.position.y = MILESTONE_POSITIONS[i]?.[1] ?? 0 + Math.sin(t * 0.8) * 0.15;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Main glowing strand */}
      <mesh geometry={tubeGeom}>
        <meshStandardMaterial
          color="#CC0000"
          emissive="#CC0000"
          emissiveIntensity={3}
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>

      {/* Milestone nodes */}
      {MILESTONE_POSITIONS.map((pos, i) => {
        const nodeActive = scrollProgress > 0.72 + i * 0.02;
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color={MILESTONE_COLORS[i]}
              emissive={MILESTONE_COLORS[i]}
              emissiveIntensity={nodeActive ? 4 : 1}
              transparent
              opacity={opacity}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
