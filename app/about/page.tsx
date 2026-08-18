import type { Metadata } from "next";
import {
  getAboutAchievementsContent,
  getAboutCultureGalleryContent,
  getAboutFinalCtaContent,
  getAboutHeroContent,
  getAboutOurRoleContent,
  getAboutPartnerContent,
  getAboutProcessContent,
  getAboutValuesContent,
  getAboutWhoYouAreContent,
} from "@/cms/api/about";
import { aboutUsContent } from "./_data/about-us-content";
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

export const metadata: Metadata = {
  title: aboutUsContent.seo.metaTitle,
  description: aboutUsContent.seo.metaDescription,
};

export default async function AboutPage() {
  // Every section is CMS-driven now except Showcase (still no dedicated CMS component — see
  // cms/api/about.ts). Each falls back to its static content if the CMS is unreachable.
  const [
    cmsHero,
    cmsWhoYouAre,
    cmsOurRole,
    cmsValues,
    cmsProcess,
    cmsAchievements,
    cmsPartner,
    cmsCultureGallery,
    cmsFinalCta,
  ] = await Promise.all([
    getAboutHeroContent(),
    getAboutWhoYouAreContent(),
    getAboutOurRoleContent(),
    getAboutValuesContent(),
    getAboutProcessContent(),
    getAboutAchievementsContent(),
    getAboutPartnerContent(),
    getAboutCultureGalleryContent(),
    getAboutFinalCtaContent(),
  ]);

  return (
    <main className="overflow-x-clip">
      {aboutUsContent.sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <AboutUsHero key={section.order} section={cmsHero ?? section} />;
          case "showcase":
            return <AboutUsShowcase key={section.order} section={section} />;
          case "whoYouAre":
            return <AboutUsWhoYouAre key={section.order} section={cmsWhoYouAre ?? section} />;
          case "ourRole":
            return <AboutUsOurRole key={section.order} section={cmsOurRole ?? section} />;
          case "values":
            return <AboutUsValues key={section.order} section={cmsValues ?? section} />;
          case "process":
            return <AboutHowWeWork key={section.order} section={cmsProcess ?? section} />;
          case "achievements":
            return <AboutUsAchievements key={section.order} section={cmsAchievements ?? section} />;
          case "partner":
            return <AboutUsPartner key={section.order} section={cmsPartner ?? section} />;
          case "cultureGallery": {
            const gallery = cmsCultureGallery ?? section;
            return (
              <LifeGallery
                key={section.order}
                id="life"
                heading={gallery.title}
                description={gallery.subtitle}
                eyebrow={gallery.eyebrow}
                images={gallery.images}
              />
            );
          }
          case "finalCta": {
            const cta = cmsFinalCta ?? section;
            return (
              <FinalCta
                key={section.order}
                section={{
                  eyebrow: cta.eyebrow,
                  title: cta.title,
                  description: cta.description,
                  ctaLabel: cta.ctaLabel,
                  ctaLink: cta.ctaLink,
                }}
              />
            );
          }
          default:
            return null;
        }
      })}
    </main>
  );
}
 