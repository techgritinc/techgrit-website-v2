import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import type { ChallengesSection } from "@/cms/types/construction";

export function ConstructionChallenges({ section }: { section: ChallengesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[30px] pb-[60px]" data-reveal>
        <div className="mb-[38px] max-w-[760px]">
          <div style={{ lineHeight: "normal" }}>
            <SectionEyebrow showAccent={false}>{section.eyebrow}</SectionEyebrow>
          </div>
            <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
            <p className="mt-4 leading-[1.65] md:leading-normal" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}>
              {section.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[18px]">
            {section.challenges.map((challenge) => (
              <GlassCard key={challenge.order} variant="constructionChallenge" hoverBorderColor="">
                {challenge.icon ? (
                  <GlassCardIcon
                    variant="constructionChallenge"
                    wrapperClassName="bg-overlay-orange"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- small CMS-hosted SVG, no next/image benefit */}
                    <img src={challenge.icon.url} alt={challenge.icon.alt} width={20} height={20} />
                  </GlassCardIcon>
                ) : null}
                <GlassCardTitle variant="constructionChallenge" className="tracking-normal">{challenge.label}</GlassCardTitle>
              </GlassCard>
            ))}
          </div>
      </div>
    </section>
  );
}
