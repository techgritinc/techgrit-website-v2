import type { BlogPageContent } from "./types";

// Content carried over verbatim from raw-files/TechGrit Website V2/TechGrit Blog.dc.html
// per spec.md Assumptions. Individual post/article pages are out of scope, so every
// `href` is a placeholder ("#") — see spec.md Assumptions.
export const BLOG_CONTENT: BlogPageContent = {
  hero: {
    eyebrow: "The TechGrit Blog",
    heading: "Insights from the AI-first frontier.",
    headingHighlight: "AI-first frontier.",
    lead: "Field notes on agentic engineering, legacy modernization, and shipping industrial-grade software in weeks — written by the team building it.",
  },
  featuredPost: {
    topic: "Featured · Engineering",
    title:
      "The end of the manual SDLC: how agentic orchestration rewrites the way software gets built.",
    excerpt:
      "For thirty years we optimized the handoffs between humans. The next leap isn't a faster handoff — it's removing it. Here's how orchestrated agents collapse the build loop without giving up engineering rigor.",
    author: {
      name: "Arjun Rao",
      role: "Principal Engineer",
      initials: "AR",
    },
    readTime: "9 min read",
    ctaLabel: "Read article",
    href: "#",
  },
  topics: ["All", "Engineering", "Modernization", "Product", "Methodology", "Industry", "Design"],
  posts: [
    {
      slug: "legacy-modernization-stalling-ai-first-fix",
      topic: "Modernization",
      accent: "blue-light",
      title: "Why your legacy modernization keeps stalling — and the AI-first fix",
      excerpt:
        "Most rewrites die in the gap between 'understand the old system' and 'ship the new one'. Agentic delivery closes it.",
      author: { name: "Priya Nair", initials: "PN" },
      publishDate: "Oct 2",
      readTime: "7 min read",
      href: "#",
    },
    {
      slug: "inside-orbitai-orchestrating-specialized-agents",
      topic: "Product",
      accent: "orange",
      title: "Inside OrbitAI: orchestrating specialized agents across the build",
      excerpt:
        "A look under the hood at how UI, logic, data, and QA agents coordinate — and where humans stay firmly in the loop.",
      author: { name: "Arjun Rao", initials: "AR" },
      publishDate: "Sep 24",
      readTime: "8 min read",
      href: "#",
    },
    {
      slug: "six-weeks-to-production-sprint-to-scale-playbook",
      topic: "Methodology",
      accent: "amber",
      title: "From six weeks to production: the sprint-to-scale playbook",
      excerpt:
        "The exact cadence we use to take an idea to industrial-grade software in six weeks, broken down week by week.",
      author: { name: "Marcus Lee", initials: "ML" },
      publishDate: "Sep 15",
      readTime: "6 min read",
      href: "#",
    },
    {
      slug: "human-in-the-loop-governing-ai-generated-code",
      topic: "Engineering",
      accent: "teal-light",
      title: "Human-in-the-loop: governing AI-generated code at enterprise scale",
      excerpt:
        "Speed without governance is a liability. How we keep audit trails, reviews, and accountability intact at agent speed.",
      author: { name: "Sara Whitman", initials: "SW" },
      publishDate: "Sep 6",
      readTime: "9 min read",
      href: "#",
    },
    {
      slug: "fintech-compliance-ai-first-build-pipeline",
      topic: "Industry",
      accent: "blue",
      title: "FinTech compliance in an AI-first build pipeline",
      excerpt:
        "SOC 2, PCI, and SCIM don't have to slow you down. Building compliance into the pipeline instead of bolting it on.",
      author: { name: "Devin Park", initials: "DP" },
      publishDate: "Aug 28",
      readTime: "7 min read",
      href: "#",
    },
    {
      slug: "design-thinking-meets-agentic-delivery",
      topic: "Design",
      accent: "yellow",
      title: "Design-thinking meets agentic delivery",
      excerpt:
        "Great products still start with empathy. How design research shapes what the agents actually build.",
      author: { name: "Lena Cho", initials: "LC" },
      publishDate: "Aug 19",
      readTime: "5 min read",
      href: "#",
    },
    {
      slug: "testing-strategies-agent-generated-codebases",
      topic: "Engineering",
      accent: "purple",
      title: "Testing strategies for agent-generated codebases",
      excerpt:
        "When code is written at machine speed, your test pyramid is the safety net. What changes, and what doesn't.",
      author: { name: "Arjun Rao", initials: "AR" },
      publishDate: "Aug 11",
      readTime: "8 min read",
      href: "#",
    },
    {
      slug: "strangler-fig-pattern-revisited-ai-era",
      topic: "Modernization",
      accent: "blue-light",
      title: "The strangler-fig pattern, revisited for the AI era",
      excerpt:
        "Incremental migration is still the right call. Agents just let you run far more strangler branches in parallel.",
      author: { name: "Priya Nair", initials: "PN" },
      publishDate: "Aug 3",
      readTime: "6 min read",
      href: "#",
    },
    {
      slug: "shipping-trust-measuring-quality-beyond-coverage",
      topic: "Product",
      accent: "orange",
      title: "Shipping trust: how we measure quality beyond test coverage",
      excerpt:
        "Coverage is table stakes. The signals we actually watch to know an AI-first build is production-ready.",
      author: { name: "Marcus Lee", initials: "ML" },
      publishDate: "Jul 25",
      readTime: "7 min read",
      href: "#",
    },
  ],
  newsletter: {
    heading: "Get the next post in your inbox.",
    copy: "One thoughtful email when we publish — agentic engineering, modernization playbooks, and lessons from real builds. No noise.",
    ctaLabel: "Subscribe",
    helperText: "We'll only email when there's something worth reading.",
    errorText: "Please enter a valid email.",
    successText: "You're subscribed — talk soon.",
  },
};
