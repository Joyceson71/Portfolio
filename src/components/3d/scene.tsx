"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Preload } from "@react-three/drei";
import { Suspense } from "react";

function AmbientBlobs() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]}  color="#00d4ff" intensity={30} />
      <pointLight position={[-10, -10, 5]} color="#ff2d78" intensity={20} />
      <pointLight position={[0, 10, -10]}  color="#b400ff" intensity={15} />

      {[
        { pos: [4, 3, -8],   color: "#00d4ff", scale: 3.5, speed: 1.2 },
        { pos: [-5, -2, -6], color: "#ff2d78", scale: 2.8, speed: 1.8 },
        { pos: [0, -4, -10], color: "#b400ff", scale: 4,   speed: 0.9 },
      ].map((b, i) => (
        <Float key={i} speed={b.speed} rotationIntensity={0.5} floatIntensity={2}>
          <Sphere args={[b.scale, 32, 32]} position={b.pos as [number,number,number]}>
            <MeshDistortMaterial
              color={b.color}
              distort={0.45}
              speed={1.5}
              transparent
              opacity={0.18}
              roughness={0}
              metalness={0}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

export function SceneProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      className="!fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <Suspense fallback={null}>
        <AmbientBlobs />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
