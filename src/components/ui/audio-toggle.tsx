"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!isMuted && !audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Deep rumble (Colossal Titan vibe)
      const rumble = ctx.createOscillator();
      rumble.type = "sine";
      rumble.frequency.value = 40;
      
      const rumbleGain = ctx.createGain();
      rumbleGain.gain.value = 0.5;
      rumble.connect(rumbleGain);
      rumbleGain.connect(masterGain);
      
      // Wind (filtered noise)
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.1;
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      
      // LFO for wind sweeping
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.1;
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      rumble.start();
      noise.start();
      lfo.start();
    }

    if (audioCtxRef.current) {
      if (isMuted) {
        audioCtxRef.current.suspend();
      } else {
        audioCtxRef.current.resume();
      }
    }

    return () => {
      // Don't close context on unmount so it can persist, just suspend
    };
  }, [isMuted]);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-black/80 border border-[var(--border-color)] rounded-full text-[var(--accent-bronze)] hover:bg-[var(--accent-bronze)] hover:text-black transition-all"
      aria-label="Toggle audio"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
}
