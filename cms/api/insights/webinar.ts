import { fetchCms } from "../fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import type {
  CtaBannerContent,
  HeroCollageTile,
  PageSeo,
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

const DEFAULT_SEO: PageSeo = {
  metaTitle: "Webinars | TechGrit",
  metaDescription:
    "Join our free webinar series on AI-first software delivery — legacy modernization at scale, AI agents, building AI-first teams, and conversational AI.",
};

const DEFAULT_HERO: WebinarHeroContent = {
  badgeLabel: "Webinar Series",
  heading: "Join our free webinar series.",
  headingHighlight: "webinar series.",
  lead: "Stay ahead with insights from industry leaders. Explore trends, innovations, and strategies to grow your business.",
  formPlaceholder: "e.g., email@example.com",
  formCtaLabel: "Subscribe",
  successText: "You're in. We'll email you when the next session goes live.",
  collage: [
    { position: 1, kind: "spin-ring" },
    { position: 2, kind: "photo", image: { src: "/assets/team/glasses.png", alt: "Speaker" } },
    { position: 3, kind: "photo", image: { src: "/assets/team/rooftop.png", alt: "Speaker" } },
    { position: 4, kind: "photo", image: { src: "/assets/team/painting.png", alt: "Speaker" } },
    { position: 5, kind: "play-triangle" },
    { position: 6, kind: "photo", image: { src: "/assets/team/diwali.png", alt: "Speaker" } },
    {
      position: 7,
      kind: "photo",
      image: { src: "/assets/team/rooftop.png", alt: "Speaker", objectPosition: "left" },
    },
    {
      position: 8,
      kind: "photo",
      image: { src: "/assets/team/glasses.png", alt: "Speaker", objectPosition: "right" },
    },
    { position: 9, kind: "pulse-dot" },
  ],
};

const DEFAULT_SESSIONS_HEADING = "Sessions";

const DEFAULT_UPCOMING_SESSION: UpcomingSession = {
  statusLabel: "Upcoming Live Webinar",
  title: "Migrating 2.5M lines to .NET 10 — without downtime",
  when: "30th June 2026, 12:00 PM CST",
  ctaLabel: "Register",
  // "#subscribe" keeps this page's own in-page scroll-to-Subscribe behavior when the
  // CMS is unreachable; a real CMS-authored ctaLink instead triggers a real navigation.
  ctaLink: "#subscribe",
};

const DEFAULT_RELEASED_SESSIONS: ReleasedSession[] = [
  {
    id: "ai-agent-threat-or-superpower",
    statusLabel: "Released",
    title: "Rise of the AI agent: threat or superpower for humans?",
    description:
      "A provocative discussion on the profound implications of autonomous agents for how we build and work.",
    ctaLabel: "Watch Now",
    ctaLink: "",
    accent: "orange",
    cardSize: "half",
  },
  {
    id: "ai-first-software-teams-beyond-agile",
    statusLabel: "Released",
    title: "Building AI-first software teams & systems [Beyond Agile]",
    description:
      "We're witnessing the biggest shift in software development since the internet — here's how to organize for it.",
    ctaLabel: "Watch Now",
    ctaLink: "",
    accent: "blue",
    cardSize: "half",
  },
  {
    id: "langchain-conversational-ai",
    statusLabel: "Released",
    title: "LangChain: powering next-gen conversational AI applications",
    description:
      "Revolutionizing document access for a technology-services firm with retrieval-augmented, conversational AI.",
    ctaLabel: "Watch Now",
    ctaLink: "",
    accent: "teal",
    cardSize: "full",
  },
];

const DEFAULT_SUBSCRIBE_PANEL: SubscribePanelContent = {
  heading: "Subscribe to our mailing list to stay updated on webinar announcements.",
  copy: "No spam — just new sessions, recordings, and the occasional deep-dive worth your time.",
  namePlaceholder: "Full Name",
  formPlaceholder: "e.g., email@example.com",
  ctaLabel: "Subscribe",
  successText: "You're in. We'll email you when the next session goes live.",
};

const DEFAULT_CTA_BANNER: CtaBannerContent = {
  badgeLabel: null,
  heading: "Step into an AI-first Future",
  headingHighlight: "AI-first Future",
  subtitle:
    "The era of artificial intelligence is here, offering transformative opportunities for individuals and organizations alike. Explore how to leverage AI-driven insights and tools to gain a competitive edge and build a smarter tomorrow.",
  ctaLabel: "Get in Touch",
  ctaHref: "/contact-us/",
};

