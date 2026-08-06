import type { ComponentType, SVGProps } from "react";
import {
  AutonomousAgentIcon,
  ConstructionIcon,
  FinTechIcon,
  HealthcareIcon,
  PhaseAgenticBuildIcon,
  PhaseArchitectIcon,
  PhaseImpactIcon,
  PhaseIndustrializeIcon,
  PromptToProductionIcon,
  SelfHealingIcon,
} from "@/components/ui/icons";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export type DeliveryStat = {
  id: string;
  label: string;
  /** Present only for stats that count up on scroll-into-view (matches the
   * reference's data-count elements); absent for the static "zero" stat. */
  count?: number;
  suffix?: string;
  suffixClassName?: string;
  staticValue?: string;
  /** Whether the value uses the brand gradient text-clip treatment. */
  gradient?: boolean;
};

export const DELIVERY_STATS: DeliveryStat[] = [
  { id: "delivery-speed", count: 10, suffix: "X", suffixClassName: "text-amber-light", label: "Delivery Speed" },
  {
    id: "sprint-to-scale",
    count: 6,
    suffix: " weeks",
    suffixClassName: "text-amber-light text-stat",
    label: "Sprint to Scale",
    gradient: true,
  },
  { id: "legacy-debt", staticValue: "zero", label: "Legacy Debt" },
];

export type TrustedClientLogo = {
  /** Stable, content-independent identity for list rendering (Principle III) —
   * never derive the `.map()` key from `alt`, which is display text. */
  id: string;
  src: string | null;
  alt: string;
  height: number;
};

export const TRUSTED_CLIENT_LOGOS: TrustedClientLogo[] = [
  { id: "evolve", src: "/logos/client-evolve.png", alt: "Evolve", height: 28 },
  { id: "sunnyday", src: "/logos/client-sunnyday.png", alt: "Sunny Day Fund", height: 44 },
  { id: "bcbs", src: "/logos/client-bcbs.png", alt: "BlueCross BlueShield", height: 36 },
  { id: "aqua", src: "/logos/client-aqua.png", alt: "AquA Finance", height: 44 },
  { id: "commsai", src: "/logos/client-commsai.png", alt: "CommsAI", height: 40 },
  { id: "turnqey", src: "/logos/client-turnqey.png", alt: "Turnqey", height: 28 },
];

// ---------------------------------------------------------------------------
// Platform ("Meet OrbitAI")
// ---------------------------------------------------------------------------

export type PlatformCapability = {
  icon: IconComponent;
  title: string;
  description: string;
  /** Icon box tone — matches reference's per-item accent (blue for the first
   * two, teal for Self-Healing Infrastructure). */
  tone: "blue" | "teal";
};

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    icon: AutonomousAgentIcon,
    title: "Autonomous Agent Integration",
    description: "Agents handle PR reviews, test generation, and CI/CD validation autonomously.",
    tone: "blue",
  },
  {
    icon: PromptToProductionIcon,
    title: "Prompt-to-Production Pipeline",
    description: "From a defined prompt to deployed, tested code, with no manual handoffs.",
    tone: "blue",
  },
  {
    icon: SelfHealingIcon,
    title: "Self-Healing Infrastructure",
    description: "Systems that detect, diagnose, and remediate issues before they reach users.",
    tone: "teal",
  },
];

// ---------------------------------------------------------------------------
// Methodology (6-Week Sprint-to-Scale)
// ---------------------------------------------------------------------------

export type MethodologyPhase = {
  n: number;
  week: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: IconComponent;
};

export const METHODOLOGY_PHASES: MethodologyPhase[] = [
  {
    n: 1,
    week: "Week 1",
    title: "Architect",
    description:
      "We architect the vision before a line of code is written, defining the technical blueprint, the AI agent workflows, and the success criteria we will be measured against.",
    deliverables: ["Technical architecture blueprint", "Defined AI agent workflows", "Shared success criteria"],
    icon: PhaseArchitectIcon,
  },
  {
    n: 2,
    week: "Weeks 2 to 4",
    title: "Agentic Build",
    description:
      "OrbitAI agents build in parallel across the UI, business logic, and data layers, while our engineers review every pull request and steer the system at each gate.",
    deliverables: ["Parallel UI, logic and data build", "OrbitAI agent orchestration", "Engineer oversight on every PR"],
    icon: PhaseAgenticBuildIcon,
  },
  {
    n: 3,
    week: "Week 5",
    title: "Industrialize",
    description:
      "We harden the system for the real world, validating security, load-testing at scale, and clearing every enterprise-readiness gate. Nothing ships until it passes.",
    deliverables: ["Security validation", "Load and scale testing", "Enterprise-readiness gates"],
    icon: PhaseIndustrializeIcon,
  },
  {
    n: 4,
    week: "Week 6",
    title: "Impact",
    description:
      "We deploy to production with real users and real data, and hand over a system your team can own, complete with runbooks and architecture documentation.",
    deliverables: ["Live production deployment", "Runbooks and architecture docs", "Full support transition"],
    icon: PhaseImpactIcon,
  },
];

// ---------------------------------------------------------------------------
// Re-Imagine (differentiators + comparison)
// ---------------------------------------------------------------------------

export type DifferentiatorPoint = {
  title: string;
  description: string;
  image: string;
};

