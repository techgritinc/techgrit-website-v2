import { fetchCms } from "./fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import { ROUTES } from "@/lib/routes";
import type {
  FooterContactDetail,
  FooterData,
  FooterIcon,
  FooterLegalLink,
  FooterLinkGroup,
  FooterLogo,
  FooterSocialLink,
  FooterSocialPlatform,
  StrapiFooterContact,
  StrapiFooterData,
  StrapiFooterMenuItem,
  StrapiLegalLink,
  StrapiMedia,
  StrapiSocialLink,
} from "../types/footer-types";

const FOOTER_ENDPOINT =
  "/api/footer?populate[logo]=true&populate[footerContact]=true&populate[footerMenuItems][populate][items]=true&populate[socialLinks][populate][icon]=true&populate[legalLinks]=true";

// Last-resort fallback if the CMS is genuinely unreachable — the footer degrades to
// the same static content it shipped with before CMS integration, rather than
// crashing the page.
export const DEFAULT_FOOTER_DATA: FooterData = {
  logo: {
    url: "/logos/techgrit-logo-white.png",
    alt: "TechGrit",
    width: 132,
    height: 44,
  },
  brandDescription:
    "The AI-First Software Engine. From vision to industrial-grade production in weeks, not years.",
  cta: { label: "Start a conversation", href: ROUTES.contactUs },
  linkGroups: [
    {
      id: "what-we-do",
      heading: "What We Do",
      links: [
        { slug: "svc-modernization", label: "AI-Accelerated Modernization", href: "/what-we-do/ai-modernization" },
        { slug: "svc-product", label: "Software Product Engineering", href: "/what-we-do/software-product-engineering" },
        { slug: "svc-data-ai", label: "Data & AI Engineering", href: "/what-we-do/data-ai-engineering" },
        { slug: "svc-platform", label: "Platform Engineering", href: "/what-we-do/platform-engineering" },
        { slug: "svc-managed", label: "Managed Services", href: "/what-we-do/managed-services" },
        { slug: "svc-strategy", label: "AI Strategy & Roadmap", href: "/what-we-do/ai-strategy-roadmap" },
        { slug: "svc-startups", label: "Startups", href: "/what-we-do/startups" },
      ],
    },
    {
      id: "how-we-work",
      heading: "How We Work",
      links: [
        { slug: "orbit-ai", label: "Orbit AI Framework", href: "/how-we-work/orbit-ai-ecosystem" },
        { slug: "engagement", label: "Engagement Models", href: "/how-we-work/engagement-models" },
        { slug: "discovery", label: "Discovery Sprints", href: "/how-we-work/discovery-sprints" },
      ],
    },
    {
      id: "industries",
      heading: "Industries",
      links: [
        { slug: "ind-healthtech", label: "HealthTech", href: "/#industries" },
        { slug: "ind-fintech", label: "FinTech", href: "/#industries" },
        { slug: "ind-constructiontech", label: "ConstructionTech", href: ROUTES.industriesConstruction },
        { slug: "ind-hitech", label: "HiTech", href: "/#industries" },
      ],
    },
    {
      id: "insights",
      heading: "Insights",
      links: [
        { slug: "case-studies", label: "Case Studies", href: ROUTES.caseStudies },
        { slug: "blog", label: "Blog", href: "/blog" },
        { slug: "webinar", label: "Webinar", href: "/webinar" },
      ],
    },
    {
      id: "company",
      heading: "Company",
      links: [
        { slug: "our-story", label: "Our Story", href: ROUTES.aboutOurStory },
        { slug: "leadership", label: "Leadership & Advisory", href: ROUTES.aboutLeadership },
        { slug: "careers", label: "Careers", href: ROUTES.careers },
        { slug: "contact", label: "Contact", href: ROUTES.contactUs },
      ],
    },
  ],
  contactDetails: [
    { heading: "General", value: "hello@techgrit.com", href: "mailto:hello@techgrit.com", sublabel: "Partnerships & press" },
    { heading: "Careers", value: "careers@techgrit.com", href: "mailto:careers@techgrit.com", sublabel: "Join the team" },
  ],
  socialLinks: [
    { platform: "linkedin", href: "https://www.linkedin.com/company/techgrit-inc/", label: "TechGrit on LinkedIn", icon: null },
    { platform: "youtube", href: "https://www.youtube.com/@TechGritInc", label: "TechGrit on YouTube", icon: null },
    { platform: "spotify", href: "https://open.spotify.com/show/38ugZtGBKruL01KyFbEeVE", label: "TechGrit Talks Podcast on Spotify", icon: null },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Preferences", href: "/" },
  ],
  followUsLabel: "Follow us",
  copyrights: "© 2026 TechGrit Inc. All rights reserved.",
};

