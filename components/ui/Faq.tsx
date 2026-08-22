export interface FaqItemContent {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface FaqProps {
  items: FaqItemContent[];
}

/**
 * Generic FAQ accordion built on native <details>/<summary> — each item's
 * expand/collapse state is independent for free, with no client-side React
 * state needed. No page-specific copy inside the component.
 */
export function Faq({ items }: FaqProps) {
  return (
    <div>
      {items.map((item, index) => (
        <details
          key={item.id}
          open={item.defaultOpen}
          className={`group border-t border-border-8 open:border-t-[var(--color-border-orange-35)] ${index === items.length - 1 ? "border-b border-border-8" : ""}`}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[22px] text-[17px] leading-[normal] font-semibold text-white [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden="true" className="shrink-0 text-2xl leading-none font-light text-orange">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="pt-0 pr-10 pb-6 text-[15px] leading-[1.65] text-text-66">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
