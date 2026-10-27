export interface OutcomeProps {
  heading: string;
  description: string;
  className?: string;
}

/**
 * Generic Outcome heading-plus-description block (FR-012). Deliberately
 * minimal — two content props, no variants or speculative options — so the
 * cost of the pattern being wrong is small if a future page's actual need
 * differs from what's assumed here.
 */
export function Outcome({ heading, description, className = "" }: OutcomeProps) {
  return (
    <div className={className}>
      <h3 className="text-[22px] font-bold tracking-[-0.02em] text-white">{heading}</h3>
      <p className="mt-2.5 text-[15.5px] leading-[1.6] text-text-66">{description}</p>
    </div>
  );
}
