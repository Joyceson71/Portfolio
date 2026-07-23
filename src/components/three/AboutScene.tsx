"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

// Procedural Stone Texture
function createStoneTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  ctx.fillStyle = "#151210";
  ctx.fillRect(0, 0, 512, 512);
  
  ctx.fillStyle = "#1a1614";
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const s = Math.random() * 10 + 2;
    ctx.fillRect(x, y, s, s);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  return texture;
}

function VaultEnvironment() {
  const tex = useMemo(() => createStoneTexture(), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0 }), [tex]);
  const ceilMat = useMemo(() => new THREE.MeshStandardMaterial({ map: tex, color: "#555", roughness: 1 }), [tex]);
  
  const pillars = [];
  for (let i = 0; i < 3; i++) {
    pillars.push([-15, 15, -i * 30]);
    pillars.push([15, 15, -i * 30]);
  }

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <primitive object={mat} />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 30, -20]}>
        <planeGeometry args={[200, 200]} />
        <primitive object={ceilMat} />
      </mesh>

      {/* Pillars */}
      {pillars.map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} castShadow receiveShadow>
          <cylinderGeometry args={[2, 2.5, 30, 8]} />
          <primitive object={mat} />
        </mesh>
      ))}
    </group>
  );
}

function Candle({ position, randomOffset }: { position: [number, number, number], randomOffset: number }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Flicker
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 8 + randomOffset) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Wax */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 6]} />
        <meshStandardMaterial color="#f5e6c8" roughness={0.3} />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.15, 0.4, 6]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      {/* Light */}
      <pointLight ref={lightRef} position={[0, 1.8, 0]} color="#ff9900" distance={15} decay={2} castShadow />
    </group>
  );
}

function Candles() {
  const positions = [
    [-13, 0, -10], [13, 0, -5], [-8, 0, -25], [10, 0, -35],
    [-2, 0, -8], [4, 0, -12], [-14, 0, -40], [14, 0, -45]
  ];
  return (
    <group>
      {positions.map((pos, i) => (
        <Candle key={i} position={pos as [number, number, number]} randomOffset={i * 2.5} />
      ))}
    </group>
  );
}

function WingPetal({ position, rotation, scale = 1 }: any) {
  // Simple wing shape via scaling a box and rotating
  return (
    <mesh position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <boxGeometry args={[0.3, 2, 0.8]} />
      <meshStandardMaterial color="#c17f3a" metalness={0.6} roughness={0.3} emissive="#ff8800" />
    </mesh>
  );
}

function Emblem() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = 8 + Math.sin(state.clock.elapsedTime) * 0.5;
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * Math.PI) * 0.2;
    }
  });

  // Constructing a stylized wing representation
  const wings = [];
  for(let i=0; i<8; i++) {
    const angle = (i / 8) * Math.PI * 0.8 - Math.PI*0.4;
    wings.push(
      <WingPetal 
        key={`left-${i}`}
        position={[-1.5 - Math.cos(angle)*1.5, Math.sin(angle)*2, 0]} 
        rotation={[0, 0, angle + Math.PI/2]}
        scale={1 - Math.abs(i - 3.5)*0.1}
      />
    );
    wings.push(
      <WingPetal 
        key={`right-${i}`}
        position={[1.5 + Math.cos(angle)*1.5, Math.sin(angle)*2, 0]} 
        rotation={[0, 0, -angle - Math.PI/2]}
        scale={1 - Math.abs(i - 3.5)*0.1}
      />
    );
  }

  return (
    <group ref={groupRef} position={[0, 8, -15]}>
      {/* Center Shield/Square */}
      <mesh>
        <boxGeometry args={[3, 4, 0.5]} />
        <meshStandardMaterial ref={materialRef} color="#c17f3a" metalness={0.8} roughness={0.2} emissive="#ff8800" />
      </mesh>
      {/* Wings */}
      {wings}
    </group>
  );
}

export function AboutScene() {
  const isMobile = useMobileDetect();

  return (
    <Canvas shadows dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)} gl={{ antialias: false }} camera={{ position: [0, 5, 5], fov: 60 }}>
      <color attach="background" args={["#050305"]} />
      <fogExp2 attach="fog" args={["#050305", 0.04]} />
      
      <ambientLight color="#111" intensity={0.5} />

      <VaultEnvironment />
      <Candles />
      <Emblem />

      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} />
          <Noise opacity={0.05} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
