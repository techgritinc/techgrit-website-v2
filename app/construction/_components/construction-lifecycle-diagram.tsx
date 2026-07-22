import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import type { LifecycleDiagramSection } from "../_data/types";

const DIAGRAM_WIDTH = 640;
const DIAGRAM_HEIGHT = 520;
const CENTER_X = DIAGRAM_WIDTH / 2;
const CENTER_Y = DIAGRAM_HEIGHT / 2;
const RADIUS_X = 265;
const RADIUS_Y = 205;
const NODE_WIDTH = 148;
const NODE_HEIGHT = 62;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER_X + RADIUS_X * Math.cos(angle),
    y: CENTER_Y + RADIUS_Y * Math.sin(angle),
  };
}

export function ConstructionLifecycleDiagram({ section }: { section: LifecycleDiagramSection }) {
  const positions = section.nodes.map((node, index) => ({
    node,
    ...nodePosition(index, section.nodes.length),
  }));

  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto mb-[50px] max-w-[680px] text-center">
            <SectionEyebrow tone="amber">{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
          </div>

          <div
            className="relative mx-auto hidden lg:block"
            style={{ width: "100%", maxWidth: DIAGRAM_WIDTH, height: DIAGRAM_HEIGHT }}
          >
            <svg
              className="pointer-events-none absolute inset-0"
              width="100%"
              height="100%"
              viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
              aria-hidden="true"
            >
              {positions.map(({ node, x, y }) => (
                <line
                  key={node.order}
                  x1={CENTER_X}
                  y1={CENTER_Y}
                  x2={x}
                  y2={y}
                  stroke="var(--color-border-strong)"
                  strokeWidth={1.5}
                  strokeDasharray="6 6"
                  style={{ animation: "tgdash 1.4s linear infinite" }}
                />
              ))}
            </svg>

            <div
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                left: CENTER_X,
                top: CENTER_Y,
                transform: "translate(-50%, -50%)",
                width: 148,
                height: 148,
                borderRadius: "50%",
                background: "var(--gradient-brand)",
                boxShadow: "0 20px 50px -18px rgba(232,119,34,0.6)",
                zIndex: 2,
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: 19, color: "var(--color-ink)" }}>
                {section.engineLabel}
              </span>
              <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-wide)", textTransform: "uppercase", color: "rgba(10,24,34,0.75)" }}>
                {section.engineSubLabel}
              </span>
            </div>

            {positions.map(({ node, x, y }) => (
              <div
                key={node.order}
                className="card absolute flex items-center justify-center text-center"
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  width: NODE_WIDTH,
                  height: NODE_HEIGHT,
                  padding: "8px 14px",
                  zIndex: 1,
                }}
              >
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--color-text-primary)" }}>
                  {node.name}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {section.nodes.map((node) => (
              <div key={node.order} className="card" style={{ padding: "18px 16px", textAlign: "center" }}>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--color-text-primary)" }}>
                  {node.name}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
