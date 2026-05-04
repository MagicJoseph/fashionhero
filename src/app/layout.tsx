import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "FashionHero — Comfortable, Sustainable Shoes",
  description: "A marketplace where independent sellers and global brands meet fashion-conscious shoppers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="flex flex-col min-h-full">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
