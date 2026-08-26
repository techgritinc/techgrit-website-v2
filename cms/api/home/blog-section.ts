import type { AnySection, HomeIcon, StrapiMedia } from "./shared";
import { toFeatureImage } from "./shared";

export type StrapiBlogCategory = { id: number; name: string };

export type StrapiBlogPost = {
  id: number;
  title: string;
  subtitle: string | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  assets: StrapiMedia[];
  blog_category: StrapiBlogCategory | null;
};

export type StrapiBlogSection = {
  id: number;
  title: string;
  badgeLabel: string;
  viewTheBlogLabel: string;
  viewTheBlogLink: string;
  blogs: StrapiBlogPost[];
  __component: "home.blog-section";
};

export type BlogTeaserPost = {
  id: string;
  topic: string;
  title: string;
  excerpt: string;
  ctaLabel: string;
  ctaLink: string;
  image: HomeIcon | null;
};

export type BlogSectionData = {
  badgeLabel: string;
  title: string;
  viewAllLabel: string;
  viewAllLink: string;
  posts: BlogTeaserPost[];
};

export function pickBlogSection(sections: AnySection[]): StrapiBlogSection | undefined {
  return sections.find((s): s is StrapiBlogSection => s.__component === "home.blog-section");
}

export const DEFAULT_BLOG_SECTION_DATA: BlogSectionData = {
  badgeLabel: "From the blog",
  title: "Perspectives on AI-first delivery.",
  viewAllLabel: "Visit the blog",
  viewAllLink: "/insights/blog",
  posts: [
    {
      id: "ai-first-sdlc",
      topic: "AI-First SDLC",
      title: "From Copilot to Agentic: what changes when AI owns the SDLC.",
      excerpt: "Autonomous agents don't just suggest code — they own entire domains of the software lifecycle.",
      ctaLabel: "Read More",
      ctaLink: "/insights/blog",
      image: null,
    },
    {
      id: "sprint-to-scale",
      topic: "Engineering",
      title: "Six weeks to production: what makes the Sprint-to-Scale framework work.",
      excerpt: "A look inside the four-phase framework that turns a prompt into a shipped product.",
      ctaLabel: "Read More",
      ctaLink: "/insights/blog",
      image: null,
    },
    {
      id: "qa-agent",
      topic: "Quality",
      title: "The QA agent: what happens when tests write themselves.",
      excerpt: "Coverage moves from a lagging indicator to a real-time signal when quality is agent-owned.",
      ctaLabel: "Know More",
      ctaLink: "/insights/blog",
      image: null,
    },
  ],
};

export function toBlogSection(section: StrapiBlogSection): BlogSectionData {
  const posts: BlogTeaserPost[] = section.blogs.map((post) => ({
    id: String(post.id),
    topic: post.blog_category?.name ?? "",
    title: post.title,
    excerpt: post.subtitle ?? "",
    ctaLabel: post.ctaLabel ?? "Read More",
    ctaLink: post.ctaLink ?? "/insights/blog",
    image: toFeatureImage(post.assets),
  }));

  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    viewAllLabel: section.viewTheBlogLabel,
    viewAllLink: section.viewTheBlogLink,
    posts: posts.length > 0 ? posts : DEFAULT_BLOG_SECTION_DATA.posts,
  };
}
