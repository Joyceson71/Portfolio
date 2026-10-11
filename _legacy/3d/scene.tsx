"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ── 8 Articulated Geometric Spider Legs radiating from the core ── */
function SpiderLegs() {
  const group = useRef<THREE.Group>(null!);

  const legData = useMemo(() => {
    // 4 legs on left, 4 legs on right
    const legs: { points: THREE.Vector3[]; color: string }[] = [];
    const anglesLeft = [0.3, 0.7, -0.3, -0.7];
    const anglesRight = [Math.PI - 0.3, Math.PI - 0.7, Math.PI + 0.3, Math.PI + 0.7];

    [...anglesLeft, ...anglesRight].forEach((baseAngle, idx) => {
      const isRight = idx >= 4;
      const xSign = isRight ? -1 : 1;

      // 3 segments per leg: hip -> joint -> tip
      const p0 = new THREE.Vector3(xSign * 0.6, Math.sin(baseAngle) * 0.4, 0);
      const p1 = new THREE.Vector3(xSign * 2.2, Math.sin(baseAngle) * 1.8 + 0.5, 0.4);
      const p2 = new THREE.Vector3(xSign * 3.4, Math.sin(baseAngle) * 1.2 - 0.8, -0.2);

      legs.push({
        points: [p0, p1, p2],
        color: idx % 2 === 0 ? "#CC0000" : "#0047FF",
      });
    });
    return legs;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.05;
    // Breathing flex of legs
    group.current.scale.set(
      1 + Math.sin(t * 1.5) * 0.03,
      1 + Math.cos(t * 1.5) * 0.03,
      1
    );
  });

  return (
    <group ref={group}>
      {legData.map((leg, i) => (
        <group key={i}>
          <LineRenderer points={leg.points} color={leg.color} lineWidth={2} opacity={0.7} />
          {/* Glowing knee joint */}
          <Sphere args={[0.07, 12, 12]} position={leg.points[1]}>
            <meshStandardMaterial
              color={leg.color}
              emissive={leg.color}
              emissiveIntensity={3}
            />
          </Sphere>
          {/* Tip barb */}
          <Sphere args={[0.05, 8, 8]} position={leg.points[2]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive={leg.color}
              emissiveIntensity={4}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

function LineRenderer({ points, color, opacity = 0.5 }: { points: THREE.Vector3[]; color: string; lineWidth?: number; opacity?: number }) {
  const ref = useRef<THREE.BufferGeometry>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);

  return (
    <line>
      <bufferGeometry ref={ref}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

/* ── Reactive Spiderweb with cursor spring tension ── */
function ReactiveSpiderWeb({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const group = useRef<THREE.Group>(null!);
  const spokes = 18;
  const rings = 12;
  const maxR = 10;

  // Spokes
  const spokeLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let s = 0; s < spokes; s++) {
      const angle = (s / spokes) * Math.PI * 2;
      const x = Math.cos(angle) * maxR;
      const y = Math.sin(angle) * maxR;
      lines.push([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)]);
    }
    return lines;
  }, [spokes, maxR]);

  // Rings with 3D waves
  const ringLines = useMemo(() => {
    const lines: { pts: THREE.Vector3[]; color: string }[] = [];
    for (let r = 1; r <= rings; r++) {
      const radius = (r / rings) * maxR;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= spokes; s++) {
        const angle = (s / spokes) * Math.PI * 2;
        const z = Math.sin(angle * 4 + r * 0.8) * 0.45;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z));
      }
      lines.push({
        pts,
        color: r % 3 === 0 ? "#0047FF" : "#CC0000",
      });
    }
    return lines;
  }, [rings, spokes, maxR]);

  useFrame((state, delta) => {
    group.current.rotation.z += delta * 0.03;
    // Interactive web tilt towards mouse
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouseY * 0.15, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouseX * 0.15, 0.05);
  });

  return (
    <group ref={group}>
      {spokeLines.map((pts, i) => (
        <LineRenderer key={`spoke-${i}`} points={pts} color="#CC0000" opacity={0.22} />
      ))}
      {ringLines.map((ring, i) => (
        <LineRenderer key={`ring-${i}`} points={ring.pts} color={ring.color} opacity={0.3} />
      ))}
    </group>
  );
}

