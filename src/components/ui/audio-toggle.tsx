"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = new Audio("/shinzou.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    
    // Check if the audio file can be loaded
    audio.addEventListener('error', () => {
      setError(true);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || error) {
      console.warn("Audio source not available.");
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        setError(true);
        setIsPlaying(false);
      });
    }
  };

  if (error) return null; // Hide the toggle if audio is unavailable

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-full text-foreground hover:bg-white/20 transition-all hover:scale-110"
      aria-label="Toggle audio"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
