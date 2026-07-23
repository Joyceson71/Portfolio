"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PostProcessing } from "./PostProcessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

function ForestEnvironment() {
  const treePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 20; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 160,
        z: (Math.random() - 0.5) * 160,
        height: 80 + Math.random() * 40
      });
    }
    return pos;
  }, []);

  const groundTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0f1a0a";
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = "#0a1205";
    for (let i = 0; i < 300; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 15, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(30, 30);
    return tex;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial map={groundTexture} roughness={1} />
      </mesh>

      {/* Trees */}
      {treePositions.map((pos, i) => (
        <group key={i} position={[pos.x, 0, pos.z]}>
          {/* Trunk */}
          <mesh position={[0, pos.height / 2 - 20, 0]}>
            <cylinderGeometry args={[3, 4, pos.height, 8]} />
            <meshStandardMaterial color="#1a0e05" roughness={0.9} />
          </mesh>
          {/* Canopy */}
          <mesh position={[0, pos.height - 20, 0]}>
            <sphereGeometry args={[16, 8, 6]} />
            <meshStandardMaterial color="#0a1f0a" transparent opacity={0.7} roughness={0.9} />
          </mesh>
        </group>
      ))}
      
      {/* Sunbeams */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={`beam-${i}`} 
          position={[(Math.random() - 0.5) * 60, 20, (Math.random() - 0.5) * 60]}
          rotation={[Math.PI / 6, (Math.random() - 0.5) * Math.PI, 0]}
        >
          <cylinderGeometry args={[0.5, 5, 80, 6, 1, true]} />
          <meshBasicMaterial color="#fffbe0" transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function DustMotes({ isMobile }: { isMobile: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);
  const count = isMobile ? 150 : 500;

  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 100,
      speed: 0.05 + Math.random() * 0.1
    }));
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.children.forEach((mesh, i) => {
        mesh.position.y += data[i].speed * 0.05;
        mesh.position.x += Math.sin(time + i) * 0.01;
        if (mesh.position.y > 40) mesh.position.y = -20;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {data.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#fffbe0" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function ForestCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Slowly drift forward through the forest
    camera.position.z = 40 - (state.clock.elapsedTime * 0.5);
    camera.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    camera.lookAt(0, 5, camera.position.z - 20);
  });
  
  return null;
}

export default function ProjectsScene() {
  const isMobile = useMobileDetect();
  
  return (
    <Canvas 
      camera={{ position: [0, 0, 40], fov: 60 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: false }}
    >
      <color attach="background" args={["#050a05"]} />
      <fogExp2 attach="fog" args={["#050a05", 0.025]} />
      
      <ambientLight intensity={0.2} color="#fff" />
      <directionalLight position={[20, 50, -20]} intensity={1.5} color="#fffbe0" />
      
      <ForestCamera />
      <ForestEnvironment />
      <DustMotes isMobile={isMobile} />
      
      <PostProcessing />
    </Canvas>
  );
}
