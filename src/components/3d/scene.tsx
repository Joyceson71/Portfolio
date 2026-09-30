"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  Text, 
  MeshTransmissionMaterial, 
  Environment, 
  ContactShadows,
  Html,
  Icosahedron
} from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";

// Dynamic Camera that follows mouse
function CameraRig() {
  useFrame((state, delta) => {
    // Smoothly move camera based on mouse position
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 2, state.pointer.y * 2, 10],
      0.5,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Background Massive Text
function BackgroundText() {
  return (
    <group position={[0, 0, -5]}>
      <Text
        fontSize={4}
        letterSpacing={-0.05}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        position={[0, 1.5, 0]}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        SPATIAL
      </Text>
      <Text
        fontSize={4}
        letterSpacing={-0.05}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        position={[0, -2, 0]}
        color="#222222" // Darker for depth
        anchorX="center"
        anchorY="middle"
      >
        DESIGNER
      </Text>
    </group>
  );
}

// Interactive Glass Shard (Represents a project)
function ProjectShard({ position, title, subtitle, color }: { position: [number, number, number], title: string, subtitle: string, color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
      
      // Scale up when hovered
      const targetScale = hovered ? 1.2 : 1;
      easing.damp3(mesh.current.scale, [targetScale, targetScale, targetScale], 0.2, delta);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh 
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => alert(`Opening project: ${title}`)}
      >
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.8}
          chromaticAberration={1}
          anisotropy={0.2}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={color}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        
        {/* HTML Label that appears on hover */}
        <Html distanceFactor={10} zIndexRange={[100, 0]} center>
          <div 
            className={`transition-all duration-300 pointer-events-none flex flex-col items-center justify-center`}
            style={{ opacity: hovered ? 1 : 0, transform: `translateY(${hovered ? '0' : '20px'})` }}
          >
            <div className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-full whitespace-nowrap">
              <p className="text-white text-xs font-bold uppercase tracking-widest">{title}</p>
            </div>
            <p className="text-white/60 text-[10px] font-medium uppercase tracking-wider mt-2">{subtitle}</p>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

// Floating Particles
function Particles() {
  const count = 100;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export function SpatialScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 40 }}
      style={{ width: "100%", height: "100vh" }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#a855f7" />
      
      {/* Dynamic Camera */}
      <CameraRig />

      {/* Massive Background Text */}
      <BackgroundText />

      {/* Interactive Project Shards */}
      <ProjectShard position={[-3, 1, 0]} title="Cosmos Brand" subtitle="WebGL • React" color="#a855f7" />
      <ProjectShard position={[3, -1, 1]} title="Fluid Studio" subtitle="GLSL • Motion" color="#06b6d4" />
      <ProjectShard position={[0, -2.5, 2]} title="Ethereal Agency" subtitle="Three.js • GSAP" color="#f59e0b" />
      
      {/* Particles */}
      <Particles />

      {/* Ground Shadow */}
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" position={[0, -4, 0]} />
      
      {/* Environment for glass reflections */}
      <Environment preset="city" />
    </Canvas>
  );
}
