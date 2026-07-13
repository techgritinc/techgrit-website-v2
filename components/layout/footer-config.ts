export type FooterLink = { label: string; href: string };
export type FooterLinkGroup = { heading: string; links: FooterLink[] };
export type SocialLink = { platform: "linkedin" | "youtube" | "email"; href: string; label: string };
export type ContactDetail = { type: "email" | "phone"; value: string; href: string };
export type LegalLink = { label: string; href: string };

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "linkedin", href: "https://www.linkedin.com/company/techgrit-inc/", label: "TechGrit on LinkedIn" },
  { platform: "youtube", href: "https://www.youtube.com/@TechGritInc", label: "TechGrit on YouTube" },
  { platform: "email", href: "mailto:support@techgrit.com", label: "Email TechGrit" },
];

export const CONTACT_DETAILS: ContactDetail[] = [
  { type: "email", value: "support@techgrit.com", href: "mailto:support@techgrit.com" },
  { type: "phone", value: "+1 945 318 9179", href: "tel:+19453189179" },
];

export const LEGAL_LINKS: LegalLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export const FOOTER_CTA = { label: "Request a Demo", href: "/contact" };

/**
 * Two fixed quick-link columns, identical on every page — the exact "Services" /
 * "Company" columns from the reference homepage footer, normalized across the
 * whole site per the "Footer structure" decision in spec.md (not a paraphrase —
 * matched link-for-link against TechGrit Homepage.dc.html).
 */
export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Services",
    links: [
      { label: "OrbitAI Platform", href: "/#platform" },
      { label: "6-Week Sprint-to-Scale", href: "/#methodology" },
      { label: "AI Product Engineering", href: "/services" },
      { label: "Enterprise Modernization", href: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Industries", href: "/#industries" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Startups", href: "/startups" },
    ],
  },
];
