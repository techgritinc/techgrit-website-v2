import Link from "next/link";
import type { Topic } from "../_data/types";

export function TopicFilter({ topics, activeCategory }: { topics: Topic[]; activeCategory: string }) {
  return (
    <div className="flex items-center gap-2.5 flex-nowrap" role="group" aria-label="Filter posts by topic">
      {topics.map((topic) => {
        const active = topic.value === activeCategory;
        const href = topic.value === "all" ? "/insights/blog" : `/insights/blog?category=${topic.value}`;
        return (
          <Link
            key={topic.value}
            href={href}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "leading-[normal] cursor-pointer rounded-full border border-border-orange-strong bg-[image:var(--gradient-brand)] px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-primary shadow-chip-active transition-all duration-200 ease-out"
                : "leading-[normal] cursor-pointer rounded-full border border-border-14 bg-glass-4 px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-secondary transition-all duration-200 ease-out"
            }
          >
            {topic.label}
          </Link>
        );
      })}
    </div>
  );
}
