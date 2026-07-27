import type { CaseStudyAccent } from "./types";

// Maps each case-study accent to its design token — the single source of
// truth for accent color everywhere a case-study card renders (metric
// numbers, industry dots, cover gradients, glow blobs).
export const ACCENT_VAR: Record<CaseStudyAccent, string> = {
  "blue-light": "var(--color-blue-light)",
  blue: "var(--color-blue)",
  orange: "var(--color-orange)",
  amber: "var(--color-amber)",
  "teal-light": "var(--color-teal-light)",
  yellow: "var(--color-yellow)",
};

// Tints an accent token toward transparent — shared basis for badge fills,
// cover gradients, and glow blobs so each isn't hand-derived per component.
export function accentMix(accent: CaseStudyAccent, percent: number): string {
  return `color-mix(in srgb, ${ACCENT_VAR[accent]} ${percent}%, transparent)`;
}

// Decorative panel background for the spotlighted featured card.
export function accentPanelGradient(accent: CaseStudyAccent): string {
  return `linear-gradient(150deg, ${accentMix(accent, 18)}, ${accentMix(accent, 6)})`;
}

// Light-tone accent to pair with each accent's deeper companion tone, used
// by the featured card's two-hue panel gradient below.
const ACCENT_COMPANION: Partial<Record<CaseStudyAccent, CaseStudyAccent>> = {
  "blue-light": "blue",
};

// Two-hue panel background for the spotlighted featured card (pairs an
// accent's light tone with its deeper companion tone; falls back to a
// single-hue mix for accents with no established companion).
export function accentFeaturedPanelGradient(accent: CaseStudyAccent): string {
  const companion = ACCENT_COMPANION[accent] ?? accent;
  return `linear-gradient(150deg, ${accentMix(accent, 18)}, ${accentMix(companion, 6)})`;
}

// Cover background for teaser grid cards.
export function accentCoverGradient(accent: CaseStudyAccent): string {
  return `linear-gradient(150deg, ${accentMix(accent, 20)}, ${accentMix(accent, 4)})`;
}

// Soft circular glow blob layered over a cover/panel.
export function accentGlow(accent: CaseStudyAccent): string {
  return accentMix(accent, 22);
}
