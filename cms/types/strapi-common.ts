// Generic Strapi media shapes, shared by every CMS-driven feature (header today;
// construction and future pages next) — kept here once instead of duplicated per feature.
export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiMedia = {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  mime?: string;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
};

// Every page's raw `{ data: { seo, sections } }` response shares this exact `seo` shape and
// this exact catch-all for a dynamic-zone entry with no mapper yet — declared once here
// instead of redeclared per page's own types file.
export type StrapiSeo = {
  metaTitle: string | null;
  metaDescription: string | null;
} | null;

export type StrapiUnmappedSection = { __component: string };

export type StrapiBlocksText = {
  type: "text";
  text: string;
  bold?: boolean;
};

// Inline link inside a paragraph's or list-item's children, e.g. a "Contact TechGrit"
// anchor mid-sentence. `url` is whatever the CMS editor entered (a site-relative
// "/contact-us/" or an absolute URL).
export type StrapiBlocksLink = {
  type: "link";
  url: string;
  children: StrapiBlocksText[];
};

export type StrapiBlocksInline = StrapiBlocksText | StrapiBlocksLink;

export type StrapiBlocksListItem = {
  type: "list-item";
  children: StrapiBlocksInline[];
};

export type StrapiBlocksList = {
  type: "list";
  format: "ordered" | "unordered";
  children: StrapiBlocksListItem[];
};

export type StrapiBlocksParagraph = {
  type: "paragraph";
  children: StrapiBlocksInline[];
};

export type StrapiBlocksNode = StrapiBlocksList | StrapiBlocksParagraph;
export type StrapiBlocksContent = StrapiBlocksNode[];

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}
