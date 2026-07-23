"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string, email?: string, message?: string} = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative w-full h-[100dvh] pt-20 pb-0 flex flex-col justify-between overflow-hidden bg-background">
      {/* Attack Titan Background Art */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        animate={{ 
          scale: [1, 1.03, 1],
          x: [0, -10, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image 
          src="/images/attack_titan.png" 
          alt="Attack Titan" 
          fill 
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center items-center relative z-10">
        
        <div className="text-center mb-4">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">Get In Touch</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mt-1">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive text-glow">Me</span>
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md glass-card p-5 md:p-6 rounded-2xl glow-border relative"
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-2xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="space-y-1">
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe" 
                className={`bg-black/20 border-white/10 focus-visible:ring-primary h-10 font-mono text-xs ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              />
              {errors.name && <p className="text-destructive text-[10px] font-mono mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className={`bg-black/20 border-white/10 focus-visible:ring-primary h-10 font-mono text-xs ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              />
              {errors.email && <p className="text-destructive text-[10px] font-mono mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <Textarea 
                id="message" 
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello..." 
                className={`bg-black/20 border-white/10 focus-visible:ring-primary min-h-[80px] font-mono text-xs resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              />
              {errors.message && <p className="text-destructive text-[10px] font-mono mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || isSubmitted}
              className="w-full h-10 mt-2 font-heading uppercase tracking-widest text-sm relative overflow-hidden group bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                ) : isSubmitted ? (
                  <><CheckCircle2 className="w-4 h-4" /> Sent</>
                ) : (
                  <><Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Send Message</>
                )}
              </span>
            </Button>
          </form>
        </motion.div>
      </div>

      <footer className="w-full mt-6 border-t border-white/5 bg-background/80 pt-4 pb-4">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="font-heading font-bold text-2xl uppercase tracking-widest text-muted-foreground">
            JD<span className="text-primary">.</span>
          </div>
          
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            "Building the web, one line of code at a time."
          </p>
          
          <div className="flex gap-6">
            <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/joyceson-danielraj" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
