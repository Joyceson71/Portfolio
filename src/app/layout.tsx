import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SkinProvider } from "@/components/canvas/SkinProvider";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { WebCursor } from "@/components/cursor/WebCursor";
import { WebRope } from "@/components/cursor/WebRope";
import { ClickSplatLayer } from "@/components/cursor/ClickSplat";
import { ParticleTrail } from "@/components/cursor/ParticleTrail";
import { SpiderSenseHUD } from "@/components/hud/SpiderSenseHUD";
import { Loader } from "@/components/hud/Loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono  = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Joyceson Danielraj 🕷️ Full-Stack Developer & 3D Designer",
  description:
    "Portfolio of Joyceson Danielraj — building the web and the worlds inside it. Full-stack engineering meets WebGL 3D design in one immersive Web-Verse.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Joyceson Danielraj 🕷️ Full-Stack Developer & 3D Designer",
    description:
      "I build the web, and the worlds inside it. An immersive Spider-Man-themed portfolio showcasing full-stack engineering + 3D design.",
    type: "website",
    url: "https://portfolio-jodan.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joyceson Danielraj — Full-Stack Developer & 3D Designer",
    description: "I build the web, and the worlds inside it.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-skin="classic">
      <body
        className={`${inter.variable} ${mono.variable} ${bebas.variable} font-sans antialiased bg-[#080810] overflow-x-hidden`}
      >
        {/* Skin system: reads Zustand skin → sets data-skin attr on html */}
        <SkinProvider />

        {/* Cursor system (desktop only, gracefully degraded on touch) */}
        <CursorProvider>
          <WebCursor />
          <WebRope />
          <ClickSplatLayer />
          <ParticleTrail />
        </CursorProvider>

        {/* Persistent Spider-Sense HUD overlay */}
        <SpiderSenseHUD />

        {/* Loading screen — shows until drei useProgress hits 100 */}
        <Loader />

        {/* Scanlines overlay */}
        <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-30" />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
