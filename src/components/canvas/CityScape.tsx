"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Procedural low-poly NYC-inspired skyline ───────────────────
// Deterministic pseudo-random generation to comply with React 19 purity rules.
// Windows are emissive quads drawn with an instanced mesh.

interface BuildingData {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  emissive: string;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function generateBuildings(count: number): BuildingData[] {
  const buildings: BuildingData[] = [];
  const spread = 60;

  for (let i = 0; i < count; i++) {
    const r1 = pseudoRandom(i * 3 + 1);
    const r2 = pseudoRandom(i * 3 + 2);
    const r3 = pseudoRandom(i * 3 + 3);
    const r4 = pseudoRandom(i * 3 + 4);

    const x = (r1 - 0.5) * spread * 2;
    const z = -(8 + r2 * 27);
    const w = 1.2 + r3 * 2.8;
    const d = 1.2 + r4 * 2.8;
    const h = 2 + ((r1 + r2) / 2) * 12;
    // Alternate building accent colors
    const emissive = i % 5 === 0 ? "#CC0000" : i % 5 === 1 ? "#0047FF" : "#eab308";
    buildings.push({ x, z, w, d, h, emissive });
  }
  return buildings;
}

// Window instanced mesh — a grid of emissive small quads per building face
function BuildingWindows({ buildings }: { buildings: BuildingData[] }) {
  const instancedRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, colors, count } = useMemo(() => {
    const positions: [number, number, number][] = [];
    const colors: THREE.Color[] = [];

    buildings.forEach((b, bIdx) => {
      const cols = Math.max(1, Math.floor(b.w / 0.6));
      const rows = Math.max(1, Math.floor(b.h / 0.7));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const rand = pseudoRandom(bIdx * 100 + r * 10 + c);
          if (rand > 0.35) {
            positions.push([
              b.x - b.w / 2 + (c + 0.5) * (b.w / cols),
              -b.h / 2 + (r + 0.5) * (b.h / rows) + b.h / 2,
              b.z + b.d / 2 + 0.05,
            ]);
            const lit = pseudoRandom(bIdx * 200 + r * 10 + c) > 0.4;
            colors.push(
              lit
                ? new THREE.Color(b.emissive)
                : new THREE.Color("#111122")
            );
          }
        }
      }
    });
    return { positions, colors, count: positions.length };
  }, [buildings]);

  useFrame(() => {
    if (!instancedRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.set(...pos);
      dummy.scale.set(0.22, 0.18, 0.01);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
      instancedRef.current.setColorAt(i, colors[i]);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
    if (instancedRef.current.instanceColor)
      instancedRef.current.instanceColor.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={instancedRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial emissiveIntensity={2} toneMapped={false} />
    </instancedMesh>
  );
}

export function CityScape() {
  const groupRef = useRef<THREE.Group>(null!);
  const buildings = useMemo(() => generateBuildings(120), []);

  // Very slow drift
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -8, 0]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color="#0a0a14"
            emissive={b.emissive}
            emissiveIntensity={0.06}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Rooftop antennas */}
      {buildings.filter((_, i) => i % 7 === 0).map((b, i) => (
        <mesh key={`ant-${i}`} position={[b.x, b.h + 0.4, b.z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 4]} />
          <meshStandardMaterial
            color="#CC0000"
            emissive="#CC0000"
            emissiveIntensity={4}
          />
        </mesh>
      ))}

      <BuildingWindows buildings={buildings} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[200, 80]} />
        <meshStandardMaterial
          color="#040408"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
