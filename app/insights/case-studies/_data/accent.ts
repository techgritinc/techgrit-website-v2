export type CaseStudyAccent =
  | "blue-light" // #38bdf8 -> var(--color-blue-light)
  | "blue" // #0284C7 -> var(--color-blue)
  | "orange" // #E87722 -> var(--color-orange)
  | "amber" // #F59E0B -> var(--color-amber)
  | "teal-light" // #2dd4bf -> var(--color-teal-light)
  | "yellow"; // #fbbf24 -> var(--color-yellow)

// Maps each case-study accent to its design token — the single source of
// truth for accent color everywhere a case-study card renders (metric
// numbers, industry dots, badge tints).
export const ACCENT_VAR: Record<CaseStudyAccent, string> = {
  "blue-light": "var(--color-blue-light)",
  blue: "var(--color-blue)",
  orange: "var(--color-orange)",
  amber: "var(--color-amber)",
  "teal-light": "var(--color-teal-light)",
  yellow: "var(--color-yellow)",
};

// Tints an accent token toward transparent — shared basis for badge fills
// so it isn't hand-derived per component.
export function accentMix(accent: CaseStudyAccent, percent: number): string {
  return `color-mix(in srgb, ${ACCENT_VAR[accent]} ${percent}%, transparent)`;
}

// The CMS has no per-card accent field — only a category slug — so accent is derived
// from category here, once, for every card-rendering component to share.
const CATEGORY_ACCENT: Record<string, CaseStudyAccent> = {
  fintech: "blue-light",
  marketplace: "orange",
  "ai-enablement": "amber",
  design: "yellow",
};

export function categoryAccent(categorySlug: string): CaseStudyAccent {
  return CATEGORY_ACCENT[categorySlug] ?? "teal-light";
}
