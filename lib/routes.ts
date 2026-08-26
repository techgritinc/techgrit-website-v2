// Route paths reused across multiple files (nav links, footer links, pathname checks).
// Change a route here once instead of hunting down every hardcoded string that uses it.
export const ROUTES = {
  about: "/about",
  aboutOurStory: "/about/our-story",
  aboutLeadership: "/about/leadership-advisory",
  careers: "/careers",
  caseStudies: "/insights/case-studies",
  industriesConstruction: "/industries/construction",
  contactUs: "/contact-us",
} as const;

// Case Studies is the only route above with per-item detail pages — this builds that one
// dynamic path so callers don't each re-concatenate `${ROUTES.caseStudies}/<slug>/` by hand.
export function caseStudyDetailRoute(slug: string): string {
  return `${ROUTES.caseStudies}/${slug}/`;
}
