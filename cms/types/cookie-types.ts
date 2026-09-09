import type { CookiePreferences } from "@/lib/cookie-consent";

export type StrapiCookieOption = {
  id: number;
  name: string;
  description: string;
  isEnabledByDefault: boolean | null;
};

export type StrapiCookieSettingsPanel = {
  id: number;
  title: string;
  ctaLabel: string;
  ctaLink: string | null;
  Options: StrapiCookieOption[];
};

export type StrapiCookieData = {
  title: string;
  acceptLabel: string;
  declineLabel: string;
  DeclineOptions: StrapiCookieSettingsPanel[];
};

// The CMS gives each option a free-text `name` rather than a machine key, so which
// consent bucket it drives (for Consent Mode — see GoogleAnalytics.tsx) is inferred
// from that name, the same "match by label" approach cms/api/header.ts and
// cms/api/footer.ts already use elsewhere for CMS content with no explicit key. A
// renamed option in the CMS silently stops driving any consent signal — same risk
// documented on those existing matches.
export type CookieOption = {
  id: number;
  title: string;
  description: string;
  locked: boolean;
  defaultChecked: boolean;
  preferenceKey: keyof CookiePreferences | null;
};

export type CookieBannerData = {
  message: string;
  acceptLabel: string;
  declineLabel: string;
  settingsTitle: string;
  saveLabel: string;
  options: CookieOption[];
};
