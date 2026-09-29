"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, User, Cpu, FolderOpen, Mail, Menu, X, Shield } from "lucide-react";

const navItems = [
  { id: "home",     icon: Terminal,   label: "~",          cmd: "home"     },
  { id: "about",    icon: User,       label: "about.md",   cmd: "cat about.md" },
  { id: "skills",   icon: Cpu,        label: "skills.log", cmd: "skills --list" },
  { id: "projects", icon: FolderOpen, label: "projects/",  cmd: "ls -la projects" },
  { id: "contact",  icon: Mail,       label: "contact.sh", cmd: "./contact.sh" },
];

export function Sidebar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-green-900/40">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-green-400" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,65,0.8))" }} />
          <span className="text-xs font-mono text-green-400 font-bold tracking-widest">J0YCESON</span>
        </div>
        <p className="text-[10px] font-mono text-green-800">Ethical Hacker &amp; Sec. Researcher</p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-mono text-green-700">ONLINE · {time}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[9px] font-mono text-green-900 uppercase tracking-widest px-2 mb-3">filesystem</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono transition-all group relative ${
                isActive
                  ? "text-green-400 bg-green-400/8"
                  : "text-green-800 hover:text-green-500 hover:bg-green-400/4"
              }`}
              style={isActive ? { boxShadow: "inset 3px 0 0 #00ff41" } : {}}
            >
              {isActive && (
                <span className="absolute inset-0 bg-green-400/5 pointer-events-none" />
              )}
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <div className="min-w-0">
                <div className="truncate">{item.label}</div>
                {isActive && (
                  <div className="text-[9px] text-green-700 truncate mt-0.5">$ {item.cmd}</div>
                )}
              </div>
              {isActive && <span className="ml-auto text-green-600">●</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-green-900/40">
        <a
          href="/Joyceson-CV.pdf"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-mono border border-green-900/50 text-green-700 hover:border-green-500 hover:text-green-400 transition-all"
        >
          <Terminal className="w-3 h-3" />
          ./download_cv.sh
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-[200] md:hidden w-9 h-9 flex items-center justify-center bg-[#030a03] border border-green-900/50 text-green-500"
        aria-label="Menu"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-56 flex-col bg-[#030a03]/95 border-r border-green-900/40 z-50 backdrop-blur-xl">
        <NavContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -224 }}
            animate={{ x: 0 }}
            exit={{ x: -224 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed top-0 left-0 h-full w-56 flex flex-col bg-[#030a03] border-r border-green-900/40 z-[100]"
          >
            <NavContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[90] bg-black/70 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
