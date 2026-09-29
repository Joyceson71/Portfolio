"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, X, Github, Linkedin, Twitter } from "lucide-react";

function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-full glass-panel shadow-2xl"
    >
      {type === "success" ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
      <span className="text-sm font-medium">{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.message || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        setToast({ msg: "Message sent successfully.", type: "success" });
      } else {
        const d = await res.json();
        setToast({ msg: d.error ?? "Something went wrong.", type: "error" });
      }
    } catch {
      setToast({ msg: "Network error. Try again.", type: "error" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (errors[e.target.id]) setErrors(prev => ({ ...prev, [e.target.id]: "" }));
  };

  return (
    <div className="w-full h-full flex flex-col font-mono text-gray-300">
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
      
      <div className="border-b border-[var(--color-border)] pb-2 mb-4">
        <h3 className="text-xl font-bold tracking-tight text-[var(--cyber-cyan)] uppercase">
          Comm_Link_
        </h3>
      </div>

      <div className="max-w-md mx-auto w-full mt-4">
        <form onSubmit={submit} className="space-y-4" noValidate>
          
          <div className="space-y-1">
            <label htmlFor="name" className="text-[10px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest">[ Identify ]</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="w-full bg-black/50 border border-[var(--color-border)] px-4 py-2 text-xs text-[var(--cyber-cyan)] focus:outline-none focus:border-[var(--cyber-cyan)] focus:bg-[var(--cyber-cyan)]/10 transition-colors placeholder:text-gray-700 font-mono"
              placeholder="GUEST_USER"
            />
            {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="email" className="text-[10px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest">[ Ping_Address ]</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full bg-black/50 border border-[var(--color-border)] px-4 py-2 text-xs text-[var(--cyber-cyan)] focus:outline-none focus:border-[var(--cyber-cyan)] focus:bg-[var(--cyber-cyan)]/10 transition-colors placeholder:text-gray-700 font-mono"
              placeholder="user@node.local"
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-[10px] font-bold text-[var(--cyber-pink)] uppercase tracking-widest">[ Payload ]</label>
            <textarea
              id="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              className="w-full bg-black/50 border border-[var(--color-border)] px-4 py-2 text-xs text-[var(--cyber-cyan)] focus:outline-none focus:border-[var(--cyber-cyan)] focus:bg-[var(--cyber-cyan)]/10 transition-colors placeholder:text-gray-700 font-mono resize-none"
              placeholder="Enter data sequence..."
            />
            {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="cyber-btn w-full mt-4 text-xs"
          >
            {submitting ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border border-[var(--cyber-cyan)]/30 border-t-[var(--cyber-cyan)] rounded-full" />
            ) : (
              <>Transmit_Data</>  
            )}
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-4">
          <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center bg-[var(--cyber-cyan)]/10 border border-[var(--color-border)] text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)] hover:text-black transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center bg-[var(--cyber-cyan)]/10 border border-[var(--color-border)] text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)] hover:text-black transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center bg-[var(--cyber-cyan)]/10 border border-[var(--color-border)] text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)] hover:text-black transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
