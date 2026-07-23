"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const ContactScene = dynamic(() => import("@/components/three/ContactScene").then(m => m.ContactScene), { ssr: false });

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });
  
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
    
    // Dispatch custom event for 3D Scene
    window.dispatchEvent(new Event("contact-submit"));
    
    // mailto action
    setTimeout(() => {
      window.location.href = `mailto:joycesondanielraj21@gmail.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AReply to: ${formData.email}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFocus = () => window.dispatchEvent(new Event("contact-focus"));
  const handleBlur = () => window.dispatchEvent(new Event("contact-blur"));

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-obsidian pt-16"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ContactScene />
      </div>

      <div 
        className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          
          {/* Left Column - Contact Details */}
          <div className="pointer-events-auto bg-obsidian/40 p-8 rounded-[2px] backdrop-blur-sm border border-white/5 shadow-2xl">
            <div className="mb-8">
              <span className="font-cinzel text-sm tracking-[0.3em] text-titan-bronze uppercase shadow-titan">
                Commence Operations
              </span>
              <div className="w-[60px] h-[1px] bg-titan-bronze mt-2 mb-4 shadow-[0_0_10px_rgba(193,127,58,0.8)]" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-6 drop-shadow-md">
                Establish <span className="text-titan-bronze">Comms</span>
              </h2>
              <p className="text-parchment-dim font-sans font-light leading-relaxed max-w-md">
                Whether you have a question, a project proposal, or just want to say hello, my inbox is open. I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border bg-smoke/80 text-titan-bronze backdrop-blur-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-parchment-dim drop-shadow-sm">Email</div>
                  <a href="mailto:joycesondanielraj21@gmail.com" className="font-sans text-white hover:text-titan-bronze transition-colors drop-shadow-md">
                    joycesondanielraj21@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-border bg-smoke/80 text-titan-bronze backdrop-blur-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-parchment-dim drop-shadow-sm">Location</div>
                  <div className="font-sans text-white drop-shadow-md">
                    India (IST / UTC+5:30)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="pointer-events-auto bg-smoke/60 backdrop-blur-md p-8 border border-white/10 rounded-[2px] relative shadow-2xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-titan-bronze z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-titan-bronze z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-titan-bronze z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-titan-bronze z-20 pointer-events-none" />
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-teal/20 border border-teal flex items-center gap-3 text-white backdrop-blur-sm shadow-[0_0_15px_rgba(42,122,106,0.3)]">
                <CheckCircle2 className="w-5 h-5 text-teal" />
                <span className="font-cinzel text-sm uppercase tracking-wider font-bold">Message deployed successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-parchment-dim drop-shadow-sm">Name</label>
                <input 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Eren Yeager" 
                  className={`w-full bg-obsidian/80 backdrop-blur-sm border px-4 py-3 font-sans text-white outline-none transition-colors duration-300 ${errors.name ? 'border-blood focus:border-blood' : 'border-border focus:border-titan-bronze shadow-inner'}`}
                />
                {errors.name && <p className="text-blood text-[10px] font-cinzel mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-parchment-dim drop-shadow-sm">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="eren@scout.reg" 
                  className={`w-full bg-obsidian/80 backdrop-blur-sm border px-4 py-3 font-sans text-white outline-none transition-colors duration-300 ${errors.email ? 'border-blood focus:border-blood' : 'border-border focus:border-titan-bronze shadow-inner'}`}
                />
                {errors.email && <p className="text-blood text-[10px] font-cinzel mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-parchment-dim drop-shadow-sm">Message</label>
                <textarea 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Mission details..." 
                  className={`w-full bg-obsidian/80 backdrop-blur-sm border px-4 py-3 min-h-[120px] font-sans text-white outline-none transition-colors duration-300 resize-none ${errors.message ? 'border-blood focus:border-blood' : 'border-border focus:border-titan-bronze shadow-inner'}`}
                />
                {errors.message && <p className="text-blood text-[10px] font-cinzel mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-titan-bronze text-obsidian font-cinzel font-bold uppercase tracking-[0.2em] text-sm py-4 rounded-[2px] hover:bg-gold hover:shadow-[0_0_20px_rgba(193,127,58,0.5)] transition-all duration-300 mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <><CheckCircle2 className="w-4 h-4" /> Sent</>
                ) : (
                  <><Send className="w-4 h-4" /> Transmit</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
