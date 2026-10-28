"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Types ──────────────────────────────────────────────────────
type LineRef = THREE.Line & { geometry: THREE.BufferGeometry };

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

const SPOKES  = 28;
const RINGS   = 18;
const MAX_R   = 12;
const RIPPLE  = 0.55; // max Z displacement toward cursor
const WAVE_SPD = 2.2;  // ripple wave speed

export function WebField({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  skinColor = "#CC0000",
  skinAccent = "#0047FF",
}: WebFieldProps) {
  const groupRef  = useRef<THREE.Group>(null!);
  const ringRefs   = useRef<(LineRef | null)[]>([]);

  // Fade out as user scrolls past the hero
  const opacity = Math.max(0, 1 - scrollProgress * 8);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow group rotation
    groupRef.current.rotation.z += delta * 0.025;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, -mouseY * 0.22, 0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, mouseX * 0.22, 0.04
    );

    // Breathing scale
    const pulse = 1 + Math.sin(t * 1.5) * 0.02;
    groupRef.current.scale.set(pulse, pulse, pulse);

    // Per-ring cursor ripple — displace Z of each vertex
    ringRefs.current.forEach((line, ri) => {
      if (!line) return;
      const pos = line.geometry.attributes.position as THREE.BufferAttribute;
      const r = ((ri + 1) / RINGS) * MAX_R;
      for (let s = 0; s <= SPOKES; s++) {
        const angle = (s / SPOKES) * Math.PI * 2;
        const vx = Math.cos(angle) * r;
        const vy = Math.sin(angle) * r;
        // Distance from this vertex to mouse (in local web-plane coords)
        const dx = vx - mouseX * MAX_R * 0.5;
        const dy = vy + mouseY * MAX_R * 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Ripple wave radiating outward from mouse
        const wave = Math.sin(dist * 0.9 - t * WAVE_SPD) * RIPPLE;
        const zBase = Math.sin(angle * 4 + ri * 0.8) * 0.5;
        pos.setZ(s, zBase + wave * Math.exp(-dist * 0.08));
      }
      pos.needsUpdate = true;
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = opacity;
    });

    // Spoke opacity
    groupRef.current.children.forEach((child, idx) => {
      if (idx >= RINGS && (child as THREE.Line).isLine) {
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
        // accent every 3rd ring, slightly brighter every 5th
        color: r % 5 === 0 ? skinAccent : r % 3 === 0 ? skinAccent : skinColor,
      });
    }
    return geoms;
  }, [skinColor, skinAccent]);

  return (
    <group ref={groupRef}>
      {/* Rings — stored in refs for per-frame ripple update */}
      {ringGeoms.map((g, i) => (
        <line
          key={`ring-${i}`}
          ref={(el) => { ringRefs.current[i] = el as LineRef | null; }}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[g.pts.slice(), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={g.color}
            transparent
            opacity={i % 5 === 4 ? 0.55 : 0.42}
            linewidth={1}
          />
        </line>
      ))}
      {/* Spokes on top so they render above rings */}
      {spokeGeoms.map((g, i) => (
        <line key={`spoke-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[g.pts, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={g.color} transparent opacity={0.32} />
        </line>
      ))}
    </group>
  );
}
