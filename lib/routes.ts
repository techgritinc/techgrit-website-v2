// Route paths reused across multiple files (nav links, footer links, pathname checks).
// Change a route here once instead of hunting down every hardcoded string that uses it.
export const ROUTES = {
  about: "/about",
  careers: "/careers",
  caseStudies: "/case-studies",
  industriesConstruction: "/industries/construction",
  contactUs: "/contact-us",
} as const;
