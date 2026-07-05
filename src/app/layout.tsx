import type { Metadata } from "next";
import { Oswald, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { SceneProvider } from "@/components/3d/scene";
import { CustomCursor } from "@/components/ui/custom-cursor";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        className={`${montserrat.variable} ${oswald.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen relative`}
      >
        <SmoothScrollProvider>
          <CustomCursor />
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
