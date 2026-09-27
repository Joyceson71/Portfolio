import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { SceneProvider } from "@/components/3d/scene";
import { Navbar } from "@/components/ui/navbar";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Joyceson Danielraj — Frontend Engineer",
  description:
    "Portfolio of Joyceson Danielraj. Building high-performance, visually-rich web experiences where design and engineering meet.",
  openGraph: {
    title: "Joyceson Danielraj — Frontend Engineer",
    description: "Building immersive, performant web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${syne.variable} ${jetbrains.variable}`}
        style={{ fontFamily: "var(--font-sans, sans-serif)" }}
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative z-10 w-full">
            {children}
          </main>
          <SceneProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
