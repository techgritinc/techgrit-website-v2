import { fetchCms } from "./fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import { ROUTES } from "@/lib/routes";
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

// Last-resort fallback if the CMS is genuinely unreachable — the header degrades to
// a bare logo + CTA rather than crashing the page. Not a loading placeholder: with
// the fetch happening server-side before any HTML is sent, there's no "flash" to
// mitigate anymore, so an empty nav here is an acceptable, rare-case degrade.
export const DEFAULT_HEADER_DATA: HeaderData = {
  logo: {
    url: "/logos/techgrit-logo-white.png",
    alt: "TechGrit",
    width: 148,
    height: 44,
  },
  cta: { label: "Talk to Us", href: ROUTES.contactUs },
  megaGroups: [],
  plainLinks: [],
};

// The header renders the logo at a fixed 44px height, so the small "thumbnail"
// format (245x73) is the right asset — not the ~3286x982 original.
function toHeaderLogo(logo: StrapiMedia | null): HeaderLogo {
  if (!logo) return DEFAULT_HEADER_DATA.logo;
  const asset = pickMediaAsset(logo, ["thumbnail", "small"]);
  return {
    url: resolveMediaUrl(asset.url),
    alt: logo.alternativeText ?? DEFAULT_HEADER_DATA.logo.alt,
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

// TMS-86 / TMS-86-software-product-engineering: the CMS's own "AI-Accelerated
// Modernization" and "Software Product Engineering" mega-menu entries still point at
// the old /services anchors. Forced to their new static routes here until the CMS
// entries themselves are updated (planned) — every other mega-menu item stays fully
// CMS-driven.
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
            : section.ctaLink) ?? "/",
    })),
    cta:
      navItem.ctaLabel && navItem.ctaLink
        ? { label: navItem.ctaLabel, href: navItem.ctaLink }
        : undefined,
  };
}

// Called directly from the Header Server Component (await getHeaderData()) — runs on
// the server for every request, so CMS edits show up on the next page load with no
// rebuild, and the browser never sees a loading state for this data.
export async function getHeaderData(): Promise<HeaderData> {
  const data = await fetchCms<StrapiHeaderData>(HEADER_ENDPOINT);
  if (!data) return DEFAULT_HEADER_DATA;

  const megaGroups: HeaderMegaGroup[] = [];
  const plainLinks: HeaderPlainLink[] = [];
  for (const navItem of data.navItems) {
    if (navItem.sections.length > 0) {
      megaGroups.push(toMegaGroup(navItem));
    } else {
      plainLinks.push({ label: navItem.title, href: navItem.url ?? "/" });
    }
  }

  const cta: HeaderCta = { label: data.TalktoUsBtnLabel, href: data.TalktoUsBtnUrl ?? DEFAULT_HEADER_DATA.cta.href };

  return {
    logo: toHeaderLogo(data.logo),
    cta,
    megaGroups,
    plainLinks,
  };
}