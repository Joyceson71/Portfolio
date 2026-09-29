import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { SceneProvider } from "@/components/3d/scene";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Joyceson Danielraj — Ethical Hacker & Security Researcher",
  description: "Portfolio of Joyceson Danielraj — Ethical Hacker, Penetration Tester & Security Researcher. Identifying vulnerabilities to make the web safer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <SmoothScrollProvider>
          {/* Ambient Background */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none grid-bg">
            <div className="blur-orb-1 top-[-10%] left-[-10%]" />
            <div className="blur-orb-2 bottom-[-10%] right-[-10%]" />
          </div>

          <Navbar />
          <main className="relative z-10 w-full flex flex-col items-center">
            {children}
          </main>
          <SceneProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
