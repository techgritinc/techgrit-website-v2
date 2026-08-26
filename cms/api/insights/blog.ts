import { fetchCms } from "../fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import type {
  BlogAccentToken,
  BlogHeroContent,
  BlogPageContent,
  BlogPost,
  FeaturedPost,
  NewsletterPanelContent,
  PageSeo,
  PostAuthor,
  PostImage,
  Topic,
} from "@/app/insights/blog/_data/types";
import type {
  StrapiBlogAuthor,
  StrapiBlogHeroSection,
  StrapiBlogNewsletterSection,
  StrapiBlogPage,
  StrapiBlogPageSection,
  StrapiBlogPost,
  StrapiBlogSection,
  StrapiMedia,
  StrapiTabFiltersSection,
} from "../../types/blog-types";

const BLOG_ENDPOINT = "/api/pages/by-slug/blog";

// The CMS carries no accent field on a post — accents cycle by grid position,
// matching the Services precedent of cycling a fixed palette by index.
const ACCENTS: BlogAccentToken[] = ["blue-light", "orange", "amber", "teal-light", "blue", "yellow", "purple"];

const DEFAULT_SEO: PageSeo = {
  metaTitle: "Blog | TechGrit",
  metaDescription:
    "Field notes on agentic engineering, legacy modernization, and shipping industrial-grade software in weeks — written by the team building it.",
};

const DEFAULT_HERO: BlogHeroContent = {
  eyebrow: "The TechGrit Blog",
  heading: "Insights from the AI-first frontier.",
  headingHighlight: "AI-first frontier.",
  lead: "Field notes on agentic engineering, legacy modernization, and shipping industrial-grade software in weeks — written by the team building it.",
};

const DEFAULT_FEATURED_POST: FeaturedPost = {
  topic: "Featured · Engineering",
  title:
    "The end of the manual SDLC: how agentic orchestration rewrites the way software gets built.",
  excerpt:
    "For thirty years we optimized the handoffs between humans. The next leap isn't a faster handoff — it's removing it. Here's how orchestrated agents collapse the build loop without giving up engineering rigor.",
  author: {
    name: "Arjun Rao",
    role: "Principal Engineer",
    initials: "AR",
  },
  readTime: "9 min read",
  ctaLabel: "Read article",
  href: "#",
  image: null,
};

const DEFAULT_TOPICS: Topic[] = [
  { label: "All", value: "all" },
  { label: "Engineering", value: "engineering" },
  { label: "Modernization", value: "modernization" },
  { label: "Product", value: "product" },
  { label: "Methodology", value: "methodology" },
  { label: "Industry", value: "industry" },
  { label: "Design", value: "design" },
];

const DEFAULT_POSTS: BlogPost[] = [
  {
    slug: "legacy-modernization-stalling-ai-first-fix",
    topic: "Modernization",
    accent: "blue-light",
    title: "Why your legacy modernization keeps stalling — and the AI-first fix",
    excerpt:
      "Most rewrites die in the gap between 'understand the old system' and 'ship the new one'. Agentic delivery closes it.",
    author: { name: "Priya Nair", initials: "PN" },
    publishDate: "Oct 2",
    readTime: "7 min read",
    href: "#",
    image: null,
  },
  {
    slug: "inside-orbitai-orchestrating-specialized-agents",
    topic: "Product",
    accent: "orange",
    title: "Inside OrbitAI: orchestrating specialized agents across the build",
    excerpt:
      "A look under the hood at how UI, logic, data, and QA agents coordinate — and where humans stay firmly in the loop.",
    author: { name: "Arjun Rao", initials: "AR" },
    publishDate: "Sep 24",
    readTime: "8 min read",
    href: "#",
    image: null,
  },
  {
    slug: "six-weeks-to-production-sprint-to-scale-playbook",
    topic: "Methodology",
    accent: "amber",
    title: "From six weeks to production: the sprint-to-scale playbook",
    excerpt:
      "The exact cadence we use to take an idea to industrial-grade software in six weeks, broken down week by week.",
    author: { name: "Marcus Lee", initials: "ML" },
    publishDate: "Sep 15",
    readTime: "6 min read",
    href: "#",
    image: null,
  },
  {
    slug: "human-in-the-loop-governing-ai-generated-code",
    topic: "Engineering",
    accent: "teal-light",
    title: "Human-in-the-loop: governing AI-generated code at enterprise scale",
    excerpt:
      "Speed without governance is a liability. How we keep audit trails, reviews, and accountability intact at agent speed.",
    author: { name: "Sara Whitman", initials: "SW" },
    publishDate: "Sep 6",
    readTime: "9 min read",
    href: "#",
    image: null,
  },
  {
    slug: "fintech-compliance-ai-first-build-pipeline",
    topic: "Industry",
    accent: "blue",
    title: "FinTech compliance in an AI-first build pipeline",
    excerpt:
      "SOC 2, PCI, and SCIM don't have to slow you down. Building compliance into the pipeline instead of bolting it on.",
    author: { name: "Devin Park", initials: "DP" },
    publishDate: "Aug 28",
    readTime: "7 min read",
    href: "#",
    image: null,
  },
  {
    slug: "design-thinking-meets-agentic-delivery",
    topic: "Design",
    accent: "yellow",
    title: "Design-thinking meets agentic delivery",
    excerpt:
      "Great products still start with empathy. How design research shapes what the agents actually build.",
    author: { name: "Lena Cho", initials: "LC" },
    publishDate: "Aug 19",
    readTime: "5 min read",
    href: "#",
    image: null,
  },
  {
    slug: "testing-strategies-agent-generated-codebases",
    topic: "Engineering",
    accent: "purple",
    title: "Testing strategies for agent-generated codebases",
    excerpt:
      "When code is written at machine speed, your test pyramid is the safety net. What changes, and what doesn't.",
    author: { name: "Arjun Rao", initials: "AR" },
    publishDate: "Aug 11",
    readTime: "8 min read",
    href: "#",
    image: null,
  },
  {
    slug: "strangler-fig-pattern-revisited-ai-era",
    topic: "Modernization",
    accent: "blue-light",
    title: "The strangler-fig pattern, revisited for the AI era",
    excerpt:
      "Incremental migration is still the right call. Agents just let you run far more strangler branches in parallel.",
    author: { name: "Priya Nair", initials: "PN" },
    publishDate: "Aug 3",
    readTime: "6 min read",
    href: "#",
    image: null,
  },
  {
    slug: "shipping-trust-measuring-quality-beyond-coverage",
    topic: "Product",
    accent: "orange",
    title: "Shipping trust: how we measure quality beyond test coverage",
    excerpt:
      "Coverage is table stakes. The signals we actually watch to know an AI-first build is production-ready.",
    author: { name: "Marcus Lee", initials: "ML" },
    publishDate: "Jul 25",
    readTime: "7 min read",
    href: "#",
    image: null,
  },
];

