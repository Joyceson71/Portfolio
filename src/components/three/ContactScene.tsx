"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { PostProcessing } from "./PostProcessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

function HQEnvironment() {
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
    tex.repeat.set(10, 10);
    return tex;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
      
      {/* Wall with window cutout */}
      <group position={[0, 10, -30]}>
        {/* Left wall */}
        <mesh position={[-35, 0, 0]}>
          <boxGeometry args={[50, 40, 2]} />
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>
        {/* Right wall */}
        <mesh position={[35, 0, 0]}>
          <boxGeometry args={[50, 40, 2]} />
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>
        {/* Top wall */}
        <mesh position={[0, 15, 0]}>
          <boxGeometry args={[20, 10, 2]} />
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>
        {/* Bottom wall */}
        <mesh position={[0, -15, 0]}>
          <boxGeometry args={[20, 10, 2]} />
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Table() {
  return (
    <group position={[0, -2, -10]}>
      {/* Table Top */}
      <mesh>
        <boxGeometry args={[20, 1, 8]} />
        <meshStandardMaterial color="#2d1a0a" roughness={0.6} />
      </mesh>
      
      {/* Map */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 12, 16]} />
        <meshStandardMaterial color="#d4b896" roughness={0.8} />
      </mesh>
      
      {/* Candle */}
      <group position={[-6, 0.5, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1.5, 6]} />
          <meshStandardMaterial color="#f5e6c8" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.7, 0]}>
          <coneGeometry args={[0.15, 0.4, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff6600" emissiveIntensity={4} />
        </mesh>
        <FlickerLight />
      </group>
    </group>
  );
}

function FlickerLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = Math.sin(state.clock.elapsedTime * 10) * 0.5 + 2;
    }
  });
  return <pointLight ref={lightRef} color="#ff9900" distance={20} decay={2} position={[0, 2, 0]} />;
}

function DistantTitan() {
  const titanRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (titanRef.current) {
      titanRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      titanRef.current.position.y = -20 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: "#111" }), []);

  return (
    <group ref={titanRef} position={[0, -20, -100]}>
      {/* Head */}
      <mesh position={[0, 45, 0]} scale={[1, 0.85, 1]} material={material}>
        <sphereGeometry args={[8, 8, 8]} />
      </mesh>
      {/* Shoulders */}
      <mesh position={[-10, 25, 0]} scale={[1.4, 0.6, 0.8]} material={material}>
        <sphereGeometry args={[10, 8, 8]} />
      </mesh>
      <mesh position={[10, 25, 0]} scale={[1.4, 0.6, 0.8]} material={material}>
        <sphereGeometry args={[10, 8, 8]} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-3, 46, 7.5]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshBasicMaterial color="#ff4400" />
      </mesh>
      <mesh position={[3, 46, 7.5]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshBasicMaterial color="#ff4400" />
      </mesh>
    </group>
  );
}

function HQCamera() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    camera.lookAt(0, 5, -30);
  });
  return null;
}

export default function ContactScene() {
  const isMobile = useMobileDetect();

  return (
    <Canvas 
      camera={{ position: [0, 5, 10], fov: 55 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: false }}
    >
      <color attach="background" args={["#020205"]} />
      
      {/* Exterior Moonlight */}
      <directionalLight position={[10, 20, -100]} intensity={1.5} color="#c8d8ff" />
      
      <HQCamera />
      <HQEnvironment />
      <Table />
      
      {/* Outside the window */}
      <DistantTitan />
      <Stars radius={150} depth={50} count={isMobile ? 1000 : 3000} factor={4} saturation={0} fade speed={1} />
      
      <PostProcessing />
    </Canvas>
  );
}
