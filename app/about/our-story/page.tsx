import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutPageContent } from "@/cms/api/about";
import { AboutUsHero } from "./_components/about-us-hero";
import { AboutUsShowcase } from "./_components/about-us-showcase";
import { AboutUsWhoYouAre } from "./_components/about-us-who-you-are";
import { AboutUsOurRole } from "./_components/about-us-our-role";
import { AboutUsValues } from "./_components/about-us-values";
import { AboutHowWeWork } from "./_components/about-how-we-work";
import { AboutUsAchievements } from "./_components/about-us-achievements";
import { AboutUsPartner } from "./_components/about-us-partner";
import LifeGallery from "@/app/_home-components/LifeGallery";
import { FinalCta } from "@/components/ui/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  if (!content) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function AboutPage() {
  const content = await getAboutPageContent();
  if (!content) notFound();

  const sections = content.sections.filter((section) => section !== undefined);

  return (
    <main className="overflow-x-clip">
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <AboutUsHero key={section.order} section={section} />;
          case "showcase":
            return <AboutUsShowcase key={section.order} section={section} />;
          case "whoYouAre":
            return <AboutUsWhoYouAre key={section.order} section={section} />;
          case "ourRole":
            return <AboutUsOurRole key={section.order} section={section} />;
          case "values":
            return <AboutUsValues key={section.order} section={section} />;
          case "process":
            return <AboutHowWeWork key={section.order} section={section} />;
          case "achievements":
            return <AboutUsAchievements key={section.order} section={section} />;
          case "partner":
            return <AboutUsPartner key={section.order} section={section} />;
          case "cultureGallery":
            return (
              <LifeGallery
                key={section.order}
                id="life"
                heading={section.title}
                description={section.subtitle}
                eyebrow={section.eyebrow}
                images={section.photos}
              />
            );
          case "finalCta":
            return (
              <FinalCta
                key={section.order}
                section={{
                  eyebrow: section.eyebrow,
                  title: section.title,
                  description: section.description,
                  ctaLabel: section.ctaLabel,
                  ctaLink: section.ctaLink,
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
