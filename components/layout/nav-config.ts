import type { ComponentType, SVGProps } from "react";
import {
  BlogsIcon,
  BookIcon,
  CaseStudiesIcon,
  ConstructionIcon,
  DiscoverySprintsIcon,
  EradicateDebtIcon,
  HealthcareIcon,
  HiTechIcon,
  NavFinTechIcon,
  OrbitAiIcon,
  SvcDataAiIcon,
  SvcManagedIcon,
  SvcModernizationIcon,
  SvcPlatformIcon,
  SvcStartupsIcon,
  SvcStrategyIcon,
  TestimonialsNavIcon,
  UsersIcon,
  WebinarIcon,
  WhitepapersIcon,
} from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type MegaItem = {
  icon: IconComponent;
  title: string;
  description: string;
  href: string;
};

export type MegaGroup = {
  label: string;
  /** The trigger's own destination when clicked with a mouse (FR-019a) — independent of
   * items[].href (the mega-panel's own links) and cta?.href (the panel's "see all" row). */
  href: string;
  matchPaths: string[];
  columns: 2 | 3 | 4;
  items: MegaItem[];
  cta?: { label: string; href: string };
};

export type PlainLink = { label: string; href: string };

/** Five mega-menu groups, in header order (FR-012/FR-013). Content/hrefs/icons verified directly
 * against raw-files-v2's reference markup — see specs/TMS-63/spec.md's V2 Update section. */
export const MEGA_GROUPS: MegaGroup[] = [
  {
    label: "What We Do",
    href: "/services",
    matchPaths: ["/services"],
    columns: 4,
    items: [
      {
        icon: SvcModernizationIcon,
        title: "AI-Accelerated Modernization",
        description: "Rebuild legacy systems into AI-native platforms.",
        href: "/services#svc-modernization",
      },
      {
        icon: EradicateDebtIcon,
        title: "Software Product Engineering",
        description: "AI-first product engineering for modern enterprises.",
        href: "/services#svc-product",
      },
      {
        icon: SvcDataAiIcon,
        title: "Data and AI Engineering",
        description: "Turn data into agentic decisions, dashboards & automations.",
        href: "/services#svc-data-ai",
      },
      {
        icon: SvcPlatformIcon,
        title: "Platform Engineering",
        description: "Cloud, DevOps & internal developer platforms that scale.",
        href: "/services#svc-platform",
      },
      {
        icon: SvcManagedIcon,
        title: "Managed Services",
        description: "24×7 AI-augmented operations & SRE for your stack.",
        href: "/services#svc-managed",
      },
      {
        icon: SvcStrategyIcon,
        title: "AI Strategy & Roadmap",
        description: "From vision to a funded, sequenced AI transformation plan.",
        href: "/services#svc-strategy",
      },
      {
        icon: SvcStartupsIcon,
        title: "Startups",
        description: "Zero-to-one AI-native builds for founders & venture teams.",
        href: "/services#svc-startups",
      },
    ],
    cta: { label: "See all services", href: "/services" },
  },
  {
    label: "How We Work",
    href: "/frameworks",
    matchPaths: ["/frameworks"],
    columns: 3,
    items: [
      {
        icon: OrbitAiIcon,
        title: "Orbit AI Ecosystem",
        description: "Our agentic orchestration platform & specialist agents.",
        href: "/frameworks#orbit-ai",
      },
      {
        icon: UsersIcon,
        title: "Engagement Models",
        description: "Fixed outcomes, dedicated pods, or embedded squads.",
        href: "/frameworks#engagement",
      },
      {
        icon: DiscoverySprintsIcon,
        title: "Discovery Sprints",
        description: "Two-week sprints from problem to funded prototype.",
        href: "/frameworks#discovery",
      },
    ],
  },
  {
    label: "Industries",
    href: "/construction",
    matchPaths: ["/construction"],
    columns: 4,
    items: [
      {
        icon: HealthcareIcon,
        title: "Healthcare",
        description: "Intelligent healthcare platforms for care teams.",
        href: "/#industries",
      },
      {
        icon: NavFinTechIcon,
        title: "FinTech",
        description: "Secure, scalable financial platforms.",
        href: "/#industries",
      },
      {
        icon: ConstructionIcon,
        title: "Construction",
        description: "Smart construction management platforms.",
        href: "/construction",
      },
      {
        icon: HiTechIcon,
        title: "HiTech",
        description: "Product platforms for SaaS, semiconductors & connected tech.",
        href: "/#industries",
      },
    ],
  },
  {
    label: "Insights",
    href: "/case-studies",
    matchPaths: ["/blog", "/case-studies", "/webinar"],
    columns: 3,
    items: [
      {
        icon: CaseStudiesIcon,
        title: "Case Studies",
        description: "Real projects, honest outcomes, measurable impact.",
        href: "/case-studies",
      },
      {
        icon: BlogsIcon,
        title: "Blogs",
        description: "Field notes on AI-first delivery, tooling & craft.",
        href: "/blog",
      },
      {
        icon: WebinarIcon,
        title: "Webinar",
        description: "Live and on-demand sessions on AI-first delivery.",
        href: "/webinar",
      },
      {
        icon: WhitepapersIcon,
        title: "Whitepapers",
        description: "Deep-dive research & POV documents for tech leaders.",
        href: "/blog#whitepapers",
      },
      {
        icon: TestimonialsNavIcon,
        title: "Testimonials",
        description: "What our clients say about partnering with TechGrit.",
        href: "/about#testimonials",
      },
    ],
    cta: { label: "Explore all insights", href: "/case-studies" },
  },
  {
    label: "About",
    href: "/about",
    matchPaths: ["/about"],
    columns: 3,
    items: [
      {
        icon: BookIcon,
        title: "Our Story",
        description: "Why TechGrit exists & the belief behind our name.",
        href: "/about#our-story",
      },
      {
        icon: UsersIcon,
        title: "Leadership & Advisory",
        description: "The team & advisors guiding TechGrit's next chapter.",
        href: "/about#leadership",
      },
    ],
  },
];

/** Two plain (non-dropdown) header links, following the five mega-menu groups (FR-012). */
export const PLAIN_LINKS: PlainLink[] = [
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const NAV_CTA = { label: "Talk to Us", href: "/contact" };