// The footer renders the logo at a fixed 44px height, same as the header, so the
// small "thumbnail" format (245x73) is the right asset — not the ~3286x982 original.
function toFooterLogo(logo: StrapiMedia | null): FooterLogo {
  if (!logo) return DEFAULT_FOOTER_DATA.logo;
  const asset = pickMediaAsset(logo, ["thumbnail", "small"]);
  return {
    url: resolveMediaUrl(asset.url),
    alt: logo.alternativeText ?? DEFAULT_FOOTER_DATA.logo.alt,
    width: asset.width,
    height: asset.height,
  };
}

function toFooterIcon(icon: StrapiMedia | null): FooterIcon | null {
  if (!icon) return null;
  return { url: resolveMediaUrl(icon.url), alt: icon.alternativeText ?? "" };
}

// The CMS has no explicit "platform" field on a social link — the icon to render is
// derived from the link's own domain, matching the reference's fixed
// linkedin/youtube/spotify icon set. Falls back to null (no matching icon) for
// anything else.
function detectPlatform(url: string): FooterSocialPlatform | null {
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("youtube.com")) return "youtube";
  if (url.includes("spotify.com")) return "spotify";
  return null;
}

// TMS-86 / TMS-86-software-product-engineering / TMS-86-data-and-ai-engineering /
// TMS-86-platform-engineering / TMS-86-managed-services / TMS-86-ai-strategy-and-
// roadmap / TMS-86-startups: the CMS's own "AI-Accelerated Modernization", "Software
// Product Engineering", "Data and AI Engineering", "Platform Engineering", "Managed
// Services", "AI Strategy & Roadmap", and "Startups" links still point at the old
// /services anchors. Forced to their new static routes here until the CMS entries
// themselves are updated (planned) — every other footer link stays fully CMS-driven.
//
// The footer's own CMS menu item is titled "Data & AI Engineering" (confirmed live,
// 2026-08-26) — a different literal string than the "Data and AI Engineering" title
// cms/api/header.ts's toMegaGroup() matches on for the header mega-menu's entry.
// These are two separate CMS content entries (header nav item vs. footer menu item)
// that are not kept in sync with each other, not a typo in either file — match each
// against its own actual title rather than assuming shared wording.
function toLinkGroup(menuItem: StrapiFooterMenuItem): FooterLinkGroup {
  return {
    id: String(menuItem.id),
    heading: menuItem.name,
    links: menuItem.items.map((item) => ({
      slug: String(item.id),
      label: item.title,
      href:
        item.title === "AI-Accelerated Modernization"
          ? "/what-we-do/ai-modernization"
          : item.title === "Software Product Engineering"
            ? "/what-we-do/software-product-engineering"
            : item.title === "Data & AI Engineering"
              ? "/what-we-do/data-ai-engineering"
              : item.title === "Platform Engineering"
                ? "/what-we-do/platform-engineering"
                : item.title === "Managed Services"
                  ? "/what-we-do/managed-services"
                  : item.title === "AI Strategy & Roadmap"
                    ? "/what-we-do/ai-strategy-roadmap"
                    : item.title === "Startups"
                      ? "/what-we-do/startups"
                      : item.url,
    })),
  };
}

function toContactDetail(contact: StrapiFooterContact): FooterContactDetail {
  return {
    heading: contact.title,
    value: contact.email,
    href: `mailto:${contact.email}`,
    sublabel: contact.subtitle,
  };
}

function toSocialLink(social: StrapiSocialLink): FooterSocialLink {
  return {
    platform: detectPlatform(social.url),
    href: social.url,
    label: social.title,
    icon: toFooterIcon(social.icon),
  };
}

function toLegalLink(link: StrapiLegalLink): FooterLegalLink {
  return { label: link.title, href: link.url };
}

// Called directly from the Footer Server Component (await getFooterData()) — runs
// on the server for every request, so CMS edits show up on the next page load with
// no rebuild, and the browser never sees a loading state for this data.
export async function getFooterData(): Promise<FooterData> {
  const data = await fetchCms<StrapiFooterData>(FOOTER_ENDPOINT);
  if (!data) return DEFAULT_FOOTER_DATA;

  return {
    logo: toFooterLogo(data.logo),
    brandDescription: data.subtitle,
    cta: { label: data.startConversationLabel, href: data.startConversationUrl },
    linkGroups: data.footerMenuItems.map(toLinkGroup),
    contactDetails: data.footerContact.map(toContactDetail),
    socialLinks: data.socialLinks.map(toSocialLink),
    legalLinks: data.legalLinks.map(toLegalLink),
    followUsLabel: data.followUsLabel,
    copyrights: data.copyrights,
  };
}
