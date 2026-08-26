import { GlassCard, GlassCardTitle } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { LibrarySection, ResourceLink } from "../_data/types";

function ResourceItem({ resource }: { resource: ResourceLink }) {
  const body = (
    <>
      <span className="block text-[13.5px] leading-[1.45] font-semibold text-white">{resource.title}</span>
      {resource.description && (
        <span className="mt-1 block text-[12.5px] leading-[1.5] text-muted">{resource.description}</span>
      )}
    </>
  );

  if (!resource.href) {
    return (
      <div className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 -mx-2">
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
        <div>{body}</div>
      </div>
    );
  }

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link flex items-start gap-2.5 rounded-lg px-2 py-1.5 -mx-2 transition-colors duration-200 hover:bg-white/[0.05]"
    >
      <ArrowRightIcon className="mt-[3px] h-[13px] w-[13px] shrink-0 text-orange transition-transform duration-200 group-hover/link:translate-x-0.5" />
      <div>{body}</div>
    </a>
  );
}

export function StartupResourcesLibrary({ section }: { section: LibrarySection }) {
  const hasHeading = Boolean(section.eyebrow || section.title || section.description);

  return (
    <section id="library" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          {hasHeading && (
            <div className="mb-11 text-center">
              {section.eyebrow && (
                <div className="mb-3 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
                  {section.eyebrow}
                </div>
              )}
              {section.title && (
                <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">
                  {section.title}
                </h2>
              )}
              {section.description && (
                <p className="mx-auto mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-text-66">
                  {section.description}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {section.topics.map((topic) => (
              <GlassCard key={topic.id} variant="serviceCapability">
                <div className="mb-[10px] text-[12px] leading-[normal] font-extrabold uppercase tracking-[0.14em] text-orange">
                  {topic.categoryLabel}
                </div>
                <GlassCardTitle variant="serviceCapability">{topic.title}</GlassCardTitle>
                <ul className="mt-4 flex flex-col gap-1">
                  {topic.resources.map((resource) => (
                    <li key={resource.id}>
                      <ResourceItem resource={resource} />
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
