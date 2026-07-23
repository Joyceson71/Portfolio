"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
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
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
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
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          isScrolled ? "py-4" : "py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="#home"
            className="font-heading font-bold text-2xl uppercase tracking-widest text-white hover:text-titan-bronze transition-colors drop-shadow-md"
          >
            JD<span className="text-titan-bronze drop-shadow-[0_0_10px_rgba(193,127,58,0.8)]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-8 px-8 py-3 rounded-[2px] transition-all duration-500 border pointer-events-auto",
              isScrolled ? "bg-obsidian/70 backdrop-blur-md border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent border-transparent"
            )}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative font-cinzel font-bold uppercase tracking-widest text-[11px] transition-colors hover:text-white drop-shadow-sm",
                    isActive
                      ? "text-white"
                      : "text-parchment-dim"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-[14px] left-0 right-0 h-[2px] bg-titan-bronze shadow-[0_0_10px_rgba(193,127,58,0.8)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <a
              href="/Joyceson-CV.pdf"
              target="_blank"
              className="hidden md:flex items-center gap-2 font-cinzel font-bold uppercase text-[10px] tracking-widest px-5 py-2.5 border border-titan-bronze text-titan-bronze hover:bg-titan-bronze hover:text-obsidian transition-all rounded-[2px] hover:shadow-[0_0_15px_rgba(193,127,58,0.5)] bg-obsidian/50 backdrop-blur-sm"
            >
              <FileText className="w-3 h-3" /> Resume
            </a>
            <button
              className="md:hidden text-white hover:text-titan-bronze p-2 focus:outline-none transition-colors drop-shadow-md"
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveSection(link.href);
                    }}
                    className={cn(
                      "font-cinzel font-bold uppercase text-2xl tracking-widest transition-colors",
                      isActive
                        ? "text-titan-bronze drop-shadow-[0_0_10px_rgba(193,127,58,0.5)]"
                        : "text-parchment-dim hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a
                href="/Joyceson-CV.pdf"
                target="_blank"
                className="mt-8 font-cinzel font-bold uppercase text-sm tracking-widest px-8 py-3 border border-titan-bronze text-obsidian bg-titan-bronze rounded-[2px] shadow-[0_0_15px_rgba(193,127,58,0.5)]"
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
