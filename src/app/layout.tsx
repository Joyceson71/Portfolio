import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { SceneProvider } from "@/components/3d/scene";
import { Navbar } from "@/components/ui/navbar";
import { CustomCursor } from "@/components/ui/custom-cursor";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Joyceson Danielraj — Frontend Engineer",
  description:
    "Portfolio of Joyceson Danielraj. Building high-performance, visually-rich web experiences at the edge of design and engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <div className="relative z-10 w-full flex flex-col">
            {children}
          </div>
          <SceneProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
