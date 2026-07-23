"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startAudio = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }
    
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(ctx.destination);
      gainNodeRef.current.gain.value = 0; // start silent
    }

    // Low rumble oscillator
    if (!oscillatorRef.current) {
      oscillatorRef.current = ctx.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 45; // deep rumble
      
      const rumbleGain = ctx.createGain();
      rumbleGain.gain.value = 0.4;
      oscillatorRef.current.connect(rumbleGain);
      rumbleGain.connect(gainNodeRef.current);
      
      oscillatorRef.current.start();
    }

    // White noise for wind
    if (!noiseNodeRef.current) {
      const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      noiseNodeRef.current = ctx.createBufferSource();
      noiseNodeRef.current.buffer = buffer;
      noiseNodeRef.current.loop = true;

      // Filter the noise to sound like low wind
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400; // muffled wind

      // LFO to sweep the filter for howling wind effect
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.2; // very slow sweep
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.15;

      noiseNodeRef.current.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(gainNodeRef.current);
      
      noiseNodeRef.current.start();
    }

    // Fade in
    gainNodeRef.current.gain.setTargetAtTime(1, ctx.currentTime, 1);
  };

  const stopAudio = () => {
    if (audioContextRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (newMutedState) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5 }}
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-obsidian border border-titan-bronze rounded-full flex items-center justify-center text-titan-bronze hover:bg-titan-bronze hover:text-obsidian transition-colors shadow-[0_0_15px_rgba(193,127,58,0.2)]"
      aria-label="Toggle Audio"
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.button>
  );
}
