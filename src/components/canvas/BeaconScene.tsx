"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Spider-Signal Beacon Scene ─────────────────────────────────
// A pulsing light beacon (octagonal cone pointing upward) with
// a particle burst system and ambient glow light.

interface BeaconSceneProps {
  scrollProgress: number;
}

function BeaconParticles({ active }: { active: boolean }) {
  const instancedRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const COUNT = 80;

  const origins = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const seed = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const r = (seed - Math.floor(seed)) * 0.5;
      arr.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
    }
    return arr;
  }, []);

  const phases = useMemo(() => {
    const arr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const seed = Math.sin(i * 37.719 + 11.233) * 43758.5453;
      arr[i] = (seed - Math.floor(seed)) * Math.PI * 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!instancedRef.current) return;
    for (let i = 0; i < COUNT; i++) {
      const t = state.clock.elapsedTime + phases[i];
      dummy.position.set(
        origins[i].x * (1 + Math.sin(t) * 0.5),
        Math.sin(t * 1.2) * 3 + 3,
        origins[i].z * (1 + Math.cos(t) * 0.5),
      );
      dummy.scale.setScalar(active ? 0.05 + Math.abs(Math.sin(t)) * 0.05 : 0);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#CC0000"
        emissive="#CC0000"
        emissiveIntensity={6}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

export function BeaconScene({ scrollProgress }: BeaconSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const coneRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.SpotLight>(null!);

  // Visible in contact range 0.85–1.0
  const localT = Math.max(0, Math.min(1, (scrollProgress - 0.85) / 0.15));
  const active = scrollProgress > 0.85;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow rotation of the beacon
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4;
    if (coneRef.current) {
      const mat = coneRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + Math.sin(t * 2) * 1;
    }
    if (lightRef.current) {
      lightRef.current.intensity = active ? 80 + Math.sin(t * 2) * 20 : 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -4]} scale={[localT, localT, localT]}>
      {/* Spider-Signal cone (octagonal base = stylised S symbol) */}
      <mesh ref={coneRef} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[1.2, 4, 8, 1, true]} />
        <meshStandardMaterial
          color="#CC0000"
          emissive="#CC0000"
          emissiveIntensity={2}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[1.2, 4, 8, 1, true]} />
        <meshBasicMaterial color="#CC0000" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Base ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.06, 8, 32]} />
        <meshStandardMaterial
          color="#CC0000"
          emissive="#CC0000"
          emissiveIntensity={5}
        />
      </mesh>

      {/* Upward spot light */}
      <spotLight
        ref={lightRef}
        position={[0, 0, 0]}
        target-position={[0, 10, 0]}
        color="#CC0000"
        intensity={80}
        distance={30}
        angle={0.25}
        penumbra={0.5}
      />

      <BeaconParticles active={active} />
    </group>
  );
}
