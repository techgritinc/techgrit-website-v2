import { fetchCms } from "../fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import type {
  CtaBannerContent,
  HeroCollageTile,
  ReleasedSession,
  ReleasedSessionAccent,
  SubscribePanelContent,
  UpcomingSession,
  WebinarHeroContent,
  WebinarPageContent,
} from "@/app/insights/webinar/_data/types";
import type {
  StrapiUpcomingWebinarSection,
  StrapiWebinarCtaBannerSection,
  StrapiWebinarGalleryItem,
  StrapiWebinarNewsletterSection,
  StrapiWebinarPage,
  StrapiWebinarPageSection,
  StrapiWebinarRecordingSection,
  StrapiWebinarSignupSection,
} from "../../types/webinar-types";

const WEBINAR_ENDPOINT = "/api/pages/by-slug/webinar";

// The CMS carries no accent/card-size field on a released session — both cycle by
// grid position, matching the Blog/Services precedent of cycling a fixed palette
// (and, here, a fixed half/half/full size pattern) by index.
const RELEASED_ACCENTS: ReleasedSessionAccent[] = ["orange", "blue", "teal"];

// Fixed collage layout: the reference's nine-cell grid mixes six photo tiles with
// three decorative (non-photographic) tiles at fixed positions — the CMS only
// models photo assets, so the decorative tiles stay hard-authored here and the
// CMS's gallery items fill the six photo positions in order.
const PHOTO_POSITIONS = [2, 3, 4, 6, 7, 8];
const DECORATIVE_TILES: HeroCollageTile[] = [
  { position: 1, kind: "spin-ring" },
  { position: 5, kind: "play-triangle" },
  { position: 9, kind: "pulse-dot" },
];

const SUCCESS_TEXT = "You're in. We'll email you when the next session goes live.";

function pickUpcomingSection(sections: StrapiWebinarPageSection[]): StrapiUpcomingWebinarSection | undefined {
  return sections.find(
    (s): s is StrapiUpcomingWebinarSection => s.__component === "insights-webinar.upcomming-live-webinar-card",
  );
}

function pickSignupSection(sections: StrapiWebinarPageSection[]): StrapiWebinarSignupSection | undefined {
  return sections.find((s): s is StrapiWebinarSignupSection => s.__component === "insights-webinar.webinar-signup");
}

function pickRecordingSection(sections: StrapiWebinarPageSection[]): StrapiWebinarRecordingSection | undefined {
  return sections.find(
    (s): s is StrapiWebinarRecordingSection => s.__component === "insights-webinar.webinar-recording",
  );
}

function pickNewsletterSection(sections: StrapiWebinarPageSection[]): StrapiWebinarNewsletterSection | undefined {
  return sections.find(
    (s): s is StrapiWebinarNewsletterSection => s.__component === "page-reusable-sections.newsletter",
  );
}

function pickCtaBannerSection(sections: StrapiWebinarPageSection[]): StrapiWebinarCtaBannerSection | undefined {
  return sections.find((s): s is StrapiWebinarCtaBannerSection => s.__component === "page-reusable-sections.cta-banner");
}

function toUpcomingSession(section: StrapiUpcomingWebinarSection | undefined): UpcomingSession | undefined {
  if (!section) return undefined;
  return {
    statusLabel: section.badgeLabel,
    title: section.title,
    when: section.subtitle,
    ctaLabel: section.ctaLabel,
    ctaLink: section.ctaLink,
  };
}

function toCollageTile(items: StrapiWebinarGalleryItem[], position: number, index: number): HeroCollageTile | null {
  const asset = items[index % items.length]?.assets[0];
  if (!asset) return null;
  const picked = pickMediaAsset(asset, ["thumbnail", "small"]);
  return {
    position,
    kind: "photo",
    image: { src: resolveMediaUrl(picked.url), alt: asset.alternativeText ?? "" },
  };
}

function toCollage(items: StrapiWebinarGalleryItem[]): HeroCollageTile[] {
  if (!items.length) return [...DECORATIVE_TILES].sort((a, b) => a.position - b.position);
  const photoTiles = PHOTO_POSITIONS.map((position, index) => toCollageTile(items, position, index)).filter(
    (tile): tile is HeroCollageTile => tile !== null,
  );
  return [...DECORATIVE_TILES, ...photoTiles].sort((a, b) => a.position - b.position);
}

