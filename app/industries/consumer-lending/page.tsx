import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConsumerLendingPageContent } from "@/cms/api/industries/consumer-lending";
import { IndustryHero } from "@/components/ui/IndustryHero";
import { MetricsStrip } from "@/components/ui/MetricsStrip";
import { Faq } from "@/components/ui/Faq";
import { FinalCta } from "@/components/ui/final-cta";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ConsumerLendingWhy } from "./_components/consumer-lending-why";
import { ConsumerLendingDomainDepth } from "./_components/consumer-lending-domain-depth";
import { ConsumerLendingCapabilities } from "./_components/consumer-lending-capabilities";
import { ConsumerLendingSimpleCards } from "./_components/consumer-lending-simple-cards";
import { ConsumerLendingInstitutional } from "./_components/consumer-lending-institutional";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getConsumerLendingPageContent();
  if (!content || !content.seo) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function ConsumerLendingPage() {
  const content = await getConsumerLendingPageContent();
  if (!content) notFound();

  return (
    <main className="overflow-x-clip">
      {content.sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <IndustryHero key={section.order} section={section} />;
          case "metrics":
            return <MetricsStrip key={section.order} metrics={section.metrics} />;
          case "intro":
            return <ConsumerLendingWhy key={section.order} section={section} />;
          case "domainDepth":
            return <ConsumerLendingDomainDepth key={section.order} section={section} />;
          case "capabilities":
            return <ConsumerLendingCapabilities key={section.order} section={section} />;
          case "appliedAi":
          case "howWeWork":
            return <ConsumerLendingSimpleCards key={section.order} section={section} />;
          case "institutional":
            return <ConsumerLendingInstitutional key={section.order} section={section} />;
          case "quote":
            return (
              <section key={section.order} className="relative">
                <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
                  <RevealOnScroll>
                    <div className="glass-card glass-card-lg mx-auto px-9 py-12 text-center md:px-16">
                      <blockquote className="mx-auto max-w-[820px] text-[22px] leading-[1.5] font-semibold text-white">
                        &ldquo;{section.quote}&rdquo;
                      </blockquote>
                      <cite className="mt-5 block text-[14px] leading-[1.5] text-text-60 not-italic">{section.citation}</cite>
                    </div>
                  </RevealOnScroll>
                </div>
              </section>
            );
          case "faq":
            return (
              <section key={section.order} className="relative">
                <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
                  <RevealOnScroll>
                    <div className="mb-8">
                      <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">{section.eyebrow}</div>
                      <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">{section.title}</h2>
                    </div>
                    <Faq items={section.items} />
                  </RevealOnScroll>
                </div>
              </section>
            );
          case "finalCta":
            return (
              <FinalCta
                key={section.order}
                tone="amber"
                maxWidth={1280}
                section={{
                  eyebrow: section.eyebrow,
                  title: section.title,
                  description: section.description,
                  ctaLabel: section.primaryCtaLabel,
                  ctaLink: section.primaryCtaLink,
                  secondaryCta: { label: section.secondaryCtaLabel, link: section.secondaryCtaLink },
                }}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
