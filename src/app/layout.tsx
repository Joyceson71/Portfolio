import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
      <body className={`${inter.variable} font-sans antialiased relative min-h-screen flex flex-col`}>
        <div className="mesh-bg-light" />
        
        {/* Navigation / Header */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <nav className="glass-pill px-6 py-3 flex items-center gap-8">
            <Link href="/" className="text-sm font-black text-black">JD.</Link>
            <div className="w-px h-4 bg-black/10" />
            <Link href="/work" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">Work</Link>
            <Link href="/about" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-semibold text-black/60 hover:text-black transition-colors">Contact</Link>
          </nav>
        </header>

        <div className="flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="w-full py-12 text-center text-sm font-medium text-black/40 mt-auto">
          <p>© {new Date().getFullYear()} Joyceson Danielraj. Crafted with Three.js & Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