const DEFAULT_NEWSLETTER: NewsletterPanelContent = {
  heading: "Get the next post in your inbox.",
  copy: "One thoughtful email when we publish — agentic engineering, modernization playbooks, and lessons from real builds. No noise.",
  ctaLabel: "Subscribe",
  placeholder: "Your work email",
  helperText: "We'll only email when there's something worth reading.",
  errorText: "Please enter a valid email.",
  successText: "You're subscribed — talk soon.",
};

// Last-resort fallback if the CMS is genuinely unreachable — the Blog page
// degrades to the same static content it shipped with before CMS integration,
// rather than crashing the page, matching the header/footer/home/services fallback precedent.
export const DEFAULT_BLOG_DATA: BlogPageContent = {
  seo: DEFAULT_SEO,
  hero: DEFAULT_HERO,
  featuredPost: DEFAULT_FEATURED_POST,
  topics: DEFAULT_TOPICS,
  posts: DEFAULT_POSTS,
  newsletter: DEFAULT_NEWSLETTER,
};

function pickHeroSection(sections: StrapiBlogPageSection[]): StrapiBlogHeroSection | undefined {
  return sections.find((s): s is StrapiBlogHeroSection => s.__component === "page-reusable-sections.hero");
}

function pickBlogSections(sections: StrapiBlogPageSection[]): StrapiBlogSection[] {
  return sections.filter((s): s is StrapiBlogSection => s.__component === "home.blog-section");
}

function pickTabFiltersSection(sections: StrapiBlogPageSection[]): StrapiTabFiltersSection | undefined {
  return sections.find((s): s is StrapiTabFiltersSection => s.__component === "page-reusable-sections.tab-filters");
}

function pickNewsletterSection(sections: StrapiBlogPageSection[]): StrapiBlogNewsletterSection | undefined {
  return sections.find((s): s is StrapiBlogNewsletterSection => s.__component === "page-reusable-sections.newsletter");
}

// The CMS's own `readTime` field is a mistyped datetime, not a display string —
// the real "N min read" text is embedded in `subtitle` after " · ". Split it back
// into the excerpt/readTime pair the page components expect.
function splitExcerptAndReadTime(subtitle: string): { excerpt: string; readTime: string } {
  const separator = " · ";
  const index = subtitle.lastIndexOf(separator);
  if (index === -1) return { excerpt: subtitle, readTime: "" };
  return { excerpt: subtitle.slice(0, index), readTime: subtitle.slice(index + separator.length) };
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatPublishDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
}

function toAuthor(author: StrapiBlogAuthor | null): PostAuthor {
  const name = author?.name ?? "";
  return { name, role: author?.designation ?? "", initials: initialsFromName(name) };
}

