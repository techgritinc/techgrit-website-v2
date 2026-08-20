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

export const DEFAULT_FRAMEWORK_PHASES_DATA: FrameworkPhasesData = {
  eyebrow: "How we deliver",
  title: "The 6-Week Sprint-to-Scale Framework.",
  highlightTitle: "Sprint-to-Scale",
  phases: [
    {
      n: 1,
      week: "Week 1",
      title: "Discovery & Architecture",
      description: "Agreed technical blueprint, defined AI workflows, and shared success criteria, before a line of code is written. ",
      deliverables: ["Technical architecture blueprint", "Defined AI agent workflows", "Shared success criteria"],
      icon: null,
      badgeIcon: null,
    },
    {
      n: 2,
      week: "Weeks 2 to 4",
      title: "Agentic Build",
      description: "Parallel development across UI, business logic, and data layers, governed by our framework agents with engineer oversight.",
      deliverables: ["Parallel UI, logic and data build", "OrbitAI agent orchestration", "Engineer oversight on every PR"],
      icon: null,
      badgeIcon: null,
    },
    {
      n: 3,
      week: "Week 5",
      title: "Hardening & Scale Review",
      description: "Security validation, load testing, and enterprise readiness checks. Nothing ships without passing these gates.",
      deliverables: ["Security validation", "Load and scale testing", "Enterprise-readiness gates"],
      icon: null,
      badgeIcon: null,
    },
    {
      n: 4,
      week: "Week 6",
      title: "Production Launch",
      description: "Live deployment, real users, and a documented handover; including runbooks, architecture diagrams, and support transition.",
      deliverables: ["Live production deployment", "Runbooks and architecture docs", "Full support transition"],
      icon: null,
      badgeIcon: null,
    },
  ],
};

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
    phases: phases.length > 0 ? phases : DEFAULT_FRAMEWORK_PHASES_DATA.phases,
  };
}
