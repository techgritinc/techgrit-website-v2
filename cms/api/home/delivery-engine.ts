import type { AnySection, HomeIcon, StrapiMedia } from "./shared";
import { toFeatureImage, toIcon } from "./shared";

export type StrapiFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

export type StrapiDashboardMetric = { id: number; value: string; label: string };

export type StrapiProgressPipelineItem = { id: number; name: string; progress: number };

export type StrapiPipelines = {
  id: number;
  name: string;
  progressPipeline: StrapiProgressPipelineItem[];
};

export type StrapiAiDashboard = {
  id: number;
  title: string;
  badgeLabel: string;
  footerText: string;
  deadline: string;
  metrics: StrapiDashboardMetric[];
  pipelines: StrapiPipelines;
};

export type StrapiDeliveryEngineSection = {
  id: number;
  title: string;
  subtitle: string;
  badgeLabel: string;
  image: StrapiMedia[];
  features: StrapiFeature[];
  aiDashboard: StrapiAiDashboard | null;
  __component: "home.delivery-engine";
};

export type PlatformCapability = { title: string; description: string; icon: HomeIcon | null; tone: "blue" | "teal" };

export type PipelineAgent = { id: string; label: string; percent: number; color: string; delay: string };

export type DashboardMetric = { id: string; value: string; label: string };

export type DeliveryEngineData = {
  badgeLabel: string;
  title: string;
  subtitle: string;
  capabilities: PlatformCapability[];
  // The CMS's `image` field for this section — the right-side visual to show when
  // the CMS hasn't populated the (separate, optional) `aiDashboard` sub-component.
  image: HomeIcon | null;
  dashboard: {
    title: string;
    badgeLabel: string;
    footerText: string;
    deadline: string;
    metrics: DashboardMetric[];
    pipeline: PipelineAgent[];
  };
};

export function pickDeliveryEngineSection(sections: AnySection[]): StrapiDeliveryEngineSection | undefined {
  return sections.find((s): s is StrapiDeliveryEngineSection => s.__component === "home.delivery-engine");
}

const PIPELINE_PALETTE = [
  "var(--color-blue-bright)",
  "var(--color-blue-bright)",
  "var(--color-teal-bright)",
  "var(--color-amber)",
  "var(--color-orange)",
];

export function toDeliveryEngine(section: StrapiDeliveryEngineSection): DeliveryEngineData {
  const capabilities: PlatformCapability[] = section.features.map((feature, index) => ({
    title: feature.title,
    description: feature.subtitle ?? "",
    icon: toIcon(feature.icon),
    tone: index < 2 ? "blue" : "teal",
  }));

  // `aiDashboard` is an optional Strapi component on this section — the CMS can
  // save the section without ever filling it in, in which case these fields are
  // simply empty/blank rather than backfilled with placeholder content.
  const metrics: DashboardMetric[] = (section.aiDashboard?.metrics ?? []).map((metric) => ({
    id: String(metric.id),
    value: metric.value,
    label: metric.label,
  }));

  const pipeline: PipelineAgent[] = (section.aiDashboard?.pipelines?.progressPipeline ?? []).map((item, index) => ({
    id: String(item.id),
    label: item.name,
    percent: item.progress,
    color: PIPELINE_PALETTE[index % PIPELINE_PALETTE.length],
    delay: `${index * 0.5}s`,
  }));

  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    capabilities,
    image: toFeatureImage(section.image),
    dashboard: {
      title: section.aiDashboard?.title ?? "",
      badgeLabel: section.aiDashboard?.badgeLabel ?? "",
      footerText: section.aiDashboard?.footerText ?? "",
      deadline: section.aiDashboard?.deadline ?? "",
      metrics,
      pipeline,
    },
  };
}
