import type { AnySection, HomeIcon, StrapiMedia } from "./shared";
import { toFeatureImage, toIcon } from "./shared";

export type StrapiFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
  image: StrapiMedia[];
};

export type StrapiComparisonItem = { id: number; label: string; valueLabel: string; barPercent: number };

export type StrapiComparisonBanner = {
  id: number;
  title: string;
  subtitle: string;
  comparision: StrapiComparisonItem[];
};

export type StrapiValuePropositionSection = {
  id: number;
  title: string;
  subtitle: string;
  highlightTitle: string;
  features: StrapiFeature[];
  comparisonBanner: StrapiComparisonBanner;
  __component: "home.value-proposition";
};

export type Differentiator = { id: string; title: string; description: string; icon: HomeIcon | null; image: HomeIcon | null };

export type ComparisonMetric = { label: string; displayValue: string; barPercent: number };

export type ValuePropositionData = {
  title: string;
  highlightTitle: string;
  subtitle: string;
  differentiators: Differentiator[];
  comparisonBanner: { title: string; subtitle: string; metrics: ComparisonMetric[] };
};

export function pickValuePropositionSection(sections: AnySection[]): StrapiValuePropositionSection | undefined {
  return sections.find((s): s is StrapiValuePropositionSection => s.__component === "home.value-proposition");
}

export function toValueProposition(section: StrapiValuePropositionSection): ValuePropositionData {
  const differentiators: Differentiator[] = section.features.map((feature) => ({
    id: String(feature.id),
    title: feature.title,
    description: feature.subtitle ?? "",
    icon: toIcon(feature.icon),
    image: toFeatureImage(feature.image),
  }));

  const metrics: ComparisonMetric[] = section.comparisonBanner.comparision.map((item) => ({
    label: item.label,
    displayValue: item.valueLabel,
    barPercent: item.barPercent,
  }));

  return {
    title: section.title,
    highlightTitle: section.highlightTitle,
    subtitle: section.subtitle,
    differentiators,
    comparisonBanner: {
      title: section.comparisonBanner.title,
      subtitle: section.comparisonBanner.subtitle,
      metrics,
    },
  };
}
