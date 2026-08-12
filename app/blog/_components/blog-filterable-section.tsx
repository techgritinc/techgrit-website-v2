"use client";

import { useMemo, useState } from "react";
import { BlogFilterBar } from "./blog-filter-bar";
import { BlogPostGrid } from "./blog-post-grid";
import type { BlogPost } from "../_data/types";

export function BlogFilterableSection({ topics, posts }: { topics: string[]; posts: BlogPost[] }) {
  const [activeTopic, setActiveTopic] = useState("All");

  const filteredPosts = useMemo(
    () => (activeTopic === "All" ? posts : posts.filter((post) => post.topic === activeTopic)),
    [activeTopic, posts],
  );

  return (
    <>
      <BlogFilterBar topics={topics} activeTopic={activeTopic} onSelect={setActiveTopic} />
      <BlogPostGrid posts={filteredPosts} onReset={() => setActiveTopic("All")} />
    </>
  );
}
