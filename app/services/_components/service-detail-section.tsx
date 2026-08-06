import Image from "next/image";
import type { ServiceDetailSection as ServiceDetailSectionData, ServiceAccent } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

const ACCENT_VAR: Record<ServiceAccent, string> = {
  blue: "var(--color-blue-light)",
  orange: "var(--color-orange)",
  teal: "var(--color-teal-light)",
};

const CAPABILITY_HOVER_BORDER: Partial<Record<ServiceAccent, string>> = {
  orange: "var(--color-border-orange-medium)",
  teal: "var(--color-border-teal-strong)",
};

const CAPABILITY_PADDING: Partial<Record<ServiceAccent, string>> = {
  orange: "var(--space-12) var(--space-11)",
  teal: "var(--space-11)",
};

function ServiceImage({ section }: { section: ServiceDetailSectionData }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ borderRadius: "var(--radius-2xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-image-lift)" }}
    >
      {section.image ? (
        <Image
          src={section.image.url}
          alt={section.image.alternativeText}
          width={section.image.width}
          height={section.image.height}
          sizes="(min-width: 960px) 50vw, 100vw"
          style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }}
        />
      ) : (
        <div
          className="flex items-center justify-center text-center"
          style={{ height: 300, background: "var(--color-glass)", color: "var(--color-text-faint)", fontSize: "var(--text-sm)" }}
        >
          Drop a service image
        </div>
      )}
    </div>
  );
}

function ApproachSteps({ section }: { section: ServiceDetailSectionData }) {
  if (section.supportingItems.kind !== "orderedApproach") return null;
  const { items } = section.supportingItems;
  const accent = ACCENT_VAR[section.accentColor];

  return (
    <div style={{ marginTop: "var(--space-18)" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: "var(--fw-bold)",
          letterSpacing: "var(--ls-label)",
          textTransform: "uppercase",
          color: "var(--color-text-dim)",
          marginBottom: "var(--space-10)",
        }}
      >
        Our approach
      </div>
      <div
        className="grid grid-cols-1 min-[921px]:grid-cols-3"
        style={{ rowGap: 0, columnGap: "var(--space-20)", borderBottom: "1px solid var(--color-border-image)" }}
      >
        {items.map((step) => (
          <div
            key={step.stepNumber}
            className="flex"
            style={{ gap: "var(--space-7)", padding: "var(--space-10) 0", borderTop: "1px solid var(--color-border-image)" }}
          >
            <span className="font-display" style={{ fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", color: accent, paddingTop: 3 }}>
              {String(step.stepNumber).padStart(2, "0")}
            </span>
            <div>
              <h3 style={{ fontSize: "var(--text-base)" }}>{step.title}</h3>
              <p style={{ marginTop: 6, fontSize: "var(--text-xs)", lineHeight: 1.55, color: "var(--color-text-faint)" }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilityGrid({ section }: { section: ServiceDetailSectionData }) {
  if (section.supportingItems.kind !== "capabilityGrid") return null;
  const { items } = section.supportingItems;
  const hoverBorder = CAPABILITY_HOVER_BORDER[section.accentColor];
  const padding = CAPABILITY_PADDING[section.accentColor] ?? "var(--space-11)";

  return (
    <div className="grid grid-cols-1 tg-sm:grid-cols-2 min-[921px]:grid-cols-3" style={{ marginTop: "var(--space-18)", gap: "var(--space-9)" }}>
      {items.map((item) => (
        <div
          key={item.title}
          className="hover:-translate-y-[5px] hover:border-[var(--capability-hover-border)] transition-[transform,border-color] duration-[250ms] ease-out"
          style={{
            ["--capability-hover-border" as string]: hoverBorder,
            background: "var(--color-glass)",
            border: "1px solid var(--color-border-image)",
            borderRadius: "var(--radius-xl)",
            padding,
            backdropFilter: "blur(var(--blur-md))",
          }}
        >
          <h3 style={{ fontSize: 18 }}>{item.title}</h3>
          <p style={{ marginTop: 9, fontSize: 14.5, lineHeight: 1.6, color: "var(--color-text-muted)" }}>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ServiceDetailSection({ section }: { section: ServiceDetailSectionData }) {
  const accent = ACCENT_VAR[section.accentColor];

  return (
    <section id={section.anchorId} style={{ position: "relative" }}>
      <div className="tg-container" style={{ padding: "var(--space-21) var(--space-15)" }}>
        <RevealOnScroll>
          <div>
            <div className="grid grid-cols-1 items-center gap-[var(--space-14)] min-[921px]:grid-cols-2 min-[921px]:gap-[var(--space-20)]">
              <div>
                <SectionEyebrow accentColor={accent}>{section.categoryLabel}</SectionEyebrow>
                <h2 style={{ fontSize: "clamp(30px, 3.6vw, 40px)", lineHeight: 1.08 }}>{section.heading}</h2>
                <p style={{ marginTop: "var(--space-7)", fontSize: "var(--text-base)", lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                  {section.description}
                </p>
              </div>
              <ServiceImage section={section} />
            </div>

            <ApproachSteps section={section} />
            <CapabilityGrid section={section} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
