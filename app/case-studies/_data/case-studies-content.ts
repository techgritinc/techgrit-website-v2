import type { CaseStudy, CaseStudyNarrative } from "./types";

export const CANONICAL_NARRATIVE: CaseStudyNarrative = {
  metrics: [
    { value: "15", label: "team members at peak" },
    { value: "2 mo", label: "discovery & requirements" },
    { value: "6 yrs", label: "of business logic captured" },
    { value: "100%", label: "goal tracking automated" },
  ],
  sections: [
    {
      id: "background",
      heading: "Client background",
      paragraphs: [
        "For the past six years, a leading provider of organizational-management solutions has helped companies streamline team management and goal tracking. Their platform offers interactive representations of team goals and scorecards, enabling organizations to monitor progress and drive success intuitively.",
        "The client had operated for roughly five to six years without a functional application. Their goal was to develop a product that would automate goal tracking for their many clients.",
      ],
    },
    {
      id: "challenge",
      heading: "The challenge",
      intro:
        "Despite extensive industry experience, the company faced significant hurdles in its digital presence and operational efficiency:",
      painPoints: [
        "No functional application to deliver their methodology at scale to clients.",
        "Manual goal-tracking and scorecards that didn't scale across many client organizations.",
        "Need for a multi-tenant architecture to serve many clients from one secure platform.",
      ],
    },
    {
      id: "architecture",
      heading: "The architecture",
      intro:
        "We designed a cloud-native, multi-tenant system: a Next.js web app served through AWS ECS, a NestJS API as the core service, and integrations with object storage and calendar systems.",
      flow: {
        nodes: ["Next.js Web App", "AWS ECS", "NestJS API"],
        integrations: [
          { label: "Amazon S3" },
          { label: "RDS Database" },
          { label: "Office Calendar" },
          { label: "Google Calendar" },
        ],
      },
    },
    {
      id: "solutions",
      heading: "Development challenges & solutions",
      paragraphs: [
        "We ran several requirement-gathering sessions and a two-month discovery phase to fully understand the client's methodology before a line of production code was written. From there, the engagement scaled to a 15-person team at its peak.",
        "The result: an automated goal-tracking and scorecard application that finally let the client deliver their proven methodology to every client — boosting their efficiency and competitiveness in the industry.",
      ],
    },
  ],
  team: [
    { role: "Project Manager", count: 1 },
    { role: "Business Analyst", count: 1 },
    { role: "Team Lead", count: 1 },
    { role: "UI Developers", count: 2 },
    { role: "Full-Stack Developer", count: 1 },
    { role: "Frontend Developer", count: 1 },
    { role: "Backend Developer", count: 1 },
    { role: "Junior Frontend Devs", count: 2 },
    { role: "Backend Intern", count: 1 },
    { role: "QA Engineers", count: 2 },
    { role: "UX Designers", count: 2 },
  ],
  teamSize: 15,
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "net-migration-fintech-modernization",
    title:
      "Migrating 2.5 million lines to .NET 10 — without taking the product down.",
    cardTitle: "Migrating 2.5M lines to .NET 10",
    summary:
      "An AI-assisted, human-governed delivery model shipped every ticket on a legacy .NET project on time, under constraints, and with full audit trails.",
    description:
      "An AI-assisted, human-governed delivery model shipped every ticket on a legacy .NET project on time, under constraints, and with full audit trails.",
    industry: "FinTech",
    category: "FinTech",
    accent: "blue-light",
    featured: true,
    publishedDate: "18 Mar, 2025",
    headlineMetric: { value: "2.5M", label: "lines migrated to .NET 10" },
    narrative: CANONICAL_NARRATIVE,
  },
  {
    slug: "payment-infrastructure-field-service-saas",
    title: "Rebuilding payment infrastructure for a field-service SaaS",
    cardTitle: "Rebuilding payment infrastructure for a field-service SaaS",
    summary:
      "An automated fee-recovery engine that eliminated processing-cost absorption across multiple payment providers — with zero disruption to existing flows.",
    description:
      "An automated fee-recovery engine that eliminated processing-cost absorption across multiple payment providers — with zero disruption to existing flows.",
    industry: "FinTech",
    category: "FinTech",
    accent: "blue-light",
    featured: false,
    publishedDate: "18 Mar, 2025",
    headlineMetric: { value: "Zero", label: "processing costs absorbed" },
    narrative: CANONICAL_NARRATIVE,
  },
  {
    slug: "b2b-marketplace-trust-platform",
    title: "The B2B marketplace that encodes trust into every trade",
    cardTitle: "A B2B marketplace that encodes trust",
    summary:
      "A rule-driven B2B digital marketplace that replaced manual commodity trading with structural, auditable transparency — giving every counterparty a shared source of truth for every trade.",
    description:
      "A rule-driven B2B digital marketplace that replaced manual commodity trading with structural, auditable transparency.",
    industry: "Marketplace",
    category: "Marketplace",
    accent: "orange",
    featured: false,
    publishedDate: "02 Feb, 2025",
    headlineMetric: { value: "100%", label: "trade transparency" },
    narrative: CANONICAL_NARRATIVE,
  },
  {
    slug: "ai-enablement-developer-velocity",
    title: "From overloaded to on-fire",
    cardTitle: "From overloaded to on-fire",
    summary:
      "We used Claude to turn knowledge bottlenecks into developer superpowers — faster onboarding, faster shipping, and a team that spends its time building instead of searching.",
    description:
      "We used Claude to turn knowledge bottlenecks into developer superpowers — faster onboarding, faster shipping.",
    industry: "AI Enablement",
    category: "AI Enablement",
    accent: "amber",
    featured: false,
    publishedDate: "14 Jan, 2025",
    headlineMetric: { value: "10x", label: "faster developer onboarding" },
    narrative: CANONICAL_NARRATIVE,
  },
  {
    slug: "scim-user-license-management",
    title: "Transforming user & license management",
    cardTitle: "Transforming user & license management",
    summary:
      "A SCIM implementation in a FinTech SaaS environment that streamlined provisioning, security, and license efficiency at scale, replacing manual account admin with automated lifecycle management.",
    description:
      "A SCIM implementation in a FinTech SaaS environment that streamlined provisioning, security, and license efficiency at scale.",
    industry: "FinTech",
    category: "FinTech",
    accent: "teal-light",
    featured: false,
    publishedDate: "09 Dec, 2024",
    headlineMetric: { value: "SCIM", label: "provisioning automated" },
    narrative: CANONICAL_NARRATIVE,
  },
  {
    slug: "crypto-data-api-platform",
    title: "Secure crypto data API platform for financial advisors",
    cardTitle: "Secure crypto data API platform for financial advisors",
    summary:
      "A secure API platform enabling real-time crypto data aggregation — faster, accurate, compliant portfolio insights for financial advisors managing digital-asset exposure.",
    description:
      "A secure API platform enabling real-time crypto data aggregation — faster, accurate, compliant portfolio insights.",
    industry: "FinTech",
    category: "FinTech",
    accent: "blue",
    featured: false,
    publishedDate: "26 Oct, 2024",
    headlineMetric: { value: "Live", label: "real-time data platform" },
    narrative: CANONICAL_NARRATIVE,
  },
  {
    slug: "ai-powered-ui-ux-development",
    title: "Revolutionizing UI/UX with AI-powered development",
    cardTitle: "Revolutionizing UI/UX with AI-powered development",
    summary:
      "Leveraged AI to transform UI/UX design and development, delivering accurate, high-quality interfaces from day one and cutting design-to-build handoff friction.",
    description:
      "Leveraged AI to transform UI/UX design and development, delivering accurate, high-quality interfaces from day one.",
    industry: "Design",
    category: "Design",
    accent: "yellow",
    featured: false,
    publishedDate: "11 Sep, 2024",
    headlineMetric: { value: "Day 1", label: "production-ready interfaces" },
    narrative: CANONICAL_NARRATIVE,
  },
];
