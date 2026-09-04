import type { JobDetailContent } from "./types";

// Content/structure sourced from https://www.techgrit.com/dot-net-techlead — only the copy
// and section structure, not that reference page's own visual styling (this repo's dark
// token system is used instead, per CLAUDE.md). This is the one seeded slug today; any other
// slug resolves to undefined and the page 404s.
const DOT_NET_TECHLEAD: JobDetailContent = {
  seo: {
    title: ".NET Tech Lead | TechGrit Careers",
    description:
      "TechGrit is hiring an AI .NET Tech Lead to lead delivery on AI-accelerated .NET engineering pods, combining hands-on .NET Core leadership with directing AI coding agents inside a human-governed workflow.",
  },
  header: {
    badgeLabel: "Open Position",
    title: "AI .NET Tech Lead",
    ctaLabel: "Apply Now",
    ctaLink: "/careers",
    jobType: "Full-Time",
    location: "Remote/Hyderabad (Hybrid)",
    publishedDate: "Published: 20/07/2026",
  },
  sections: [
    {
      heading: "Job Summary",
      blocks: [
        {
          kind: "paragraph",
          subheading: null,
          text: "We are looking for a hands-on AI .NET Tech Lead to join our growing engineering team and lead delivery on our AI-accelerated product engineering pods. In this role, you won't just write great code - you'll own it, and you'll own how AI helps your team produce it faster without cutting corners. You'll lead a team of developers, shape technical direction, and actively contribute to development alongside your team using AI-native tools such as Claude Code as a genuine pair programmer, all inside a human-governed, spec-driven workflow. The ideal candidate combines deep technical expertise in .NET Core, C#, Web API, and cloud platforms (Azure/AWS) with hands-on comfort directing AI coding agents, setting AI guardrails, and running a human-in-the-loop review process — plus the leadership instincts to mentor developers, unblock delivery, and bridge the gap between business goals and engineering execution.",
        },
        {
          kind: "paragraph",
          subheading: null,
          text: "This is not a manager role - it's a role for someone who loves to code, knows how to make an entire team better, and treats AI as a force multiplier rather than a shortcut.",
        },
      ],
    },
    {
      heading: "Key Responsibilities:",
      blocks: [
        {
          kind: "bullets",
          subheading: "Technical Leadership",
          items: [
            "Own architectural decisions for .NET Core applications, APIs, and Windows Services — and bring the team along on the reasoning.",
            "Lead design discussions, drive technical scoping, and ensure solutions are scalable, secure, and maintainable.",
            "Set and enforce AI guardrails: what AI agents can touch autonomously, what needs senior or SME review, and where human judgment is non-negotiable (security, core stored procedures, critical business flows).",
            "Conduct thorough code reviews — of human and AI-generated code alike — that elevate code quality and serve as real learning moments for the team.",
            "Identify and proactively remove technical blockers that slow down delivery.",
            "Drive adoption of engineering best practices, coding standards, and spec-driven development patterns across the team.",
          ],
        },
        {
          kind: "bullets",
          subheading: "Hands-On, AI-Augmented Development",
          items: [
            "Actively contribute to development — writing, reviewing, and shipping production code alongside your team, using AI coding assistants (Claude Code and similar tools) to accelerate the loop, not replace judgment.",
            "Design, develop, and maintain .NET Core applications, RESTful APIs, and Windows Services, working from specs that serve as the source of truth for both code and tests.",
            "Build and maintain PowerShell automation scripts for deployment and system operations.",
            "Migrate legacy ASP.NET applications to modern .NET versions, improving performance and security — including AI-assisted codebase assessment to scope and de-risk the migration.",
            "Integrate cloud-based solutions (Azure/AWS) and contribute to DevOps initiatives.",
            "Maintain and extend a reusable skill and prompt library so AI-assisted output stays consistent, reviewable, and on-standard across the team.",
          ],
        },
        {
          kind: "bullets",
          subheading: "Team & Delivery",
          items: [
            "Mentor and coach developers on both engineering fundamentals and effective AI-assisted development — fostering a culture of ownership, continuous improvement, and collaboration.",
            "Collaborate with Product, QA, and cross-functional stakeholders to define, estimate, and deliver features.",
            "Participate in sprint planning and backlog grooming — translating requirements into well-scoped technical tasks and specs an AI agent and a developer can both build against.",
            "Own the human-in-the-loop checkpoints inside the team's Jira workflow — proportional review based on story complexity, fix criticality, and business impact, with decisions recorded for traceability.",
            "Partner with leadership to improve team velocity, engineering processes, and delivery predictability, measured by shipped, tested software, not tickets moved.",
          ],
        },
      ],
    },
    {
      heading: "Required Qualifications & Skills",
      blocks: [
        {
          kind: "bullets",
          subheading: null,
          items: [
            "Strong proficiency in .NET Core, C#, and Web API",
            "Hands-on experience with Windows Services and PowerShell scripting (required)",
            "Proficient in ASP.NET development — Windows applications, web applications, and WCF services",
            "Proven experience leading or mentoring development teams in a tech lead or senior technical capacity",
            "Solid understanding of RESTful APIs, Microservices Architecture, and SOA",
            "Experience migrating legacy .NET applications to modern .NET versions",
            "Experience with relational and NoSQL databases (SQL Server, PostgreSQL, MySQL, MongoDB, DynamoDB)",
            "Working knowledge of Azure or AWS, and DevOps practices",
            "Practical, hands-on experience directing AI coding assistants/agents (Claude Code, GitHub Copilot, Cursor, or similar) in a professional development setting — not just casual use.",
            "Comfort working in a spec-driven development model and setting or operating within AI guardrails and human-in-the-loop review checkpoints.",
            "Familiarity with AI-assisted quality and review tooling (e.g., SonarQube, Snyk, CodeRabbit) and test automation (e.g., Playwright).",
            "Excellent debugging, problem-solving, and system optimization skills",
            "Strong communication skills — able to translate between technical and non-technical stakeholders",
            "Familiarity with CI/CD pipelines, Docker, and Kubernetes is a plus",
            "Nice to have: Experience with Angular or React",
          ],
        },
      ],
    },
    {
      heading: "Required Qualifications",
      blocks: [
        {
          kind: "bullets",
          subheading: null,
          items: [
            "8+ years of hands-on experience in .NET development",
            "2+ years in a Tech Lead, Senior Lead, or equivalent technical leadership role",
            "Prior experience delivering on an AI-first or AI-augmented engineering team is a strong plus.",
            "Bachelor's degree in Computer Science, Software Engineering, or a related field.",
          ],
        },
      ],
    },
    {
      heading: "About TechGrit",
      blocks: [
        {
          kind: "paragraph",
          subheading: null,
          text: "TechGrit is a custom software development services company dedicated to accelerating business growth through high-performing, AI-first Agile teams. We specialize in delivering diversified and unique solutions across various industries, including Construction Tech, HealthTech, FinTech, and HighTech.",
        },
        {
          kind: "paragraph",
          subheading: null,
          text: "Our team of champion developers works closely with clients to design and develop custom software solutions that meet their business needs — combining senior engineering judgment with AI-accelerated delivery to ship more, faster, without sacrificing quality.",
        },
        {
          kind: "paragraph",
          subheading: "Our Mission:",
          text: "To deliver high-quality and cost-effective software solutions that help companies and entrepreneurs achieve their goals and stay ahead of the competition.",
        },
        {
          kind: "paragraph",
          subheading: "Our Vision:",
          text: "To be the most trusted technology partner for our customers, accelerating their business growth through innovation, reliability, and excellence by best-in-class people.",
        },
        {
          kind: "bullets",
          subheading: "Our Core Values:",
          items: ["Customer Obsession", "Excellence", "Innovation", "Teamwork", "Integrity", "Empathy"],
        },
        {
          kind: "paragraph",
          subheading: null,
          text: "Join TechGrit and be part of a team that values innovation, excellence, and teamwork. We are committed to creating an inclusive environment where all employees feel valued and respected. If you are passionate and want to contribute to our mission and vision, we would love to hear from you.",
        },
      ],
    },
  ],
  finalCta: {
    title: "Step into an AI-first Future",
    titleHighlight: null,
    description: "The era of artificial intelligence is here, offering transformative opportunities for individuals and organizations alike. Explore how to leverage AI-driven insights and tools to gain a competitive edge and build a smarter tomorrow.",
    ctaLabel: "Get in Touch",
    ctaLink: "/contact-us",
  },
};

const JOB_DETAIL_CONTENT: Record<string, JobDetailContent> = {
  "dot-net-techlead": DOT_NET_TECHLEAD,
};

export function getJobDetailContent(slug: string): JobDetailContent | null {
  return JOB_DETAIL_CONTENT[slug] ?? null;
}
