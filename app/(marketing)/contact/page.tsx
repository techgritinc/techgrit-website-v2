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
    <main style={{ background: "linear-gradient(to right, #061f30ff, #191818ff)", minHeight: "100vh" }}>
      <section style={{ position: "relative" }}>
        <div className="container" style={{ paddingBlock: "74px 50px" }}>
          <ContactHeroForm />
        </div>
      </section>

      <section style={{ position: "relative" }}>
        <div className="container" style={{ paddingBlock: "30px 80px" }}>
          <NextSteps />
        </div>
      </section>
    </main>
  );
}
