export type FooterLink = { label: string; href: string };
export type FooterLinkGroup = { id: string; heading: string; links: FooterLink[] };
export type SocialLink = { platform: "linkedin" | "youtube" | "spotify"; href: string; label: string };
export type ContactDetail = { heading: string; value: string; href: string; sublabel: string };
export type LegalLink = { label: string; href: string };

/**
 * Fully page-invariant, per spec.md FR-008/FR-015 — every route renders the same
 * five groups, in this order. "What We Do" (index 0) renders as the narrow left
 * column; the remaining four render as the 4-column sub-grid on the right
 * (TechGrit Homepage.dc.html lines 954-1005). Anchor targets that don't scroll
 * into view yet (Frameworks, Industries sections, About sub-sections) are kept
 * as their real intended destinations per spec.md Clarification Q5.
 */
export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    id: "what-we-do",
    heading: "What We Do",
    links: [
      { label: "AI-Accelerated Modernization", href: "/services#svc-modernization" },
      { label: "Software Product Engineering", href: "/services#svc-product" },
      { label: "Data & AI Engineering", href: "/services#svc-data-ai" },
      { label: "Platform Engineering", href: "/services#svc-platform" },
      { label: "Managed Services", href: "/services#svc-managed" },
      { label: "AI Strategy & Roadmap", href: "/services#svc-strategy" },
      { label: "Startups", href: "/services#svc-startups" },
    ],
  },
  {
    id: "how-we-work",
    heading: "How We Work",
    links: [
      { label: "Orbit AI Framework", href: "/frameworks#orbit-ai" },
      { label: "Engagement Models", href: "/frameworks#engagement" },
      { label: "Discovery Sprints", href: "/frameworks#discovery" },
    ],
  },
  {
    id: "industries",
    heading: "Industries",
    links: [
      { label: "HealthTech", href: "/#industries" },
      { label: "FinTech", href: "/#industries" },
      { label: "ConstructionTech", href: "/construction" },
      { label: "HiTech", href: "/#industries" },
    ],
  },
  {
    id: "insights",
    heading: "Insights",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Webinar", href: "/webinar" },
    ],
  },
  {
    id: "company",
    heading: "Company",
    links: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "Leadership & Advisory", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const CONTACT_DETAILS: ContactDetail[] = [
  { heading: "General", value: "hello@techgrit.com", href: "mailto:hello@techgrit.com", sublabel: "Partnerships & press" },
  { heading: "Careers", value: "careers@techgrit.com", href: "mailto:careers@techgrit.com", sublabel: "Join the team" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "linkedin", href: "https://www.linkedin.com/company/techgrit-inc/", label: "TechGrit on LinkedIn" },
  { platform: "youtube", href: "https://www.youtube.com/@TechGritInc", label: "TechGrit on YouTube" },
  { platform: "spotify", href: "https://open.spotify.com/show/techgrit-talks", label: "TechGrit Talks Podcast on Spotify" },
];

export const LEGAL_LINKS: LegalLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Preferences", href: "/" },
];

export const FOOTER_CTA = { label: "Start a conversation", href: "/contact" };

export const FOOTER_BRAND_DESCRIPTION =
  "The AI-First Software Engine. From vision to industrial-grade production in weeks, not years.";
