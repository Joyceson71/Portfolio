"use client";

import { motion } from "framer-motion";
import { Star, Quote, Newspaper, CheckCircle2 } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

interface Review {
  headline: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const reviews: Review[] = [
  {
    headline: "“HE DELIVERED 60 FPS 3D WEBSITES OVERNIGHT!”",
    quote: "Joyceson took our sluggish dashboard and transformed it into a buttery-smooth, visually spectacular experience. The attention to micro-animations and zero-latency state rendering is unmatched.",
    author: "Alex Rivera",
    role: "VP of Engineering",
    company: "SaaS Scaleout",
    rating: 5,
  },
  {
    headline: "“A REAL-LIFE WEB SLINGER IN FRONTEND CODE.”",
    quote: "Working with Joyceson felt like watching Spider-Man swing between rooftops. Complex React 19 concurrent features and Three.js scenes were integrated cleanly ahead of schedule.",
    author: "Elena Rostova",
    role: "Product Design Director",
    company: "Hyperion Labs",
    rating: 5,
  },
  {
    headline: "“LIGHTHOUSE SCORE WENT FROM 42 TO 99.”",
    quote: "His mastery over Next.js App Router, bundle splitting, and SEO best practices doubled our conversion rates within weeks. A true craftsperson of the modern web.",
    author: "Marcus Chen",
    role: "Founder & CTO",
    company: "Venture Pulse",
    rating: 5,
  },
];

export function DailyBugleReviews() {
  return (
    <div className="space-y-6">
      {/* Daily Bugle Hologram Header banner */}
      <div className="p-4 md:p-6 bg-[#100808] border border-[#CC0000]/40 rounded-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-[#CC0000] shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#CC0000] tracking-widest uppercase">
                THE DAILY BUGLE EXCLUSIVE
              </span>
              <span className="bg-[#CC0000] text-black text-[9px] font-black uppercase px-1.5 py-0.2 rounded-xs">
                VERIFIED
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              SPECIAL REPORT: THE WEB-SLINGER'S TRACK RECORD
            </h3>
          </div>
        </div>

        <div className="font-mono text-xs text-white/50 border-l-0 md:border-l border-white/10 md:pl-4">
          <p className="text-white/80 font-bold">100% SATISFACTION RATE</p>
          <p className="text-[10px]">ALL REVIEWS CROSS-EXAMINED BY J. JONAH JAMESON</p>
        </div>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            onMouseEnter={() => spiderAudio.playBlip(600 + i * 60, 0.04)}
            className="web-panel p-6 rounded-sm flex flex-col justify-between hover:border-[#CC0000]/60 transition-all duration-300 relative group"
          >
            <div>
              {/* Star rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rev.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#CC0000] text-[#CC0000]" />
                ))}
              </div>

              <h4 className="font-bold text-sm text-white mb-3 group-hover:text-[#CC0000] transition-colors">
                {rev.headline}
              </h4>

              <p className="text-white/60 text-xs leading-relaxed mb-6 italic">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{rev.author}</p>
                <p className="font-mono text-[10px] text-white/40">{rev.role} · {rev.company}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#0047FF]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
