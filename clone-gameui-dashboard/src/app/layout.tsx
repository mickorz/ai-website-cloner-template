import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameUI AI - Dashboard",
  description: "GameUI AI logged-in dashboard clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${interSans.variable} h-full antialiased`}>
      <body className="h-full bg-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
