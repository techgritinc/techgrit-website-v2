export interface ProcessStep {
  order: number;
  title: string;
  description: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  /** Desktop (`lg`) column count. Defaults to `5` to preserve existing consumers' layout. */
  columns?: number;
}

// The 5-column (default) path's breakpoints are 641px/921px, matching the shared
// `[data-step-grid]` selector's own `@media(max-width:640px)`/`@media(max-width:920px)`
// rules — confirmed identical (grid-template-columns:1fr / 1fr 1fr) across every "What
// We Do" reference file (AI Strategy, AI Modernization, Managed Services, etc. — grep
// verified) — rather than this project's canonical `md`=960px/`lg`=1140px breakpoints,
// whose gap against the real 640px/920px edges produced a visible mismatch window when
// toggling against the reference (TMS-86-ai-strategy-and-roadmap). The 4-column path
// (Discovery Sprints, a different reference-file family with no `[data-step-grid]`
// selector of its own) keeps the original md/lg breakpoints unchanged — not verified
// against 641px/921px, so not assumed to need the same fix.
const COLUMNS_CLASSES: Record<number, string> = {
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "min-[641px]:grid-cols-2 min-[921px]:grid-cols-5",
};

/**
 * Generic numbered process-step strip (assess → deliver style flows). The
 * containing section supplies its own eyebrow/heading; this component only
 * renders the step grid itself. No page-specific copy inside the component.
 */
export function ProcessSteps({ steps, columns = 5 }: ProcessStepsProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${COLUMNS_CLASSES[columns] ?? COLUMNS_CLASSES[5]}`}>
      {steps.map((step) => (
        <div
          key={step.order}
          className="group relative rounded-xl border border-border-8 bg-glass-3 py-tg-11 px-tg-9 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-[var(--color-border-orange-medium)]"
        >
          <span className="mb-3.5 inline-flex h-[38px] w-[38px] items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-[15px] font-extrabold text-orange">
            {String(step.order).padStart(2, "0")}
          </span>
          <h4 className="text-[16.5px] leading-[normal] font-bold tracking-[-0.01em] text-white">{step.title}</h4>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-60">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
