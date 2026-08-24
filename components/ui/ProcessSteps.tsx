export interface ProcessStep {
  order: number;
  title: string;
  description: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
}

/**
 * Generic numbered process-step strip (assess → deliver style flows). The
 * containing section supplies its own eyebrow/heading; this component only
 * renders the step grid itself. No page-specific copy inside the component.
 */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
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
