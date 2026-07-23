"use client";

import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, DepthOfField, Bloom, Noise } from "@react-three/postprocessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

const projectsData = [
  {
    title: "Kings LMS",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    link: "https://kings-lms.vercel.app/",
    position: [-8, 2, -20] as [number, number, number]
  },
  {
    title: "Quiz Arena",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop",
    link: "https://quizarena71.vercel.app/",
    position: [8, 4, -50] as [number, number, number]
  },
  {
    title: "SmartBiz",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    link: "https://smart-biz-inky.vercel.app/",
    position: [-6, 3, -80] as [number, number, number]
  }
];

function Forest() {
  const treeCount = 60;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const barkMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#2a2015", 
    roughness: 1, 
    metalness: 0 
  }), []);

  const trees = useMemo(() => {
    return Array.from({ length: treeCount }, () => ({
      x: (Math.random() - 0.5) * 80,
      z: -Math.random() * 120,
      scale: Math.random() * 2 + 1,
      rotationY: Math.random() * Math.PI
    }));
  }, [treeCount]);

  useFrame(() => {
    if (!meshRef.current) return;
    trees.forEach((t, i) => {
      // Create path through the center by pushing trees out
      let x = t.x;
      if (Math.abs(x) < 4) x = (x < 0 ? -4 : 4) - Math.random() * 2;
      
      dummy.position.set(x, 20, t.z);
      dummy.scale.set(t.scale, 1, t.scale);
      dummy.rotation.y = t.rotationY;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 250]} />
        <meshStandardMaterial color="#0f0c08" roughness={1} />
      </mesh>
      
      <instancedMesh ref={meshRef} args={[new THREE.CylinderGeometry(1.5, 2.5, 60, 8), barkMat, treeCount]} castShadow receiveShadow />
    </group>
  );
}

function VolumetricRays() {
  const rayCount = 15;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const rays = useMemo(() => {
    return Array.from({ length: rayCount }, () => ({
      x: (Math.random() - 0.5) * 40,
      z: -Math.random() * 100 - 10,
      rotZ: (Math.random() - 0.5) * 0.5 + Math.PI/6,
      scale: Math.random() * 2 + 1
    }));
  }, [rayCount]);

  useFrame(() => {
    if (!meshRef.current) return;
    rays.forEach((r, i) => {
      dummy.position.set(r.x, 15, r.z);
      dummy.rotation.z = r.rotZ;
      dummy.scale.set(r.scale, 1, r.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.CylinderGeometry(0.5, 4, 60, 16, 1, true), undefined, rayCount]}>
      <meshBasicMaterial color="#ffaa55" transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function ProjectPlane({ project }: { project: typeof projectsData[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(project.image);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime * 2 + project.position[0]) * 0.5;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + (project.position[0] < 0 ? 0.2 : -0.2);
    }
  });

  return (
    <group position={project.position}>
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={() => window.open(project.link, '_blank')}
      >
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial 
          map={texture} 
          emissive={hovered ? "#c17f3a" : "#000000"} 
          emissiveIntensity={hovered ? 0.3 : 0} 
        />
      </mesh>
      
      <Html position={[0, -3.5, 0]} center zIndexRange={[100, 0]} className="pointer-events-none">
        <div className={`transition-all duration-300 ${hovered ? 'opacity-100 transform -translate-y-2' : 'opacity-60'}`}>
          <div className="font-cinzel text-xl font-bold uppercase tracking-widest text-white whitespace-nowrap text-center drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
            {project.title}
          </div>
          <div className="text-[10px] font-sans text-titan-bronze uppercase tracking-widest text-center drop-shadow-md mt-1">
            Click to Deploy
          </div>
        </div>
      </Html>
    </group>
  );
}

function SceneCamera() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    // Scroll drives Z position deeper into the forest
    // Total scroll distance = 100 units
    const targetZ = -scroll.offset * 100 + 10;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    camera.position.y = 5;
    camera.position.x = Math.sin(scroll.offset * Math.PI * 4) * 2; // subtle sway
  });
  return null;
}

export function ProjectsScene() {
  const isMobile = useMobileDetect();

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }} shadows dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)} gl={{ antialias: false }}>
      <color attach="background" args={["#0a0806"]} />
      <fogExp2 attach="fog" args={["#0a0806", 0.02]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[20, 50, -20]} 
        intensity={1.5} 
        color="#ffcc88" 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Forest />
      <VolumetricRays />
      
      <ScrollControls pages={3} damping={0.2}>
        <SceneCamera />
        <Suspense fallback={null}>
          {projectsData.map((p, i) => (
            <ProjectPlane key={i} project={p} />
          ))}
        </Suspense>
      </ScrollControls>

      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={1.5} />
          <Noise opacity={0.03} />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
