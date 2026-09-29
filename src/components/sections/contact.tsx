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
    <div className="w-full h-full flex flex-col p-4 text-slate-200">
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
          Get in Touch
        </h2>
        <p className="text-sm text-slate-400">
          Have a project in mind? Let's build something incredible together.
        </p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <form onSubmit={submit} className="space-y-4" noValidate>
          
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="w-full bg-slate-900/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full bg-slate-900/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              placeholder="jane@example.com"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
            <textarea
              id="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              className="w-full bg-slate-900/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 resize-none"
              placeholder="How can I help you?"
            />
            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            {submitting ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <>Send Message <Send className="w-4 h-4" /></>  
            )}
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-6">
          <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
    </div>
  );
}
