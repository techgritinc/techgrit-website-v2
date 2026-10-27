import type { NextStepsSection } from "@/cms/types/contact-types";

export default function NextSteps({ section }: { section: NextStepsSection }) {
  return (
    <div className="border-t border-border-subtle pt-11 leading-[normal]">
      <h2 className="text-[clamp(24px,2.8vw,32px)] tracking-[-0.03em] text-center leading-[normal]">
        {section.title}
      </h2>
      <div className="grid grid-cols-1 tg-md:grid-cols-[repeat(3,1fr)] mt-8.5 gap-6">
        {section.steps.map((step) => (
          <div
            key={step.order}
            className="relative bg-glass border border-border rounded-[18px] px-6.5 py-7 leading-[normal]"
          >
            <span className="text-[15px] font-bold text-amber-light leading-[normal] tracking-normal">
              {step.stepLabel}
            </span>
            <h3 className="mt-3 text-[18px] leading-[normal] tracking-normal">{step.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-white/[0.62] tracking-normal">
              {step.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
