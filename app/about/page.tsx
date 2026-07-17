import type { Metadata } from "next";
import { aboutUsContent } from "./_data/about-us-content";
import { AboutUsHero } from "./_components/about-us-hero";
import { AboutUsShowcase } from "./_components/about-us-showcase";
import { AboutUsWhoYouAre } from "./_components/about-us-who-you-are";
import { AboutUsOurRole } from "./_components/about-us-our-role";
import { AboutUsValues } from "./_components/about-us-values";
import { AboutHowWeWork } from "./_components/about-how-we-work";
import { AboutUsAchievements } from "./_components/about-us-achievements";
import { AboutUsPartner } from "./_components/about-us-partner";
import { AboutUsCultureGallery } from "./_components/about-us-culture-gallery";
import { AboutUsFinalCta } from "./_components/about-us-final-cta";

export const metadata: Metadata = {
  title: aboutUsContent.seo.metaTitle,
  description: aboutUsContent.seo.metaDescription,
};

export default function AboutPage() {
  return (
    <main className="overflow-x-clip">
      {aboutUsContent.sections.map((section) => {
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
            return <AboutUsCultureGallery key={section.order} section={section} />;
          case "finalCta":
            return <AboutUsFinalCta key={section.order} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
