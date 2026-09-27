"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      className="fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-5 py-3.5 border font-mono text-sm"
      style={{
        background: "var(--surface)",
        borderColor: type === "success" ? "var(--crystal)" : "var(--prism)",
        color: type === "success" ? "var(--crystal)" : "var(--prism)",
        boxShadow: type === "success"
          ? "0 0 30px rgba(0,212,255,0.2)"
          : "0 0 30px rgba(255,45,120,0.2)",
      }}
    >
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      <span className="text-xs tracking-wide">{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0,212,255,0.06), transparent 70%)`;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Name too short";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message || form.message.trim().length < 10) e.message = "Message too short";
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
        setToast({ msg: "Message sent! I'll reply soon.", type: "success" });
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

  const fieldCls = (field: string) =>
    `w-full bg-transparent border-b py-3 font-sans text-sm text-white placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--crystal)] transition-colors duration-300 ${
      errors[field] ? "border-[var(--prism)]" : "border-white/10"
    }`;

  return (
    <>
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <section id="contact" className="relative w-full min-h-screen flex flex-col overflow-hidden">
        {/* Ghost number */}
        <span className="section-num right-[-2vw] bottom-[5%]">05</span>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 relative z-10">
          {/* Left — info panel */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-32 border-r border-white/5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-16"
            >
              <div className="h-px w-12" style={{ background: "var(--signal)" }} />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--signal)" }}>
                Contact
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-[clamp(2.5rem,5vw,4rem)] leading-[1.0] tracking-tight text-white mb-8"
            >
              Let's build<br />
              <span className="text-prism">something.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-base text-[var(--muted-foreground)] max-w-sm leading-relaxed mb-16"
            >
              Open to freelance projects, full-time roles, and collaborations. If you have an interesting challenge, let's talk.
            </motion.p>

            {/* Social links */}
            <div className="flex gap-6">
              {[
                { icon: FaGithub,  href: "https://github.com/Joyceson71",                label: "GitHub"   },
                { icon: FaLinkedin, href: "https://linkedin.com/in/joyceson-danielraj", label: "LinkedIn" },
                { icon: FaTwitter,  href: "#",                                           label: "Twitter"  },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="flex items-center justify-center w-10 h-10 border border-white/10 text-[var(--muted-foreground)] hover:border-[var(--crystal)] hover:text-[var(--crystal)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mouseX.set(e.clientX - r.left);
              mouseY.set(e.clientY - r.top);
            }}
            className="relative flex items-center justify-center px-8 md:px-16 py-32 overflow-hidden"
          >
            <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

            <form onSubmit={submit} className="w-full max-w-md space-y-10 relative z-10" noValidate>
              {[
                { id: "name",    label: "Name",    type: "text",  placeholder: "John Doe"          },
                { id: "email",   label: "Email",   type: "email", placeholder: "john@example.com"  },
              ].map((f) => (
                <div key={f.id} className="space-y-1">
                  <label htmlFor={f.id} className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    value={form[f.id as keyof typeof form]}
                    onChange={onChange}
                    placeholder={f.placeholder}
                    className={fieldCls(f.id)}
                  />
                  {errors[f.id] && (
                    <p className="flex items-center gap-1 font-mono text-[10px] mt-1" style={{ color: "var(--prism)" }}>
                      <AlertCircle className="w-3 h-3" /> {errors[f.id]}
                    </p>
                  )}
                </div>
              ))}

              <div className="space-y-1">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`${fieldCls("message")} resize-none`}
                />
                {errors.message && (
                  <p className="flex items-center gap-1 font-mono text-[10px] mt-1" style={{ color: "var(--prism)" }}>
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 font-mono text-xs uppercase tracking-[0.2em] text-black font-semibold flex items-center justify-center gap-3 overflow-hidden group"
                style={{ background: "var(--crystal)" }}
              >
                {submitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                  />
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <span className="font-heading font-black text-lg text-white tracking-tight">
            JD<span style={{ color: "var(--crystal)" }}>_</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
            © 2024 Joyceson Danielraj · Built with Next.js 16
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--crystal)" }}>
            Available for work
          </span>
        </footer>
      </section>
    </>
  );
}
