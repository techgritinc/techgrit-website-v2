import type { FinalCtaContent } from "@/components/ui/final-cta";

export type { FinalCtaContent } from "@/components/ui/final-cta";

export interface LeadershipImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface LeaderProfile {
  order: number;
  name: string;
  role: string;
  bio: string;
  image: LeadershipImage | null; // null renders the empty-but-styled circle (FR-023 edge case)
  linkedInUrl: string | null; // null omits the LinkedIn pill entirely
}


export type RationaleIconName = "enterprise" | "startup" | "aiFirst" | "longTerm";

export interface RationaleTile {
  order: number;
  icon: RationaleIconName;
  title: string;
  description: string;
}

export interface LeadershipHeroSection {
  breadcrumbLabel: string;
  breadcrumbHref: string;
  currentLabel: string;
  badgeLabel: string;
  title: string;
  titleHighlight: string | null;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

export interface WhyItMattersSection {
  eyebrow: string;
  title: string;
  description: string;
  tiles: RationaleTile[];
}

export interface LeadershipSeo {
  metaTitle: string;
  metaDescription: string;
}

// A flat named record, not the discriminated-union `sections[]` array about-types.ts
// uses — this page's four sections are fixed in order by the reference (not
// CMS-controlled), so a named record gives compile-time proof every section is
// present instead of a `switch`-on-`type` dispatch in page.tsx.
export interface LeadershipPageContent {
  seo: LeadershipSeo;
  hero: LeadershipHeroSection;
  profiles: LeaderProfile[];
  whyItMatters: WhyItMattersSection;
  finalCta: FinalCtaContent;
}
