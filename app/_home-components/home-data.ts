import type { ComponentType, SVGProps } from "react";
import {
  AutonomousAgentIcon,
  IndustryConstructionIcon,
  IndustryFinTechIcon,
  IndustryHealthcareIcon,
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
  postSuffix?: string;
  postSuffixClassName?: string;
  staticValue?: string;
  /** Whether the value uses the brand gradient text-clip treatment. */
  gradient?: boolean;
};

export const DELIVERY_STATS: DeliveryStat[] = [
  { id: "sucessful-projects", count: 500, suffix: "+", suffixClassName: "text-amber-light", label: "Successful Projects" },
  { id: "sucessful-clients", count: 70, suffix: "+", suffixClassName: "text-amber-light", label: "Successful Clients" },
  { id: "deep-industry-expertise", count: 12, suffix: "+", postSuffix: "years", postSuffixClassName: "text-amber-light text-stat ml-2" , suffixClassName: "text-amber-light", label: "Deep Industry Expertise" },
  {
    id: "sprint-to-scale",
    count: 6,
    suffix: " weeks",
    suffixClassName: "text-amber-light text-stat",
    label: "AI deployed. Fast. Scalable.",
    gradient: true,
  },
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
    title: "OrbitAI™",
    description: "AI-assisted software delivery orchestrated across the entire SDLC",
    tone: "blue",
  },
  {
    icon: PromptToProductionIcon,
    title: "4D™",
    description: "A structured engineering methodology for successful software delivery.",
    tone: "blue",
  },
  {
    icon: SelfHealingIcon,
    title: "PRISM™",
    description: "Understand your legacy systems before you modernize them.",
    tone: "teal",
  },
  {
    icon: SelfHealingIcon,
    title: "AI IMPACT™",
    description: "Discover where AI delivers measurable business value.",
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
    title: "Discovery & Architecture",
    description:
      "Agreed technical blueprint, defined AI workflows, and shared success criteria, before a line of code is written. ",
    deliverables: ["Technical architecture blueprint", "Defined AI agent workflows", "Shared success criteria"],
    icon: PhaseArchitectIcon,
  },
  {
    n: 2,
    week: "Weeks 2 to 4",
    title: "Agentic Build",
    description:
      "Parallel development across UI, business logic, and data layers, governed by our framework agents with engineer oversight.",
    deliverables: ["Parallel UI, logic and data build", "OrbitAI agent orchestration", "Engineer oversight on every PR"],
    icon: PhaseAgenticBuildIcon,
  },
  {
    n: 3,
    week: "Week 5",
    title: "Hardening & Scale Review",
    description:
      "Security validation, load testing, and enterprise readiness checks. Nothing ships without passing these gates.",
    deliverables: ["Security validation", "Load and scale testing", "Enterprise-readiness gates"],
    icon: PhaseIndustrializeIcon,
  },
  {
    n: 4,
    week: "Week 6",
    title: "Production Launch",
    description:
      "Live deployment, real users, and a documented handover; including runbooks, architecture diagrams, and support transition.",
    deliverables: ["Live production deployment", "Runbooks and architecture docs", "Full support transition"],
    icon: PhaseImpactIcon,
  },
];

// ---------------------------------------------------------------------------
// Re-Imagine (differentiators + comparison)
// ---------------------------------------------------------------------------

export type DifferentiatorPoint = {
  /** Stable, content-independent identity for list rendering (Principle III) —
   * never derive the `.map()` key from `title`, which is display text. */
  id: string;
  title: string;
  description: string;
  image: string;
};

export const DIFFERENTIATORS: DifferentiatorPoint[] = [
  {
    id: "copilot-to-agentic",
    title: "From Copilot to Agentic",
    description:
      "We don't just use AI to suggest code; we deploy agents to own entire domains of the software lifecycle, from build to test to deploy.",
    image: "/samples/dm-copilot.png",
  },
  {
    id: "eradicate-tech-debt",
    title: "Eradicate Technical Debt",
    description:
      "Code generated by OrbitAI™ is uniformly structured, fully documented, and instantly refactorable across teams.",
    image: "/samples/dm-tech-debt.png",
  },
  {
    id: "infinite-scalability",
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
  iconBg: string;
  title: string;
  description: string;
  href: string | null;
};

export const INDUSTRY_CARDS: IndustryCard[] = [
  {
    id: "fintech",
    icon: IndustryFinTechIcon,
    iconBg: "bg-avatar-violet",
    title: "Fintech",
    description:
      "Build secure and scalable financial platforms—from digital payments and investment systems to AI-driven financial analytics.",
    href: null,
  },
  {
    id: "healthcare",
    icon: IndustryHealthcareIcon,
    iconBg: "bg-avatar-green",
    title: "Healthcare",
    description:
      "Design intelligent healthcare platforms that improve patient experiences, streamline workflows, and power data-driven care.",
    href: null,
  },
  {
    id: "construction",
    icon: IndustryConstructionIcon,
    iconBg: "bg-avatar-blue",
    title: "Construction",
    description:
      "Develop smart construction management platforms that optimize planning, project tracking, and operational efficiency.",
    href: "/construction",
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export type Testimonial = {
  id: string;
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
    id: "daniel-shore",
    type: "video",
    quote: "From prototype to production in six weeks.",
    name: "Daniel Shore",
    role: "Head of Growth, Lineflow",
    initials: "DS",
    videoUrl: null,
  },
  {
    id: "jonas-berg",
    type: "text",
    quote:
      "Their design-thinking mindset combined with deep AI knowledge helped us go from prototype to production fast, without the usual handoffs.",
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
  {
    id: "sara-whitman",
    type: "video",
    quote: "AI agents, with real engineer oversight.",
    name: "Sara Whitman",
    role: "Product Lead, Meridian Health",
    initials: "SW",
    videoUrl: null,
  },
  {
    id: "devin-park",
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
  id: string;
  src: string;
  alt: string;
  span: "tall" | "wide" | "default" | "wide3";
  captionLabel: string;
  caption: string;
};

export const CULTURE_GALLERY_IMAGES: CultureGalleryImage[] = [
  {
    id: "glasses",
    src: "/assets/team/glasses.png",
    alt: "TechGrit team member",
    span: "tall",
    captionLabel: "The team",
    caption: "Builders and designers behind the engineering.",
  },
  {
    id: "rooftop",
    src: "/assets/team/rooftop.png",
    alt: "TechGrit office rooftop",
    span: "default",
    captionLabel: "The office",
    caption: "Rooftop breaks, real conversations.",
  },
  {
    id: "painting",
    src: "/assets/team/painting.png",
    alt: "TechGrit culture moment",
    span: "default",
    captionLabel: "Craft",
    caption: "We take craft seriously — inside & outside code.",
  },
  {
    id: "diwali",
    src: "/assets/team/diwali.png",
    alt: "TechGrit team celebration",
    span: "wide",
    captionLabel: "Together",
    caption: "We celebrate wins — and Diwali — together.",
  },
];
