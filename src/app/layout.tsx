import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  title: "Joyceson Danielraj 🕷️ Frontend Engineer & Creative Technologist",
  description: "Portfolio of Joyceson Danielraj. Building immersive, high-performance 3D web experiences.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Joyceson Danielraj 🕷️ Frontend Engineer & Creative Technologist",
    description: "Building immersive, high-performance web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased bg-[#080810] overflow-x-hidden`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
