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
  cta: { label: "Start a conversation", href: "/contact" },
  linkGroups: [
    {
      id: "what-we-do",
      heading: "What We Do",
      links: [
        { slug: "svc-modernization", label: "AI-Accelerated Modernization", href: "/services#svc-modernization" },
        { slug: "svc-product", label: "Software Product Engineering", href: "/services#svc-product" },
        { slug: "svc-data-ai", label: "Data & AI Engineering", href: "/services#svc-data-ai" },
        { slug: "svc-platform", label: "Platform Engineering", href: "/services#svc-platform" },
        { slug: "svc-managed", label: "Managed Services", href: "/services#svc-managed" },
        { slug: "svc-strategy", label: "AI Strategy & Roadmap", href: "/services#svc-strategy" },
        { slug: "svc-startups", label: "Startups", href: "/services#svc-startups" },
      ],
    },
    {
      id: "how-we-work",
      heading: "How We Work",
      links: [
        { slug: "orbit-ai", label: "Orbit AI Framework", href: "/frameworks#orbit-ai" },
        { slug: "engagement", label: "Engagement Models", href: "/frameworks#engagement" },
        { slug: "discovery", label: "Discovery Sprints", href: "/frameworks#discovery" },
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
        { slug: "case-studies", label: "Case Studies", href: "/case-studies" },
        { slug: "blog", label: "Blog", href: "/blog" },
        { slug: "webinar", label: "Webinar", href: "/webinar" },
      ],
    },
    {
      id: "company",
      heading: "Company",
      links: [
        { slug: "our-story", label: "Our Story", href: "/about#our-story" },
        { slug: "leadership", label: "Leadership & Advisory", href: "/about#leadership" },
        { slug: "careers", label: "Careers", href: "/careers" },
        { slug: "contact", label: "Contact", href: "/contact" },
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

function toLinkGroup(menuItem: StrapiFooterMenuItem): FooterLinkGroup {
  return {
    id: String(menuItem.id),
    heading: menuItem.name,
    links: menuItem.items.map((item) => ({
      slug: String(item.id),
      label: item.title,
      href: item.url,
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
