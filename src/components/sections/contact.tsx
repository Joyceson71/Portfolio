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
    <>
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <section id="contact" className="relative w-full py-24 md:py-32 flex flex-col justify-center items-center">
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-green-600 tracking-[0.3em] uppercase mb-3"
          >
            $ ./initiate_contact.sh
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Establish</span> <span className="text-gradient-blue">Connection.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-green-700"
          >
            <span className="text-green-500/50">// </span>
            Secure channel available. No logs. No traces. Just results.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 max-w-2xl relative z-10"
        >
          <div className="glass-panel p-8 md:p-12">
            <p className="text-xs text-green-600 font-mono mb-6">/* Send encrypted message */</p>
            <form onSubmit={submit} className="space-y-6" noValidate>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-green-600 uppercase tracking-wider">$ enter name:</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    className="w-full bg-green-950/20 border border-green-900/50 rounded-none px-4 py-3 text-sm font-mono text-green-300 focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-900"
                    placeholder="your_name"
                    style={{ caretColor: "#00ff41" }}
                  />
                  {errors.name && <p className="text-xs text-red-500 font-mono mt-1">[ERR] {errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-green-600 uppercase tracking-wider">$ enter email:</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full bg-green-950/20 border border-green-900/50 rounded-none px-4 py-3 text-sm font-mono text-green-300 focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-900"
                    placeholder="user@domain.tld"
                    style={{ caretColor: "#00ff41" }}
                  />
                  {errors.email && <p className="text-xs text-red-500 font-mono mt-1">[ERR] {errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-green-600 uppercase tracking-wider">$ enter message:</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  className="w-full bg-green-950/20 border border-green-900/50 rounded-none px-4 py-3 text-sm font-mono text-green-300 focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-900 resize-none"
                  placeholder="describe your mission..."
                  style={{ caretColor: "#00ff41" }}
                />
                {errors.message && <p className="text-xs text-red-500 font-mono mt-1">[ERR] {errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2 py-4"
              >
                {submitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border border-green-400/30 border-t-green-400 rounded-full" />
                ) : (
                  <><Send className="w-4 h-4" /> ./send_message.sh</>  
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="w-full mt-32 border-t border-green-900/30 relative z-10 py-12">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-sm font-mono font-bold mb-1" style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.5)" }}>root@j0yceson~#</span>
              <span className="text-xs font-mono text-green-800">// © 2024. All rights reserved. Stay ethical.</span>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Joyceson71" },
                { icon: Linkedin, href: "https://linkedin.com/in/joyceson-danielraj" },
                { icon: Twitter, href: "#" },
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
