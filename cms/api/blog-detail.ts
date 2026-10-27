import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCtaBanner } from "../shared/reusable-sections";
import {
  formatPublishedDate,
  mapCapabilityGrid,
  mapContentSectionItem,
  mapImage,
  mapKeyResponsibilities,
  mapServiceDetail,
  mapSummary,
  splitParagraphs,
} from "../shared/article-sections";
import { ROUTES } from "@/lib/routes";
import type { StrapiCtaBannerSection } from "../shared/reusable-sections";
import type {
  NarrativeBlockEntry,
  StrapiContentSectionsSection,
  StrapiKeyResponsibilitiesSection,
  StrapiPdModernizationCapabilitiesSection,
  StrapiServiceDetailSection,
  StrapiSummarySection,
} from "../types/case-study-detail-types";
import type {
  BlogArticleHeader,
  BlogDetailPageContent,
  BlogDetailSectionEntry,
  StrapiBlogContentSection,
  StrapiBlogDetailPage,
  StrapiBlogDetailSection,
} from "../types/blog-detail-types";

function blogDetailEndpoint(slug: string): string {
  return `/api/blogs/by-slug/${encodeURIComponent(slug)}`;
}

function pickArticleMeta(sections: StrapiBlogDetailSection[]): { publishedDate: string | null; readTime: string } {
  const withMeta = sections.find(
    (section): section is StrapiBlogContentSection =>
      section.__component === "blog-detailed-view.blog-content" &&
      Boolean((section as StrapiBlogContentSection).publishedDate ?? (section as StrapiBlogContentSection).readTime)
  );
  return { publishedDate: withMeta?.publishedDate ?? null, readTime: withMeta?.readTime ?? "" };
}

function mapHeader(cms: StrapiBlogDetailPage): BlogArticleHeader {
  const meta = pickArticleMeta(cms.sections ?? []);
  return {
    categoryLabel: cms.blog_category?.name ?? "",
    categorySlug: cms.blog_category?.slug ?? "",
    title: cms.title,
    publishedDate: formatPublishedDate(meta.publishedDate ?? cms.publishDatetime),
    readTime: meta.readTime,
    // Navigation constants, not content — the endpoint carries no back-link fields.
    allPostsLabel: "All Blogs",
    allPostsUrl: `${ROUTES.blog}/`,
  };
}

function mapBlogContent(
  cms: StrapiBlogContentSection,
  order: number,
  articleTitle: string
): NarrativeBlockEntry[] {
  return cms.contentBlocks.map((block, blockIndex) => {
    const title = block.title?.trim() ?? "";
    return {
      type: "narrativeBlock",
      order: order * 100 + blockIndex,
      title: title === articleTitle.trim() ? "" : title,
      paragraphs: splitParagraphs(block.subtitle),
      extraTitle: block.extraTitle?.trim() || null,
      features: block.articleBlocks.map((articleBlock, articleIndex) => ({
        order: articleIndex + 1,
        title: articleBlock.title?.trim() ?? "",
        subtitle: articleBlock.description,
        description: articleBlock.content?.length ? articleBlock.content : null,
        table: null,
        ctaLabel: null,
        ctaLink: null,
        icon: null,
        images: articleBlock.image.map((asset) => mapImage(asset, ["large"])),
      })),
      images: [],
    };
  });
}

function mapBlogDetailSections(
  sections: StrapiBlogDetailSection[],
  articleTitle: string
): BlogDetailSectionEntry[] {
  return sections.flatMap((section, index): BlogDetailSectionEntry[] => {
    const order = index + 1;
    switch (section.__component) {
      case "blog-detailed-view.blog-content":
        return mapBlogContent(section as StrapiBlogContentSection, order, articleTitle);
      case "job-detailed-view.summary":
        return [mapSummary(section as StrapiSummarySection, order)];
      case "job-detailed-view.key-responsibilities":
        return [mapKeyResponsibilities(section as StrapiKeyResponsibilitiesSection, order)];
      case "case-study-detailed-view.content-section":
        return (section as StrapiContentSectionsSection).ContentSection.map(mapContentSectionItem);
      case "page-reusable-sections.service-detail":
        return [mapServiceDetail(section as StrapiServiceDetailSection, order)];
      case "page-reusable-sections.pd-modernization-capabilities":
        return [mapCapabilityGrid(section as StrapiPdModernizationCapabilitiesSection, order)];
      case "page-reusable-sections.cta-banner":
        return [{ type: "finalCta", order, ...mapCtaBanner(section as StrapiCtaBannerSection) }];
      default:
        return [];
    }
  });
}

// Request-deduped so generateMetadata and the page body share one CMS call. Returns null
// when the endpoint has no such post (the route then renders notFound()) — including for
// slugs that appear on the list page but have no detail record of their own.
export const getBlogDetailPageContent = cache(async (slug: string): Promise<BlogDetailPageContent | null> => {
  const data = await fetchCms<StrapiBlogDetailPage>(blogDetailEndpoint(slug));
  if (!data) return null;

  return {
    seo: {
      // The endpoint's seo block is entirely null on every current post, so the post's own
      // title/subtitle stand in rather than shipping empty meta tags.
      metaTitle: data.seo?.metaTitle ?? data.title,
      metaDescription: data.seo?.metaDescription ?? data.subtitle ?? "",
    },
    header: mapHeader(data),
    sections: mapBlogDetailSections(data.sections ?? [], data.title),
  };
});
