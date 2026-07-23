"use client";

import { useState, useRef } from "react";
import { Mail } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import dynamic from "next/dynamic";

const ContactScene = dynamic(() => import("@/components/three/ContactScene"), {
  ssr: false,
});

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");

    // Simulate dispatch and open mailto
    setTimeout(() => {
      setStatus("success");
      
      const mailtoLink = `mailto:joycesondanielraj@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
    }, 1000);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-secondary)',
        padding: '6rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ContactScene />
      </div>

      <div className={`container mx-auto max-w-6xl fade-up relative z-10 ${isVisible ? 'in-view' : ''}`}>
        
        {/* Section Label */}
        <div 
          style={{ 
            fontFamily: 'var(--font-cinzel)', 
            color: 'var(--accent-bronze)',
            letterSpacing: '0.2em'
          }}
          className="uppercase font-bold mb-12"
        >
          Contact Protocol
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Info Column */}
          <div>
            <h3 
              style={{
                fontFamily: 'var(--font-cinzel-dec)',
                fontSize: '2rem',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}
            >
              Let&apos;s build something <span style={{ color: 'var(--accent-bronze)' }}>exceptional.</span>
            </h3>
            
            <p 
              style={{ 
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: '2.5rem'
              }}
            >
              Currently open for new opportunities. Whether you have a question, a project proposal, or just want to connect — my inbox is always open.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: Mail, label: "joycesondanielraj@gmail.com", href: "mailto:joycesondanielraj@gmail.com" },
                { icon: GithubIcon, label: "github.com/Joyceson71", href: "https://github.com/Joyceson71" },
                { icon: LinkedinIcon, label: "linkedin.com/in/joyceson-danielraj", href: "https://linkedin.com/in/joyceson-danielraj" }
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      transition: 'all 0.3s'
                    }}
                    className="group-hover:border-[var(--accent-bronze)] group-hover:text-[var(--accent-bronze)]"
                  >
                    <item.icon size={18} />
                  </div>
                  <span 
                    style={{ 
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s'
                    }}
                    className="group-hover:text-[var(--accent-bronze)]"
                  >
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div>
            <form 
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.4rem'
              }}
            >
              {status === "success" && (
                <div 
                  style={{
                    backgroundColor: 'rgba(42,122,106,0.15)',
                    border: '1px solid rgba(42,122,106,0.3)',
                    color: 'var(--accent-teal)',
                    padding: '1rem 1.5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}
                  className="fade-up in-view"
                >
                  Message dispatched successfully. Opening mail client...
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="name"
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Eren Yeager"
                  style={{
                    backgroundColor: 'rgba(26,26,46,0.6)',
                    border: `1px solid ${errors.name ? 'var(--accent-blood)' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                    padding: '0.9rem 1.2rem',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => { if(!errors.name) e.currentTarget.style.borderColor = 'rgba(193,127,58,0.5)' }}
                  onBlur={(e) => { if(!errors.name) e.currentTarget.style.borderColor = 'var(--border-color)' }}
                />
                {errors.name && (
                  <span style={{ color: 'var(--accent-blood)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="email"
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="eren@surveycorps.com"
                  style={{
                    backgroundColor: 'rgba(26,26,46,0.6)',
                    border: `1px solid ${errors.email ? 'var(--accent-blood)' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                    padding: '0.9rem 1.2rem',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => { if(!errors.email) e.currentTarget.style.borderColor = 'rgba(193,127,58,0.5)' }}
                  onBlur={(e) => { if(!errors.email) e.currentTarget.style.borderColor = 'var(--border-color)' }}
                />
                {errors.email && (
                  <span style={{ color: 'var(--accent-blood)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="message"
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="State your coordinates and mission objective..."
                  style={{
                    backgroundColor: 'rgba(26,26,46,0.6)',
                    border: `1px solid ${errors.message ? 'var(--accent-blood)' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                    padding: '0.9rem 1.2rem',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9rem',
                    minHeight: '120px',
                    transition: 'border-color 0.3s',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => { if(!errors.message) e.currentTarget.style.borderColor = 'rgba(193,127,58,0.5)' }}
                  onBlur={(e) => { if(!errors.message) e.currentTarget.style.borderColor = 'var(--border-color)' }}
                />
                {errors.message && (
                  <span style={{ color: 'var(--accent-blood)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  backgroundColor: status === "submitting" ? 'var(--text-muted)' : 'var(--accent-bronze)',
                  color: 'var(--bg-primary)',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: status === "submitting" ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s'
                }}
                className={status !== "submitting" ? "hover:bg-[var(--accent-gold)] hover:-translate-y-[2px]" : ""}
              >
                {status === "submitting" ? "Dispatching..." : "Send Transmission"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
