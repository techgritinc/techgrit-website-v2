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

export function toBlogSection(section: StrapiBlogSection): BlogSectionData {
  const posts: BlogTeaserPost[] = section.blogs.map((post) => ({
    id: String(post.id),
    topic: post.blog_category?.name ?? "",
    title: post.title,
    excerpt: post.subtitle ?? "",
    ctaLabel: post.ctaLabel ?? "",
    ctaLink: post.ctaLink ?? "",
    image: toFeatureImage(post.assets),
  }));

  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    viewAllLabel: section.viewTheBlogLabel,
    viewAllLink: section.viewTheBlogLink,
    posts,
  };
}
