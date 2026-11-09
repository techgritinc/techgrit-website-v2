import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import { getHeaderData } from "@/cms/api/header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import CookieSettingsProvider from "@/components/layout/CookieSettingsProvider";
import GoogleAnalytics from "@/components/layout/GoogleAnalyticsLazy";
import AmbientOrbs from "@/components/ui/ambient-orbs-lazy";
import "./globals.css";

// Figma StyleGuide (TechGrit Website 2026.fig, SG 07/08): every TG/* text style is set
// in Outfit, so body and display share one family through --font-outfit.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Runs synchronously in <head> before first paint, so a saved light/dark choice never
// flashes the default theme (Next guide: preventing-flash-before-hydration). Light is the
// server default (primary theme); ThemeToggle writes the same "tg-theme" key.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("tg-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export const metadata: Metadata = {
  title: "TechGrit — AI-First Software Engineering Partner",
  description:
    "TechGrit is an AI-first software engineering partner. We build scalable, production-grade software with OrbitAI — our agentic delivery platform.",
    verification: {
      "google": "Aef9w5rQAD0VMCsWNDmLa_8tOZq5Zp7O2-nZKR1CokA"
    },
  icons: {
    icon: "/icons/favicon.png",
  },
};


// The media host is whatever origin the CMS returns for uploads (resolveMediaUrl in
// cms/utils/media.ts), not a configured value, so the preconnect target is derived from
// the header logo — the LCP image. getHeaderData() is react-cache()d, so this shares the
// one fetch Header already makes for the same request.
async function getMediaOrigin(): Promise<string | null> {
  const header = await getHeaderData();
  if (!header) return null;
  try {
    return new URL(header.logo.url).origin;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mediaOrigin = await getMediaOrigin();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme="light"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {mediaOrigin && <link rel="preconnect" href={mediaOrigin} />}
      </head>
      <body className="min-h-full flex flex-col">
        <CookieSettingsProvider>
          <GoogleAnalytics />
          <AmbientOrbs />
          <div className="relative flex min-h-full flex-1 flex-col" style={{ zIndex: 1 }}>
            <Header />
            {children}
            <Footer />
          </div>
          <CookieBanner />
        </CookieSettingsProvider>
      </body>
    </html>
  );
}
