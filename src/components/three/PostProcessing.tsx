"use client";

import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise, DepthOfField } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMobileDetect } from "@/hooks/useMobileDetect";

export function PostProcessing() {
  const isMobile = useMobileDetect();

  // On mobile, reduce effects for performance
  if (isMobile) {
    return (
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.3} 
          luminanceSmoothing={0.9} 
          intensity={1.2} 
        />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom 
        luminanceThreshold={0.3} 
        luminanceSmoothing={0.9} 
        intensity={1.8} 
      />
      <ChromaticAberration 
        offset={[0.0008, 0.0008] as any} 
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.9} />
      <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
      <DepthOfField 
        focusDistance={0.01} 
        focalLength={0.02} 
        bokehScale={3} 
      />
    </EffectComposer>
  );
}
