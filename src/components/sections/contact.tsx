"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, CheckCircle2, AlertCircle, X,
  Github, Linkedin, Twitter, Mail, MapPin, Clock,
} from "lucide-react";

function Toast({
  msg,
  type,
  onClose,
}: {
  msg: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl"
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      )}
      <span className="text-sm font-semibold text-zinc-200">{msg}</span>
      <button
        onClick={onClose}
        className="ml-2 text-zinc-500 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/Joyceson71", color: "#a855f7" },
  { icon: Linkedin, label: "LinkedIn",  href: "#",                              color: "#06b6d4" },
  { icon: Twitter,  label: "Twitter",   href: "#",                              color: "#f59e0b" },
];

const contactInfo = [
  { icon: Mail,    label: "Email",    value: "joyceson@design.io" },
  { icon: MapPin,  label: "Location", value: "Chennai, India 🇮🇳" },
  { icon: Clock,   label: "Response", value: "Within 24 hours"    },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be 10+ characters";
    setErrors(e);
    return Object.keys(e).length === 0;
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
        setForm({ name: "", email: "", subject: "", message: "" });
        setToast({ msg: "Message sent! I'll get back to you soon.", type: "success" });
      } else {
        const d = await res.json();
        setToast({ msg: d.error ?? "Something went wrong.", type: "error" });
      }
    } catch {
      setToast({ msg: "Network error. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (errors[e.target.id]) setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  return (
    <section id="contact" className="w-full px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-label"
      >
        Get In Touch
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
      >
        Let&apos;s Build Something{" "}
        <span className="gradient-text">Extraordinary</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 text-lg mb-16 max-w-xl"
      >
        Have a project in mind? Whether it&apos;s a wild 3D concept or a full brand
        redesign — I&apos;m here for it. Let&apos;s talk.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact info sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <div className="card p-7 flex flex-col gap-5">
            <h3 className="text-base font-bold text-zinc-300 uppercase tracking-wider">
              Contact Details
            </h3>
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                    {label}
                  </div>
                  <div className="text-sm text-zinc-200 font-semibold">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-7">
            <h3 className="text-base font-bold text-zinc-300 uppercase tracking-wider mb-5">
              Socials
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.05] transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {label}
                  </span>
                  <span className="ml-auto text-zinc-600 group-hover:text-zinc-400 text-sm">→</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={submit}
            noValidate
            className="card p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Jane Smith"
                  className="field"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="jane@company.com"
                  className="field"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 font-medium">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Project Type
              </label>
              <select id="subject" value={form.subject} onChange={onChange} className="field">
                <option value="" disabled>Select a project type...</option>
                <option value="3d-experience">3D Web Experience</option>
                <option value="interactive-site">Interactive Website</option>
                <option value="brand-design">Brand & Identity</option>
                <option value="motion-design">Motion Design</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <p className="text-xs text-red-400 font-medium">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Project Brief
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                placeholder="Tell me about your vision, timeline, and budget range..."
                className="field resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-400 font-medium">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary justify-center w-full mt-2"
            >
              {submitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
