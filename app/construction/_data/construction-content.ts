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
      title: "AI-First Construction Tech for smarter, faster, safer projects.",
      titleHighlight: "smarter, faster, safer",
      subtitle:
        "From submittals and RFIs to predictive analytics and safety compliance, we build AI-powered software that helps construction firms deliver projects on time and on budget.",
      primaryCtaLabel: "Talk to a Construction Tech Expert",
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
          title: "AI-Driven Submittal & RFI Management",
          description: "Automate tracking, approvals, and document workflows so nothing stalls in someone's inbox.",
        },
        {
          order: 2,
          title: "Predictive Project Analytics",
          description: "Forecast delays, costs, and resource risks before they occur — and act while it still matters.",
        },
        {
          order: 3,
          title: "Field-to-Office Integration",
          description: "Mobile apps for real-time reporting and team collaboration that keep the site and the office in sync.",
        },
        {
          order: 4,
          title: "Safety & Compliance Monitoring",
          description: "AI-enabled incident tracking and compliance dashboards that surface risk before it becomes a report.",
        },
        {
          order: 5,
          title: "Construction ERP Enhancements",
          description: "Custom integrations with Procore, Autodesk, and Oracle Primavera — your system of record, extended.",
        },
        {
          order: 6,
          title: "Digital Twin & BIM AI Tools",
          description: "Enhance project visualization and monitoring with AI layered on top of your BIM models.",
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
          description: "Embedding predictive analytics and automation directly into construction workflows — not bolted on after.",
        },
        {
          order: 2,
          title: "Domain Expertise",
          description: "Years of experience working with contractors, builders, and project management systems.",
        },
        {
          order: 3,
          title: "Integration Ready",
          description: "Expertise across Procore, Newforma, Autodesk, Bluebeam, and the rest of your stack.",
        },
        {
          order: 4,
          title: "Scalable Teams",
          description: "US-based leadership plus offshore delivery — for speed and cost-efficiency at any project size.",
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
      title: "Talk to a construction tech expert.",
      description:
        "Tell us where projects are slipping — submittals, field reporting, safety, or cost. We'll map an AI-first plan in a single working session. No pressure, no commitments.",
      primaryCtaLabel: "Book on Calendly",
      primaryCtaLink: "#",
      secondaryCtaLabel: "Email the team",
      secondaryCtaLink: "mailto:support@techgrit.com?subject=Construction%20enquiry",
    },
  ],
};
