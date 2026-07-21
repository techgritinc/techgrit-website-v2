export type BlogAccentToken =
  | "blue-light" // --color-blue-light  (#38bdf8 — Modernization)
  | "orange" // --color-orange      (#E87722 — Product)
  | "amber" // --color-amber       (#F59E0B — Methodology)
  | "teal-light" // --color-teal-light  (#2dd4bf — Engineering)
  | "blue" // --color-blue        (#0284C7 — Industry)
  | "yellow" // --color-yellow      (#fbbf24 — Design)
  | "purple"; // --color-purple      (#a78bfa — Engineering, second accent)

export interface PostAuthor {
  name: string;
  role: string; // FeaturedPost only — e.g. "Principal Engineer"
  initials: string;
}

export interface BlogHeroContent {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  lead: string;
}

export interface FeaturedPost {
  topic: string;
  title: string;
  excerpt: string;
  author: PostAuthor;
  readTime: string;
  ctaLabel: string;
  href: string;
}

export interface BlogPost {
  topic: string;
  accent: BlogAccentToken;
  title: string;
  excerpt: string;
  author: Pick<PostAuthor, "name" | "initials">;
  publishDate: string;
  readTime: string;
  href: string;
}

export interface NewsletterPanelContent {
  heading: string;
  copy: string;
  ctaLabel: string;
  helperText: string;
  errorText: string;
  successText: string;
}

export interface BlogPageContent {
  hero: BlogHeroContent;
  featuredPost: FeaturedPost;
  topics: string[];
  posts: BlogPost[];
  newsletter: NewsletterPanelContent;
}
