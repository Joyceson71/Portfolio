"use client";

import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import { Suspense } from "react";

export function SceneProvider() {
  return (
    <Canvas
      className="!fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <Suspense fallback={null}>
        <View.Port />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
