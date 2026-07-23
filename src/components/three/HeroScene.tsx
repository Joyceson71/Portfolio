"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, ScrollControls, useScroll } from "@react-three/drei";
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  Vignette, 
  Noise, 
  DepthOfField 
} from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { useMobileDetect } from "@/hooks/useMobileDetect";

// Procedural Brick Texture
function createBrickTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  
  // Base
  ctx.fillStyle = "#2a2420";
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Bricks
  ctx.strokeStyle = "#1a1410";
  ctx.lineWidth = 4;
  const rows = 30;
  const brickHeight = 1024 / rows;
  
  for (let y = 0; y < rows; y++) {
    const yPos = y * brickHeight;
    ctx.beginPath();
    ctx.moveTo(0, yPos);
    ctx.lineTo(1024, yPos);
    ctx.stroke();
    
    const offset = y % 2 === 0 ? 0 : 50;
    for (let x = 0; x < 10; x++) {
      const xPos = x * 100 + offset;
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos, yPos + brickHeight);
      ctx.stroke();
    }
  }
  
  // Cracks
  ctx.strokeStyle = "#4a4440";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 200; i++) {
    ctx.beginPath();
    let cx = Math.random() * 1024;
    let cy = Math.random() * 1024;
    ctx.moveTo(cx, cy);
    for (let j = 0; j < 3; j++) {
      cx += (Math.random() - 0.5) * 20;
      cy += (Math.random() - 0.5) * 20;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  return texture;
}

// Procedural Steam Texture
function createSteamTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function Wall() {
  const texture = useMemo(() => createBrickTexture(), []);
  return (
    <mesh position={[0, -20, 20]} receiveShadow>
      <boxGeometry args={[200, 80, 20]} />
      <meshStandardMaterial map={texture} roughness={0.9} metalness={0.0} />
    </mesh>
  );
}

function SteamParticles() {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const steamTex = useMemo(() => createSteamTexture(), []);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 30 + 10,
      z: (Math.random() - 0.5) * 20 - 10,
      scale: Math.random() * 3 + 2,
      speed: Math.random() * 0.03 + 0.01,
      opacity: Math.random() * 0.3 + 0.3
    }));
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.y += p.speed;
      if (p.y > 40) p.y = -10;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.PlaneGeometry(1, 1), undefined, count]}>
      <meshBasicMaterial map={steamTex} transparent depthWrite={false} opacity={0.4} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function ColossalTitan() {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useMobileDetect();
  const segments = isMobile ? 8 : 16;
  
  const muscleMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#8b2a2a", 
    roughness: 0.95, 
    metalness: 0.1 
  }), []);

  useEffect(() => {
    if (!groupRef.current) return;
    // Rises from behind wall
    gsap.fromTo(
      groupRef.current.position,
      { y: -120 },
      { y: -20, duration: 3, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Idle breathing
    groupRef.current.position.y = -20 + Math.sin(state.clock.elapsedTime * 1.5) * 1.0;
  });

  return (
    <group ref={groupRef} position={[0, -120, 0]}>
      {/* Head */}
      <mesh position={[0, 30, 0]} scale={[1, 0.85, 1]} material={muscleMat}>
        <sphereGeometry args={[8, segments, segments]} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 20, 0]} material={muscleMat}>
        <cylinderGeometry args={[5, 6, 12, segments]} />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[-10, 16, 0]} scale={[1.4, 0.6, 0.8]} material={muscleMat}>
        <sphereGeometry args={[10, segments, segments]} />
      </mesh>
      <mesh position={[10, 16, 0]} scale={[1.4, 0.6, 0.8]} material={muscleMat}>
        <sphereGeometry args={[10, segments, segments]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-3, 31, 7]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshStandardMaterial emissive="#ff4400" emissiveIntensity={3.0} color="#000000" />
      </mesh>
      <mesh position={[3, 31, 7]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshStandardMaterial emissive="#ff4400" emissiveIntensity={3.0} color="#000000" />
      </mesh>
      
      {/* Eye Glow Light */}
      <pointLight position={[0, 31, 8]} color="#ff2200" intensity={8} distance={60} />

      <SteamParticles />
    </group>
  );
}

function SceneCamera() {
  const { camera } = useThree();
  const scroll = useScroll();

  useEffect(() => {
    camera.position.set(0, 15, 120);
    camera.lookAt(0, 20, 0);
  }, [camera]);

  useFrame((state) => {
    // Camera push forward on scroll
    const scrollOffset = scroll.offset; // 0 to 1
    const targetZ = 120 - scrollOffset * 60;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    
    // Idle sway
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;
    camera.lookAt(0, 20, 0);
  });
  return null;
}

export function HeroScene() {
  const isMobile = useMobileDetect();

  return (
    <Canvas shadows dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)} gl={{ antialias: false }}>
      <color attach="background" args={["#0a0508"]} />
      <fogExp2 attach="fog" args={["#0a0508", 0.008]} />
      
      <ambientLight color="#1a0a00" intensity={0.4} />
      <directionalLight 
        color="#ff6600" 
        intensity={2.0} 
        position={[50, 100, 30]} 
        castShadow 
      />

      <Sky 
        turbidity={20} 
        rayleigh={0.5} 
        mieCoefficient={0.1} 
        mieDirectionalG={0.8} 
        sunPosition={[50, 10, 30]} 
      />

      <ScrollControls pages={2} damping={0.1}>
        <SceneCamera />
        <Wall />
        <ColossalTitan />
      </ScrollControls>

      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.8} />
          <ChromaticAberration offset={new THREE.Vector2(0.0008, 0.0008)} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
          <Noise opacity={0.04} />
          <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={3} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
