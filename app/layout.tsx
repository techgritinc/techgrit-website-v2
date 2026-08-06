import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AmbientOrbs } from "@/components/ui/ambient-orbs";
import "./globals.css";

// v2 collapses the body/display split into one family (Calibri, metrically-substituted
// by Carlito on non-Windows systems); both CSS variables are still exposed per FR-009/FR-022
const carlitoBody = Carlito({
  variable: "--font-calibri-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const carlitoDisplay = Carlito({
  variable: "--font-calibri-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${carlitoBody.variable} ${carlitoDisplay.variable} h-full antialiased`}
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
