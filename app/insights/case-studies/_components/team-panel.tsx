import Button from "@/components/ui/Button";
import type { TeamCompositionSection } from "@/cms/types/case-study-detail-types";

export function TeamPanel({ section }: { section: TeamCompositionSection }) {
  return (
    <aside className="order-first tg-md:sticky tg-md:order-none top-[98px]">
      <div className="bg-glass-faint border border-border-faint rounded-xl px-[22px] py-[24px]">
        <div className="text-[12px] font-bold tracking-[var(--ls-label)] uppercase text-[var(--color-text-dim)] mb-[16px] leading-[normal]">
          {section.title}
        </div>
        <div className="flex flex-col gap-[9px] leading-[normal]">
          {section.members.map((member) => (
            <div key={member.order} className="flex items-center justify-between text-[14px] leading-[normal]">
              <span className="text-text-role">{member.role}</span>
              <span className="font-display font-bold text-teal-light">
                {member.count}
              </span>
            </div>
          ))}
        </div>
        <Button
          href={section.ctaLink}
          variant="primary"
          size="footer"
          className="mt-[20px] w-full min-h-[44px]"
        >
          {section.ctaLabel} <span aria-hidden="true">&#8594;</span>
        </Button>

      </div>
    </aside>
  );
}
