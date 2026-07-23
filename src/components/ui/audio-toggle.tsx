"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We create the audio element on the client side
    audioRef.current = new Audio("/shinzou.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Modern browsers require interaction before playing
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-12 h-12 bg-black/80 border border-[#ff3300] rounded-full text-[#ff3300] hover:bg-[#ff3300] hover:text-black transition-all shadow-[0_0_15px_rgba(255,51,0,0.4)]"
      aria-label="Toggle audio"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
