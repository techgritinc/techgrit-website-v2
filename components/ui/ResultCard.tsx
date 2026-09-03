// Side-by-side label:description card — label in the brand's primary (orange)
// accent text, description alongside it, rather than a stacked heading+body shape.
export function ResultCard({ label, description }: { label?: string; description: string }) {
  return (
    <div className="mt-5 flex flex-col gap-2.5 rounded-[16px] border border-white/10 border-l-[3px] border-l-orange bg-white/4 px-tg-9 py-tg-11 backdrop-blur-[8px] sm:flex-row sm:items-center sm:gap-5">
      {label && (
        <span className="shrink-0 text-[13px] leading-[normal] font-bold uppercase tracking-[1.3px] text-amber-light">{label}</span>
      )}
      <p className="text-[14.5px] leading-[1.55] tracking-[normal] text-60">{description}</p>
    </div>
  );
}
