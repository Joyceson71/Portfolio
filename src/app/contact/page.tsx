"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { spiderAudio } from "@/lib/spider-audio";

export default function ContactPage() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: "" }), // honeypot empty
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Unknown error occurred.");
        return;
      }
      if (sfxEnabled) spiderAudio.playWebShoot();
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }, [form, sfxEnabled]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("joycesondanielraj71@gmail.com");
    if (sfxEnabled) spiderAudio.playBlip(900, 0.05);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#080810] px-6 md:px-16 py-24 md:py-28 flex flex-col justify-center text-white overflow-hidden">
      {/* Background glow */}
      <div 
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--skin-primary, #CC0000) 0%, transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <Link 
          href="/" 
          onClick={() => { if (sfxEnabled) spiderAudio.playBlip(700, 0.02); }}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[var(--skin-primary,#CC0000)] transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Base
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="web-label mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[var(--skin-primary,#CC0000)]" />
            <span>Direct Transmission</span>
          </div>
          <h1 className="font-bold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.9] tracking-tight mb-4">
            <span>Fire up a</span><br />
            <span style={{ color: "var(--skin-primary, #CC0000)" }}>conversation.</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
            Available for full-stack engineering, Three.js 3D contracts, and technical consulting.
            Send a transmission or reach out directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="p-8 md:p-10 rounded-sm bg-[#0c0c18]/90 border border-white/[0.08] shadow-2xl relative"
        >
          {/* Cyber corner accents */}
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--skin-primary,#CC0000)]" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--skin-primary,#CC0000)]" />

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">🕷️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Transmission Received!</h2>
              <p className="text-white/60 font-mono text-sm max-w-md mx-auto">
                Your message has been dispatched directly. Joyceson will get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-page-name" className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    Your Name // Alias
                  </label>
                  <input
                    id="contact-page-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Peter Parker"
                    className="web-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-page-email" className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    Email Channel
                  </label>
                  <input
                    id="contact-page-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="peter@dailybugle.com"
                    className="web-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-page-msg" className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Mission Brief // Message
                </label>
                <textarea
                  id="contact-page-msg"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the project, timeline, and stack requirements..."
                  className="web-input resize-none"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="spider-btn w-full justify-center py-4 cursor-pointer"
              >
                {status === "sending" ? "Transmitting..." : "Send Transmission"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}

          <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>DIRECT DISPATCH: joycesondanielraj71@gmail.com</span>
            </span>
            <button 
              onClick={handleCopyEmail} 
              style={{ color: "var(--skin-primary,#CC0000)" }} 
              className="hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
