"use client";

import { motion } from "framer-motion";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen px-4 md:px-8 lg:px-12 pt-32 pb-24 flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-black">
            Behind the <span className="gradient-text-premium">Pixels</span>
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-medium">
            Bridging the gap between design and engineering to create memorable digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-12"
          >
            <About />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-12"
          >
            <Skills />
          </motion.div>

        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="glass-card p-12 mt-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Ready to collaborate?</h2>
          <p className="text-black/60 mb-8 max-w-lg mx-auto">
            I'm currently accepting new projects. Let's discuss how we can bring your next idea to life in full 3D.
          </p>
          <Link href="/contact" className="btn-premium">Get In Touch</Link>
        </motion.div>
      </div>
    </main>
  );
}
