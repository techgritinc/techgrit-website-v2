"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/FilterBar";
import Button from "@/components/ui/Button";
import { CaseStudiesFilters } from "./case-studies-filters";
import { CaseStudiesGrid } from "./case-studies-grid";
import type { CaseStudy } from "../_data/types";

export function CaseStudiesFilterSection({
  caseStudies,
  categories,
}: {
  caseStudies: CaseStudy[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? caseStudies : caseStudies.filter((caseStudy) => caseStudy.category === active)),
    [active, caseStudies],
  );

  return (
    <>
      <FilterBar label="Filter">
        <CaseStudiesFilters categories={categories} active={active} onSelect={setActive} />
      </FilterBar>

      <div aria-live="polite" aria-atomic="true">
        {filtered.length === 0 ? (
          <section>
            <div className="tg-container py-[var(--space-11)] px-[var(--space-15)] flex flex-col items-center gap-4 text-center">
              <p className="text-[15.5px] text-text-soft">No case studies match this filter yet.</p>
              <Button variant="ghost" size="sm" onClick={() => setActive("All")}>
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
