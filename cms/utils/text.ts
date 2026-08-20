// Splits a CMS title into (before, highlight, after) around `highlight`, for
// headings that render one substring with the gradient-text treatment —
// mirrors what was previously hardcoded as separate JSX spans per heading.
export function splitHighlight(title: string, highlight: string): { before: string; highlight: string; after: string } {
  const index = highlight ? title.indexOf(highlight) : -1;
  if (index === -1) return { before: title, highlight: "", after: "" };
  return { before: title.slice(0, index), highlight, after: title.slice(index + highlight.length) };
}