// Last-resort fallback if the CMS is genuinely unreachable — the Webinar page
// degrades to the same static content it shipped with before CMS integration,
// rather than crashing the page, matching the header/footer/home/services/blog
// fallback precedent.
export const DEFAULT_WEBINAR_DATA: WebinarPageContent = {
  seo: DEFAULT_SEO,
  hero: DEFAULT_HERO,
  sessionsHeading: DEFAULT_SESSIONS_HEADING,
  upcomingSession: DEFAULT_UPCOMING_SESSION,
  releasedSessions: DEFAULT_RELEASED_SESSIONS,
  subscribePanel: DEFAULT_SUBSCRIBE_PANEL,
  ctaBanner: DEFAULT_CTA_BANNER,
};

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

function toUpcomingSession(section: StrapiUpcomingWebinarSection | undefined): UpcomingSession {
  if (!section) return DEFAULT_UPCOMING_SESSION;
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
  if (!items.length) return DEFAULT_HERO.collage;
  const photoTiles = PHOTO_POSITIONS.map((position, index) => toCollageTile(items, position, index)).filter(
    (tile): tile is HeroCollageTile => tile !== null,
  );
  return [...DECORATIVE_TILES, ...photoTiles].sort((a, b) => a.position - b.position);
}

function toHero(section: StrapiWebinarSignupSection | undefined): WebinarHeroContent {
  if (!section) return DEFAULT_HERO;
  const formField = section.webinarFormFields[0];
  return {
    badgeLabel: section.badgeLabel ?? DEFAULT_HERO.badgeLabel,
    heading: section.title.trim(),
    headingHighlight: section.highlightTitle,
    lead: section.subtitle,
    formPlaceholder: formField?.placeholder ?? DEFAULT_HERO.formPlaceholder,
    formCtaLabel: formField?.buttonLabel ?? DEFAULT_HERO.formCtaLabel,
    successText: DEFAULT_HERO.successText,
    collage: toCollage(section.galleryItems),
  };
}

function toReleasedSessions(section: StrapiWebinarRecordingSection | undefined): ReleasedSession[] {
  if (!section) return DEFAULT_RELEASED_SESSIONS;
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

function toSubscribePanel(section: StrapiWebinarNewsletterSection | undefined): SubscribePanelContent {
  if (!section) return DEFAULT_SUBSCRIBE_PANEL;
  const [nameField, emailField] = section.ctaFormFields;
  return {
    heading: section.title.trim(),
    copy: section.subtitle ?? DEFAULT_SUBSCRIBE_PANEL.copy,
    namePlaceholder: nameField?.placeholder ?? DEFAULT_SUBSCRIBE_PANEL.namePlaceholder,
    formPlaceholder: emailField?.placeholder ?? DEFAULT_SUBSCRIBE_PANEL.formPlaceholder,
    ctaLabel: section.ctaLabel,
    successText: DEFAULT_SUBSCRIBE_PANEL.successText,
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

function toCtaBanner(section: StrapiWebinarCtaBannerSection | undefined): CtaBannerContent {
  if (!section) return DEFAULT_CTA_BANNER;
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
// with no rebuild. Each section degrades independently to its own default when
// absent from the dynamic zone; the whole page degrades to DEFAULT_WEBINAR_DATA only
// if the CMS is entirely unreachable.
export async function getWebinarData(): Promise<WebinarPageContent> {
  const data = await fetchCms<StrapiWebinarPage>(WEBINAR_ENDPOINT);
  if (!data) return DEFAULT_WEBINAR_DATA;

  const sections = data.sections ?? [];
  const upcomingSection = pickUpcomingSection(sections);
  const signupSection = pickSignupSection(sections);
  const recordingSection = pickRecordingSection(sections);
  const newsletterSection = pickNewsletterSection(sections);
  const ctaBannerSection = pickCtaBannerSection(sections);

  return {
    seo: data.seo ?? DEFAULT_SEO,
    hero: toHero(signupSection),
    sessionsHeading: recordingSection?.sectionTitle ?? DEFAULT_SESSIONS_HEADING,
    upcomingSession: toUpcomingSession(upcomingSection),
    releasedSessions: toReleasedSessions(recordingSection),
    subscribePanel: toSubscribePanel(newsletterSection),
    ctaBanner: toCtaBanner(ctaBannerSection),
  };
}
