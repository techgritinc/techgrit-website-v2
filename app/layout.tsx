import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div
          aria-hidden="true"
          className="bg-ambient-orbs"
          style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
        >
          <span
            style={{
              position: "absolute",
              top: -160,
              right: -120,
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: "rgba(232, 119, 34, 0.16)",
              filter: "blur(120px)",
              animation: "tgorb 16s ease-in-out infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 900,
              left: -180,
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: "rgba(2, 132, 199, 0.10)",
              filter: "blur(130px)",
              animation: "tgorb 20s ease-in-out infinite reverse",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: -160,
              left: "40%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.09)",
              filter: "blur(140px)",
              animation: "tgorb 22s ease-in-out infinite",
            }}
          />
        </div>
        <div className="relative flex min-h-full flex-1 flex-col" style={{ zIndex: 1 }}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
