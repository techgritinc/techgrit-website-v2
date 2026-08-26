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

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}
