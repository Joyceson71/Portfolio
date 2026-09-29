"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "about.txt",    href: "#about"    },
  { name: "skills.log",   href: "#skills"   },
  { name: "projects/",   href: "#projects" },
  { name: "contact.sh",  href: "#contact"  },
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
            background: scrolled ? "rgba(0, 12, 0, 0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            border: scrolled ? "1px solid rgba(0,255,65,0.15)" : "1px solid transparent",
            borderRadius: scrolled ? "0px" : "0px",
            padding: scrolled ? "0.5rem 1.5rem" : "1rem 2rem",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="font-mono font-bold text-base tracking-tight hover:opacity-80 transition-opacity" style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.6)" }}>
            root@<span style={{ color: "#00cc33" }}>j0yceson</span><span style={{ color: "rgba(0,255,65,0.5)" }}>~#</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-xs font-mono text-green-700 hover:text-green-400 transition-colors tracking-wider"
              >
                ./{l.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/Joyceson-CV.pdf"
              target="_blank"
              className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 !text-xs"
            >
              ./resume.pdf
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#030a03]/98 backdrop-blur-2xl"
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
                    className="text-2xl font-mono text-green-600 hover:text-green-400 transition-colors"
                    style={{ textShadow: "0 0 10px rgba(0,255,65,0.5)" }}
                  >
                    $ ./{l.name}
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
