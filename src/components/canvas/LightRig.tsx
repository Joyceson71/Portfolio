"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LightRigProps {
  mouseX: number;
  mouseY: number;
  skinColor: string;
  skinAccent?: string;
}

export function LightRig({ mouseX, mouseY, skinColor, skinAccent = "#0047FF" }: LightRigProps) {
  const cursorLightRef = useRef<THREE.PointLight>(null!);
  const rimLightRef = useRef<THREE.PointLight>(null!);
  const clickIntensity = useRef(35);

  useEffect(() => {
    const onDown = () => {
      clickIntensity.current = 80;
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = THREE.MathUtils.lerp(
        cursorLightRef.current.position.x, mouseX * 8, 0.06
      );
      cursorLightRef.current.position.y = THREE.MathUtils.lerp(
        cursorLightRef.current.position.y, -mouseY * 6, 0.06
      );

      // Damp intensity smoothly back to baseline 35
      clickIntensity.current = THREE.MathUtils.damp(clickIntensity.current, 35, 6, delta);
      cursorLightRef.current.intensity = clickIntensity.current;
    }

    // Breathing rim light — slow sinusoidal pulse on the opposite side
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 12 + Math.sin(t * 0.9) * 8;
      // Slowly orbit around the scene on a wide arc
      rimLightRef.current.position.x = Math.sin(t * 0.15) * 10;
      rimLightRef.current.position.z = Math.cos(t * 0.15) * -6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 4]} color={skinColor} intensity={30} distance={20} />
      <pointLight position={[7, 5, -3]} color={skinAccent} intensity={25} distance={25} />
      <pointLight position={[-7, -5, -3]} color={skinColor} intensity={18} distance={25} />
      {/* Click-reactive cursor light */}
      <pointLight
        ref={cursorLightRef}
        position={[0, 0, 4]}
        color={skinColor}
        intensity={35}
        distance={18}
        decay={2}
      />
      {/* Breathing rim light — sweeps slowly around the back for atmospheric depth */}
      <pointLight
        ref={rimLightRef}
        position={[0, -4, -6]}
        color={skinAccent}
        intensity={12}
        distance={22}
        decay={2}
      />
    </>
  );
}
