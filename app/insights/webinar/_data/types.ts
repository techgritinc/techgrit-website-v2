export type HeroCollageTileKind = "photo" | "spin-ring" | "play-triangle" | "pulse-dot";

export interface HeroCollageTile {
  position: number;
  kind: HeroCollageTileKind;
  image?: {
    src: string;
    alt: string;
    objectPosition?: "left" | "right";
  };
}

export interface WebinarHeroContent {
  badgeLabel: string;
  heading: string;
  headingHighlight: string;
  lead: string;
  namePlaceholder: string;
  formPlaceholder: string;
  formCtaLabel: string;
  successText: string;
  collage: HeroCollageTile[];
}

export interface UpcomingSession {
  statusLabel: string;
  title: string;
  when: string;
  ctaLabel: string;
  ctaLink: string;
}

export type ReleasedSessionAccent = "orange" | "blue" | "teal";
export type ReleasedSessionCardSize = "half" | "full";

export interface ReleasedSession {
  id: string;
  statusLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  accent: ReleasedSessionAccent;
  cardSize: ReleasedSessionCardSize;
}

export interface SubscribePanelContent {
  heading: string;
  copy: string;
  namePlaceholder: string;
  formPlaceholder: string;
  ctaLabel: string;
  successText: string;
}

export interface CtaBannerContent {
  badgeLabel: string | null;
  heading: string;
  headingHighlight: string | null;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface WebinarPageContent {
  seo: PageSeo;
  hero?: WebinarHeroContent;
  sessionsHeading: string;
  upcomingSession?: UpcomingSession;
  releasedSessions: ReleasedSession[];
  subscribePanel?: SubscribePanelContent;
  ctaBanner?: CtaBannerContent;
}