// Mirrors the Services precedent (`cms/api/services.ts`'s `toImage`) — pick the
// smallest Strapi-generated format that's still adequate for where the image
// renders, falling back to null so components keep their existing placeholder
// treatment when a post has no image asset.
function toImage(assets: StrapiMedia[], preferred: (keyof NonNullable<StrapiMedia["formats"]>)[]): PostImage | null {
  const first = assets[0];
  if (!first) return null;
  const asset = pickMediaAsset(first, preferred);
  return {
    url: resolveMediaUrl(asset.url),
    alternativeText: first.alternativeText ?? "",
    width: asset.width,
    height: asset.height,
  };
}

function toHero(section: StrapiBlogHeroSection | undefined): BlogHeroContent {
  if (!section) return DEFAULT_HERO;
  return {
    eyebrow: section.badgeLabel,
    heading: section.title,
    headingHighlight: section.highlightTitle,
    lead: section.subtitle,
  };
}

function toFeaturedPost(post: StrapiBlogPost | undefined): FeaturedPost {
  if (!post) return DEFAULT_FEATURED_POST;
  const { excerpt, readTime } = splitExcerptAndReadTime(post.subtitle);
  return {
    topic: `Featured · ${post.blog_category?.name ?? ""}`,
    title: post.title,
    excerpt,
    author: toAuthor(post.author),
    readTime,
    ctaLabel: post.ctaLabel,
    href: post.ctaLink,
    image: toImage(post.assets, ["medium", "small"]),
  };
}

function toGridPosts(section: StrapiBlogSection | undefined): BlogPost[] {
  if (!section) return DEFAULT_POSTS;
  return section.blogs.map((post, index) => {
    const { excerpt, readTime } = splitExcerptAndReadTime(post.subtitle);
    const author = toAuthor(post.author);
    return {
      slug: String(post.id),
      topic: post.blog_category?.name ?? "",
      accent: ACCENTS[index % ACCENTS.length],
      title: post.title,
      excerpt,
      author: { name: author.name, initials: author.initials },
      publishDate: formatPublishDate(post.publishDatetime),
      readTime,
      href: post.ctaLink,
      image: toImage(post.assets, ["small", "medium", "thumbnail"]),
    };
  });
}

function toTopics(section: StrapiTabFiltersSection | undefined): Topic[] {
  if (!section) return DEFAULT_TOPICS;
  return section.TabItems.map((item) => ({ label: item.label, value: item.value }));
}

// `errorText`/`successText` are pure client-side validation copy with no CMS
// field to source from, so they always fall back to the static defaults.
function toNewsletter(section: StrapiBlogNewsletterSection | undefined): NewsletterPanelContent {
  if (!section) return DEFAULT_NEWSLETTER;
  return {
    heading: section.title,
    copy: section.subtitle,
    ctaLabel: section.ctaLabel,
    placeholder: section.ctaFormFields[0]?.placeholder ?? DEFAULT_NEWSLETTER.placeholder,
    helperText: section.extraTitle,
    errorText: DEFAULT_NEWSLETTER.errorText,
    successText: DEFAULT_NEWSLETTER.successText,
  };
}

// Called directly from the (async) Blog Server Component (await getBlogData()) —
// runs on the server for every request, so CMS edits show up on the next page load
// with no rebuild. Each section degrades independently to its own default when
// absent from the dynamic zone; the whole page degrades to DEFAULT_BLOG_DATA only
// if the CMS is entirely unreachable.
//
// `category` is the CMS category slug (a Topic's `value`, e.g. "engineering") and is
// forwarded straight to the API's own `?category=` filter — the CMS returns the grid's
// `blogs[]` already filtered, while `hero`/`tab-filters`/`newsletter` come back
// untouched, so no client-side filtering of the post list is needed or done here.
export async function getBlogData(category?: string): Promise<BlogPageContent> {
  const endpoint = category && category !== "all" ? `${BLOG_ENDPOINT}?category=${encodeURIComponent(category)}` : BLOG_ENDPOINT;
  const data = await fetchCms<StrapiBlogPage>(endpoint);
  if (!data) return DEFAULT_BLOG_DATA;

  const sections = data.sections ?? [];
  const heroSection = pickHeroSection(sections);
  const blogSections = pickBlogSections(sections);
  const featuredSection = blogSections.find((s) => s.blogs.some((b) => b.isFeatured));
  const gridSection = blogSections.find((s) => s !== featuredSection) ?? blogSections[0];
  const tabFiltersSection = pickTabFiltersSection(sections);
  const newsletterSection = pickNewsletterSection(sections);

  return {
    seo: data.seo ?? DEFAULT_SEO,
    hero: toHero(heroSection),
    featuredPost: toFeaturedPost(featuredSection?.blogs.find((b) => b.isFeatured)),
    topics: toTopics(tabFiltersSection),
    posts: toGridPosts(gridSection),
    newsletter: toNewsletter(newsletterSection),
  };
}

