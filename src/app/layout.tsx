import type { Metadata } from "next";
import { Rajdhani, Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { SceneProvider } from "@/components/3d/scene";
import { Navbar } from "@/components/ui/navbar";

const rajdhani = Rajdhani({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Joyceson · Premium 3D Interactive Portfolio",
  description: "Futuristic interactive portfolio showcasing full-stack development and 3D experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${rajdhani.variable} ${shareTechMono.variable} antialiased bg-background text-foreground min-h-screen relative custom-cursor-active`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <div className="relative z-10 w-full h-full flex flex-col">
            {children}
          </div>
          {/* Global R3F Canvas */}
          <SceneProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
