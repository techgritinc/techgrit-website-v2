import Image from "next/image";
import PhaseShowcase from "@/components/ui/PhaseShowcase";
import { splitHighlight } from "@/cms/utils/text";
import type { FrameworkPhasesData } from "@/cms/api/home/framework-phases";

/** Homepage-specific wrapper around the reusable components/ui/PhaseShowcase engine
 * (FR-006). Pre-renders each phase's icon into a ReactNode here — PhaseShowcase is
 * "use client" and a raw component reference can't cross that Server-to-Client props
 * boundary, so this Server Component renders both icon sizes before handing them down.
 * See specs/001-v2-2-ui-enhancements/research.md §12's "RSC boundary" note. */
export default function MethodologySection({ data }: { data: FrameworkPhasesData }) {
  const { before, highlight, after } = splitHighlight(data.title, data.highlightTitle);

  return (
    <PhaseShowcase
      phases={data.phases.map((phase) => ({
        ...phase,
        icon: phase.icon ? <Image src={phase.icon.url} alt={phase.icon.alt} width={28} height={28} /> : null,
        badgeIcon: phase.badgeIcon ? (
          <Image src={phase.badgeIcon.url} alt={phase.badgeIcon.alt} width={82} height={82} />
        ) : null,
      }))}
      eyebrow={data.eyebrow}
      heading={
        <>
          {before}
          <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">{highlight}</span>
          {after}
        </>
      }
      description={`We don't just "do Agile". We execute the 6-Week Sprint-to-Scale methodology. While others are still documenting requirements, we’ve already deployed your MVP and started the first feedback loop.`}
    />
  );
}
