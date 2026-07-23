"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import gsap from "gsap";
import { useMobileDetect } from "@/hooks/useMobileDetect";

const skillsData = [
  { name: "React/Next.js", color: "#c17f3a", level: 95, geom: "torus" },
  { name: "TypeScript", color: "#8b4fff", level: 90, geom: "octahedron" },
  { name: "Databases", color: "#3aafa0", level: 85, geom: "cylinder" },
  { name: "CSS/Animations", color: "#e44d26", level: 95, geom: "torusknot" },
  { name: "Backend", color: "#44883e", level: 80, geom: "box" },
  { name: "Tools", color: "#888888", level: 90, geom: "icosahedron" }
];

function SkillGeometry({ type }: { type: string }) {
  switch (type) {
    case "torus": return <torusGeometry args={[2, 0.6, 16, 32]} />;
    case "octahedron": return <octahedronGeometry args={[2.5, 0]} />;
    case "cylinder": return <cylinderGeometry args={[1.5, 1.5, 3, 6]} />;
    case "torusknot": return <torusKnotGeometry args={[1.5, 0.4, 64, 16]} />;
    case "box": return <boxGeometry args={[3, 3, 3]} />;
    case "icosahedron": return <icosahedronGeometry args={[2.2, 0]} />;
    default: return <sphereGeometry args={[2, 16, 16]} />;
  }
}

function SkillShard({ skill, position, angle }: { skill: any, position: [number, number, number], angle: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <group 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      >
        <mesh>
          <SkillGeometry type={skill.geom} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.8} 
            roughness={0.1} 
            emissive={skill.color} 
            emissiveIntensity={hovered ? 1.5 : 0.4} 
          />
        </mesh>
        <mesh scale={1.05}>
          <SkillGeometry type={skill.geom} />
          <meshBasicMaterial color="#c17f3a" wireframe transparent opacity={0.3} />
        </mesh>
      </group>

      <Html position={[0, -4, 0]} center zIndexRange={[100, 0]} className="pointer-events-none">
        <div className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}>
          <div className="font-cinzel text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap text-center drop-shadow-md">
            {skill.name}
          </div>
          <div className="w-32 h-1 bg-obsidian mt-2 mx-auto rounded-full overflow-hidden border border-border">
            <div 
              className="h-full bg-titan-bronze" 
              style={{ width: `${skill.level}%`, boxShadow: `0 0 10px ${skill.color}` }}
            />
          </div>
        </div>
      </Html>
    </group>
  );
}

function ShardRing() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 8;
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const lines = useMemo(() => {
    const pts = [];
    for (let i = 0; i < skillsData.length; i++) {
      const angle = (i / skillsData.length) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    pts.push(pts[0]);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <group ref={groupRef}>
      {skillsData.map((skill, i) => {
        const angle = (i / skillsData.length) * Math.PI * 2;
        return (
          <SkillShard 
            key={i} 
            skill={skill} 
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} 
            angle={angle}
          />
        );
      })}
      {/* Connecting Ring */}
      <primitive 
        object={new THREE.Line(
          lines, 
          new THREE.LineBasicMaterial({ color: "#c17f3a", transparent: true, opacity: 0.2 })
        )} 
      />
    </group>
  );
}

function ODMWires() {
  const wires = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) {
      const pts = [];
      // Create random curves
      for(let j=0; j<4; j++) {
        pts.push(new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 40
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      arr.push({ curve, offset: Math.random() });
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    wires.forEach((wire, i) => {
      const t = (state.clock.elapsedTime * 0.2 + wire.offset) % 1;
      const pt = wire.curve.getPoint(t);
      dummy.position.copy(pt);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {wires.map((wire, i) => (
        <mesh key={i}>
          <tubeGeometry args={[wire.curve, 20, 0.03, 4]} />
          <meshBasicMaterial color="#c17f3a" transparent opacity={0.15} />
        </mesh>
      ))}
      <instancedMesh ref={meshRef} args={[new THREE.SphereGeometry(0.2, 8, 8), undefined, 30]}>
        <meshBasicMaterial color="#fff" />
      </instancedMesh>
    </group>
  );
}

export function SkillsScene() {
  const isMobile = useMobileDetect();

  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 60 }} dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)} gl={{ antialias: false }}>
      <color attach="background" args={["#030205"]} />
      <fogExp2 attach="fog" args={["#030205", 0.03]} />
      <ambientLight intensity={0.4} color="#111" />
      
      <ShardRing />
      <ODMWires />

      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2} />
          <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
          <Noise opacity={0.04} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
