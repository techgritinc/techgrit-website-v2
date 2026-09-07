// Shared cookie-consent state: read/written by the CookieBanner + CookieSettingsModal
// (what the visitor chose) and read/listened-to by GoogleAnalytics (what to load).
export type CookiePreferences = {
  marketing: boolean;
  functional: boolean;
  analytics: boolean;
};

export const CONSENT_COOKIE = "techgrit_cookie_consent";
export const CONSENT_MAX_AGE_DAYS = 180;

// Dispatched on `window` whenever the visitor accepts, declines-with-selection, or
// saves preferences — GoogleAnalytics listens for this to update Consent Mode live,
// without the banner needing to know gtag exists.
export const CONSENT_CHANGED_EVENT = "techgrit:cookie-consent-changed";

export function getCookie(name: string): string | null {
  // CookieSettingsModal reads this during its useState initializer, which — like any
  // Client Component — still runs once on the server for the initial render; `document`
  // only exists once that reaches the browser.
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function readConsentPreferences(): CookiePreferences | null {
  const raw = getCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return {
      marketing: Boolean(parsed.marketing),
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return null;
  }
}

export function writeConsentPreferences(preferences: CookiePreferences) {
  setCookie(CONSENT_COOKIE, JSON.stringify(preferences), CONSENT_MAX_AGE_DAYS);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: preferences }));
}
