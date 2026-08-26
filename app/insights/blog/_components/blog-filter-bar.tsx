import FilterBar from "@/components/ui/FilterBar";
import { TopicFilter } from "./topic-filter";
import type { Topic } from "../_data/types";

export function BlogFilterBar({ topics, activeCategory }: { topics: Topic[]; activeCategory: string }) {
  return (
    <FilterBar label="Filter">
      <TopicFilter topics={topics} activeCategory={activeCategory} />
    </FilterBar>
  );
}
