import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { SceneProvider } from "@/components/3d/scene";

// Inter is highly recommended for Apple-like clean UI
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Joyceson Danielraj — Frontend Engineer",
  description: "Portfolio of Joyceson Danielraj, building premium web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          {/* Ambient Background Orbs */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
