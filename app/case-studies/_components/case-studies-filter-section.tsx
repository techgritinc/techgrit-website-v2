"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/FilterBar";
import Button from "@/components/ui/Button";
import { CaseStudiesFilters } from "./case-studies-filters";
import { CaseStudiesGrid } from "./case-studies-grid";
import type { CaseStudyCard, CaseStudyTab } from "@/cms/types/case-studies-types";

function filterCaseStudies(caseStudies: CaseStudyCard[], tabValue: string): CaseStudyCard[] {
  if (tabValue === "all") return caseStudies;
  if (tabValue === "featured") return caseStudies.filter((caseStudy) => caseStudy.isFeatured);
  return caseStudies.filter((caseStudy) => caseStudy.categorySlug === tabValue);
}

export function CaseStudiesFilterSection({
  caseStudies,
  tabs,
}: {
  caseStudies: CaseStudyCard[];
  tabs: CaseStudyTab[];
}) {
  const defaultTab = tabs.find((tab) => tab.isDefault)?.value ?? tabs[0]?.value ?? "all";
  const [active, setActive] = useState(defaultTab);

  const filtered = useMemo(() => filterCaseStudies(caseStudies, active), [active, caseStudies]);

  return (
    <>
      <FilterBar label="Filter">
        <CaseStudiesFilters tabs={tabs} active={active} onSelect={setActive} />
      </FilterBar>

      <div aria-live="polite" aria-atomic="true">
        {filtered.length === 0 ? (
          <section>
            <div className="tg-container py-[var(--space-11)] px-[var(--space-15)] flex flex-col items-center gap-4 text-center">
              <p className="text-[15.5px] text-text-soft">No case studies match this filter yet.</p>
              <Button variant="ghost" size="sm" onClick={() => setActive(defaultTab)}>
                Reset filter
              </Button>
            </div>
          </section>
        ) : (
          <CaseStudiesGrid caseStudies={filtered} />
        )}
      </div>
    </>
  );
}
