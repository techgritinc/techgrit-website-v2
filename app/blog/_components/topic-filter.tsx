export function TopicFilter({
  topics,
  activeTopic,
  onSelect,
}: {
  topics: string[];
  activeTopic: string;
  onSelect: (topic: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter posts by topic">
      {topics.map((topic) => {
        const active = topic === activeTopic;
        return (
          <button
            key={topic}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(topic)}
            className={
              active
                ? "leading-[normal] cursor-pointer rounded-full border border-border-orange-strong bg-[image:var(--gradient-brand)] px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-primary shadow-chip-active transition-all duration-200 ease-out"
                : "leading-[normal] cursor-pointer rounded-full border border-border-14 bg-glass-4 px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-secondary transition-all duration-200 ease-out"
            }
          >
            {topic}
          </button>
        );
      })}
    </div>
  );
}
