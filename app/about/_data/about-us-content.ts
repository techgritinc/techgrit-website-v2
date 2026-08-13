import type { AboutUsPageContent } from "./types";

// Content shape mirrors specs/001-about-us-page/contracts/about-us-page-response.json.
// The contract discriminates sections by `__component` (e.g. "page-reusable-sections.about-us-hero");
// here that maps to the `type` field each section component expects (see data-model.md).
export const aboutUsContent: AboutUsPageContent = {
  seo: {
    metaTitle: "About TechGrit | Your AI-First Engineering Partner",
    metaDescription:
      "For over a decade, TechGrit has helped ambitious teams turn complex technology decisions into real, working systems.",
  },
  sections: [
    {
      type: "hero",
      order: 1,
      eyebrow: "About TechGrit",
      title: "Your trusted, AI-first engineering partner.",
      titleHighlight: "AI-first",
      subtitle:
        "For over a decade, TechGrit has helped ambitious teams turn complex technology decisions into real, working systems, guiding them from idea to execution with clarity and confidence.",
      primaryCtaLabel: "Start a Conversation",
      primaryCtaLink: "/contact/",
      secondaryCtaLabel: "What we stand for",
      secondaryCtaLink: "#values",
    },
    {
      type: "showcase",
      order: 2,
      image: {
        url: "/images/about-us/pasted-1782818442912-0.png",
        alternativeText: "The TechGrit team at work",
        width: 2048,
        height: 1536,
      },
    },
    {
      type: "whoYouAre",
      order: 3,
      eyebrow: "Who you are",
      title: "You're ambitious, forward-thinking, and ready to scale.",
      paragraphs: [
        {
          text: "You're a business or technology leader looking to innovate and scale your software, and you understand that AI and modern engineering practices are critical to staying competitive.",
          highlight: "AI and modern engineering practices are critical to staying competitive.",
        },
        {
          text: "The challenge isn't a lack of technical knowledge. It's the complexity, risk, and uncertainty that come with building and scaling software, whether in-house or with the wrong partners.",
          highlight: "complexity, risk, and uncertainty",
        },
      ],
      concernsCard: {
        label: "The real concerns",
        concerns: ["Will timelines slip?", "Will costs spiral?", "Will it meet expectations?"],
        closingStatement: "You need a clear, reliable, and scalable path to bring your vision to life.",
      },
    },
    {
      type: "ourRole",
      order: 4,
      eyebrow: "Our role",
      title: "We become your engineering partner, from idea to execution.",
      titleHighlight: "engineering partner",
      description:
        "Our approach combines deep software engineering expertise with a practical, AI-first mindset to deliver outcomes, not just code. We own the path from strategic intent to production-grade software, with full accountability.",
    },
    {
      type: "values",
      order: 5,
      eyebrow: "What we stand for",
      title: "Six core values guide everything we do.",
      values: [
        { order: 1, title: "Customer Obsession", description: "Putting the customer first, always." },
        { order: 2, title: "Excellence", description: "Raising the bar, every single day." },
        { order: 3, title: "Innovation", description: "Pioneering tomorrow's solutions." },
        { order: 4, title: "Teamwork", description: "Collaborating for shared success." },
        { order: 5, title: "Integrity", description: "Doing the right thing, even when it's difficult." },
        { order: 6, title: "Empathy", description: "Everything we do begins with kindness and compassion." },
      ],
    },
    {
      type: "process",
      order: 6,
      eyebrow: "How we work",
      title: "The TechGrit 3-Step Plan.",
      subtitle: "We bring clarity to complexity with a simple, proven approach.",
      steps: [
        {
          order: 1,
          label: "STEP 01",
          title: "Strategize & Design",
          description: "We collaborate to define your vision and create a clear technical roadmap.",
        },
        {
          order: 2,
          label: "STEP 02",
          title: "Engineer & Innovate",
          description: "Our expert team, enhanced by AI, builds a robust and scalable solution.",
        },
        {
          order: 3,
          label: "STEP 03",
          title: "Scale & Support",
          description: "We deploy your solution and provide ongoing support to ensure long-term success.",
        },
      ],
    },
    {
      type: "achievements",
      order: 7,
      stats: [
        { value: "60+", label: "Employees" },
        { value: "500+", label: "Projects" },
        { value: "70+", label: "Clients" },
        { value: "12+", label: "Years in Industry" },
      ],
    },
    {
      type: "partner",
      order: 8,
      eyebrow: "If we partner together",
      title: "Here's what success looks like.",
      description:
        "Peace of mind, knowing your technology is built right, built to scale, and built for the future. The future belongs to teams that build smarter, and TechGrit helps you get there faster and with confidence.",
      outcomes: [
        { text: "A scalable, AI-enhanced solution aligned to your goals" },
        { text: "Faster delivery with fewer surprises" },
        { text: "A more productive, confident engineering environment" },
        { text: "A long-term partner invested in your success" },
      ],
    },
    {
      type: "cultureGallery",
      order: 9,
      eyebrow: "Inside TechGrit",
      title: "Life at TechGrit.",
      subtitle: "The people and the culture behind the engineering.",
      // Same 4 photos/captions as Careers' Life at TechGrit gallery (TechGrit About.dc.html
      // marks this section a "shared component — matches Homepage & Careers").
      photos: [
        {
          image: {
            url: "/assets/team/glasses.png",
            alternativeText: "TechGrit team member",
            width: 960,
            height: 1280,
          },
          captionLabel: "The team",
          caption: "Builders and designers behind the engineering.",
        },
        {
          image: {
            url: "/assets/team/rooftop.png",
            alternativeText: "TechGrit office rooftop",
            width: 1024,
            height: 768,
          },
          captionLabel: "The office",
          caption: "Rooftop breaks, real conversations.",
        },
        {
          image: {
            url: "/assets/team/painting.png",
            alternativeText: "TechGrit culture moment",
            width: 2048,
            height: 1153,
          },
          captionLabel: "Craft",
          caption: "We take craft seriously — inside & outside code.",
        },
        {
          image: {
            url: "/assets/team/diwali.png",
            alternativeText: "TechGrit team celebration",
            width: 2048,
            height: 1536,
          },
          captionLabel: "Together",
          caption: "We celebrate wins — and Diwali — together.",
        },
      ],
    },
    {
      type: "finalCta",
      order: 10,
      eyebrow: "What happens next",
      title: "Getting started is simple.",
      description:
        "Let's have a conversation about your business, your challenges, and how we can help. No pressure. No commitments. Just a focused discussion on what's possible.",
      ctaLabel: "Start a Conversation",
      ctaLink: "mailto:support@techgrit.com?subject=Let's%20talk",
    },
  ],
};
