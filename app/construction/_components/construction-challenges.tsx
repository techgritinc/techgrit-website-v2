import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import type { ChallengesSection } from "../_data/types";

const CHALLENGE_ICON_PATHS: Record<number, React.ReactNode> = {
  1: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" />
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </>
  ),
  4: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  5: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 2" />
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
      stroke="var(--color-orange)"
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
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto mb-[50px] max-w-[680px] text-center">
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
            <p className="mt-5" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}>
              {section.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {section.challenges.map((challenge) => (
              <div
                key={challenge.order}
                className="card"
                style={{ padding: "28px 22px", textAlign: "center" }}
              >
                <div
                  className="mx-auto flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-overlay-orange)",
                  }}
                >
                  <ChallengeIcon order={challenge.order} />
                </div>
                <p className="mt-4" style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--color-text-primary)" }}>
                  {challenge.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
