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

const LG_COLUMNS_CLASS: Record<number, string> = {
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Generic numbered process-step strip (assess → deliver style flows). The
 * containing section supplies its own eyebrow/heading; this component only
 * renders the step grid itself. No page-specific copy inside the component.
 */
export function ProcessSteps({ steps, columns = 5 }: ProcessStepsProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${LG_COLUMNS_CLASS[columns] ?? LG_COLUMNS_CLASS[5]}`}>
      {steps.map((step) => (
        <div
          key={step.order}
          className="group relative rounded-xl border border-border-8 bg-glass-3 py-tg-11 px-tg-9 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[3px] hover:border-[var(--color-border-orange-medium)]"
        >
          <span className="mb-3.5 inline-flex h-[38px] w-[38px] items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-[15px] font-extrabold text-orange">
            {String(step.order).padStart(2, "0")}
          </span>
          <h4 className="text-[16.5px] font-bold tracking-[-0.01em] text-white">{step.title}</h4>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-60">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
