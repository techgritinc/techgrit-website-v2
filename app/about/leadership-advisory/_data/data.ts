import { ROUTES } from "@/lib/routes";
import type { LeadershipPageContent } from "@/cms/types/leadership-types";


const PLACEHOLDER_IMAGE = {
  url: "/assets/team/glasses.png",
  alternativeText: "",
  width: 960,
  height: 1280,
};

const CONTENT: LeadershipPageContent = {
  seo: {
    metaTitle: "Leadership & Advisory | TechGrit",
    metaDescription:
      "Meet the founders, executives, and advisors who guide TechGrit's strategy, culture, and growth.",
  },
  hero: {
    breadcrumbLabel: "About",
    breadcrumbHref: ROUTES.aboutOurStory,
    currentLabel: "Leadership & Advisory",
    badgeLabel: "About TechGrit · Leadership",
    title: "Meet the people guiding our vision and values.",
    titleHighlight: "vision and values.",
    subtitle:
      "The team and advisors who shape TechGrit's strategy, culture, and growth — and who are personally invested in every client's success.",
    primaryCtaLabel: "Join Our Team",
    primaryCtaLink: ROUTES.careers,
    secondaryCtaLabel: "Get in Touch",
    secondaryCtaLink: ROUTES.contactUs,
  },
  profiles: [
    {
      order: 1,
      name: "Jithendra Ganji",
      role: "Founder & CEO",
      bio: "An enterprise tech leader with 25+ years of experience at Fortune 500s like GE and Wells Fargo, he has spent the last 12 years scaling TechGrit into an AI-first engineering partner. Having delivered 500+ projects across regulated industries, Jittu now leads digital transformation for HealthTech, FinTech, and ConstructionTech.",
      image: PLACEHOLDER_IMAGE,
      linkedInUrl: "https://www.linkedin.com/in/jithendra-ganji/",
    },
    {
      order: 2,
      name: "Hemant Elhence",
      role: "Executive Chairman",
      bio: "A technology entrepreneur, venture investor (GP at 3Lines VC, Venture Partner at Sentiero VC), and the Founder/CEO of Synerzip — an Agile product engineering services company he scaled to 400+ professionals over 18 years before a successful PE-backed exit. He now brings institutional-grade growth discipline to TechGrit's expansion.",
      image: PLACEHOLDER_IMAGE,
      linkedInUrl: "https://www.linkedin.com/in/hemant-elhence/",
    },
    {
      order: 3,
      name: "Jonathan Gelhaus",
      role: "Advisory Board Member",
      bio: "A technology executive with over 27 years of experience in cybersecurity, digital transformation, and enterprise leadership. Currently the CIO at Time Investment Company, he brings deep expertise in financial services and governance. He guides TechGrit in scaling AI-first engineering and data platforms while managing complex regulatory risks.",
      image: PLACEHOLDER_IMAGE,
      linkedInUrl: "https://www.linkedin.com/in/jonathangelhaus/",
    },
  ],
  whyItMatters: {
    eyebrow: "Why it matters",
    title: "Practitioners, not consultants.",
    description:
      "Our leadership team has operated inside Fortune 500s, scaled engineering organizations, built and exited software companies, and navigated complex regulated environments. That experience informs every client engagement, every architectural decision, and every delivery commitment we make.",
    tiles: [
      {
        order: 1,
        icon: "enterprise",
        title: "Enterprise pedigree",
        description: "Fortune 500 operational experience across GE, Wells Fargo, and financial institutions.",
      },
      {
        order: 2,
        icon: "startup",
        title: "Startup discipline",
        description: "PE-backed exits and institutional growth frameworks applied to client programs.",
      },
      {
        order: 3,
        icon: "aiFirst",
        title: "AI-first thinking",
        description: "Senior leaders who understand what AI-first engineering actually means in practice.",
      },
      {
        order: 4,
        icon: "longTerm",
        title: "Long-term investment",
        description: "Personally accountable for the quality, outcomes, and trust built with every client.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Work with us",
    title: "Start a conversation with the team.",
    description:
      "Whether you're exploring a partnership or want to understand our approach, we're here to talk. No pitch, no pressure — just a direct conversation.",
    ctaLabel: "Get in Touch",
    ctaLink: ROUTES.contactUs,
    secondaryCta: { label: "See Open Roles", link: ROUTES.careers },
  },
};

export async function getLeadershipPageContent(): Promise<LeadershipPageContent | null> {
  return CONTENT;
}
