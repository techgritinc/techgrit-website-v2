import type { Metadata } from "next";
import ContactHeroForm from "./_components/contact-hero-form";
import NextSteps from "./_components/next-steps";

export const metadata: Metadata = {
  title: "Contact Us — TechGrit",
  description:
    "Tell TechGrit about your product, your timeline, and what success looks like. We'll get back within one business day.",
};

export default function ContactPage() {
  return (
    <main id="top">
      <section id="form" className="relative scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-9 pt-[74px] pb-[50px]">
          <ContactHeroForm />
        </div>
      </section>

      <section className="relative">
        <div className="max-w-[1280px] mx-auto px-9 pt-[30px] pb-[80px]">
          <NextSteps />
        </div>
      </section>
    </main>
  );
}
