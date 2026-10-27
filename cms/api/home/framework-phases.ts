import type { AnySection, HomeIcon, StrapiMedia } from "./shared";
import { toIcon } from "./shared";

export type StrapiPhaseDeliverableFeature = { id: number; title: string };

export type StrapiFrameworkPhaseDeliverables = {
  id: number;
  subtitle: string;
  rightIcon: StrapiMedia | null;
  features: StrapiPhaseDeliverableFeature[];
};

export type StrapiPhase = {
  id: number;
  title: string;
  weekLabel: string;
  icon: StrapiMedia | null;
  frameworkPhaseDeliverables: StrapiFrameworkPhaseDeliverables;
};

export type StrapiFrameworkPhasesSection = {
  id: number;
  title: string;
  badgeLabel: string;
  highlightTitle: string;
  Phases: StrapiPhase[];
  __component: "page-reusable-sections.framework-phases";
};

export type FrameworkPhase = {
  n: number;
  week: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: HomeIcon | null;
  badgeIcon: HomeIcon | null;
};

export type FrameworkPhasesData = {
  eyebrow: string;
  title: string;
  highlightTitle: string;
  phases: FrameworkPhase[];
};

export function pickFrameworkPhasesSection(sections: AnySection[]): StrapiFrameworkPhasesSection | undefined {
  return sections.find((s): s is StrapiFrameworkPhasesSection => s.__component === "page-reusable-sections.framework-phases");
}

export function toFrameworkPhases(section: StrapiFrameworkPhasesSection): FrameworkPhasesData {
  const phases: FrameworkPhase[] = section.Phases.map((phase, index) => {
    const deliverables = phase.frameworkPhaseDeliverables;
    return {
      n: index + 1,
      week: phase.weekLabel,
      title: phase.title,
      description: deliverables?.subtitle ?? "",
      deliverables: (deliverables?.features ?? []).map((feature) => feature.title),
      icon: toIcon(phase.icon),
      badgeIcon: toIcon(deliverables?.rightIcon) ?? toIcon(phase.icon),
    };
  });

  return {
    eyebrow: section.badgeLabel,
    title: section.title,
    highlightTitle: section.highlightTitle,
    phases,
  };
}
