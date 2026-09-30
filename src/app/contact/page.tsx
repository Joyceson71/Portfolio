"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen px-6 pt-32 pb-24 max-w-2xl mx-auto flex flex-col justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
      >
        Start a Project.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-white/50 mb-12"
      >
        I'm currently available for freelance work. Drop me a line.
      </motion.p>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="dark-card p-8 flex flex-col gap-6"
        onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}
      >
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Name</label>
          <input type="text" className="input-dark" required placeholder="John Doe" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Email</label>
          <input type="email" className="input-dark" required placeholder="john@example.com" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Message</label>
          <textarea className="input-dark resize-none" rows={4} required placeholder="Tell me about your vision..."></textarea>
        </div>
        <button type="submit" className="btn-outline w-full mt-2">
          Send Message
        </button>
      </motion.form>
    </main>
  );
}
