"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About",    href: "#about"    },
  { name: "Skills",   href: "#skills"   },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact"  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ["home", ...navLinks.map(l => l.href.slice(1))];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8, 8, 15, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-8 md:px-16 h-[70px]">
          {/* Logo */}
          <Link href="/" className="font-heading font-black text-xl tracking-tight text-foreground hover:text-primary transition-colors">
            JD<span className="text-primary">_</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <Link
                  key={l.name}
                  href={l.href}
                  className="relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200"
                  style={{ color: isActive ? "var(--primary)" : "var(--muted-foreground)" }}
                >
                  {l.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/Joyceson-CV.pdf"
              target="_blank"
              className="hidden md:inline-flex font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300"
            >
              Resume
            </a>
            <button
              className="md:hidden text-foreground p-1 focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(8, 8, 15, 0.98)", backdropFilter: "blur(30px)" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-heading font-black text-5xl text-foreground hover:text-primary transition-colors"
                  >
                    {l.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
