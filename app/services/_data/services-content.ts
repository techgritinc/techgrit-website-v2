import type { ServicesPageContent, SectionImage } from "./types";

const svcUiux: SectionImage = { url: "/samples/svc-uiux.png", alternativeText: "UI/UX Design", width: 720, height: 460 };
const svcEng: SectionImage = { url: "/samples/svc-eng.png", alternativeText: "Software Product Engineering", width: 720, height: 460 };
const svcQa: SectionImage = { url: "/samples/svc-qa.png", alternativeText: "Quality Engineering", width: 720, height: 460 };

export const servicesContent: ServicesPageContent = {
  seo: {
    metaTitle: "Services | TechGrit",
    metaDescription:
      "Design, engineering, and quality services that turn complex ideas into reliable, scalable, AI-first software.",
  },
  sections: [
    {
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
      secondaryCtaHref: "#service-uiux",
    },
    {
      type: "overview",
      order: 2,
      cards: [
        {
          sequenceLabel: "Service 01",
          title: "UI/UX Design",
          description: "Design that accelerates product adoption, engagement, and growth.",
          image: svcUiux,
          targetId: "service-uiux",
          accentColor: "blue",
        },
        {
          sequenceLabel: "Service 02",
          title: "Software Product Engineering",
          description: "AI-first product engineering for modern enterprises, end to end.",
          image: svcEng,
          targetId: "service-eng",
          accentColor: "orange",
        },
        {
          sequenceLabel: "Service 03",
          title: "Quality Engineering",
          description: "AI-driven quality engineering for high-performance software.",
          image: svcQa,
          targetId: "service-qa",
          accentColor: "teal",
        },
      ],
    },
    {
      type: "serviceDetail",
      order: 3,
      anchorId: "service-uiux",
      accentColor: "blue",
      categoryLabel: "Service 01 · UI/UX Design",
      heading: "Design that accelerates adoption, engagement & growth.",
      description:
        "We transform complex ideas into intuitive, delightful, conversion-driven experiences, blending design thinking, user psychology, accessibility, and modern interaction patterns into products users love.",
      image: svcUiux,
      supportingItems: {
        kind: "orderedApproach",
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
      type: "serviceDetail",
      order: 4,
      anchorId: "service-eng",
      accentColor: "orange",
      categoryLabel: "Service 02 · Software Product Engineering",
      heading: "AI-first product engineering for modern enterprises.",
      description:
        "We blend AI-driven engineering, deep domain expertise, and battle-tested product frameworks to help companies build reliable, scalable, user-centered software, faster and at lower risk.",
      image: svcEng,
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
      type: "serviceDetail",
      order: 5,
      anchorId: "service-qa",
      accentColor: "teal",
      categoryLabel: "Service 03 · Quality Engineering",
      heading: "AI-driven quality for high-performance software.",
      description:
        "From functional testing to performance validation and compliance QA, we ensure flawless releases for every sprint, every release, every scale.",
      image: svcQa,
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
    {
      type: "finalCta",
      order: 6,
      eyebrow: "Let's build together",
      heading: "Tell us what you're building.",
      description:
        "Whether it's design, engineering, quality, or all three, we'll give you an honest assessment in a single working session. No pressure, no commitments.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
    },
  ],
};
