import type { CaseStudy } from "./types";

export const CASE_STUDY_CATEGORIES = ["All", "FinTech", "Marketplace", "AI Enablement", "Design"];

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
    narrative: {
      metrics: [
        { value: "2.5M", label: "lines migrated" },
        { value: "0", label: "hours of downtime" },
        { value: "100%", label: "tickets shipped on schedule" },
        { value: "12 mo", label: "migration window" },
      ],
      blocks: [
        {
          id: "background",
          heading: "Client Summary",
          paragraphs: [
            "The client ran a decade-old .NET Framework platform at the center of its FinTech operations — 2.5 million lines of code, undocumented in places, and too business-critical to take offline for a rewrite.",
            "Every year on the old framework meant more security patches that no longer shipped, more engineers who didn't want to touch the codebase, and a widening gap with the .NET ecosystem the rest of the industry had already moved to.",
          ],
        },
        {
          id: "challenge",
          heading: "The core problem was threefold",
          descriptions: [
            "Modernizing a system this large without disrupting the business it runs required solving three problems at once:",
          ],
          bullets: [
            "The codebase had no single source of truth for its own behaviour — years of undocumented business logic meant a naive migration risked silently changing outcomes customers depended on.",
            "The platform could not go offline. Every ticket had to ship against a system serving live financial transactions, with rollback plans for anything that touched a production path.",
            "Regulated FinTech customers required a full, provable audit trail for the migration itself — not just for the resulting code, but for every decision made along the way.",
          ],
        },
        {
          id: "solutions",
          heading: "Development challenges & solutions",
          paragraphs: [
            "Agents handled the mechanical transformation of legacy modules while engineers reviewed every diff against the regression suite before it reached production — no batch was merged without a human sign-off and a documented rationale.",
            "The result: every ticket on the migration shipped on time, under the client's compliance constraints, with a full audit trail — and the product never went down.",
          ],
        },
      ],
      team: [
        { role: "Project Manager", count: 1 },
        { role: "Solutions Architect", count: 1 },
        { role: "Team Lead", count: 1 },
        { role: "Backend Developers", count: 4 },
        { role: "QA Engineers", count: 3 },
        { role: "DevOps Engineer", count: 1 },
      ],
      teamSize: 11,
    },
  },
  {
    slug: "payment-infrastructure-field-service-saas",
    title: "Rebuilding payment infrastructure for a field-service SaaS",
    cardTitle: "Rebuilding payment infrastructure for a field-service SaaS",
    summary:
      "How TechGrit built an automated fee recovery engine that eliminated processing cost absorption across multiple payment providers, with ZERO disruption to existing payment flows.",
    description:
      "How TechGrit built an automated fee recovery engine that eliminated processing cost absorption across multiple payment providers, with ZERO disruption to existing payment flows. ",
    industry: "FinTech",
    category: "FinTech",
    accent: "blue-light",
    featured: false,
    publishedDate: "07 May, 2026",
    headlineMetric: { value: "Zero", label: "processing costs absorbed" },
    narrative: {
      metrics: [
        { value: "15", label: "team members at peak" },
        { value: "2 mo", label: "discovery & requirements" },
        { value: "3", label: "payment providers integrated" },
        { value: "100%", label: "opt-in, zero disruption" },
      ],
      blocks: [
        {
          id: "background",
          heading: "Client Summary",
          paragraphs: [
            "Credit card processing fees are a significant and growing cost for field service companies. Merchants using the platform were absorbing these fees silently, paying 2–3% per transaction with no mechanism to recover or even quantify what they were losing.",
            "As the platform scaled across thousands of companies and payment volumes grew, the business impact of this gap became impossible to ignore.",
          ],
        },
        {
          id: "challenge",
          heading: "The core problem was threefold",
          descriptions: [
            "Despite extensive industry experience, the company faced significant hurdles in its digital presence and operational efficiency:",
          ],
          bullets: [
            "The platform integrated with three payment providers (Rainforest, FullStack, CardConnect), each with distinct API behaviours, webhook formats, and response structures — meaning any fee recovery solution needed to work seamlessly across all three without fragile, one-off implementations.",
            "Invoice calculations involved tax coefficients, fixed discounts, and prorated line items, creating a mathematically complex environment where fee adjustments could easily break existing totals.",
            "The feature needed to be entirely opt-in: enabled per company, invisible to merchants who hadn't activated it, and non-disruptive to thousands of live payment flows already in production.",
          ],
        },
        {
          id: "solutions",
          heading: "Development challenges & solutions",
          paragraphs: [
            "We ran several requirement-gathering sessions and a two-month discovery phase to fully understand the client's methodology before a line of production code was written. From there, the engagement scaled to a 15-person team at its peak.",
            "The result: The projected savings report turned a passive feature into an active sales tool — giving the team real numbers to show merchants what they were leaving on the table every month.",
          ],
        },
        {
          id: "architecture",
          heading: "Architecture",
          paragraphs: [
            "We designed a cloud-native, multi-tenant system: a Next.js web app served through AWS ECS, a NestJS API as the core service, and integrations with object storage and calendar systems.",
          ],
          pictures: ["/samples/case-studies-architecture.png", "/samples/case-studies-architecture.png","/samples/case-studies-architecture.png"],
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
    },
  },
  {
    slug: "b2b-marketplace-trust-platform",
    title: "The B2B marketplace that encodes trust into every trade",
    cardTitle: "The B2B Marketplace That Encodes Trust Into Every Trade",
    summary:
      "How TechGrit Built a rule-driven B2B digital marketplace that replaced manual commodity trading with structural transparency.",
    description:
      "How TechGrit Built a rule-driven B2B digital marketplace that replaced manual commodity trading with structural, auditable transparency.",
    industry: "Marketplace",
    category: "Marketplace",
    accent: "orange",
    featured: false,
    publishedDate: "16 JUN, 2026",
    headlineMetric: { value: "100%", label: "trade transparency" },
  },
  {
    slug: "ai-enablement-developer-velocity",
    title: "From overloaded to on-fire",
    cardTitle: "From overloaded to on-fire",
    summary:
      "How TechGrit Used Claude to Turn Knowledge Bottlenecks into Developer Superpowers",
    description:
      "How TechGrit Used Claude to Turn Knowledge Bottlenecks into Developer Superpowers",
    industry: "AI Enablement",
    category: "AI Enablement",
    accent: "amber",
    featured: false,
    publishedDate: "13 MAY, 2026",
    headlineMetric: { value: "10x", label: "faster developer onboarding" },
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
  }
];
