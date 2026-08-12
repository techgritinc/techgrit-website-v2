import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import type { AdvantageSection } from "../_data/types";

export function ConstructionAdvantage({ section }: { section: AdvantageSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[40px] pb-[60px]" data-reveal>
        <div className="grid grid-cols-1 items-start gap-[56px] md:grid-cols-[0.8fr_1.2fr]">
          <div className="mt-[-3px]">
            <SectionEyebrow showAccent={false} className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
            <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.1] tracking-[-0.03em]">{section.title}</h2>
            <p className="mt-4" style={{ fontSize: "16.5px", lineHeight: 1.65, color: "var(--color-text-muted)" }}>
              {section.description}
            </p>
          </div>
          <div className="border-t border-border-faint">
            {section.points.map((point) => (
              <div key={point.order} className="flex gap-[22px] border-b border-border-faint" style={{ padding: "26px 0" }}>
                <span
                  className="font-display leading-[normal] shrink-0"
                  style={{ width: 34, fontSize: 18, fontWeight: "var(--fw-bold)", color: "var(--color-amber-light)" }}
                >
                  {String(point.order).padStart(2, "0")}
                </span>
                <div>
                  <h3 className=" leading-[normal] tracking-[normal]" style={{ fontSize: "19px" }}>{point.title}</h3>
                  <p className="mt-[7px]" style={{ fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--color-text-60)" }}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
