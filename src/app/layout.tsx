import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { AudioToggle } from "@/components/ui/audio-toggle";
import { Navbar } from "@/components/ui/navbar";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
        className={`${inter.variable} ${cinzelDecorative.variable} ${cinzel.variable} font-sans antialiased bg-background text-foreground min-h-screen relative`}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <div className="relative z-10 w-full h-full flex flex-col">
            {children}
          </div>
          <LoadingScreen />
          <AudioToggle />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
