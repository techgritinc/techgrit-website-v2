import type { BodyBlock, JobDetailSection } from "../_data/types";

// Plain, reference-following layout — no cards, no per-section color treatment. Typography
// reuses the same base h2/h3 tag rules + paragraph/bullet sizing already established by
// app/insights/case-studies/_components/case-study-narrative.tsx, per CLAUDE.md's rule that a
// heading may only override font-size/line-height (never a keyword utility that would clobber
// the base tag's color/weight/letter-spacing).

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-[12px] flex flex-col gap-[10px]">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
          <span className="text-[15.5px] leading-[1.7] text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: BodyBlock }) {
  return (
    <div className="mt-[22px] first:mt-0">
      {block.subheading ? <h3 className="text-[20px] leading-[normal]">{block.subheading}</h3> : null}
      {block.kind === "paragraph" ? (
        <p className={`text-[16px] leading-[1.75] text-secondary ${block.subheading ? "mt-[10px]" : ""}`}>
          {block.text}
        </p>
      ) : (
        <Bullets items={block.items} />
      )}
    </div>
  );
}

export function JobDetailSectionBlock({ section }: { section: JobDetailSection }) {
  return (
    <section className="tg-container px-[var(--space-15)] py-[28px]">
      <h2 className="text-[26px] leading-[normal]">{section.heading}</h2>
      <div className="mt-[18px]">
        {section.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </section>
  );
}
