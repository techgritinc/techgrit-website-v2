import { cache } from "react";
import { fetchCms } from "./fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
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
  "/api/footer?populate[logo]=true&populate[footerContact]=true&populate[footerMenuItems][populate][items]=true&populate[socialLinks][populate][icon]=true&populate[legalLinks][populate][document]=true";

// The footer renders the logo at a fixed 44px height, same as the header, so the
// small "thumbnail" format (245x73) is the right asset — not the ~3286x982 original.
function toFooterLogo(logo: StrapiMedia): FooterLogo {
  const asset = pickMediaAsset(logo, ["thumbnail", "small"]);
  return {
    url: resolveMediaUrl(asset.url),
    alt: logo.alternativeText ?? "",
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
  return link.document
    ? { label: link.title, href: resolveMediaUrl(link.document.url), isDocument: true }
    : { label: link.title, href: link.url, isDocument: false };
}

// Called directly from the Footer Server Component (await getFooterData()) — runs
// on the server for every request, so CMS edits show up on the next page load with
// no rebuild, and the browser never sees a loading state for this data. No fallback
// data: if the CMS is unreachable or has no logo configured, this returns null and
// the Footer renders nothing rather than substituting hardcoded content.
//
// Wrapped in React's cache() (same reasoning as getConstructionPageContent) — the
// Footer is present on every route via the root layout, so memoizing this per-request
// means a page that also happens to read footer data elsewhere in its render pass
// doesn't trigger a second identical CMS request.
export const getFooterData = cache(async (): Promise<FooterData | null> => {
  const data = await fetchCms<StrapiFooterData>(FOOTER_ENDPOINT);
  if (!data || !data.logo) return null;

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
});
