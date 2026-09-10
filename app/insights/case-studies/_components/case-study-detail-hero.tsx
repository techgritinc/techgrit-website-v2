import Image from "next/image";
import Link from "next/link";
import type { DetailHeroSection } from "@/cms/types/case-study-detail-types";
import MediaSlot from "@/components/ui/MediaSlot";

export function CaseStudyDetailHero({ section }: { section: DetailHeroSection }) {
  const hasMeta = Boolean(section.publishedDate || section.categoryLabel);

  return (
    <section>
      <div className="tg-container pt-[48px] pb-[30px] px-[var(--space-15)]">
        <Link
          href={section.allCaseStudiesUrl}
          data-rise
          className="inline-flex items-center gap-[8px] mb-[30px] text-[14px] font-semibold text-text-faint"
        >
          <span aria-hidden="true">&#8592;</span> {section.allCaseStudiesLabel}
        </Link>
        <div className="grid grid-cols-1 tg-md:grid-cols-[1.05fr_0.95fr] items-center gap-[56px]">
          <div data-rise style={{ animationDelay: ".1s" }}>
            {section.caseStudyLabel ? (
              <span className="text-[var(--text-2xs)] font-bold tracking-[var(--ls-widest)] uppercase text-teal-light">
                {section.caseStudyLabel}
              </span>
            ) : null}
            <h1
              className={`${section.caseStudyLabel ? "mt-[14px]" : ""} text-[clamp(34px,4.4vw,52px)] leading-[1.05] tracking-[-0.035em]`}
            >
              {section.title}
            </h1>
            {section.subtitle ? (
              <p className="mt-[18px] max-w-[520px] text-[18px] leading-[var(--lh-relaxed)] text-secondary">
                {section.subtitle}
              </p>
            ) : null}
            {hasMeta ? (
              <div className="inline-flex items-center flex-wrap gap-[18px] mt-[24px] text-[14px] text-text-soft">
                {section.publishedDate ? (
                  <span className="inline-flex items-center gap-[8px]">
                    {section.publishedDateIcon ? (
                      <Image
                        src={section.publishedDateIcon.url}
                        alt={section.publishedDateIcon.alt}
                        width={16}
                        height={16}
                        className="leading-[normal]"
                      />
                    ) : null}
                    {section.publishedDate}
                  </span>
                ) : null}
                {section.categoryLabel ? (
                  <span className="inline-flex items-center gap-[8px]">
                    {section.publishedDate ? <span aria-hidden="true">&#183;</span> : null}
                    {section.categoryLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
          
          <div
            data-rise
            className={`rounded-3xl border border-border overflow-hidden ${section.image ? "" : "min-h-[220px]"}`}
            style={{ animationDelay: ".18s" }}
          >
            <MediaSlot
              src={section.image?.url ?? null}
              alt={section.image?.alt || section.title}
              width={section.image?.width}
              height={section.image?.height}
              className="w-full h-auto block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
