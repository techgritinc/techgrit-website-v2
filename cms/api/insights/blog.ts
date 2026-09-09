import { fetchCms } from "../fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import { resolveBlogHref } from "../../shared/reusable-sections";
import type {
  BlogHeroContent,
  BlogPageContent,
  BlogPost,
  FeaturedPost,
  NewsletterPanelContent,
  PostAuthor,
  PostImage,
  Topic,
} from "@/app/insights/blog/_data/types";
import type {
  StrapiBlogAuthor,
  StrapiBlogReadTimeEntry,
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

const BLOG_READ_TIMES_ENDPOINT = "/api/blogs?populate=sections&pagination%5BpageSize%5D=100";

// `successText` is pure client-side copy — the CMS's newsletter component has no such
// field, so there's nothing to fetch (same precedent as cms/api/case-studies.ts).
const NEWSLETTER_SUCCESS_TEXT = "You're subscribed — talk soon.";

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


async function fetchReadTimes(): Promise<Map<string, string>> {
  // fetchCms already unwraps Strapi's `{ data }` envelope, so this resolves to the array.
  const posts = await fetchCms<StrapiBlogReadTimeEntry[]>(BLOG_READ_TIMES_ENDPOINT);
  const entries = new Map<string, string>();
  for (const entry of posts ?? []) {
    const readTime = entry.sections?.find((section) => section.readTime)?.readTime;
    if (entry.slug && readTime) entries.set(entry.slug, readTime);
  }
  return entries;
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatPublishDate(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(iso));
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

function toHero(section: StrapiBlogHeroSection | undefined): BlogHeroContent | undefined {
  if (!section) return undefined;
  return {
    eyebrow: section.badgeLabel,
    heading: section.title,
    headingHighlight: section.highlightTitle,
    lead: section.subtitle,
  };
}

function toFeaturedPost(
  post: StrapiBlogPost | undefined,
  readTimes: Map<string, string>
): FeaturedPost | undefined {
  if (!post) return undefined;
  return {
    topic: `Featured · ${post.blog_category?.name ?? ""}`,
    title: post.title,
    excerpt: post.subtitle,
    author: toAuthor(post.author),
    readTime: (post.slug && readTimes.get(post.slug)) || "",
    ctaLabel: post.ctaLabel ?? "Read more",
    href: resolveBlogHref(post.ctaLink, post.slug),
    image: toImage(post.assets, ["medium", "small"]),
  };
}

function toGridPosts(section: StrapiBlogSection | undefined, readTimes: Map<string, string>): BlogPost[] {
  if (!section) return [];
  return section.blogs.map((post) => {
    const author = toAuthor(post.author);
    return {
      slug: post.slug,
      id: String(post.id),
      topic: post.blog_category?.name ?? "",
      categorySlug: post.blog_category?.slug ?? "",
      title: post.title,
      excerpt: post.subtitle,
      author: { name: author.name, initials: author.initials },
      publishDate: formatPublishDate(post.publishDatetime),
      readTime: (post.slug && readTimes.get(post.slug)) || "",
      href: resolveBlogHref(post.ctaLink, post.slug),
      image: toImage(post.assets, ["small", "medium", "thumbnail"]),
    };
  });
}

function toTopics(section: StrapiTabFiltersSection | undefined): Topic[] {
  if (!section) return [];
  // `isDefault` comes back as `null` (not `false`) on every non-default tab.
  return section.TabItems.map((item) => ({ label: item.label, value: item.value, isDefault: Boolean(item.isDefault) }));
}

function toNewsletter(section: StrapiBlogNewsletterSection | undefined): NewsletterPanelContent | undefined {
  if (!section) return undefined;
  return {
    heading: section.title,
    copy: section.subtitle,
    ctaLabel: section.ctaLabel,
    placeholder: section.ctaFormFields[0]?.placeholder ?? "",
    helperText: section.extraTitle,
    successText: NEWSLETTER_SUCCESS_TEXT,
  };
}

// Called directly from the (async) Blog Server Component (await getBlogData()) —
// runs on the server for every request, so CMS edits show up on the next page load
// with no rebuild. Returns null only when the CMS itself is unreachable — the page
// then renders a 404 (see page.tsx), matching the Case Studies/Construction precedent.
// Any individual section absent from the dynamic zone is simply omitted from render;
// there is no static fallback content substituted in its place.
//
// `category` is the CMS category slug (a Topic's `value`, e.g. "engineering") and is
// forwarded straight to the API's own `?category=` filter — the CMS returns the grid's
// `blogs[]` already filtered, while `hero`/`tab-filters`/`newsletter` come back
// untouched, so no client-side filtering of the post list is needed or done here.
function blogEndpoint(category?: string): string {
  return category && category !== "all" ? `${BLOG_ENDPOINT}?category=${encodeURIComponent(category)}` : BLOG_ENDPOINT;
}

export async function getBlogData(category?: string): Promise<BlogPageContent | null> {
  let data = await fetchCms<StrapiBlogPage>(blogEndpoint(category));
  if (!data) return null;

  const initialDefault = toTopics(pickTabFiltersSection(data.sections ?? [])).find((t) => t.isDefault)?.value;
  if (!category && initialDefault && initialDefault !== "all") {
    data = (await fetchCms<StrapiBlogPage>(blogEndpoint(initialDefault))) ?? data;
  }

  const sections = data.sections ?? [];
  const heroSection = pickHeroSection(sections);
  const blogSections = pickBlogSections(sections);
  const featuredSection = blogSections.find((s) => s.blogs.some((b) => b.isFeatured));
  const gridSection = blogSections.find((s) => s !== featuredSection) ?? blogSections[0];
  const tabFiltersSection = pickTabFiltersSection(sections);
  const newsletterSection = pickNewsletterSection(sections);
  const topics = toTopics(tabFiltersSection);
  const readTimes = await fetchReadTimes();

  return {
    seo: { metaTitle: data.seo?.metaTitle ?? "", metaDescription: data.seo?.metaDescription ?? "" },
    hero: toHero(heroSection),
    featuredPost: toFeaturedPost(
      featuredSection?.blogs.find((b) => b.isFeatured),
      readTimes
    ),
    topics,
    defaultCategory: topics.find((topic) => topic.isDefault)?.value ?? topics[0]?.value ?? "all",
    posts: toGridPosts(gridSection, readTimes),
    newsletter: toNewsletter(newsletterSection),
  };
}

