import { fetchCms } from "./fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type {
  StrapiAiFirstEngineSection,
  StrapiServiceItem,
  StrapiServicesCtaBannerSection,
  StrapiServicesHeroSection,
  StrapiServicesPage,
  StrapiServicesSection,
  StrapiMedia,
} from "../types/services-types";
import type {
  AccordionSection,
  ApproachStep,
  CapabilityItem,
  FinalCtaSection,
  HeroSection,
  PageSectionEntry,
  SectionImage,
  ServiceAccent,
  ServiceAccordionItem,
  ServicesPageContent,
  SupportingItemList,
} from "@/app/services/_data/types";

const SERVICES_ENDPOINT = "/api/pages/by-slug/what-we-do";

// The CMS carries no accent field — accents cycle by position, matching the fixed
// blue/orange/teal order the static content shipped with (UI/UX, Engineering, QA).
const ACCENTS: ServiceAccent[] = ["blue", "orange", "teal"];

const DEFAULT_HERO_SECTION: HeroSection = {
  type: "hero",
  order: 1,
  eyebrow: "What we do",
  title: "Design, build, and ship AI-first software.",
  titleHighlight: "AI-first software.",
  subtitle:
    "From product design to engineering to quality, TechGrit delivers end-to-end services that turn complex ideas into reliable, scalable products, faster and at lower risk.",
  primaryCtaLabel: "Schedule a Consultation",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "Explore Services",
  secondaryCtaHref: "#svc-accordion",
};

const DEFAULT_ACCORDION_SECTION: AccordionSection = {
  type: "accordion",
  order: 2,
  eyebrow: "Our services",
  heading: "Three services. One AI-first engine.",
  subheading: "Click any service to expand and see the full delivery approach.",
  items: [
    {
      id: "uiux",
      sequenceNumber: "01",
      categoryLabel: "UI/UX Design",
      heading: "Design that accelerates adoption, engagement & growth.",
      description:
        "We transform complex ideas into intuitive, delightful, conversion-driven experiences, blending design thinking, user psychology, accessibility, and modern interaction patterns into products users love.",
      image: null,
      accentColor: "blue",
      supportingItems: {
        kind: "orderedApproach",
        label: "Our approach",
        items: [
          { stepNumber: 1, title: "Discover & Research", description: "Personas, journey maps, task flows, competitive analysis." },
          { stepNumber: 2, title: "Structure & IA", description: "IA maps, navigation frameworks, system diagrams." },
          { stepNumber: 3, title: "Wireframing & Flows", description: "Low-fidelity wireframes and UX flow diagrams." },
          { stepNumber: 4, title: "Visual Design & Branding", description: "High-fidelity screens, style guides, design systems." },
          { stepNumber: 5, title: "Interactive Prototyping", description: "Web & mobile prototypes showcasing real-user flows." },
          { stepNumber: 6, title: "Usability Testing & Iteration", description: "Test scripts, user insights, design improvements." },
        ],
      },
    },
    {
      id: "eng",
      sequenceNumber: "02",
      categoryLabel: "Software Product Engineering",
      heading: "AI-first product engineering for modern enterprises.",
      description:
        "We blend AI-driven engineering, deep domain expertise, and battle-tested product frameworks to help companies build reliable, scalable, user-centered software, faster and at lower risk.",
      image: null,
      accentColor: "orange",
      supportingItems: {
        kind: "capabilityGrid",
        items: [
          { title: "Product Strategy & Architecture", description: "Roadmapping, market research, AI-enhanced architecture, multi-tenant SaaS & cloud strategy." },
          { title: "Product Design", description: "UX research, journeys, Figma prototypes, usability testing, conversion-focused UI." },
          { title: "Development & Modernization", description: "Full-stack builds, legacy modernization, APIs, microservices, multi-platform engineering." },
          { title: "AI & Automation Integration", description: "GenAI features, in-product copilots, predictive analytics, workflow automation." },
          { title: "Quality Engineering", description: "Automated test generation, performance, load & security testing, compliance QA." },
          { title: "DevOps, CI/CD & Cloud", description: "Cloud deployment (AWS, Azure, GCP), CI/CD pipelines, IaC, observability, cost optimization." },
        ],
      },
    },
    {
      id: "qa",
      sequenceNumber: "03",
      categoryLabel: "Quality Engineering",
      heading: "AI-driven quality for high-performance software.",
      description:
        "From functional testing to performance validation and compliance QA, we ensure flawless releases for every sprint, every release, every scale.",
      image: null,
      accentColor: "teal",
      supportingItems: {
        kind: "capabilityGrid",
        items: [
          { title: "Functional Testing", description: "End-to-end validation, API & microservices, cross-platform, AI-optimized regression." },
          { title: "Test Automation", description: "UI & API automation, CI/CD integration, automated smoke & sanity testing." },
          { title: "Performance & Load", description: "Load, stress & endurance testing, benchmarking, bottleneck diagnostics." },
          { title: "Security & Compliance", description: "Vulnerability assessment, API security, HIPAA / SOC2 / PCI readiness." },
          { title: "Usability & Accessibility", description: "UX validation, WCAG compliance, screen-reader compatibility." },
          { title: "Mobile, Data & Integration", description: "Real-device testing, ETL validation, third-party & event-driven integration testing." },
        ],
      },
    },
  ],
};

const DEFAULT_CTA_BANNER_SECTION: FinalCtaSection = {
  type: "finalCta",
  order: 3,
  eyebrow: "Let's build together",
  heading: "Tell us what you're building.",
  description:
    "Whether it's design, engineering, quality, or all three, we'll give you an honest assessment in a single working session. No pressure, no commitments.",
  ctaLabel: "Schedule a Consultation",
  ctaHref: "/contact",
};

