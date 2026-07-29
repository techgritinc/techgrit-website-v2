import type { WebinarPageContent } from "./types";

export const webinarPageContent: WebinarPageContent = {
  hero: {
    badgeLabel: "Webinar Series",
    heading: "Join our free webinar series.",
    headingHighlight: "webinar series.",
    lead: "Stay ahead with insights from industry leaders. Explore trends, innovations, and strategies to grow your business.",
    formPlaceholder: "e.g., email@example.com",
    formCtaLabel: "Subscribe",
    successText: "You're in. We'll email you when the next session goes live.",
    collage: [
      { position: 1, kind: "spin-ring" },
      { position: 2, kind: "photo", image: { src: "/assets/team/glasses.png", alt: "Speaker" } },
      { position: 3, kind: "photo", image: { src: "/assets/team/rooftop.png", alt: "Speaker" } },
      { position: 4, kind: "photo", image: { src: "/assets/team/painting.png", alt: "Speaker" } },
      { position: 5, kind: "play-triangle" },
      { position: 6, kind: "photo", image: { src: "/assets/team/diwali.png", alt: "Speaker" } },
      {
        position: 7,
        kind: "photo",
        image: { src: "/assets/team/rooftop.png", alt: "Speaker", objectPosition: "left" },
      },
      {
        position: 8,
        kind: "photo",
        image: { src: "/assets/team/glasses.png", alt: "Speaker", objectPosition: "right" },
      },
      { position: 9, kind: "pulse-dot" },
    ],
  },
  sessionsHeading: "Sessions",
  upcomingSession: {
    statusLabel: "Upcoming · Live",
    title: "Migrating 2.5 million lines to .NET 10 — without taking the product down.",
    description:
      "A live walkthrough of the AI-assisted, human-governed delivery model behind one of our largest modernization projects.",
    date: "30th June 2026",
    time: "12:00 PM",
    timezone: "CST",
    ctaLabel: "Register Now",
  },
  releasedSessions: [
    {
      id: "ai-agent-threat-or-superpower",
      statusLabel: "Released",
      title: "Rise of the AI agent: threat or superpower for humans?",
      description:
        "A provocative discussion on the profound implications of autonomous agents for how we build and work.",
      ctaLabel: "Watch Now",
      accent: "orange",
      cardSize: "half",
    },
    {
      id: "ai-first-software-teams-beyond-agile",
      statusLabel: "Released",
      title: "Building AI-first software teams & systems [Beyond Agile]",
      description:
        "We're witnessing the biggest shift in software development since the internet — here's how to organize for it.",
      ctaLabel: "Watch Now",
      accent: "blue",
      cardSize: "half",
    },
    {
      id: "langchain-conversational-ai",
      statusLabel: "Released",
      title: "LangChain: powering next-gen conversational AI applications",
      description:
        "Revolutionizing document access for a technology-services firm with retrieval-augmented, conversational AI.",
      ctaLabel: "Watch Now",
      accent: "teal",
      cardSize: "full",
    },
  ],
  subscribePanel: {
    heading: "Subscribe to our mailing list to stay updated on webinar announcements.",
    copy: "No spam — just new sessions, recordings, and the occasional deep-dive worth your time.",
    formPlaceholder: "e.g., email@example.com",
    ctaLabel: "Subscribe",
    successText: "You're in. We'll email you when the next session goes live.",
  },
};
