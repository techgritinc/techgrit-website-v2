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
 * `chips` is optional because two callers render the no-chips shape: TMS-88's
 * orbit-ai-ecosystem page omits `chips`/`chipsLabel` entirely when its "challenges"
 * section has no chips, and TMS-86's ai-modernization page can pass an empty
 * `chips` array when the CMS "blockers" field ships with no features. Either way
 * the two-column grid would leave the right half blank and read as broken, so the
 * block instead centers itself as a single column; the moment `chips` is populated
 * again (now or in the future), it automatically reverts to the two-column layout.
 *
 * The two-column grid collapses at 921px, matching the shared `[data-hero-row]`
 * selector's own `@media(max-width:920px)` rule (identical across every "What We Do"
 * reference file) rather than this project's canonical `md`=960px breakpoint
 * (TMS-86-ai-strategy-and-roadmap — see Hero.tsx's matching fix/comment).
 */
export function ContentBlock({ eyebrow, title, description, chipsLabel, chips }: ContentBlockProps) {
  const hasChips = Boolean(chips && chips.length > 0);

  if (!hasChips) {
    return (
      <section className="relative">
        <div className="mx-auto max-w-[820px] px-9 py-[60px] text-center">
          <div className="mb-3.5 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
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

  // Two independent top-to-bottom stacks placed side by side, rather than a
  // fixed-width grid — each pill keeps its original natural single-line size;
  // a forced 50/50 grid column can be narrower than a long chip's label and
  // force it to wrap, which a column of auto-width pills never does.
  const midpoint = Math.ceil(chips!.length / 2);
  const chipColumns = [chips!.slice(0, midpoint), chips!.slice(midpoint)];

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <div className="grid grid-cols-1 items-start gap-16 min-[921px]:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-3.5 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
              {eyebrow}
            </div>
            <h2 className="text-[clamp(30px,3.4vw,40px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {title}
            </h2>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-text-66">{description}</p>
          </div>
          <div>
            <div className="mb-4.5 text-[12px] leading-[normal] font-extrabold uppercase tracking-[0.14em] text-dim">
              {chipsLabel}
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-x-6">
              {chipColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col items-start gap-2.5">
                  {column.map((chip) => (
                    <span
                      key={chip.id}
                      className="inline-flex items-center gap-[8px] rounded-pill border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-[14px] py-[8px] h-[33px] text-[13px] leading-[normal] font-[500] text-[rgba(255,255,255,0.78)]"
                    >
                      <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-orange" />
                      {chip.label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
