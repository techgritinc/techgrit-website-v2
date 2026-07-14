export type NavChild = {
  label: string;
  href: string;
  dotColorVar: string;
};

export type NavItem = {
  label: string;
  href: string | null;
  matchPaths?: string[];
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  {
    label: "Industries",
    href: null,
    children: [
      { label: "Construction", href: "/construction", dotColorVar: "--color-yellow" },
      { label: "FinTech", href: "/#industries", dotColorVar: "--color-blue-light" },
      { label: "Healthcare", href: "/#industries", dotColorVar: "--color-teal-light" },
    ],
  },
  {
    label: "Resources",
    href: null,
    children: [
      { label: "Webinar", href: "/webinar", dotColorVar: "--color-amber-light" },
      { label: "Case Studies", href: "/case-studies", dotColorVar: "--color-blue-light" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const NAV_CTA = { label: "Talk to Us", href: "/contact" };
