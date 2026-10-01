"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const projects = [
  { id: 1, title: "Kings LMS",   year: "2025", tech: "Next.js · TypeScript · PostgreSQL", href: "https://kings-lms.vercel.app/" },
  { id: 2, title: "Quiz Arena",  year: "2024", tech: "React · Node.js · MongoDB",         href: "https://quizarena71.vercel.app/" },
  { id: 3, title: "SmartBiz",    year: "2024", tech: "React · Next.js · TypeScript",       href: "https://smart-biz-inky.vercel.app/" },
];

export default function WorkPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#080810] px-6 md:px-16 py-28">
      <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 hover:text-[#CC0000] transition-colors mb-16">
        <ArrowLeft className="w-3 h-3" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="web-label mb-4">Selected Archive</div>
        <h1 className="font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">
          <span className="text-white">All</span>{" "}
          <span className="text-spider">Work.</span>
        </h1>
      </motion.div>

      <div className="flex flex-col divide-y divide-white/[0.06] max-w-4xl">
        {projects.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group flex items-center justify-between py-8 hover:pl-4 transition-all duration-300"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#CC0000] transition-colors">{p.title}</h2>
              <p className="font-mono text-[11px] text-white/35 uppercase tracking-widest mt-2">{p.tech}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-white/25">{p.year}</span>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#CC0000] transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
