"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PostProcessing } from "./PostProcessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

const SKILL_DATA = [
  { name: "React/Next.js", color: "#c17f3a", geo: new THREE.TorusGeometry(1.5, 0.4, 16, 32) },
  { name: "TypeScript", color: "#8b4fff", geo: new THREE.OctahedronGeometry(2, 0) },
  { name: "Database", color: "#3aafa0", geo: new THREE.CylinderGeometry(1.5, 1.5, 3, 6) },
  { name: "CSS/UI", color: "#ff44aa", geo: new THREE.TorusKnotGeometry(1.2, 0.3, 64, 12) },
  { name: "Backend", color: "#ff8800", geo: new THREE.BoxGeometry(2.5, 2.5, 2.5) },
  { name: "Tools", color: "#4488ff", geo: new THREE.IcosahedronGeometry(1.8, 0) }
];

function SkillShard({ data, index, total }: { data: any, index: number, total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const angle = (index / total) * Math.PI * 2;
  const radius = 8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      wireRef.current.rotation.copy(meshRef.current.rotation);
      
      const targetScale = hovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      wireRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.05);
      
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity,
        hovered ? 1.5 : 0.4,
        0.1
      );
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh 
        ref={meshRef} 
        geometry={data.geo}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.8} 
          roughness={0.1} 
          emissive={data.color}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={wireRef} geometry={data.geo}>
        <meshBasicMaterial color="#c17f3a" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function SkillRing() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {SKILL_DATA.map((data, i) => (
        <SkillShard key={i} data={data} index={i} total={SKILL_DATA.length} />
      ))}
    </group>
  );
}

function ODMWires({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 10 : 30;
  
  const wires = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const p1 = new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40);
      const p2 = new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40);
      const p3 = new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40);
      const curve = new THREE.CatmullRomCurve3([p1, p2, p3]);
      arr.push({ curve, offset: Math.random() });
    }
    return arr;
  }, [count]);

  const dotsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dotsRef.current) {
      const time = state.clock.elapsedTime * 0.2;
      dotsRef.current.children.forEach((dot, i) => {
        const t = (time + wires[i].offset) % 1;
        wires[i].curve.getPoint(t, dot.position);
      });
    }
  });

  return (
    <group>
      {wires.map((w, i) => (
        <mesh key={i}>
          <tubeGeometry args={[w.curve, 20, 0.03, 4]} />
          <meshBasicMaterial color="#c17f3a" transparent opacity={0.15} />
        </mesh>
      ))}
      <group ref={dotsRef}>
        {wires.map((_, i) => (
          <mesh key={`dot-${i}`}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function SkillsScene() {
  const isMobile = useMobileDetect();
  
  return (
    <Canvas 
      camera={{ position: [0, 5, 20], fov: 45 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: false }}
    >
      <color attach="background" args={["#03050a"]} />
      <fogExp2 attach="fog" args={["#03050a", 0.02]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#c17f3a" />
      
      <SkillRing />
      <ODMWires isMobile={isMobile} />
      
      <PostProcessing />
    </Canvas>
  );
}
