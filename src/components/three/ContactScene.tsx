"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

function Desk() {
  return (
    <group position={[0, -2, 0]}>
      {/* Table Top */}
      <mesh receiveShadow>
        <boxGeometry args={[40, 0.5, 20]} />
        <meshStandardMaterial color="#2d1c10" roughness={0.9} />
      </mesh>
      
      {/* Rolled Map */}
      <mesh position={[-5, 0.5, 2]} rotation={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 6, 16]} />
        <meshStandardMaterial color="#e0cda7" roughness={0.7} />
      </mesh>
      <mesh position={[-5, 0.5, 2]} rotation={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 5.8, 16]} />
        <meshStandardMaterial color="#4a2e1b" />
      </mesh>
    </group>
  );
}

function WindowTitan() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 15 + Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group position={[20, 15, -40]}>
      {/* Window Frame Glow */}
      <pointLight color="#ff2200" intensity={0.5} distance={50} />
      {/* Distant Titan Eye */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#ff2200" />
      </mesh>
    </group>
  );
}

function ParticleBurst() {
  const [trigger, setTrigger] = useState(0);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 300;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(0, -1, 0),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.8,
        Math.random() * 0.8 + 0.2,
        (Math.random() - 0.5) * 0.8
      ),
      active: false
    }));
  }, [count]);

  useEffect(() => {
    const handleTrigger = () => {
      particles.forEach(p => {
        p.pos.set((Math.random() - 0.5) * 4, -1, (Math.random() - 0.5) * 4);
        p.vel.set(
          (Math.random() - 0.5) * 1.5,
          Math.random() * 2 + 1,
          (Math.random() - 0.5) * 1.5
        );
        p.active = true;
      });
      setTrigger(t => t + 1);
    };

    window.addEventListener("contact-submit", handleTrigger);
    return () => window.removeEventListener("contact-submit", handleTrigger);
  }, [particles]);

  useFrame(() => {
    if (!meshRef.current || trigger === 0) return;
    
    let anyActive = false;
    particles.forEach((p, i) => {
      if (p.active) {
        anyActive = true;
        p.pos.add(p.vel);
        p.vel.y -= 0.05; // gravity
        
        if (p.pos.y < -2) {
          p.active = false;
          dummy.scale.setScalar(0);
        } else {
          dummy.position.copy(p.pos);
          dummy.scale.setScalar(1);
        }
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      }
    });
    
    if (anyActive) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(0.2, 0.2, 0.2), undefined, count]}>
      <meshStandardMaterial color="#c17f3a" emissive="#c17f3a" emissiveIntensity={2} />
    </instancedMesh>
  );
}

function Candle({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const [intensity, setIntensity] = useState(2);
  
  useEffect(() => {
    const handleFocus = () => setIntensity(5);
    const handleBlur = () => setIntensity(2);
    
    window.addEventListener("contact-focus", handleFocus);
    window.addEventListener("contact-blur", handleBlur);
    return () => {
      window.removeEventListener("contact-focus", handleFocus);
      window.removeEventListener("contact-blur", handleBlur);
    };
  }, []);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity, 
        intensity + Math.sin(state.clock.elapsedTime * 10) * 0.5, 
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
        <meshStandardMaterial color="#f5e6c8" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      <pointLight ref={lightRef} position={[0, 1.5, 0]} color="#ff8800" distance={20} castShadow />
    </group>
  );
}

export function ContactScene() {
  const isMobile = useMobileDetect();

  return (
    <Canvas camera={{ position: [0, 4, 12], fov: 50 }} shadows dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)} gl={{ antialias: false }}>
      <color attach="background" args={["#050508"]} />
      <fogExp2 attach="fog" args={["#050508", 0.04]} />
      
      <ambientLight intensity={0.1} />

      <Desk />
      <Candle position={[6, -1.5, 2]} />
      <WindowTitan />
      <ParticleBurst />

      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
