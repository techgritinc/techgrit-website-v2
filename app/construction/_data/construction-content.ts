import type { ConstructionPageContent } from "./types";

// Content shape mirrors specs/TMS-67/contracts/construction-page-response.json.
// The contract discriminates sections by `__component` (e.g. "page-reusable-sections.construction-hero");
// here that maps to the `type` field each section component expects (see data-model.md).
export const constructionContent: ConstructionPageContent = {
  seo: {
    metaTitle: "Construction | TechGrit — AI-First Construction Tech",
    metaDescription:
      "From submittals and RFIs to predictive analytics and safety compliance, TechGrit builds AI-powered software that helps construction firms deliver projects on time and on budget.",
  },
  sections: [
    {
      type: "hero",
      order: 1,
      eyebrow: "Industries · Construction",
      title: "AI-First Software Engineering for ",
      titleHighlight: "Construction Technology Companies",
      subtitle:
        "Build, modernize, and scale construction software with AI-assisted engineering. From field operations and project management to equipment, payments, compliance, and analytics, TechGrit helps ConTech companies deliver secure, scalable, and intelligent digital products faster.",
      primaryCtaLabel: "Talk to Our Engineering Team ",
      primaryCtaLink: "/contact/",
      secondaryCtaLabel: "See Solutions",
      secondaryCtaLink: "#solutions",
      image: {
        url: "/samples/ind-construction.png",
        alternativeText: "Construction site with AI-assisted field monitoring",
        width: 720,
        height: 360,
      },
      stats: [
        { order: 1, value: "<30d", label: "to first MVP" },
        { order: 2, value: "1000s", label: "field hours saved" },
        { order: 3, value: "24/7", label: "safety monitoring" },
      ],
    },
    {
      type: "integrationsStrip",
      order: 2,
      label: "Integrates with the tools you run on",
      partners: [
        { order: 1, name: "Procore" },
        { order: 2, name: "Autodesk" },
        { order: 3, name: "Bluebeam" },
        { order: 4, name: "Newforma" },
        { order: 5, name: "Oracle Primavera" },
      ],
    },
    {
      type: "challenges",
      order: 3,
      eyebrow: "The challenge",
      title: "The construction industry is facing digital pressure.",
      description:
        "Margins are thin, schedules are tight, and the data that runs a project is scattered across binders, spreadsheets, and disconnected apps. The cost of that friction shows up everywhere.",
      challenges: [
        { order: 1, label: "Manual submittal & RFI workflows" },
        { order: 2, label: "Cost overruns & schedule delays" },
        { order: 3, label: "Fragmented field-to-office comms" },
        { order: 4, label: "Safety, compliance & reporting risk" },
        { order: 5, label: "No real-time project visibility" },
      ],
    },
    {
      type: "solutions",
      order: 4,
      eyebrow: "What we build",
      title: "AI solutions that transform construction workflows.",
      solutions: [
        {
          order: 1,
          title: "Project & Construction Management Platforms ",
          description: "Deliver connected experiences that bring scheduling, budgeting, documentation, collaboration, and execution together. ",
        },
        {
          order: 2,
          title: "Field Service & Workforce Management",
          description: "Build mobile-first solutions for technicians, inspectors, supervisors, and field teams with offline capabilities and real-time synchronization.",
        },
        {
          order: 3,
          title: "Equipment & Asset Management",
          description: "Monitor utilization, maintenance schedules, telematics, and lifecycle performance with connected asset management platforms.",
        },
        {
          order: 4,
          title: "AI-Powered Document Management",
          description: "Automate the processing of RFIs, contracts, change orders, permits, drawings, invoices, and compliance documentation using AI.",
        },
        {
          order: 5,
          title: "Estimation & Cost Management",
          description: "Enable more accurate bidding, forecasting, budgeting, procurement, and cost control with integrated financial workflows.",
        },
        {
          order: 6,
          title: "Safety & Compliance Solutions",
          description: "Digitize inspections, incident reporting, audits, certifications, and regulatory compliance across projects.",
        },
        {
          order: 7,
          title: "Construction Analytics & Dashboards",
          description: "Provide executives and project managers with real-time operational insights through centralized reporting and predictive analytics.",
        },
        {
          order: 8,
          title: "Payment & Financial Workflows",
          description: "Simplify invoicing, subcontractor payments, approvals, retainage management, and financial reconciliation.",
        },
      ],
    },
    {
      type: "lifecycleDiagram",
      order: 5,
      eyebrow: "How it fits together",
      title: "One AI layer, across the entire project lifecycle.",
      engineLabel: "OrbitAI",
      engineSubLabel: "Engine",
      nodes: [
        { order: 1, name: "Submittals & RFIs" },
        { order: 2, name: "Predictive Analytics" },
        { order: 3, name: "Field & Office" },
        { order: 4, name: "Safety & Compliance" },
        { order: 5, name: "ERP Sync" },
        { order: 6, name: "BIM & Digital Twin" },
        { order: 7, name: "Scheduling" },
        { order: 8, name: "Cost Control" },
      ],
    },
    {
      type: "advantage",
      order: 6,
      eyebrow: "Why TechGrit",
      title: "The TechGrit advantage.",
      description:
        "We pair AI-first engineering with deep construction-domain experience — and an integration-ready, US-led delivery model built for speed.",
      points: [
        {
          order: 1,
          title: "AI-First Engineering",
          description: "Accelerate software delivery by combining experienced engineers with AI-assisted development practices.",
        },
        {
          order: 2,
          title: "Product Mindset ",
          description: "We understand SaaS platforms, not just software projects.",
        },
        {
          order: 3,
          title: "Modernization Expertise",
          description: "Extend the life of legacy applications while preparing them for AI-driven capabilities.",
        },
        {
          order: 4,
          title: "Cloud-Native Engineering",
          description: "Design resilient, scalable, and secure platforms for long-term growth.",
        },
        {
          order: 5,
          title: "Long-Term Product Partnership ",
          description: "Support your product from discovery through continuous innovation.",
        },
      ],
    },
    {
      type: "impact",
      order: 7,
      eyebrow: "Proven impact",
      title: "Proven impact in construction tech.",
      caseStudies: [
        {
          order: 1,
          metric: "<30 days",
          label: "Case Study 01",
          title: "Fully functional MVP, delivered fast",
          description: "Delivered a fully functional Minimum Viable Product in under 30 days — proving the concept and unlocking funding.",
          link: "/contact/",
        },
        {
          order: 2,
          metric: "1000s hrs",
          label: "Case Study 02",
          title: "MEP operations platform",
          description: "Built a comprehensive platform for MEP operations that saves thousands of labor hours in the field.",
          link: "/contact/",
        },
        {
          order: 3,
          metric: "Virtual bid",
          label: "Case Study 03",
          title: "Bid management application",
          description: "Built a virtual bid management application that streamlines the bidding process for owners and solicitors.",
          link: "/contact/",
        },
      ],
    },
    {
      type: "finalCta",
      order: 8,
      eyebrow: "Build on time, on budget",
      title: "Build the Future of Construction Technology",
      description:
        "Whether you're launching a new construction platform, modernizing legacy software, or embedding AI into your product, TechGrit helps you deliver faster with AI-first engineering.",
      primaryCtaLabel: "Talk to Our Engineering Team",
      primaryCtaLink: "/contact/",
      secondaryCtaLabel: "Contact the team",
      secondaryCtaLink: "/contact/",
    },
  ],
};
