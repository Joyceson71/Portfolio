"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, Html, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

// Massive Wireframe Globe
function WireframeGlobe() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.rotation.x += delta * 0.05;
  });

  return (
    <Sphere ref={mesh} args={[4, 32, 32]}>
      <meshBasicMaterial color="#00ffcc" wireframe transparent opacity={0.15} />
    </Sphere>
  );
}

function DataNode({ n }: { n: { pos: [number, number, number], label: string } }) {
  return (
    <group position={n.pos}>
      <mesh>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Connection line to center */}
      <Line points={[[0,0,0], [-n.pos[0], -n.pos[1], -n.pos[2]]]} color="#00ffcc" opacity={0.2} transparent />
      
      <Html distanceFactor={15} zIndexRange={[100, 0]}>
        <div className="flex items-center gap-2 pointer-events-none opacity-50">
          <div className="w-1 h-1 bg-white" />
          <span className="text-[8px] text-white font-mono uppercase tracking-widest whitespace-nowrap bg-black/50 px-1 border border-white/20">
            {n.label}
          </span>
        </div>
      </Html>
    </group>
  );
}

// Data Nodes floating around the globe
function DataNodes() {
  const group = useRef<THREE.Group>(null!);
  
  const nodes = useMemo(() => {
    const data = [];
    for(let i=0; i<15; i++) {
      // Random position on sphere surface
      const phi = Math.acos(-1 + (2 * i) / 15);
      const theta = Math.sqrt(15 * Math.PI) * phi;
      
      const r = 4.2; // slightly larger than globe
      data.push({
        pos: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ] as [number, number, number],
        label: `SYS.NODE_${i.toString().padStart(3, '0')}`
      });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    group.current.rotation.y -= delta * 0.05;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <DataNode key={i} n={n} />
      ))}
    </group>
  );
}

// High-speed data rings
function DataRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ring1.current.rotation.z += delta * 0.5;
    ring2.current.rotation.x -= delta * 0.3;
    ring2.current.rotation.y += delta * 0.4;
  });

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI/4, 0]}>
        <torusGeometry args={[6, 0.02, 16, 100, Math.PI * 1.5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export function SpatialScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      style={{ width: "100%", height: "100vh" }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={['#000000']} />
      
      <WireframeGlobe />
      <DataNodes />
      <DataRings />

      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI/1.5} 
        minPolarAngle={Math.PI/3}
      />

      {/* Post Processing for that Sci-Fi Glow */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
      </EffectComposer>
    </Canvas>
  );
}
