import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joyceson — 3D Web Designer & Creative Developer",
  description:
    "Award-winning 3D web designer crafting immersive digital experiences with Three.js, WebGL, and cutting-edge creative technology.",
  keywords: ["3D Web Design", "WebGL", "Three.js", "Creative Developer", "Portfolio"],
  openGraph: {
    title: "Joyceson — 3D Web Designer",
    description: "Immersive 3D web experiences, crafted with passion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${mono.variable} font-sans bg-[#09090b] text-[#fafafa] antialiased overflow-x-hidden`}
      >
        {/* Ambient background blobs */}
        <div className="blob-purple top-[-200px] left-[-200px]" />
        <div className="blob-cyan bottom-[10%] right-[-100px]" />

        {/* Floating top navigation */}
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
          <nav className="nav-pill px-6 py-3 flex items-center gap-2 sm:gap-6">
            <a
              href="#hero"
              className="text-sm font-bold gradient-text"
            >
              JD
            </a>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            {["Work", "About", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <a
              href="#contact"
              className="hidden sm:inline-flex btn-primary !py-2 !px-5 !text-xs"
            >
              Hire Me
            </a>
          </nav>
        </header>

        {children}

        <footer className="border-t border-white/5 py-10 text-center">
          <p className="text-zinc-500 text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="gradient-text font-bold">Joyceson Danielraj</span>
            {" "}— Crafted with Three.js & Next.js
          </p>
        </footer>
      </body>
    </html>
  );
}
