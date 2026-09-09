// Route paths reused across multiple files (nav links, footer links, pathname checks).
// Change a route here once instead of hunting down every hardcoded string that uses it.
export const ROUTES = {
  about: "/about",
  aboutOurStory: "/about/our-story",
  aboutLeadership: "/about/leadership-advisory",
  careers: "/careers",
  caseStudies: "/insights/case-studies",
  blog: "/insights/blog",
  industriesConstruction: "/industries/construction",
  contactUs: "/contact-us",
} as const;

// Case Studies and Blog are the routes above with per-item detail pages — these build those
// dynamic paths so callers don't each re-concatenate `${ROUTES.<x>}/<slug>/` by hand.
export function caseStudyDetailRoute(slug: string): string {
  return `${ROUTES.caseStudies}/${slug}/`;
}

export function blogDetailRoute(slug: string): string {
  return `${ROUTES.blog}/${slug}/`;
}
