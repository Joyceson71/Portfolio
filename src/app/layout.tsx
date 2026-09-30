import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Joyceson — 3D Web Designer",
  description: "Crafting beautiful 3D web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased relative min-h-screen`}>
        <div className="mesh-bg-light" />
        
        {/* Navigation / Header */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <nav className="glass-pill px-6 py-3 flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">About</a>
            <a href="#projects" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">Work</a>
            <a href="#contact" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">Contact</a>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
