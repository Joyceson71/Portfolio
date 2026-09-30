"use client";

import { motion } from "framer-motion";
import { Contact } from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen px-4 md:px-8 lg:px-12 pt-32 pb-24 flex justify-center items-center">
      <div className="w-full max-w-[800px] flex flex-col gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-black">
            Say <span className="gradient-text-premium">Hello.</span>
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-medium">
            Whether it's a project inquiry or just a quick chat about 3D math, my inbox is always open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-8 md:p-12 w-full"
        >
          <Contact />
        </motion.div>

      </div>
    </main>
  );
}
