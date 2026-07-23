"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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
            href="/"
            className="font-heading font-bold text-2xl uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            JD<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-500",
              isScrolled ? "glass" : "bg-transparent"
            )}
          >
            {navLinks.map((link) => {
              const isActive = false; // Disable pathname matching for hash links
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative font-heading uppercase tracking-widest text-sm transition-colors hover:text-foreground",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary glow-border"
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
              className="hidden md:flex items-center gap-2 font-heading uppercase text-xs tracking-widest px-5 py-2.5 border border-primary text-foreground hover:bg-primary/20 transition-all rounded-sm glow-border"
            >
              <FileText className="w-4 h-4" /> Resume
            </a>
            <button
              className="md:hidden text-foreground p-2 focus:outline-none"
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => {
                const isActive = false;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-heading uppercase text-3xl tracking-widest transition-colors",
                      isActive
                        ? "text-primary text-glow"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a
                href="/Joyceson-CV.pdf"
                target="_blank"
                className="mt-8 font-heading uppercase text-xl tracking-widest px-8 py-3 border border-primary text-foreground bg-primary/10 rounded-sm glow-border"
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
