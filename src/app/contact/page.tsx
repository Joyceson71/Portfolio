"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#080810] px-6 md:px-16 py-28 flex flex-col justify-center">
      <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 hover:text-[#CC0000] transition-colors mb-16">
        <ArrowLeft className="w-3 h-3" /> Back
      </Link>

      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="web-label mb-5">Say Hello</div>
          <h1 className="font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight mb-4">
            <span className="text-white">Start a</span><br />
            <span className="text-spider">project.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Open to freelance, full-time, and collaborations. Let's build something great.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="web-panel p-8"
        >
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Name</label>
              <input type="text" required placeholder="Peter Parker" className="web-input" />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Email</label>
              <input type="email" required placeholder="hero@marvel.com" className="web-input" />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Message</label>
              <textarea rows={5} required placeholder="Tell me about your vision..." className="web-input resize-none" />
            </div>
            <button type="submit" className="spider-btn w-full justify-center py-4">
              Send Message <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
