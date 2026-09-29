import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Joyceson Danielraj — Portfolio OS",
  description: "Interactive Desktop Portfolio of Joyceson Danielraj",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased overflow-hidden m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
