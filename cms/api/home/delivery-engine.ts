import type { AnySection, HomeIcon, StrapiMedia } from "./shared";
import { toIcon } from "./shared";

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
  features: StrapiFeature[];
  aiDashboard: StrapiAiDashboard;
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

export const DEFAULT_DELIVERY_ENGINE_DATA: DeliveryEngineData = {
  badgeLabel: "Meet OrbitAI™",
  title: "Our Architectural Frameworks",
  subtitle:
    "Competitors sell hours. We sell outcomes, powered by OrbitAI, our orchestration layer that automates the grind so our engineers focus on strategy, architecture, and innovation.",
  capabilities: [
    { title: "OrbitAI™", description: "AI-assisted software delivery orchestrated across the entire SDLC", icon: null, tone: "blue" },
    { title: "4D™", description: "A structured engineering methodology for successful software delivery.", icon: null, tone: "blue" },
    { title: "PRISM™", description: "Understand your legacy systems before you modernize them.", icon: null, tone: "teal" },
    { title: "AI IMPACT™", description: "Discover where AI delivers measurable business value.", icon: null, tone: "teal" },
  ],
  dashboard: {
    title: "OrbitAI Console",
    badgeLabel: "LIVE",
    footerText: "Prompt → Production · 0 handoffs",
    deadline: "Shipping in 6 weeks",
    metrics: [
      { id: "throughput", value: "10x", label: "Throughput" },
      { id: "coverage", value: "98%", label: "Coverage" },
      { id: "cycle", value: "6 wk", label: "Cycle" },
    ],
    pipeline: [
      { id: "ui-agent", label: "UI Agent", percent: 94, color: "var(--color-blue-bright)", delay: "0s" },
      { id: "logic-agent", label: "Logic Agent", percent: 81, color: "var(--color-blue-bright)", delay: "0.5s" },
      { id: "data-agent", label: "Data Agent", percent: 88, color: "var(--color-teal-bright)", delay: "1s" },
      { id: "qa-agent", label: "QA Agent", percent: 67, color: "var(--color-amber)", delay: "1.5s" },
      { id: "cicd-agent", label: "CI/CD Agent", percent: 97, color: "var(--color-orange)", delay: "2s" },
    ],
  },
};

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

  const metrics: DashboardMetric[] = section.aiDashboard.metrics.map((metric) => ({
    id: String(metric.id),
    value: metric.value,
    label: metric.label,
  }));

  const pipeline: PipelineAgent[] = section.aiDashboard.pipelines.progressPipeline.map((item, index) => ({
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
    capabilities: capabilities.length > 0 ? capabilities : DEFAULT_DELIVERY_ENGINE_DATA.capabilities,
    dashboard: {
      title: section.aiDashboard.title,
      badgeLabel: section.aiDashboard.badgeLabel,
      footerText: section.aiDashboard.footerText,
      deadline: section.aiDashboard.deadline,
      metrics: metrics.length > 0 ? metrics : DEFAULT_DELIVERY_ENGINE_DATA.dashboard.metrics,
      pipeline: pipeline.length > 0 ? pipeline : DEFAULT_DELIVERY_ENGINE_DATA.dashboard.pipeline,
    },
  };
}
