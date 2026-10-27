import type {
  StrapiBlocksContent,
  StrapiMedia,
  StrapiSeo,
  StrapiUnmappedSection,
} from "./strapi-common";
import type { StrapiCtaBannerSection } from "../shared/reusable-sections";
import type {
  CaseStudyDetailSectionEntry,
  StrapiContentSectionsSection,
  StrapiKeyResponsibilitiesSection,
  StrapiPdModernizationCapabilitiesSection,
  StrapiServiceDetailSection,
  StrapiSummarySection,
} from "./case-study-detail-types";

// ---------------------------------------------------------------------------
// Strapi shapes — /api/blogs/by-slug/<slug>
// ---------------------------------------------------------------------------

// One prose unit inside a blog-content block: an optional sub-heading, an optional
// rich-text body, and optional inline images. `description` has been null on every blog
// observed so far; it is mapped through anyway so it appears if an editor fills it in.
export type StrapiBlogArticleBlock = {
  id: number;
  title: string | null;
  content: StrapiBlocksContent | null;
  description: string | null;
  image: StrapiMedia[];
};

export type StrapiBlogContentBlock = {
  id: number;
  title: string | null;
  subtitle: string | null;
  extraTitle: string | null;
  articleBlocks: StrapiBlogArticleBlock[];
};

// The blog-only dynamic-zone component. `publishedDate`/`readTime` are populated on the
// first occurrence and null on the rest, so they are article-level metadata that happens to
// be nested in a section rather than per-section fields.
export type StrapiBlogContentSection = {
  __component: "blog-detailed-view.blog-content";
  publishedDate: string | null;
  readTime: string | null;
  contentBlocks: StrapiBlogContentBlock[];
};

// All but one of the components a blog can carry are already modelled for the Case Study and
// Job detail pages — reused verbatim rather than redeclared.
export type StrapiBlogDetailSection =
  | StrapiBlogContentSection
  | StrapiSummarySection
  | StrapiKeyResponsibilitiesSection
  | StrapiContentSectionsSection
  | StrapiServiceDetailSection
  | StrapiPdModernizationCapabilitiesSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiBlogDetailCategory = {
  name: string;
  slug: string;
};

export type StrapiBlogDetailPage = {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  publishDatetime: string | null;
  assets: StrapiMedia[];
  blog_category: StrapiBlogDetailCategory | null;
  seo: StrapiSeo | null;
  sections: StrapiBlogDetailSection[] | null;
};

// ---------------------------------------------------------------------------
// Presentational shapes
// ---------------------------------------------------------------------------

// Deliberately not a "hero": a blog post reads as one continuous article, so this is the
// article's own masthead (back-link, category, title, cover image) sitting at the top of the
// same single column the body flows down, not a separate two-column hero band. No author
// byline either — the post's own author name/role/photo are not shown on the detail page.
export interface BlogArticleHeader {
  categoryLabel: string;
  categorySlug: string;
  title: string;
  publishedDate: string;
  readTime: string;
  allPostsLabel: string;
  allPostsUrl: string;
}

// The blog body reuses the Case Study detail page's own section entries — the four shared
// CMS components map to exactly the same presentational shapes, and blog-content maps onto
// `narrativeBlock` too (see mapBlogContent), so no blog-specific entry type is needed.
export type BlogDetailSectionEntry = CaseStudyDetailSectionEntry;

export interface BlogDetailPageContent {
  seo: { metaTitle: string; metaDescription: string };
  header: BlogArticleHeader;
  sections: BlogDetailSectionEntry[];
}
