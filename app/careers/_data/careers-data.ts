export interface CollageImage {
  src: string;
  alt: string;
  span: "tall" | "default" | "wide" | "wide3";
}

export interface CareersHeroContent {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  images: [CollageImage, CollageImage, CollageImage, CollageImage];
}

export interface Stat {
  value: string;
  label: string;
}

export type BenefitIconName = "lightning" | "book" | "home" | "heart" | "barChart" | "users";

export interface Benefit {
  icon: BenefitIconName;
  title: string;
  description: string;
}

export interface DepartmentFilter {
  value: string;
  label: string;
}

export type AccentKey = "orange" | "yellow" | "teal" | "blue";

export interface OpenRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  accent: AccentKey;
}

export interface LifeAtTechGritContent {
  heading: string;
  description: string;
  images: CollageImage[];
}

export interface ClosingCtaContent {
  heading: string;
  headingHighlight: string;
  copy: string;
  ctaLabel: string;
}

export interface WhyJoinContent {
  heading: string;
}

export interface CareersPageContent {
  hero: CareersHeroContent;
  stats: Stat[];
  whyJoin: WhyJoinContent;
  benefits: Benefit[];
  filters: DepartmentFilter[];
  roles: OpenRole[];
  lifeAtTechGrit: LifeAtTechGritContent;
  cta: ClosingCtaContent;
}

export const careersPageContent: CareersPageContent = {
  hero: {
    eyebrow: "Careers at TechGrit",
    heading: "Build the AI-first future with us.",
    headingHighlight: "AI-first future",
    lead: "We're a team of engineers, designers, and quality obsessives building software with AI at the core. Join us and ship work that matters — fast.",
    primaryCta: { label: "See open roles", href: "#roles" },
    secondaryCta: { label: "Life at TechGrit", href: "#life" },
    images: [
      { src: "/assets/team/glasses.png", alt: "Team", span: "tall" },
      { src: "/assets/team/rooftop.png", alt: "Team", span: "default" },
      { src: "/assets/team/painting.png", alt: "Team", span: "default" },
      { src: "/assets/team/diwali.png", alt: "Team", span: "wide" },
    ],
  },
  stats: [
    { value: "60+", label: "engineers & designers" },
    { value: "Remote", label: "first, global team" },
    { value: "6 wks", label: "average idea-to-ship" },
    { value: "AI-first", label: "in every workflow" },
  ],
  whyJoin: {
    heading: "Why people join — and stay.",
  },
  benefits: [
    {
      icon: "lightning",
      title: "Ship at AI speed",
      description:
        "Agentic tooling is part of how we work — you spend your time on judgment and craft, not boilerplate.",
    },
    {
      icon: "book",
      title: "Learn relentlessly",
      description:
        "A dedicated learning budget, internal webinars, and time to explore the tools reshaping our craft.",
    },
    {
      icon: "home",
      title: "Work from anywhere",
      description:
        "Remote-first by design, with flexible hours and async-friendly rituals that respect your focus time.",
    },
    {
      icon: "heart",
      title: "Health & well-being",
      description:
        "Comprehensive health coverage, generous leave, and a culture that treats rest as part of the work.",
    },
    {
      icon: "barChart",
      title: "Real ownership",
      description: "Small teams, big mandates. Your decisions ship to real users and your impact is visible.",
    },
    {
      icon: "users",
      title: "A team that celebrates",
      description: "Rooftop dinners, Diwali paint nights, and the kind of camaraderie that makes hard work fun.",
    },
  ],
  filters: [
    { value: "all", label: "All" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "quality", label: "Quality" },
    { value: "product", label: "Product" },
  ],
  roles: [
    {
      slug: "senior-fullstack-engineer",
      title: "Senior Full-Stack Engineer",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      accent: "orange",
    },
    {
      slug: "ai-agent-engineer",
      title: "AI / Agent Engineer",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      accent: "orange",
    },
    {
      slug: "frontend-engineer-react",
      title: "Frontend Engineer (React)",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      accent: "orange",
    },
    {
      slug: "product-designer-uiux",
      title: "Product Designer (UI/UX)",
      department: "design",
      location: "Remote",
      type: "Full-time",
      accent: "yellow",
    },
    {
      slug: "qa-automation-engineer",
      title: "QA Automation Engineer",
      department: "quality",
      location: "Remote",
      type: "Full-time",
      accent: "teal",
    },
    {
      slug: "engineering-manager",
      title: "Engineering Manager",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      accent: "orange",
    },
    {
      slug: "business-analyst",
      title: "Business Analyst",
      department: "product",
      location: "Remote",
      type: "Full-time",
      accent: "blue",
    },
  ],
  lifeAtTechGrit: {
    heading: "Life at TechGrit",
    description:
      "The work is hard and the standards are high — but we make room for the moments that turn a team into a family.",
    images: [
      { src: "/assets/team/glasses.png", alt: "Team portrait", span: "tall" },
      { src: "/assets/team/rooftop.png", alt: "Rooftop gathering", span: "wide" },
      { src: "/assets/team/painting.png", alt: "Diwali painting", span: "default" },
      { src: "/assets/team/diwali.png", alt: "Diwali celebration", span: "wide3" },
    ],
  },
  cta: {
    heading: "Don't see your exact role?",
    headingHighlight: "exact role?",
    copy: "We're always looking for exceptional people. Send your resume and a note on what you'd love to build — we read every one.",
    ctaLabel: "Send your resume",
  },
};
