import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AmbientOrbs } from "@/reusable-components/ambient-orbs";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechGrit — AI-First Software Engineering Partner",
  description:
    "TechGrit is an AI-first software engineering partner. We build scalable, production-grade software with OrbitAI — our agentic delivery platform.",
  icons: {
    icon: "/icons/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AmbientOrbs />
        <div className="relative flex min-h-full flex-1 flex-col" style={{ zIndex: 1 }}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
