// Static content shape for the job detail page. Mirrors the CMS's own job-detailed-view
// component family (job-header / summary / key-responsibilities / responsibility-group /
// responsibility-items / qualifications) one-for-one, so wiring a real CMS fetch in later is a
// mapper swap, not a reshape: `JobDetailSection.heading` is a `key-responsibilities`/
// `qualifications`-style title, and each `BodyBlock` is one `responsibility-group` entry
// (a `bullets` block) or one `summary`-style paragraph.

export type JobDetailHeader = {
  badgeLabel: string;
  title: string;
  ctaLabel: string;
  ctaLink: string;
  jobType: string;
  location: string;
  publishedDate: string;
};

export type BodyBlock =
  | { kind: "paragraph"; subheading: string | null; text: string }
  | { kind: "bullets"; subheading: string | null; items: string[] };

export type JobDetailSection = {
  heading: string;
  blocks: BodyBlock[];
};

export type JobDetailFinalCta = {
  title: string;
  titleHighlight: string | null;
  description: string;
  ctaLabel: string;
  ctaLink: string;
};

export type JobDetailContent = {
  seo: { title: string; description: string };
  header: JobDetailHeader;
  sections: JobDetailSection[];
  finalCta: JobDetailFinalCta;
};
