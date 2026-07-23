"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.substring(1));
      let current = "#home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = `#${section}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          borderBottom: '1px solid var(--border-glow)',
          backgroundColor: isScrolled ? 'rgba(10, 10, 15, 0.9)' : 'var(--bg-primary)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-300",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="#home"
            style={{ 
              fontFamily: 'var(--font-cinzel-dec)', 
              color: 'var(--accent-bronze)',
              fontSize: '1.4rem'
            }}
            className="font-bold hover:opacity-80 transition-opacity"
          >
            JD.
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}
                  className="relative uppercase font-bold transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{ backgroundColor: 'var(--accent-bronze)' }}
                      className="absolute -bottom-2 left-0 right-0 h-[2px]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="/Joyceson-CV.pdf"
              target="_blank"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--accent-bronze)'
              }}
              className="hidden md:inline-block uppercase font-bold px-6 py-2 rounded-sm hover:bg-[var(--accent-gold)] hover:-translate-y-[2px] transition-all"
            >
              Resume
            </a>
            
            <button
              style={{ color: 'var(--text-primary)' }}
              className="md:hidden hover:text-[var(--accent-bronze)] p-2 focus:outline-none transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'var(--bg-primary)' }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-6 right-6 p-2"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-primary)' }}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveSection(link.href);
                    }}
                    style={{
                      fontFamily: 'var(--font-cinzel-dec)',
                      color: activeSection === link.href ? 'var(--accent-bronze)' : 'var(--text-primary)'
                    }}
                    className="text-4xl uppercase tracking-widest hover:text-[var(--accent-bronze)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <a
                  href="/Joyceson-CV.pdf"
                  target="_blank"
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    backgroundColor: 'var(--accent-bronze)',
                    color: 'var(--bg-primary)'
                  }}
                  className="inline-block mt-8 text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-sm"
                >
                  Resume
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
