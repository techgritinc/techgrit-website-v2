import type { ReactElement } from "react";
import Link from "next/link";
import { IconTile } from "@/components/ui/IconTile";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import {
  EradicateDebtIcon,
  SvcDataAiIcon,
  SvcPlatformIcon,
  SvcManagedIcon,
  SvcStrategyIcon,
  SvcStartupsIcon,
} from "@/components/ui/icons";
import type { RelatedServicesSection } from "../_data/types";

const RELATED_ICON: Record<string, (props: { width?: number; height?: number }) => ReactElement> = {
  codeArrows: EradicateDebtIcon,
  dataAi: SvcDataAiIcon,
  platform: SvcPlatformIcon,
  managed: SvcManagedIcon,
  strategy: SvcStrategyIcon,
  startups: SvcStartupsIcon,
};

export function AiModernizationRelated({ section }: { section: RelatedServicesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-10 pb-[60px]">
        <RevealOnScroll>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-white">{section.title}</h3>
            <Link href={section.seeAllHref} className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-amber-light">
              {section.seeAllLabel} &#8594;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {section.links.map((link) => {
              const Icon = RELATED_ICON[link.iconKey];
              return (
                <IconTile
                  key={link.order}
                  size="compact"
                  href={link.href}
                  icon={<Icon width={18} height={18} />}
                  title={link.name}
                  description={link.description}
                />
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
