"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Sparkles, Play } from "lucide-react";

const HeroScene = dynamic(
  () => import("@/components/3d/scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

const roles = ["3D Web Designer", "Creative Developer", "WebGL Artist", "Motion Craftsman"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D canvas backdrop */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Dark gradient overlay so text stays legible */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#09090b]/60 via-[#09090b]/30 to-[#09090b]" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="badge badge-purple">
            <Sparkles className="w-3 h-3" />
            Available for Projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          I Design{" "}
          <span className="gradient-text">Immersive</span>
          <br />
          3D Worlds
          <br />
          <span className="text-zinc-400 text-4xl sm:text-5xl lg:text-6xl font-semibold">
            for the Web.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg sm:text-xl text-zinc-400 font-medium max-w-2xl leading-relaxed mb-12"
        >
          Hi, I&apos;m <span className="text-white font-bold">Joyceson Danielraj</span> — a creative developer
          who builds breathtaking 3D web experiences using Three.js, WebGL, GSAP, and the latest
          browser technologies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#work" className="btn-primary text-base">
            <Play className="w-4 h-4" />
            View My Work
          </a>
          <a href="#contact" className="btn-ghost text-base">
            Start a Project →
          </a>
        </motion.div>

        {/* Role ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex gap-4 flex-wrap justify-center"
        >
          {roles.map((role, i) => (
            <span key={role} className="badge">
              {i === 0 && "✦"} {role}
            </span>
          ))}
        </motion.div>

      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#work" aria-label="Scroll down">
          <ArrowDown className="w-5 h-5 text-zinc-500" />
        </a>
      </motion.div>
    </section>
  );
}
