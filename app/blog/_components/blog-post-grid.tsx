"use client";

import { useMemo, useState } from "react";
import { GlassCard, GlassCardDescription, GlassCardTitle } from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { TopicFilter } from "./topic-filter";
import { accentHex, hexA } from "../_lib/accent";
import type { BlogPost } from "../_data/types";

export function BlogPostGrid({ topics, posts }: { topics: string[]; posts: BlogPost[] }) {
  const [activeTopic, setActiveTopic] = useState("All");

  const filteredPosts = useMemo(
    () => (activeTopic === "All" ? posts : posts.filter((post) => post.topic === activeTopic)),
    [activeTopic, posts],
  );

  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-9 pt-tg-13 pb-tg-21">
        <TopicFilter topics={topics} activeTopic={activeTopic} onSelect={setActiveTopic} />

        {filteredPosts.length === 0 ? (
          <p className="mt-14 text-center text-[15.5px] text-muted">No posts match this topic yet — check back soon.</p>
        ) : (
          <div className="mt-tg-11 grid grid-cols-3 gap-6 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1">
            {filteredPosts.map((post) => {
              const hex = accentHex(post.accent);
              return (
                <a key={post.slug} href={post.href} style={{ display: "contents" }}>
                  <GlassCard
                    variant="blogCard"
                    hoverBorderColor="hover:border-border-28"
                    className="flex flex-col"
                  >
                    <div
                      className="relative flex h-[140px] shrink-0 items-end overflow-hidden border-b border-border-8 p-4"
                      style={{ background: `linear-gradient(150deg, ${hexA(hex, 0.22)}, ${hexA(hex, 0.05)})` }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute -top-10 -right-[30px] size-tg-180 rounded-full blur-glow"
                        style={{ background: hexA(hex, 0.24) }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1.4px)] [background-size:18px_18px]"
                      />
                      <Badge
                        tone="accent"
                        className="relative !gap-[7px] !px-[12px] !py-[6px] !text-[11px] !font-bold !tracking-[0.1em] leading-[normal]"
                        style={{ color: "#fff", background: hexA(hex, 0.32), borderColor: hexA(hex, 0.5) }}
                      >
                        {post.topic}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col px-6 pt-6 pb-[26px]">
                      <GlassCardTitle variant="blogCard" className="!mt-0 leading-[1.32] tracking-[normal]">
                        {post.title}
                      </GlassCardTitle>
                      <GlassCardDescription variant="blogCard" className="flex-1">
                        {post.excerpt}
                      </GlassCardDescription>
                      <div className="mt-[20px] flex items-center gap-tg-3a border-t border-border-8 pt-4">
                        <div
                          className="leading-[normal] flex size-tg-14 shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold text-badge-text"
                          style={{ background: `linear-gradient(135deg, ${hex}, ${hexA(hex, 0.6)})` }}
                        >
                          {post.author.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[13.5px] font-bold text-primary leading-[normal]">{post.author.name}</div>
                          <div className="text-[12.5px] text-dim leading-[normal]">
                            {post.publishDate} &middot; {post.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
