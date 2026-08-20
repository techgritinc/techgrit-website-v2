import { resolveMediaUrl } from "../../utils/media";
import type { AnySection, StrapiMedia } from "./shared";
import type { StrapiStatisticsSection } from "./statistics";
import { parseStatValue } from "./statistics";

export type StrapiTestimonialAuthor = { id: number; name: string; designation: string | null };

export type StrapiTestimonial = {
  id: number;
  reviwerDescription: string;
  mediaType: "Video" | null;
  ratings: number | null;
  video: StrapiMedia | null;
  authors: StrapiTestimonialAuthor[];
};

export type StrapiReviewsSection = {
  id: number;
  title: string;
  subtitle: string;
  badgeLabel: string;
  testimonial: StrapiTestimonial[];
  __component: "home.reviews";
};

export type Testimonial = {
  id: string;
  type: "text" | "video";
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating?: number;
  videoUrl?: string | null;
};

export type TestimonialMetric = { id: string; value: string; suffix?: string; label: string };

export type ReviewsData = {
  badgeLabel: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  metrics: TestimonialMetric[];
};

export function pickReviewsSection(sections: AnySection[]): StrapiReviewsSection | undefined {
  return sections.find((s): s is StrapiReviewsSection => s.__component === "home.reviews");
}

export const DEFAULT_REVIEWS_DATA: ReviewsData = {
  badgeLabel: "What our clients say",
  title: "15+ webinars on AI-first engineering. And counting.",
  subtitle: "Over the past two years, TechGrit has hosted more than 15 webinars on AI-first engineering practices.",
  testimonials: [
    { id: "daniel-shore", type: "video", quote: "From prototype to production in six weeks.", name: "Daniel Shore", role: "Head of Growth, Lineflow", initials: "DS", videoUrl: null },
    {
      id: "jonas-berg",
      type: "text",
      quote: "Their design-thinking mindset combined with deep AI knowledge helped us go from prototype to production fast, without the usual handoffs.",
      name: "Jonas Berg",
      role: "Founder, FrameOps",
      initials: "JB",
      rating: 5,
    },
    {
      id: "priya-nair",
      type: "text",
      quote: "Simple, thoughtful changes doubled activation, and it only took weeks. The OrbitAI workflow is the real deal.",
      name: "Priya Nair",
      role: "VP Engineering, Northwind FinTech",
      initials: "PN",
      rating: 5,
    },
    {
      id: "marcus-lee",
      type: "text",
      quote: "TechGrit owned the outcome end to end. We shipped a modernized platform without ever taking the product down.",
      name: "Marcus Lee",
      role: "CTO, Atlas Build",
      initials: "ML",
      rating: 5,
    },
    { id: "sara-whitman", type: "video", quote: "AI agents, with real engineer oversight.", name: "Sara Whitman", role: "Product Lead, Meridian Health", initials: "SW", videoUrl: null },
    {
      id: "devin-park",
      type: "text",
      quote: "Real users, real data, real ROI in six weeks. Their agentic build process changed how our team ships software.",
      name: "Devin Park",
      role: "COO, Northstar Logistics",
      initials: "DP",
      rating: 5,
    },
  ],
  metrics: [
    { id: "projects-delivered", value: "500", suffix: "+", label: "Projects delivered" },
    { id: "would-refer", value: "100", suffix: "%", label: "Would refer" },
    { id: "avg-time-to-value", value: "6", suffix: "wk", label: "Avg. time to value" },
  ],
};

// Two-letter initials from a display name, for the testimonial avatar badge —
// "Arjun Rao" -> "AR", falling back to "TG" (TechGrit) when a name is absent.
function toInitials(name: string | undefined): string {
  if (!name) return "TG";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "TG";
}

export function toReviews(section: StrapiReviewsSection, metricsStat: StrapiStatisticsSection | undefined): ReviewsData {
  const testimonials: Testimonial[] = section.testimonial.map((item) => {
    const author = item.authors[0];
    return {
      id: String(item.id),
      type: item.mediaType === "Video" ? "video" : "text",
      quote: item.reviwerDescription,
      name: author?.name ?? "TechGrit Client",
      role: author?.designation ?? "",
      initials: toInitials(author?.name),
      rating: item.ratings ?? undefined,
      videoUrl: item.video ? resolveMediaUrl(item.video.url) : null,
    };
  });

  const metrics: TestimonialMetric[] = (metricsStat?.statistics ?? []).map((stat) => {
    const parsed = parseStatValue(stat.title, stat.highlightTitle);
    return {
      id: String(stat.id),
      value: parsed.count !== undefined ? String(parsed.count) : parsed.staticValue ?? stat.title,
      suffix: parsed.suffix,
      label: stat.subtitle ?? "",
    };
  });

  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    testimonials: testimonials.length > 0 ? testimonials : DEFAULT_REVIEWS_DATA.testimonials,
    metrics: metrics.length > 0 ? metrics : DEFAULT_REVIEWS_DATA.metrics,
  };
}
