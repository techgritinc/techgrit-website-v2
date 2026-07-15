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
    <div style={{ position: "relative", overflowX: "clip" }}>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
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
          }}
        />
        <div
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
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <main id="top">
          <section id="form" style={{ position: "relative", scrollMarginTop: "84px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "74px 36px 50px" }}>
              <ContactHeroForm />
            </div>
          </section>

          <section style={{ position: "relative" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 36px 80px" }}>
              <NextSteps />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
