import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Joyceson — Spatial Designer",
  description: "A breathtaking spatial web experience.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white flex flex-col min-h-screen`}>
        
        {/* Navigation for subpages - Homepage has its own overlay */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none mix-blend-difference">
          <div className="flex justify-between items-center pointer-events-auto">
            <Link href="/" className="text-white font-bold text-xl tracking-tighter">JOYCESON.</Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/work" className="nav-link">Work</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
