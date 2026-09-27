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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4 transition-all duration-500">
        <motion.div
          animate={{
            width: scrolled ? "800px" : "100%",
            maxWidth: "1200px",
            background: scrolled ? "rgba(25, 25, 25, 0.7)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
            borderRadius: scrolled ? "24px" : "0px",
            padding: scrolled ? "0.5rem 1.5rem" : "1rem 2rem",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="font-semibold text-lg tracking-tight text-white hover:opacity-80 transition-opacity">
            Joyceson<span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/Joyceson-CV.pdf"
              target="_blank"
              className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-xs"
            >
              Resume
            </a>
            <button
              className="md:hidden text-white p-1 focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-semibold text-white/80 hover:text-white transition-colors"
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
