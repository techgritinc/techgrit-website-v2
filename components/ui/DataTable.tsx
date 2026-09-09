import type { TableColumnTone } from "@/cms/types/case-study-detail-types";

const TONE_CLASS: Record<TableColumnTone, string> = {
  muted: "text-text-soft",
  accent: "text-teal-light",
  positive: "text-green",
};

function columnTones(
  headers: string[],
  cmsTones: (TableColumnTone | null)[] | undefined,
): (string | null)[] {
  return headers.map((_, index) => {
    const tone = cmsTones?.[index];
    return tone ? TONE_CLASS[tone] : null;
  });
}

export function DataTable({
  headers,
  rows,
  caption,
  columnTones: cmsTones,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
  columnTones?: (TableColumnTone | null)[];
}) {
  if (!headers.length || !rows.length) return null;

  const tones = columnTones(headers, cmsTones);

  return (
    // The table keeps a min-width so three columns of prose don't crush on small screens —
    // it scrolls inside this wrapper instead of forcing the page body to scroll sideways.
    <div className="mt-[22px] overflow-x-auto rounded-[12px] border border-border-orange">
      <table className="w-full min-w-[560px] border-collapse text-left">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="bg-glass-faint">
            {headers.map((header, headerIndex) => (
              <th
                key={headerIndex}
                scope="col"
                className={[
                  "px-[18px] py-[14px] align-bottom text-[18px] font-bold leading-[1.35] text-primary",
                  "border-b border-border-orange",
                  headerIndex > 0 ? "border-l border-border-orange-30" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={[
                "transition-colors duration-200 hover:bg-glass-hover",
                rowIndex > 0 ? "border-t border-border-orange-30" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={[
                    // Body copy at one tone by default — only the header row is white; a
                    // bolded-white first column read as a second header. A comparison
                    // table's own columns override that tone (see columnTones).
                    "px-[18px] py-[14px] align-top text-[15.5px] leading-[1.7]",
                    tones[cellIndex] ?? "text-secondary",
                    cellIndex > 0 ? "border-l border-border-orange-30" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