/* ── Central Multidimensional Spider Nanocore ── */
function SpiderNanocore({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const coreRef = useRef<THREE.Group>(null!);
  const icosaRef = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Dual rotating rings
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.8;
      ring1.current.rotation.y += delta * 0.5;
    }
    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.7;
      ring2.current.rotation.z += delta * 0.6;
    }

    // Outer icosahedron lattice
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.3;
      icosaRef.current.rotation.y = t * 0.4;
      const s = 1.15 + Math.sin(t * 2) * 0.05;
      icosaRef.current.scale.set(s, s, s);
    }

    // Interactive mouse follow
    if (coreRef.current) {
      coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, mouseX * 0.8, 0.06);
      coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, -mouseY * 0.8, 0.06);
    }
  });

  return (
    <group ref={coreRef}>
      {/* 8 Articulated Legs radiating outward */}
      <SpiderLegs />

      {/* Outer Crimson Torus */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#CC0000"
          emissive="#CC0000"
          emissiveIntensity={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Middle Electric Blue Torus */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.1, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#0047FF"
          emissive="#0047FF"
          emissiveIntensity={3.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Holographic Wireframe Icosahedron */}
      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#CC0000"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Central High-Intensity Core Sphere */}
      <Sphere args={[0.42, 32, 32]}>
        <meshStandardMaterial
          color="#CC0000"
          emissive="#CC0000"
          emissiveIntensity={2.2}
          roughness={0.05}
          metalness={0.95}
        />
      </Sphere>

      {/* Inner white hot point */}
      <Sphere args={[0.18, 16, 16]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={4}
        />
      </Sphere>
    </group>
  );
}

/* ── Swarming Nanite Field orbiting the core ── */
function SwarmNanites() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 350;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) * 0.6; // flat disc

      if (i % 3 === 0) {
        // Red
        col[i * 3] = 0.8; col[i * 3 + 1] = 0; col[i * 3 + 2] = 0;
      } else if (i % 3 === 1) {
        // Blue
        col[i * 3] = 0; col[i * 3 + 1] = 0.28; col[i * 3 + 2] = 1;
      } else {
        // White/Silver
        col[i * 3] = 0.9; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 1;
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    pointsRef.current.rotation.z += delta * 0.08;
    pointsRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Mouse-Driven Dynamic Point Light ── */
function CursorFollowLight({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouseX * 8;
      lightRef.current.position.y = -mouseY * 6;
      lightRef.current.position.z = 4;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#CC0000"
      intensity={35}
      distance={15}
      decay={2}
    />
  );
}

/* ── Camera with smooth parallax damping ── */
function SmoothCameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2.2, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 1.5, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Main Exported 3D Scene ── */
export function SpiderScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#080810"]} />

      {/* Global Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 4]} color="#CC0000" intensity={30} distance={20} />
      <pointLight position={[7, 5, -3]} color="#0047FF" intensity={25} distance={25} />
      <pointLight position={[-7, -5, -3]} color="#CC0000" intensity={20} distance={25} />

      {/* Interactive cursor light */}
      <CursorFollowLight mouseX={mouseX} mouseY={mouseY} />

      {/* Starfield */}
      <Stars radius={50} depth={25} count={1200} factor={2.5} saturation={0.3} fade speed={0.4} />

      {/* Enhanced Spider-Man 3D Geometry */}
      <ReactiveSpiderWeb mouseX={mouseX} mouseY={mouseY} />
      <SpiderNanocore mouseX={mouseX} mouseY={mouseY} />
      <SwarmNanites />

      {/* Camera Rig */}
      <SmoothCameraRig mouseX={mouseX} mouseY={mouseY} />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          mipmapBlur
          intensity={2.2}
          levels={5}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0007, 0.0007)}
        />
      </EffectComposer>
    </Canvas>
  );
}

export function SceneProvider() {
  return null;
}
