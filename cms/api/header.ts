import { cache } from "react";
import { fetchCms } from "./fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type {
  HeaderCta,
  HeaderData,
  HeaderIcon,
  HeaderLogo,
  HeaderMegaGroup,
  HeaderPlainLink,
  StrapiHeaderData,
  StrapiMedia,
  StrapiNavItem,
} from "../types/header-types.ts";

const HEADER_ENDPOINT =
  "/api/header?populate[logo]=true&populate[navItems][populate][sections][populate][icon]=true";

// The header renders the logo at a fixed 44px height, so the small "thumbnail"
// format (245x73) is the right asset — not the ~3286x982 original.
function toHeaderLogo(logo: StrapiMedia): HeaderLogo {
  const asset = pickMediaAsset(logo, ["thumbnail", "small"]);
  return {
    url: resolveMediaUrl(asset.url),
    alt: logo.alternativeText ?? "",
    width: asset.width,
    height: asset.height,
  };
}

function toHeaderIcon(icon: StrapiMedia | null): HeaderIcon | null {
  if (!icon) return null;
  return { url: resolveMediaUrl(icon.url), alt: icon.alternativeText ?? "" };
}

// The CMS has no column-count field, so the mega-menu grid width is derived from
// how many sections a group has. Matches the reference's own per-group column
// classes exactly (TechGrit Homepage.dc.html): 2->3col, 3->3col, 4->4col, 5->3col,
// 7->4col. The reference never uses a 2-column layout — even a 2-item group (About)
// renders in the 3-column grid with one slot left empty, rather than stretching each
// item to half the panel width.
function pickColumns(itemCount: number): 3 | 4 {
  if (itemCount === 4) return 4;
  if (itemCount >= 6) return 4;
  return 3;
}

// TMS-86 / TMS-86-software-product-engineering / TMS-86-data-and-ai-engineering: the
// CMS's own "AI-Accelerated Modernization", "Software Product Engineering", and "Data
// and AI Engineering" mega-menu entries still point at the old /services anchors.
// Forced to their new static routes here until the CMS entries themselves are updated
// (planned) — every other mega-menu item stays fully CMS-driven.
//
// The "Data and AI Engineering" title string above is taken from the design reference
// (TechGrit Data AI.dc.html's nav markup) — unlike the two prior entries, it has not
// been confirmed against a live CMS response. If the live CMS actually titles this
// entry differently (e.g. "Data & AI Engineering", matching the footer's own label),
// this case will silently fail to match and the mega-menu entry will keep resolving to
// its stale CMS-supplied link. Verify against a live page load before relying on this.
//
// TMS-86-ai-strategy-and-roadmap / TMS-86-startups: same caveat applies to the "AI
// Strategy & Roadmap" and "Startups" cases below — both title strings are taken from
// the design reference's shared nav markup (every "What We Do" .dc.html file's
// identical mega-menu block), not confirmed against a live CMS response.
//
// `StrapiNavItem.url` and `StrapiSection.ctaLink` are typed as required strings, but
// Strapi doesn't actually enforce that at runtime — the "About" nav item has shipped
// with a null `url` despite having sections (observed live, 2026-08-21). An unguarded
// null here reaches next/link's `href` prop and crashes the whole page (prop-type
// error), so every href out of this mapping falls back to "/" rather than trusting
// the CMS's own field to be non-null.
function toMegaGroup(navItem: StrapiNavItem): HeaderMegaGroup {
  return {
    label: navItem.title,
    href: navItem.url ?? "/",
    columns: pickColumns(navItem.sections.length),
    items: navItem.sections.map((section) => ({
      icon: toHeaderIcon(section.icon),
      title: section.title,
      description: section.subtitle,
      href:
        (section.title === "AI-Accelerated Modernization"
          ? "/what-we-do/ai-modernization"
          : section.title === "Software Product Engineering"
            ? "/what-we-do/software-product-engineering"
            : section.title === "Data and AI Engineering"
              ? "/what-we-do/data-ai-engineering"
              : section.title === "Platform Engineering"
                ? "/what-we-do/platform-engineering"
                : section.title === "Managed Services"
                  ? "/what-we-do/managed-services"
                  : section.title === "AI Strategy & Roadmap"
                    ? "/what-we-do/ai-strategy-roadmap"
                    : section.title === "Startups"
                      ? "/what-we-do/startups"
                      : section.ctaLink) ?? "/",
    })),
  };
}

// Called directly from the Header Server Component (await getHeaderData()) — runs on
// the server for every request, so CMS edits show up on the next page load with no
// rebuild, and the browser never sees a loading state for this data. No fallback
// data: if the CMS is unreachable or has no logo configured, this returns null and
// the Header renders nothing rather than substituting hardcoded nav content.
//
// Wrapped in React's cache() (same reasoning as getConstructionPageContent) — the
// Header is present on every route via the root layout, so memoizing this per-request
// means a page that also happens to read header data elsewhere in its render pass
// doesn't trigger a second identical CMS request.
export const getHeaderData = cache(async (): Promise<HeaderData | null> => {
  const data = await fetchCms<StrapiHeaderData>(HEADER_ENDPOINT);
  if (!data || !data.logo) return null;

  const megaGroups: HeaderMegaGroup[] = [];
  const plainLinks: HeaderPlainLink[] = [];
  for (const navItem of data.navItems) {
    if (navItem.sections.length > 0) {
      megaGroups.push(toMegaGroup(navItem));
    } else {
      plainLinks.push({ label: navItem.title, href: navItem.url ?? "/" });
    }
  }

  const cta: HeaderCta = { label: data.TalktoUsBtnLabel, href: data.TalktoUsBtnUrl };

  return {
    logo: toHeaderLogo(data.logo),
    cta,
    megaGroups,
    plainLinks,
  };
});