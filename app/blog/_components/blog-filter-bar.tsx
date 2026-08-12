import FilterBar from "@/components/ui/FilterBar";
import { TopicFilter } from "./topic-filter";

export function BlogFilterBar({
  topics,
  activeTopic,
  onSelect,
}: {
  topics: string[];
  activeTopic: string;
  onSelect: (topic: string) => void;
}) {
  return (
    <FilterBar label="Filter">
      <TopicFilter topics={topics} activeTopic={activeTopic} onSelect={onSelect} />
    </FilterBar>
  );
}
