export interface ContentBlockChip {
  id: string;
  label: string;
}

export interface ContentBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  chipsLabel?: string;
  chips?: ContentBlockChip[];
}

/**
 * Generic "What We Do" service-page content block: left eyebrow/title/description,
 * right chips-label + wrapping chip-pill list. Confirmed reusable across the sibling
 * service-page prototypes (see specs/TMS-86/research.md §4) — always exactly this
 * two-column shape, a label plus a chip list, never a different arrangement.
 *
 * When `chips` is omitted, renders a single centered column instead (TMS-88,
 * "From AI opportunity to business impact") — no existing consumer passes an
 * absent chip list today, so this is additive and non-breaking.
 */
export function ContentBlock({ eyebrow, title, description, chipsLabel, chips }: ContentBlockProps) {
  if (!chips) {
    return (
      <section className="relative">
        <div className="mx-auto max-w-[820px] px-9 py-[60px] text-center">
          <div className="mb-3.5 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
            {eyebrow}
          </div>
          <h2 className="text-[clamp(30px,3.4vw,40px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-5 whitespace-pre-line text-[16.5px] leading-[1.7] text-text-66">{description}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-3.5 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
              {eyebrow}
            </div>
            <h2 className="text-[clamp(30px,3.4vw,40px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {title}
            </h2>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-text-66">{description}</p>
          </div>
          <div>
            <div className="mb-4.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-dim">
              {chipsLabel}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex items-center gap-[8px] rounded-[30px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-[14px] py-[8px] h-[33px] text-[13px] font-[500] text-[rgba(255,255,255,0.78)]"
                >
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-orange" />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