// Last-resort fallback if the CMS is genuinely unreachable — the Services page
// degrades to the same static content it shipped with before CMS integration,
// rather than crashing the page, matching the header/footer/home fallback precedent.
export const DEFAULT_SERVICES_DATA: ServicesPageContent = {
  seo: {
    metaTitle: "Services | TechGrit",
    metaDescription:
      "Design, engineering, and quality services that turn complex ideas into reliable, scalable, AI-first software.",
  },
  sections: [DEFAULT_HERO_SECTION, DEFAULT_ACCORDION_SECTION, DEFAULT_CTA_BANNER_SECTION],
};

function pickHeroSection(sections: StrapiServicesSection[]): StrapiServicesHeroSection | undefined {
  return sections.find((s): s is StrapiServicesHeroSection => s.__component === "page-reusable-sections.hero");
}

function pickAiFirstEngineSection(sections: StrapiServicesSection[]): StrapiAiFirstEngineSection | undefined {
  return sections.find((s): s is StrapiAiFirstEngineSection => s.__component === "page-reusable-sections.ai-first-engine");
}

function pickCtaBannerSection(sections: StrapiServicesSection[]): StrapiServicesCtaBannerSection | undefined {
  return sections.find((s): s is StrapiServicesCtaBannerSection => s.__component === "page-reusable-sections.cta-banner");
}

function toHeroSection(section: StrapiServicesHeroSection): HeroSection {
  return {
    type: "hero",
    order: 1,
    eyebrow: section.badgeLabel,
    title: section.title,
    titleHighlight: section.highlightTitle,
    subtitle: section.subtitle,
    primaryCtaLabel: section.primaryBtnLabel,
    primaryCtaHref: section.primaryBtnLink,
    secondaryCtaLabel: section.secondaryBtnLabel,
    secondaryCtaHref: section.secondaryBtnLink,
  };
}

function toImage(media: StrapiMedia[]): SectionImage | null {
  const first = media[0];
  if (!first) return null;
  const asset = pickMediaAsset(first, ["medium", "small"]);
  return {
    url: resolveMediaUrl(asset.url),
    alternativeText: first.alternativeText ?? "",
    width: asset.width,
    height: asset.height,
  };
}

// The CMS distinguishes the two supporting-content layouts by whether the service
// carries an `approachLabel` (and matching numbered `stepLabel`s) — UI/UX ships a
// sequential 6-step approach, Engineering/QA ship an unordered capability grid.
function toSupportingItems(service: StrapiServiceItem): SupportingItemList {
  if (service.approachLabel) {
    const items: ApproachStep[] = service.approachSteps.map((step, index) => ({
      stepNumber: step.stepLabel ? Number(step.stepLabel) : index + 1,
      title: step.title,
      description: step.subtitle ?? "",
    }));
    return { kind: "orderedApproach", label: service.approachLabel, items };
  }

  const items: CapabilityItem[] = service.approachSteps.map((step) => ({
    title: step.title,
    description: step.subtitle ?? "",
  }));
  return { kind: "capabilityGrid", items };
}

function toAccordionItem(service: StrapiServiceItem, index: number): ServiceAccordionItem {
  return {
    id: String(service.id),
    sequenceNumber: service.stepNumber,
    categoryLabel: service.serviceLabel,
    heading: service.title,
    description: service.subtitle,
    image: toImage(service.image),
    accentColor: ACCENTS[index % ACCENTS.length],
    supportingItems: toSupportingItems(service),
  };
}

function toAccordionSection(section: StrapiAiFirstEngineSection): AccordionSection {
  const [first, second, third] = section.services.map((service, index) => toAccordionItem(service, index));
  if (!first || !second || !third) return DEFAULT_ACCORDION_SECTION;

  return {
    type: "accordion",
    order: 2,
    eyebrow: section.badgeLabel,
    heading: section.title,
    subheading: section.subtitle,
    items: [first, second, third],
  };
}

function toCtaBannerSection(section: StrapiServicesCtaBannerSection): FinalCtaSection {
  return {
    type: "finalCta",
    order: 3,
    eyebrow: section.badgeLabel,
    heading: section.title,
    description: section.subtitle,
    ctaLabel: section.primaryCtaLabel,
    ctaHref: section.primaryCtaLink,
  };
}

// Called directly from the (async) Services Server Component (await getServicesData())
// — runs on the server for every request, so CMS edits show up on the next page load
// with no rebuild, and the browser never sees a loading state for this data. Each
// section degrades independently to its own default when absent from the dynamic
// zone; the whole page degrades to DEFAULT_SERVICES_DATA only when the CMS is
// entirely unreachable.
export async function getServicesData(): Promise<ServicesPageContent> {
  const data = await fetchCms<StrapiServicesPage>(SERVICES_ENDPOINT);
  if (!data) return DEFAULT_SERVICES_DATA;

  const sections = data.sections ?? [];
  const heroSection = pickHeroSection(sections);
  const aiFirstEngineSection = pickAiFirstEngineSection(sections);
  const ctaBannerSection = pickCtaBannerSection(sections);

  const pageSections: PageSectionEntry[] = [
    heroSection ? toHeroSection(heroSection) : DEFAULT_HERO_SECTION,
    aiFirstEngineSection ? toAccordionSection(aiFirstEngineSection) : DEFAULT_ACCORDION_SECTION,
    ctaBannerSection ? toCtaBannerSection(ctaBannerSection) : DEFAULT_CTA_BANNER_SECTION,
  ];

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : DEFAULT_SERVICES_DATA.seo,
    sections: pageSections,
  };
}
