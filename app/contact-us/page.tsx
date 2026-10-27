import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContactPageContent } from "@/cms/api/contact";
import ContactHeroForm from "./_components/contact-hero-form";
import NextSteps from "./_components/next-steps";
import type {
  BookCallBannerSection,
  ContactFormSection,
  ContactHeroSection,
  NextStepsSection,
} from "@/cms/types/contact-types";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent();
  if (!content) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  if (!content) notFound();

  const hero = content.sections.find(
    (section): section is ContactHeroSection => section?.type === "contactHero"
  );
  const form = content.sections.find(
    (section): section is ContactFormSection => section?.type === "contactForm"
  );
  const bookCall = content.sections.find(
    (section): section is BookCallBannerSection => section?.type === "bookCallBanner"
  );
  const nextSteps = content.sections.find(
    (section): section is NextStepsSection => section?.type === "nextSteps"
  );

  if (!hero || !form) notFound();

  const heroFormBlock = (
    <section id="form" className="relative">
      <div className="max-w-[1280px] mx-auto px-9 pt-[74px] pb-[50px]">
        <ContactHeroForm hero={hero} form={form} bookCall={bookCall} />
      </div>
    </section>
  );

  const nextStepsBlock = nextSteps && (
    <section className="relative">
      <div className="max-w-[1280px] mx-auto px-9 pt-[30px] pb-[80px]">
        <NextSteps section={nextSteps} />
      </div>
    </section>
  );

  const nextStepsFirst = nextSteps ? nextSteps.order < hero.order : false;

  return (
    <main id="top">
      {nextStepsFirst ? (
        <>
          {nextStepsBlock}
          {heroFormBlock}
        </>
      ) : (
        <>
          {heroFormBlock}
          {nextStepsBlock}
        </>
      )}
    </main>
  );
}
