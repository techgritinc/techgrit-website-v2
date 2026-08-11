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
      secondaryCtaHref: "#svc-accordion",
    },
    {
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
          image: svcUiux,
          accentColor: "blue",
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
          id: "eng",
          sequenceNumber: "02",
          categoryLabel: "Software Product Engineering",
          heading: "AI-first product engineering for modern enterprises.",
          description:
            "We blend AI-driven engineering, deep domain expertise, and battle-tested product frameworks to help companies build reliable, scalable, user-centered software, faster and at lower risk.",
          image: svcEng,
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
          image: svcQa,
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
    },
    {
      type: "finalCta",
      order: 3,
      eyebrow: "Let's build together",
      heading: "Tell us what you're building.",
      description:
        "Whether it's design, engineering, quality, or all three, we'll give you an honest assessment in a single working session. No pressure, no commitments.",
      ctaLabel: "Schedule a Consultation",
      ctaHref: "/contact",
    },
  ],
};
