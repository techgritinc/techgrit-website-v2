// One accent palette shared by every card grid that tints itself per CMS category
// (Blog and Case Studies today). Previously each page kept its own copy —
// app/insights/case-studies/_data/accent.ts held token `var()` references while
// app/insights/blog/_lib/accent.ts held duplicated hex literals, so the same category
// could render two different colors and the blog copy silently drifted whenever
// tokens.css changed. Values live only in app/tokens.css; nothing here is a literal.

export type Accent = "blue-light" | "blue" | "orange" | "amber" | "teal-light" | "yellow" | "purple";

export const ACCENT_VAR: Record<Accent, string> = {
  "blue-light": "var(--color-blue-light)",
  blue: "var(--color-blue)",
  orange: "var(--color-orange)",
  amber: "var(--color-amber)",
  "teal-light": "var(--color-teal-light)",
  yellow: "var(--color-yellow)",
  purple: "var(--color-purple)",
};

// Tints an accent toward transparent — the shared basis for card washes, badge fills and
// glows, so no component hand-derives an rgba() from a hex.
export function accentMix(accent: Accent, percent: number): string {
  return `color-mix(in srgb, ${ACCENT_VAR[accent]} ${percent}%, transparent)`;
}

// The CMS has no per-item accent field — only a category — so accent is derived from the
// category slug, once, here. Keyed on slug rather than display name because the name is
// editable copy while the slug is the stable identifier. Deriving it (rather than cycling a
// palette by grid position, which is what the Blog grid used to do) is what keeps a post the
// same color whether it appears unfiltered, filtered, or as the featured card.
const CATEGORY_ACCENT: Record<string, Accent> = {
  // Case Studies
  fintech: "blue-light",
  marketplace: "orange",
  "ai-enablement": "amber",
  construction: "yellow",
  design: "yellow",
  // Blog
  "artificial-intelligence": "purple",
  technology: "blue-light",
  finance: "blue",
  healthcare: "teal-light",
  news: "amber",
};

// Unmapped categories fall back to orange, the brand accent, rather than to a color that
// reads as a deliberate category signal.
export function categoryAccent(categorySlug: string): Accent {
  return CATEGORY_ACCENT[categorySlug] ?? "orange";
}