function toHero(section: StrapiWebinarSignupSection | undefined): WebinarHeroContent | undefined {
  if (!section) return undefined;
  const [nameField, emailField] = section.webinarFormFields;
  return {
    badgeLabel: section.badgeLabel ?? "",
    heading: section.title.trim(),
    headingHighlight: section.highlightTitle,
    lead: section.subtitle,
    namePlaceholder: nameField?.placeholder ?? "",
    formPlaceholder: emailField?.placeholder ?? "",
    formCtaLabel: emailField?.buttonLabel ?? "",
    successText: SUCCESS_TEXT,
    collage: toCollage(section.galleryItems),
  };
}

function toReleasedSessions(section: StrapiWebinarRecordingSection | undefined): ReleasedSession[] {
  if (!section) return [];
  return section.webinar.map((item, index) => ({
    id: String(item.id),
    statusLabel: item.statusLabel,
    title: item.title,
    description: item.subtitle,
    ctaLabel: item.ctaLabel,
    ctaLink: item.ctaLink,
    accent: RELEASED_ACCENTS[index % RELEASED_ACCENTS.length],
    cardSize: index % 3 === 2 ? "full" : "half",
  }));
}

function toSubscribePanel(section: StrapiWebinarNewsletterSection | undefined): SubscribePanelContent | undefined {
  if (!section) return undefined;
  const [nameField, emailField] = section.ctaFormFields;
  return {
    heading: section.title.trim(),
    copy: section.subtitle ?? "",
    namePlaceholder: nameField?.placeholder ?? "",
    formPlaceholder: emailField?.placeholder ?? "",
    ctaLabel: section.ctaLabel,
    successText: SUCCESS_TEXT,
  };
}

// The CMS entry for this section has its primary CTA's label/link values swapped
// (primaryCtaLabel holds the href, primaryCtaLink holds the display text) — detect
// and correct that rather than rendering a raw path as the button's visible label.
function normalizeCta(label: string, link: string): { label: string; href: string } {
  const looksLikeDestination = (value: string) => value.startsWith("/") || value.startsWith("http");
  if (looksLikeDestination(label) && !looksLikeDestination(link)) {
    return { label: link, href: label };
  }
  return { label, href: link };
}

function toCtaBanner(section: StrapiWebinarCtaBannerSection | undefined): CtaBannerContent | undefined {
  if (!section) return undefined;
  const primary = normalizeCta(section.primaryCtaLabel, section.primaryCtaLink);
  return {
    badgeLabel: section.badgeLabel,
    heading: section.title.trim(),
    headingHighlight: section.highlightTitle,
    subtitle: section.subtitle,
    ctaLabel: primary.label,
    ctaHref: primary.href,
  };
}

// Called directly from the (async) Webinar Server Component (await getWebinarData())
// — runs on the server for every request, so CMS edits show up on the next page load
// with no rebuild. Returns null only when the CMS itself is unreachable — the page
// then renders a 404 (see page.tsx), matching the Blog/Case Studies/Construction
// precedent. Any individual section absent from the dynamic zone is simply omitted
// from render; there is no static fallback content substituted in its place.
export async function getWebinarData(): Promise<WebinarPageContent | null> {
  const data = await fetchCms<StrapiWebinarPage>(WEBINAR_ENDPOINT);
  if (!data) return null;

  const sections = data.sections ?? [];
  const upcomingSection = pickUpcomingSection(sections);
  const signupSection = pickSignupSection(sections);
  const recordingSection = pickRecordingSection(sections);
  const newsletterSection = pickNewsletterSection(sections);
  const ctaBannerSection = pickCtaBannerSection(sections);

  return {
    seo: { metaTitle: data.seo?.metaTitle ?? "", metaDescription: data.seo?.metaDescription ?? "" },
    hero: toHero(signupSection),
    sessionsHeading: recordingSection?.sectionTitle ?? "",
    upcomingSession: toUpcomingSession(upcomingSection),
    releasedSessions: toReleasedSessions(recordingSection),
    subscribePanel: toSubscribePanel(newsletterSection),
    ctaBanner: toCtaBanner(ctaBannerSection),
  };
}