export const DIFFERENTIATORS: DifferentiatorPoint[] = [
  {
    title: "From Copilot to Agentic",
    description:
      "We don't just use AI to suggest code; we deploy agents to own entire domains of the software lifecycle, from build to test to deploy.",
    image: "/samples/dm-copilot.png",
  },
  {
    title: "Eradicate Technical Debt",
    description:
      "Code generated by OrbitAI™ is uniformly structured, fully documented, and instantly refactorable across teams.",
    image: "/samples/dm-tech-debt.png",
  },
  {
    title: "Infinite Scalability",
    description: "Architecture that adapts and scales automatically based on predictive AI models, handling any load without manual intervention.",
    image: "/samples/dm-scalability.png",
  },
];

export type ComparisonMetric = { label: string; displayValue: string; barPercent: number };

export const COMPARISON_METRICS: ComparisonMetric[] = [
  { label: "Traditional Development", displayValue: "Months", barPercent: 88 },
  { label: "OrbitAI™ Delivery", displayValue: "6 Weeks", barPercent: 26 },
];

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export type IndustryCard = {
  id: "fintech" | "healthcare" | "construction";
  icon: IconComponent;
  title: string;
  description: string;
  image: { src: string; alt: string } | null;
  href: string | null;
};

export const INDUSTRY_CARDS: IndustryCard[] = [
  {
    id: "fintech",
    icon: FinTechIcon,
    title: "FinTech",
    description:
      "Secure, scalable financial platforms, from digital payments and investment systems to AI-driven financial analytics.",
    image: { src: "/samples/ind-fintech.png", alt: "FinTech platform interface" },
    href: null,
  },
  {
    id: "healthcare",
    icon: HealthcareIcon,
    title: "Healthcare",
    description:
      "Intelligent healthcare platforms that improve patient experiences, streamline workflows, and power data-driven care.",
    image: { src: "/samples/ind-healthcare.png", alt: "Healthcare platform interface" },
    href: null,
  },
  {
    id: "construction",
    icon: ConstructionIcon,
    title: "Construction",
    description:
      "Smart construction management platforms that optimize planning, project tracking, and operational efficiency.",
    image: { src: "/samples/ind-construction.png", alt: "Construction management platform interface" },
    href: "/construction",
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export type Testimonial = {
  type: "text" | "video";
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating?: 5;
  videoUrl?: string | null;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    type: "video",
    quote: "From prototype to production in six weeks.",
    name: "Daniel Shore",
    role: "Head of Growth, Lineflow",
    initials: "DS",
    videoUrl: null,
  },
  {
    type: "text",
    quote:
      "Their design-thinking mindset combined with deep AI knowledge helped us go from prototype to production fast, without the usual handoffs.",
    name: "Jonas Berg",
    role: "Founder, FrameOps",
    initials: "JB",
    rating: 5,
  },
  {
    type: "text",
    quote: "Simple, thoughtful changes doubled activation, and it only took weeks. The OrbitAI workflow is the real deal.",
    name: "Priya Nair",
    role: "VP Engineering, Northwind FinTech",
    initials: "PN",
    rating: 5,
  },
  {
    type: "text",
    quote: "TechGrit owned the outcome end to end. We shipped a modernized platform without ever taking the product down.",
    name: "Marcus Lee",
    role: "CTO, Atlas Build",
    initials: "ML",
    rating: 5,
  },
  {
    type: "video",
    quote: "AI agents, with real engineer oversight.",
    name: "Sara Whitman",
    role: "Product Lead, Meridian Health",
    initials: "SW",
    videoUrl: null,
  },
  {
    type: "text",
    quote:
      "Real users, real data, real ROI in six weeks. Their agentic build process changed how our team ships software.",
    name: "Devin Park",
    role: "COO, Northstar Logistics",
    initials: "DP",
    rating: 5,
  },
];

// ---------------------------------------------------------------------------
// Case Studies & Insights
// ---------------------------------------------------------------------------

export type CaseStudy = {
  featured: boolean;
  industry: string;
  metric: string;
  metricLabel: string;
  title: string;
  description: string | null;
  accentColor: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    featured: true,
    industry: "FinTech",
    metric: "2.5M",
    metricLabel: "lines migrated to .NET 10",
    title: "Migrating 2.5M lines to .NET 10 — without taking the product down",
    description:
      "An AI-assisted, human-governed delivery model shipped every ticket on a legacy .NET project on time, under constraints, and with full audit trails.",
    accentColor: "var(--color-blue)",
  },
  {
    featured: false,
    industry: "Marketplace",
    metric: "100%",
    metricLabel: "auditable trades",
    title: "A B2B marketplace that encodes trust into every trade",
    description: null,
    accentColor: "var(--color-orange)",
  },
  {
    featured: false,
    industry: "FinTech",
    metric: "Live",
    metricLabel: "compliant insights",
    title: "Secure crypto data API platform for financial advisors",
    description: null,
    accentColor: "var(--color-teal)",
  },
  {
    featured: false,
    industry: "AI Enablement",
    metric: "10x",
    metricLabel: "faster onboarding",
    title: "From overloaded to on-fire: Claude-powered enablement",
    description: null,
    accentColor: "var(--color-amber)",
  },
];

// ---------------------------------------------------------------------------
// Life at TechGrit
// ---------------------------------------------------------------------------

export type CultureGalleryImage = {
  src: string;
  alt: string;
  span: "tall" | "wide" | "default" | "wide3";
};

export const CULTURE_GALLERY_IMAGES: CultureGalleryImage[] = [
  { src: "/assets/team/glasses.png", alt: "TechGrit team member", span: "tall" },
  { src: "/assets/team/rooftop.png", alt: "TechGrit office rooftop", span: "default" },
  { src: "/assets/team/painting.png", alt: "TechGrit culture moment", span: "default" },
  { src: "/assets/team/diwali.png", alt: "TechGrit team celebration", span: "wide" },
];
