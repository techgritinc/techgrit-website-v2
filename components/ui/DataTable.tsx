/** Orange-gridded data table for CMS-supplied `columns` + `rows` content.
 *
 * Presentational only: it takes an already-reconciled header row + cell matrix, so
 * lining CMS row keys up with their column labels stays in the mapper (see
 * normalizeTable() in cms/api/case-study-detail.ts) rather than leaking into markup.
 *
 * Header cells sit at the --text-h4 floor (18px) rather than the full clamp, which would
 * tower over the 15.5px body copy the table sits among; cell text matches the surrounding
 * narrative body size exactly.
 */
export function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
}) {
  if (!headers.length || !rows.length) return null;

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
                    // Every cell is body copy at the same tone — only the header row is
                    // white; a bolded-white first column read as a second header.
                    "px-[18px] py-[14px] align-top text-[15.5px] leading-[1.7] text-secondary",
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
