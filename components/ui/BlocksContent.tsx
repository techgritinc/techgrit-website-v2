import type { StrapiBlocksContent, StrapiBlocksText } from "@/cms/types/job-detail-types";

// Renders Strapi's Blocks rich-text format (a JSON tree, not a plain string). Only the node/
// mark shapes actually present in the live CMS content are handled — unordered/ordered lists
// and bold text — matching cms/types/job-detail-types.ts's StrapiBlocksNode union. A future
// node or mark type not handled here renders as plain text rather than throwing.
function BlockText({ node, index }: { node: StrapiBlocksText; index: number }) {
  return node.bold ? <strong key={index}>{node.text}</strong> : <span key={index}>{node.text}</span>;
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
                  <span className="text-[15.5px] leading-[1.7] text-secondary">
                    {item.children.map((text, textIndex) => (
                      <BlockText key={textIndex} node={text} index={textIndex} />
                    ))}
                  </span>
                </li>
              ))}
            </ListTag>
          );
        }

        if (node.type === "paragraph") {
          return (
            <p key={nodeIndex} className="text-[15.5px] leading-[1.7] text-secondary">
              {node.children.map((text, textIndex) => (
                <BlockText key={textIndex} node={text} index={textIndex} />
              ))}
            </p>
          );
        }

        return null;
      })}
    </>
  );
}
