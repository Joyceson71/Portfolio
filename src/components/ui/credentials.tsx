"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2, Shield, Sparkles, ExternalLink } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

interface Credential {
  title: string;
  issuer: string;
  year: string;
  id: string;
  skills: string[];
  type: "degree" | "cert";
}

const credentials: Credential[] = [
  {
    title: "Bachelor of Engineering (B.E.) in Computer Science",
    issuer: "Anna University Affiliate",
    year: "2020 — 2024",
    id: "CSE-FIRST-CLASS",
    skills: ["Data Structures & Algorithms", "Computer Networks", "DBMS", "Operating Systems"],
    type: "degree",
  },
  {
    title: "Advanced Next.js 16 & React 19 Architecture",
    issuer: "Vercel / React Core Patterns",
    year: "2024",
    id: "CERT-NX-8821",
    skills: ["Server Actions", "Turbopack", "Hydration Optimization", "Concurrent UI"],
    type: "cert",
  },
  {
    title: "Three.js & WebGL 3D Interactive Masterclass",
    issuer: "Creative Technologist Institute",
    year: "2024",
    id: "CERT-3D-9402",
    skills: ["Custom GLSL Shaders", "R3F Scene Graph", "BufferGeometries", "Post-Processing"],
    type: "cert",
  },
  {
    title: "Full-Stack Web Application Engineering",
    issuer: "Meta / Coursera Professional",
    year: "2023",
    id: "META-FRONTEND-91",
    skills: ["TypeScript Strict", "REST & GraphQL", "State Management", "CI/CD Deployment"],
    type: "cert",
  },
];

export function CredentialsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {credentials.map((cred, idx) => {
        const isDegree = cred.type === "degree";
        const accent = isDegree ? "#CC0000" : "#0047FF";

        return (
          <motion.div
            key={cred.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => spiderAudio.playBlip(750 + idx * 40, 0.03)}
            className="web-panel p-6 rounded-sm flex flex-col justify-between hover:border-[#CC0000]/60 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ background: `${accent}15`, color: accent }}
                  >
                    {isDegree ? <GraduationCap className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {cred.issuer}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-white/80">{cred.year}</span>
              </div>

              <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#CC0000] transition-colors leading-snug">
                {cred.title}
              </h4>

              <div className="font-mono text-[10px] text-white/35 mb-4 flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>VERIFIED CREDENTIAL ID: {cred.id}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {cred.skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[9px] text-white/50 px-2 py-0.5 rounded bg-white/[0.03] border border-white/8"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
