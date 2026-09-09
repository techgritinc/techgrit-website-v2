"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  CONSENT_CHANGED_EVENT,
  readConsentPreferences,
  type CookiePreferences,
} from "@/lib/cookie-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Marketing (the modal's "Enable Marketing Cookies" toggle) grants the ad_* signals —
// GA4's own tag config lists this property under an "advertising" category, i.e. its
// Google Signals / remarketing surface is opted into via marketing consent, not analytics
// consent. analytics_storage is the one gate for GA4's core hit collection.
function consentPolicyFrom(preferences: CookiePreferences) {
  const adConsent = preferences.marketing ? "granted" : "denied";
  return {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: adConsent,
    ad_user_data: adConsent,
    ad_personalization: adConsent,
  };
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/** gtag.js loader in Google Consent Mode — defaults every signal to denied, then follows
 * the cookie-preferences cookie/event so loading this script never itself grants consent.
 * `send_page_view: false` on config is deliberate (carried over from the prior site):
 * page_view is fired manually below on every route change instead. */
export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const applyStoredConsent = () => {
      const preferences = readConsentPreferences();
      if (preferences && typeof window.gtag === "function") {
        window.gtag("consent", "update", consentPolicyFrom(preferences));
      }
    };
    applyStoredConsent();

    const onConsentChanged = (event: Event) => {
      const { detail } = event as CustomEvent<CookiePreferences>;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", consentPolicyFrom(detail));
      }
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.gtag('js', new Date());
          window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
