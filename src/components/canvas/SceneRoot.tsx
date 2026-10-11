"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, PerformanceMonitor, Preload } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import { SKINS } from "@/lib/constants";
import { CameraRig } from "./CameraRig";
import { CityScape } from "./CityScape";
import { WebField } from "./WebField";
import { StackGraph } from "./StackGraph";
import { TimelineStrand } from "./TimelineStrand";
import { BeaconScene } from "./BeaconScene";
import { CoreNanotech } from "./CoreNanotech";
import { ScrollSync } from "./ScrollSync";
import { LightRig } from "./LightRig";

interface SceneContentProps {
  mouseX: number;
  mouseY: number;
}

function SceneContent({ mouseX, mouseY }: SceneContentProps) {
  const scrollProgress = useStore((s) => s.scrollProgress);
  const skin = useStore((s) => s.skin);
  const skinConfig = SKINS[skin];

  return (
    <>
      <ScrollSync />
      <color attach="background" args={[skin === "venom" ? "#040408" : "#080810"]} />

      <LightRig
        mouseX={mouseX}
        mouseY={mouseY}
        skinColor={skinConfig.primary}
        skinAccent={skinConfig.accent}
      />

      <Stars radius={60} depth={30} count={1500} factor={2.5} saturation={0.3} fade speed={0.4} />

      {/* Hero region */}
      <WebField
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        skinColor={skinConfig.primary}
        skinAccent={skinConfig.accent}
      />
      <CoreNanotech
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        skinColor={skinConfig.primary}
        skinAccent={skinConfig.accent}
      />

      {/* Arsenal region */}
      <StackGraph scrollProgress={scrollProgress} />

      {/* Timeline region */}
      <TimelineStrand scrollProgress={scrollProgress} />

      {/* Contact region */}
      <BeaconScene scrollProgress={scrollProgress} />

      {/* Always-present city */}
      <CityScape />

      {/* Scroll-driven camera */}
      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          mipmapBlur
          intensity={2.2}
          levels={5}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(skinConfig.chromaticOffset, skinConfig.chromaticOffset)}
        />
        <Noise opacity={0.025} />
        <Vignette offset={0.35} darkness={0.55} />
      </EffectComposer>

      <Preload all />
    </>
  );
}

interface SceneRootProps {
  mouseX?: number;
  mouseY?: number;
}

export function SceneRoot({ mouseX = 0, mouseY = 0 }: SceneRootProps) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  // Graceful degradation for low-end + mobile
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <Canvas
      className="scene-canvas"
      camera={{ position: [0, 2, 15], fov: 50 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      dpr={dpr}
      frameloop="always"
      aria-hidden="true"
      role="presentation"
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr([0.75, 1]);
        }}
      >
        <Suspense fallback={null}>
          <SceneContent mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
