"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, ScrollControls, useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { PostProcessing } from "./PostProcessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

function Wall() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#2a2420";
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = "#4a4440";
    ctx.lineWidth = 2;
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, Math.random() * 512);
      ctx.lineTo(Math.random() * 512, Math.random() * 512);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 4);
    return tex;
  }, []);

  return (
    <mesh position={[0, -20, 0]}>
      <boxGeometry args={[200, 80, 20]} />
      <meshStandardMaterial map={texture} roughness={0.9} metalness={0.0} />
    </mesh>
  );
}

function ColossalTitan({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.position,
        { y: -120 },
        { y: -20, duration: 3, ease: "power2.out" }
      );
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = -20 + Math.sin(state.clock.elapsedTime * 1.57) * 1;
    }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#8b2a2a", roughness: 0.95, metalness: 0.1 }), []);
  
  return (
    <group ref={groupRef} position={[0, -20, -15]}>
      {/* Head */}
      <mesh position={[0, 45, 0]} scale={[1, 0.85, 1]} material={material}>
        <sphereGeometry args={[8, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 35, 0]} material={material}>
        <cylinderGeometry args={[5, 6, 12, isMobile ? 8 : 12]} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-10, 25, 0]} scale={[1.4, 0.6, 0.8]} material={material}>
        <sphereGeometry args={[10, isMobile ? 8 : 12, isMobile ? 8 : 12]} />
      </mesh>
      <mesh position={[10, 25, 0]} scale={[1.4, 0.6, 0.8]} material={material}>
        <sphereGeometry args={[10, isMobile ? 8 : 12, isMobile ? 8 : 12]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-3, 46, 7.5]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshStandardMaterial emissive="#ff4400" emissiveIntensity={3} color="#000" />
      </mesh>
      <mesh position={[3, 46, 7.5]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshStandardMaterial emissive="#ff4400" emissiveIntensity={3} color="#000" />
      </mesh>
      
      {/* Eye Glow */}
      <pointLight position={[0, 46, 8]} color="#ff2200" intensity={8} distance={60} />
      
      <SteamParticles isMobile={isMobile} />
    </group>
  );
}

function SteamParticles({ isMobile }: { isMobile: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);
  const count = isMobile ? 60 : 200;
  
  const spriteMaterial = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const map = new THREE.CanvasTexture(canvas);
    return new THREE.SpriteMaterial({ map, transparent: true, opacity: 0.4 });
  }, []);

  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: 20 + Math.random() * 40,
      z: (Math.random() - 0.5) * 20,
      speed: 0.01 + Math.random() * 0.03,
      scale: 2 + Math.random() * 3,
    }));
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;
    particlesRef.current.children.forEach((sprite, i) => {
      sprite.position.y += data[i].speed * 100 * 0.016; // approximate delta
      if (sprite.position.y > 70) {
        sprite.position.y = 20;
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {data.map((d, i) => (
        <sprite key={i} position={[d.x, d.y, d.z]} scale={[d.scale, d.scale, 1]} material={spriteMaterial} />
      ))}
    </group>
  );
}

function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();
  
  useFrame((state) => {
    // Scroll push
    const scrollOffset = scroll.offset; // 0 to 1
    const targetZ = 120 - (scrollOffset * 60);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    
    // Idle sway
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;
    camera.lookAt(0, 20, 0);
  });
  
  return null;
}

export default function HeroScene() {
  const isMobile = useMobileDetect();
  
  return (
    <Canvas 
      camera={{ position: [0, 15, 120], fov: 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: false }}
    >
      <color attach="background" args={["#0a0508"]} />
      <fogExp2 attach="fog" args={["#0a0508", 0.008]} />
      
      <ambientLight intensity={0.4} color="#1a0a00" />
      <directionalLight position={[50, 100, 30]} intensity={2.0} color="#ff6600" />
      
      <Sky 
        sunPosition={[50, 10, 30]} 
        turbidity={20} 
        rayleigh={0.5} 
        mieCoefficient={0.1} 
        mieDirectionalG={0.8} 
      />

      <ScrollControls pages={1} damping={0.1}>
        <CameraRig />
      </ScrollControls>
      
      <Wall />
      <ColossalTitan isMobile={isMobile} />
      
      <PostProcessing />
    </Canvas>
  );
}
