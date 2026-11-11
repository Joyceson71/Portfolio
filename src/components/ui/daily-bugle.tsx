"use client";

import { motion } from "framer-motion";
import { Star, Newspaper, CheckCircle2 } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";
import { useStore } from "@/lib/store";
import { REVIEWS } from "@/lib/constants";

export function DailyBugleReviews() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);

  return (
    <div className="space-y-6">
      {/* Daily Bugle Hologram Header banner */}
      <div 
        className="p-4 md:p-6 bg-[#100808]/90 border rounded-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
        style={{ borderColor: "var(--skin-primary, #CC0000)55" }}
      >
        <div className="flex items-center gap-3">
          <Newspaper className="w-8 h-8 shrink-0" style={{ color: "var(--skin-primary, #CC0000)" }} />
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="font-mono text-xs font-bold tracking-widest uppercase"
                style={{ color: "var(--skin-primary, #CC0000)" }}
              >
                THE DAILY BUGLE EXCLUSIVE
              </span>
              <span 
                className="text-black text-[9px] font-black uppercase px-1.5 py-0.2 rounded-xs"
                style={{ background: "var(--skin-primary, #CC0000)" }}
              >
                VERIFIED
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              SPECIAL REPORT: THE WEB-SLINGER'S TRACK RECORD
            </h3>
          </div>
        </div>

        <div className="font-mono text-xs text-white/50 border-l-0 md:border-l border-white/10 md:pl-4">
          <p className="text-white/80 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% SATISFACTION RATE</span>
          </p>
          <p className="text-[10px]">ALL REVIEWS CROSS-EXAMINED BY J. JONAH JAMESON</p>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev, i) => (
          <motion.div
            key={rev.id}
            whileHover={{ y: -6 }}
            onMouseEnter={() => { if (sfxEnabled) spiderAudio.playBlip(600 + i * 50, 0.04); }}
            className="web-panel p-6 rounded-sm flex flex-col justify-between hover:border-[var(--skin-primary,#CC0000)]/60 transition-all duration-300 relative group shadow-lg"
          >
            <div>
              {/* Star rating & date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.rating }).map((_, s) => (
                    <Star 
                      key={s} 
                      className="w-3.5 h-3.5" 
                      style={{ fill: "var(--skin-primary, #CC0000)", color: "var(--skin-primary, #CC0000)" }} 
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-white/40">{rev.date}</span>
              </div>

              <h4 className="font-bold text-sm text-white mb-3 group-hover:text-[var(--skin-primary,#CC0000)] transition-colors leading-snug">
                {rev.headline}
              </h4>

              <p className="text-white/60 text-xs leading-relaxed mb-6 italic">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{rev.name}</p>
                <p className="font-mono text-[10px] text-white/40">{rev.role} · {rev.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
