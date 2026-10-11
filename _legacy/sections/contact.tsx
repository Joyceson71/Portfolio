"use client";

import { useState } from "react";
import { Send, Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulation
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitting(false);
      alert("Message sent successfully!");
    }, 1500);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold tracking-tight text-black mb-6">Let's Talk</h2>
      <p className="text-black/60 text-base mb-8">
        Have a 3D web project in mind? Or just want to say hi? I'd love to hear from you.
      </p>

      <form onSubmit={submit} className="flex flex-col gap-4 flex-1">
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={onChange}
          placeholder="Your Name"
          required
          className="input-premium"
        />
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email Address"
          required
          className="input-premium"
        />
        <textarea
          id="message"
          value={form.message}
          onChange={onChange}
          placeholder="Project Details"
          required
          rows={3}
          className="input-premium resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-premium w-full mt-2"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-black/[0.05]">
        <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/10 transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/10 transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/10 transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
