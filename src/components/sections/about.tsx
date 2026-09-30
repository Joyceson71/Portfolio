"use client";

import { motion } from "framer-motion";
import { Box, Layers, Zap, Globe, Cpu, Brush, Award, Clock, Target, Star } from "lucide-react";

const services = [
  {
    icon: Box,
    label: "3D Web Experiences",
    desc: "Fully interactive Three.js & WebGL scenes embedded directly in browsers — no plugin required.",
    color: "#a855f7",
    badge: "badge-purple",
  },
  {
    icon: Layers,
    label: "Motion & Animation",
    desc: "GSAP-powered scroll animations, Framer Motion transitions, and CSS-based micro-interactions.",
    color: "#06b6d4",
    badge: "badge-cyan",
  },
  {
    icon: Globe,
    label: "Creative Web Design",
    desc: "Pixel-perfect, responsive layouts with modern design systems built in Figma and code.",
    color: "#f59e0b",
    badge: "badge-amber",
  },
  {
    icon: Zap,
    label: "Performance Optimization",
    desc: "Lighthouse 100 scores, lazy loading 3D assets, texture compression, and GPU-friendly code.",
    color: "#a855f7",
    badge: "badge-purple",
  },
  {
    icon: Cpu,
    label: "Shader Programming",
    desc: "Custom GLSL vertex and fragment shaders for unique visual effects that can't exist anywhere else.",
    color: "#06b6d4",
    badge: "badge-cyan",
  },
  {
    icon: Brush,
    label: "Brand & Identity",
    desc: "Logo systems, color palettes, typography scale, and full brand guidelines for digital-first companies.",
    color: "#f59e0b",
    badge: "badge-amber",
  },
];

const timeline = [
  { year: "2020", event: "Started as a self-taught web designer", icon: Star },
  { year: "2021", event: "Fell in love with Three.js & WebGL", icon: Box },
  { year: "2022", event: "First commercial 3D web project launched", icon: Globe },
  { year: "2023", event: "Won 3× Awwwards Site of the Day", icon: Award },
  { year: "2024", event: "50+ projects delivered across 20 countries", icon: Target },
  { year: "2025", event: "Founded a creative studio with 5 designers", icon: Layers },
  { year: "2026", event: "Speaking at WebGL Summit & SIGGRAPH Web", icon: Clock },
];

const stats = [
  { value: "50+",  label: "Projects Shipped" },
  { value: "3×",   label: "Awwwards SOTD"   },
  { value: "20+",  label: "Countries Served" },
  { value: "100%", label: "Client Satisfaction" },
];

export function About() {
  return (
    <section id="about" className="w-full px-6 md:px-12 py-32 max-w-[1400px] mx-auto">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-label"
      >
        About Me
      </motion.div>

      {/* Header + bio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Crafting{" "}
            <span className="gradient-text">Impossible</span>
            <br />
            Web Experiences
          </h2>
          <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
            <p>
              I&apos;m <span className="text-white font-semibold">Joyceson Danielraj</span>, a 3D web
              designer and creative developer based in Chennai. I transform brands into living,
              breathing digital worlds — merging artistry with cutting-edge browser technology.
            </p>
            <p>
              My work sits at the intersection of design and engineering. I believe the best
              web experiences don&apos;t just communicate — they captivate, immerse, and leave an
              impression that lasts long after the tab is closed.
            </p>
            <p>
              When I&apos;m not pushing pixels into the third dimension, I&apos;m contributing to the
              open-source creative-coding community and mentoring junior designers breaking into
              the world of WebGL.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <a href="#work" className="btn-primary">See My Work</a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="stat-card"
              >
                <div className="text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="card p-6 mt-2">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6">
              My Journey
            </h3>
            <div className="space-y-5">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-4"
                  >
                    <div className="timeline-dot mt-1" />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                        {item.year}
                      </span>
                      <p className="text-sm text-zinc-300 font-medium leading-snug mt-0.5">
                        {item.event}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services grid */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="section-label">What I Do</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Services & Expertise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-6 group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: svc.color }} />
                </div>
                <h3 className="text-base font-bold mb-2">{svc.label}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{svc.desc}</p>
                <div className="mt-5">
                  <span className={`badge ${svc.badge}`}>Learn More →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
