"use client";

import { useRef } from "react";
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

  useFrame(() => {
    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = THREE.MathUtils.lerp(
        cursorLightRef.current.position.x, mouseX * 8, 0.06
      );
      cursorLightRef.current.position.y = THREE.MathUtils.lerp(
        cursorLightRef.current.position.y, -mouseY * 6, 0.06
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 4]} color={skinColor} intensity={30} distance={20} />
      <pointLight position={[7, 5, -3]} color={skinAccent} intensity={25} distance={25} />
      <pointLight position={[-7, -5, -3]} color={skinColor} intensity={18} distance={25} />
      <pointLight
        ref={cursorLightRef}
        position={[0, 0, 4]}
        color={skinColor}
        intensity={35}
        distance={15}
        decay={2}
      />
    </>
  );
}
