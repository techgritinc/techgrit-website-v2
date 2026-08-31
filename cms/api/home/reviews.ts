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
  videoDuration: string | null;
  verificationStatus: string | null;
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
  videoDuration?: string;
  verified: boolean;
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

// Two-letter initials from a display name, for the testimonial avatar badge —
// "Arjun Rao" -> "AR"; empty when a name is absent.
function toInitials(name: string | undefined): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("");
}

export function toReviews(section: StrapiReviewsSection, metricsStat: StrapiStatisticsSection | undefined): ReviewsData {
  const testimonials: Testimonial[] = section.testimonial.map((item) => {
    const author = item.authors[0];
    return {
      id: String(item.id),
      type: item.video ? "video" : "text",
      quote: item.reviwerDescription,
      name: author?.name ?? "",
      role: author?.designation ?? "",
      initials: toInitials(author?.name),
      rating: item.ratings ?? undefined,
      videoUrl: item.video ? resolveMediaUrl(item.video.url) : null,
      // CMS stores duration as "2.14"-style (minutes.seconds) — display as "2:14".
      videoDuration: item.videoDuration ? item.videoDuration.replace(".", ":") : undefined,
      verified: item.verificationStatus === "Verified",
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
    testimonials,
    metrics,
  };
}
