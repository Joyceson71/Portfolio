import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/ui/navbar";
import { AudioToggle } from "@/components/ui/audio-toggle";

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
  title: "Joyceson · Premium Developer Portfolio",
  description: "Futuristic interactive portfolio showcasing full-stack development and UI/UX engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzelDecorative.variable} ${cinzel.variable} antialiased min-h-screen bg-black text-white selection:bg-[#c17f3a] selection:text-black`}>
        <SmoothScrollProvider>
          <Navbar />
          <AudioToggle />
          <div className="relative z-10 w-full h-full flex flex-col">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
