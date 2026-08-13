import PhaseShowcase from "@/components/ui/PhaseShowcase";
import { METHODOLOGY_PHASES } from "./home-data";

/** Homepage-specific wrapper around the reusable components/ui/PhaseShowcase engine
 * (FR-006). Pre-renders each phase's icon into a ReactNode here — PhaseShowcase is
 * "use client" and a raw component reference can't cross that Server-to-Client props
 * boundary, so this Server Component renders both icon sizes before handing them down.
 * See specs/001-v2-2-ui-enhancements/research.md §12's "RSC boundary" note. */
export default function MethodologySection() {
  return (
    <PhaseShowcase
      phases={METHODOLOGY_PHASES.map((phase) => ({
        ...phase,
        icon: <phase.icon />,
        badgeIcon: <phase.icon width={82} height={82} />,
      }))}
      eyebrow="How we deliver"
      heading={
        <>
          The 6-Week{" "}
          <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">
            Sprint-to-Scale
          </span>{" "}
          Framework.
        </>
      }
      description={`We don't just "do Agile". We execute the 6-Week Sprint-to-Scale methodology. While others are still documenting requirements, we’ve already deployed your MVP and started the first feedback loop.`}
    />
  );
}
