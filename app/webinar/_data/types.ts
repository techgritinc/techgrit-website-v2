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
  formPlaceholder: string;
  formCtaLabel: string;
  successText: string;
  collage: HeroCollageTile[];
}

export interface UpcomingSession {
  statusLabel: string;
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  ctaLabel: string;
}

export type ReleasedSessionAccent = "orange" | "blue" | "teal";
export type ReleasedSessionCardSize = "half" | "full";

export interface ReleasedSession {
  id: string;
  statusLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  accent: ReleasedSessionAccent;
  cardSize: ReleasedSessionCardSize;
}

export interface SubscribePanelContent {
  heading: string;
  copy: string;
  formPlaceholder: string;
  ctaLabel: string;
  successText: string;
}

export interface WebinarPageContent {
  hero: WebinarHeroContent;
  sessionsHeading: string;
  upcomingSession: UpcomingSession;
  releasedSessions: ReleasedSession[];
  subscribePanel: SubscribePanelContent;
}
