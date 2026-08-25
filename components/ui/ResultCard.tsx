// Side-by-side label:description card — label in the brand's primary (orange)
// accent text, description alongside it, rather than a stacked heading+body shape.
export function ResultCard({ label, description }: { label: string; description: string }) {
  return (
    <div className="mt-5 flex flex-col gap-2 rounded-xl border border-border-8 bg-glass-3 px-tg-9 py-tg-11 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="shrink-0 text-[15px] leading-[normal] font-bold tracking-[normal] text-orange">{label}</span>
      <p className="text-[14.5px] leading-[1.55] tracking-[normal] text-60">{description}</p>
    </div>
  );
}
