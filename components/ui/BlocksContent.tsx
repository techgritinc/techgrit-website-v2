import Link from "next/link";
import type { StrapiBlocksContent, StrapiBlocksInline } from "@/cms/types/strapi-common";

// Renders Strapi's Blocks rich-text format (a JSON tree, not a plain string). Only the node/
// mark shapes actually present in the live CMS content are handled — unordered/ordered lists,
// paragraphs, bold text, and inline links — matching cms/types/strapi-common.ts's
// StrapiBlocksNode union. A future node or mark type not handled here is skipped rather
// than throwing.
function BlockInline({ node }: { node: StrapiBlocksInline }) {
  // An inline link carries its own text children; without this branch the whole anchor
  // (e.g. a mid-sentence "Contact TechGrit") would silently render as nothing.
  if (node.type === "link") {
    return (
      <Link href={node.url} className="text-amber-light underline underline-offset-2">
        {node.children.map((text, textIndex) => (
          <BlockInline key={textIndex} node={text} />
        ))}
      </Link>
    );
  }

  // Explicit text-primary rather than inheriting the parent paragraph's text-secondary:
  // a bold mark is CMS authors' way of marking a sub-heading-like emphasis (e.g. "1.
  // Fragmented Workflows", "Move 1: Reframe the Problem..."), and it should read at the
  // same full-white weight as every other heading-level text in the app (h1-h6's base
  // color, and NarrativeFeatureRow's feature-title h3), not the dimmer body-text tone.
  return node.bold ? (
    <strong className="text-primary">{node.text}</strong>
  ) : (
    <span>{node.text}</span>
  );
}

export function BlocksContent({ content }: { content: StrapiBlocksContent }) {
  return (
    <>
      {content.map((node, nodeIndex) => {
        if (node.type === "list") {
          const ListTag = node.format === "ordered" ? "ol" : "ul";
          return (
            <ListTag key={nodeIndex} className="flex flex-col gap-[10px]">
              {node.children.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span className="text-[15.5px] leading-[1.7] text-secondary whitespace-pre-line">
                    {item.children.map((inline, inlineIndex) => (
                      <BlockInline key={inlineIndex} node={inline} />
                    ))}
                  </span>
                </li>
              ))}
            </ListTag>
          );
        }

        if (node.type === "paragraph") {
          return (
            // whitespace-pre-line: CMS authors put real newlines inside a single text node
            // (e.g. "...pre-platform reality:\n\n" immediately before a bold sub-heading in
            // the same paragraph). HTML would collapse those, running the sub-heading onto
            // the end of the previous sentence — this keeps the authored breaks.
            <p key={nodeIndex} className="text-[15.5px] leading-[1.7] text-secondary whitespace-pre-line">
              {node.children.map((inline, inlineIndex) => (
                <BlockInline key={inlineIndex} node={inline} />
              ))}
            </p>
          );
        }

        return null;
      })}
    </>
  );
}
