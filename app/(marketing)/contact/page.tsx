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
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -160,
          right: -120,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "var(--color-overlay-orange)",
          filter: "blur(120px)",
          animation: "tgorb 16s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -160,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "var(--color-overlay-blue)",
          filter: "blur(130px)",
          animation: "tgorb 20s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />
      <section id="form" style={{ position: "relative" }}>
        <div className="mx-auto max-w-(--container-max) px-9" style={{ paddingBlock: "74px 50px"}}>
          <ContactHeroForm />
        </div>
      </section>

      <section style={{ position: "relative" }}>
        <div className="mx-auto max-w-(--container-max) px-9" style={{ paddingBlock: "30px 80px" }}>
          <NextSteps />
        </div>
      </section>
    </main>
  );
}
