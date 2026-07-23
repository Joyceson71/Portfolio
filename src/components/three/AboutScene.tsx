"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PostProcessing } from "./PostProcessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

function StoneEnvironment() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#1a1614";
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = "#100d0b";
    for (let i = 0; i < 200; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 10, 10);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(20, 20);
    return tex;
  }, []);

  const ceilingTexture = texture.clone();
  ceilingTexture.needsUpdate = true;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 30, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial map={ceilingTexture} roughness={1} color="#555" />
      </mesh>

      {/* Pillars */}
      {[-20, 20].map((x) =>
        [-30, 0, 30].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 10, z]}>
            <cylinderGeometry args={[2, 2.5, 40, 8]} />
            <meshStandardMaterial map={texture} roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Candle({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const randomOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = Math.sin(state.clock.elapsedTime * 8 + randomOffset) * 0.5 + 2;
    }
  });

  return (
    <group position={position}>
      {/* Wax */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 6]} />
        <meshStandardMaterial color="#f5e6c8" roughness={0.4} />
      </mesh>
      
      {/* Flame */}
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.15, 0.4, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff6600" emissiveIntensity={4} />
      </mesh>

      {/* Light */}
      <pointLight ref={lightRef} color="#ff9900" distance={25} decay={2} position={[0, 2, 0]} />
    </group>
  );
}

function FloatingEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  const wingsMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    if (wingsMaterialRef.current) {
      wingsMaterialRef.current.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * Math.PI) * 0.2;
    }
  });

  // Simple geometric approximation of the wings
  const renderWings = (xSide: number) => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 0.8 - Math.PI * 0.4;
      return (
        <mesh 
          key={i} 
          position={[xSide * (2 + Math.cos(angle) * 1.5), Math.sin(angle) * 2, 0]}
          rotation={[0, 0, angle * -xSide]}
        >
          <coneGeometry args={[0.3, 3, 4]} />
          <meshStandardMaterial 
            ref={i === 0 ? wingsMaterialRef : undefined}
            color="#c17f3a" 
            metalness={0.6} 
            roughness={0.3} 
            emissive="#ff8800"
          />
        </mesh>
      );
    });
  };

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      <mesh>
        <boxGeometry args={[3, 3, 0.3]} />
        <meshStandardMaterial color="#c17f3a" metalness={0.6} roughness={0.3} />
      </mesh>
      {renderWings(1)}
      {renderWings(-1)}
    </group>
  );
}

export default function AboutScene() {
  const isMobile = useMobileDetect();
  
  // Create 12 random candle positions
  const candlePositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      pos.push([
        (Math.random() - 0.5) * 60,
        -10, // floor level
        (Math.random() - 0.5) * 60 - 20,
      ]);
    }
    return pos;
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 2, 15], fov: 50 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: false }}
    >
      <color attach="background" args={["#050305"]} />
      <fogExp2 attach="fog" args={["#050305", 0.04]} />
      
      <ambientLight intensity={0.1} />
      
      <StoneEnvironment />
      
      {candlePositions.map((pos, i) => (
        <Candle key={i} position={pos} />
      ))}

      <FloatingEmblem />
      
      <PostProcessing />
    </Canvas>
  );
}
