import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import type { ChallengesSection } from "../_data/types";

const CHALLENGE_ICON_PATHS: Record<number, React.ReactNode> = {
  1: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </>
  ),
  2: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  3: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    </>
  ),
  4: (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  5: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </>
  ),
};

function ChallengeIcon({ order }: { order: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-amber-light)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {CHALLENGE_ICON_PATHS[order]}
    </svg>
  );
}

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
                <GlassCardIcon
                  variant="constructionChallenge"
                  wrapperClassName="bg-overlay-orange"
                >
                  <ChallengeIcon order={challenge.order} />
                </GlassCardIcon>
                <GlassCardTitle variant="constructionChallenge" className="tracking-normal">{challenge.label}</GlassCardTitle>
              </GlassCard>
            ))}
          </div>
      </div>
    </section>
  );
}
