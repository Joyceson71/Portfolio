"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ── Spiderweb geometry: radial + concentric rings ── */
function SpiderWeb() {
  const group = useRef<THREE.Group>(null!);
  const webLines = useMemo(() => {
    const lines: { points: THREE.Vector3[]; color: string }[] = [];
    const spokes = 18;
    const rings  = 10;
    const maxR   = 9;

    // Radial spokes
    for (let s = 0; s < spokes; s++) {
      const angle = (s / spokes) * Math.PI * 2;
      const x = Math.cos(angle) * maxR;
      const y = Math.sin(angle) * maxR;
      lines.push({
        points: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)],
        color: "#CC0000",
      });
    }

    // Concentric rings (connected between spokes)
    for (let r = 1; r <= rings; r++) {
      const radius = (r / rings) * maxR;
      const ringPts: THREE.Vector3[] = [];
      for (let s = 0; s <= spokes; s++) {
        const angle = (s / spokes) * Math.PI * 2;
        // Slight z-waviness for 3D depth
        const z = Math.sin(angle * 3 + r) * 0.4;
        ringPts.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        ));
      }
      lines.push({ points: ringPts, color: r % 3 === 0 ? "#0047FF" : "#CC0000" });
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    group.current.rotation.z += delta * 0.04;
  });

  return (
    <group ref={group}>
      {webLines.map((line, i) => (
        <WebLine key={i} points={line.points} color={line.color} opacity={0.25} />
      ))}
    </group>
  );
}

function WebLine({ points, color, opacity }: { points: THREE.Vector3[]; color: string; opacity: number }) {
  const ref = useRef<THREE.BufferGeometry>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => { arr[i*3]=p.x; arr[i*3+1]=p.y; arr[i*3+2]=p.z; });
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

/* ── Floating spider-orbs orbiting the web ── */
function OrbitalNodes() {
  const group = useRef<THREE.Group>(null!);
  const nodes = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const phi   = Math.acos(-1 + (2 * i) / 24);
      const theta = Math.sqrt(24 * Math.PI) * phi;
      const r     = 5 + Math.random() * 2;
      return {
        pos: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ),
        size: 0.05 + Math.random() * 0.08,
        color: i % 3 === 0 ? "#CC0000" : i % 3 === 1 ? "#0047FF" : "#c0c0d0",
        speed: 0.3 + Math.random() * 0.4,
      };
    });
  }, []);

  useFrame((state, delta) => {
    group.current.rotation.y -= delta * 0.1;
    group.current.rotation.x += delta * 0.04;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <Sphere key={i} args={[n.size, 8, 8]} position={n.pos}>
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={2}
            roughness={0}
            metalness={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
}

/* ── Central Spider emblem core ── */
function SpiderCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group>
      {/* Outer red ring */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[1.4, 0.03, 16, 80]} />
        <meshStandardMaterial color="#CC0000" emissive="#CC0000" emissiveIntensity={3} />
      </mesh>

      {/* Inner blue ring */}
      <mesh rotation={[Math.PI/3, Math.PI/4, 0]}>
        <torusGeometry args={[1.0, 0.015, 16, 80]} />
        <meshStandardMaterial color="#0047FF" emissive="#0047FF" emissiveIntensity={3} />
      </mesh>

      {/* Core sphere */}
      <Sphere ref={ref} args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#CC0000"
          emissive="#CC0000"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      {/* Wireframe outer shell */}
      <Sphere args={[0.65, 16, 16]}>
        <meshBasicMaterial color="#CC0000" wireframe transparent opacity={0.3} />
      </Sphere>
    </group>
  );
}

/* ── NYC-like particle buildings (skyline silhouette) ── */
function CityParticles() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const count = 800;
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const spread = 40;
      pos[i*3]   = (Math.random() - 0.5) * spread;
      pos[i*3+1] = -8 + Math.random() * 12;
      pos[i*3+2] = -15 + (Math.random() - 0.5) * 10;

      // Red or blue particles
      if (Math.random() > 0.7) {
        col[i*3]=0.8; col[i*3+1]=0; col[i*3+2]=0;
      } else if (Math.random() > 0.5) {
        col[i*3]=0; col[i*3+1]=0.28; col[i*3+2]=1;
      } else {
        col[i*3]=0.75; col[i*3+1]=0.75; col[i*3+2]=0.85;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Mouse-reactive camera follow ── */
function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += ((mouseX * 1.5) - camera.position.x) * 0.02;
    camera.position.y += ((-mouseY * 1.0) - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Main exported scene ── */
export function SpiderScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 50 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#080810"]} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]}  color="#CC0000" intensity={40} distance={20} />
      <pointLight position={[8, 4, -4]} color="#0047FF" intensity={20} distance={30} />
      <pointLight position={[-8,-4,-4]} color="#CC0000" intensity={15} distance={30} />

      {/* Background stars */}
      <Stars radius={60} depth={30} count={1500} factor={2} saturation={0.2} fade speed={0.5} />

      {/* Scene objects */}
      <SpiderCore />
      <SpiderWeb />
      <OrbitalNodes />
      <CityParticles />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          mipmapBlur
          intensity={2.5}
          levels={6}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0008, 0.0008)}
        />
      </EffectComposer>
    </Canvas>
  );
}

/* ── SceneProvider (empty — no longer using global 3D canvas) ── */
export function SceneProvider() { return null; }
