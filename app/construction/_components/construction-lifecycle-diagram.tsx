import type { LifecycleDiagramSection } from "../_data/types";

const NODE_POSITIONS: React.CSSProperties[] = [
  { left: "2%", top: "9%" },
  { left: "28%", top: "2%" },
  { right: "28%", top: "2%" },
  { right: "2%", top: "9%" },
  { left: "2%", bottom: "9%" },
  { left: "28%", bottom: "2%" },
  { right: "28%", bottom: "2%" },
  { right: "2%", bottom: "9%" },
];

const CONNECTOR_PATHS = [
  "M550 150 C 360 150, 300 70, 150 70",
  "M550 150 C 420 150, 380 70, 410 70",
  "M550 150 C 680 150, 720 70, 690 70",
  "M550 150 C 740 150, 800 70, 950 70",
  "M550 150 C 360 150, 300 230, 150 230",
  "M550 150 C 420 150, 380 230, 410 230",
  "M550 150 C 680 150, 720 230, 690 230",
  "M550 150 C 740 150, 800 230, 950 230",
];

export function ConstructionLifecycleDiagram({ section }: { section: LifecycleDiagramSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[40px] pb-[60px]">
        <div
          className="relative overflow-hidden rounded-[24px] border border-border-faint"
          style={{
            background: "linear-gradient(160deg, var(--color-glass), var(--color-glass-hairline))",
            padding: "42px 40px",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              top: -80,
              right: "10%",
              width: 360,
              height: 360,
              background: "var(--color-overlay-amber-12)",
              filter: "blur(110px)",
            }}
          />

          <div className="relative mx-auto mb-[8px] max-w-[680px] text-center">
            <span className="eyebrow" style={{ color: "var(--color-amber-light)", lineHeight: "normal" }}>
              {section.eyebrow}
            </span>
            <h2 className="mt-2.5 text-[clamp(26px,3.2vw,36px)] leading-[1.1] tracking-[-0.03em]">
              {section.title}
            </h2>
          </div>

          <div className="relative mt-[46px] hidden md:block">
            <svg viewBox="0 0 1100 300" className="block w-full overflow-visible" style={{ height: "auto" }} aria-hidden="true">
              <defs>
                <linearGradient id="tg-lifecycle-flow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" style={{ stopColor: "var(--color-amber)" }} />
                  <stop offset="1" style={{ stopColor: "var(--color-orange)" }} />
                </linearGradient>
              </defs>
              <g
                stroke="url(#tg-lifecycle-flow)"
                strokeWidth={2}
                fill="none"
                opacity={0.55}
                strokeDasharray="6 7"
                style={{ animation: "tgdash 7s linear infinite" }}
              >
                {CONNECTOR_PATHS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              <circle
                cx={550}
                cy={150}
                r={78}
                fill="var(--color-overlay-amber)"
                stroke="color-mix(in srgb, var(--color-amber) 50%, transparent)"
                strokeWidth={1.5}
              />
              <circle
                cx={550}
                cy={150}
                r={52}
                fill="url(#tg-lifecycle-flow)"
                opacity={0.9}
                style={{ transformOrigin: "550px 150px", animation: "tgpulsecore 4s ease-in-out infinite" }}
              />
              <text className="leading-normal" x={550} y={145} textAnchor="middle" fill="#fff" fontFamily="var(--font-display)" fontWeight={700} fontSize={19}>
                {section.engineLabel}
              </text>
              <text
                className="leading-normal"
                x={550}
                y={166}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={12}
              >
                {section.engineSubLabel}
              </text>
            </svg>

            <div className="pointer-events-none absolute inset-0">
              {section.nodes.map((node, i) => (
                <div
                  key={node.order}
                  className="absolute text-center"
                  style={{ width: 170, ...NODE_POSITIONS[i] }}
                >
                  <div
                    className="rounded-[12px] border border-border"
                    style={{ background: "var(--color-nav-glass)", padding: "12px 10px", backdropFilter: "blur(6px)" }}
                  >
                    <div style={{ fontSize: "13.5px", fontWeight: "var(--fw-bold)", color: "var(--color-text-primary)" }}>
                      {node.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-[12px] md:hidden">
            {section.nodes.map((node) => (
              <div
                key={node.order}
                className="rounded-[12px] border border-border text-center leading-[normal]"
                style={{ background: "var(--color-ink-glass-40)", padding: 14 }}
              >
                <span style={{ fontSize: "13.5px", fontWeight: "var(--fw-bold)", color: "var(--color-text-primary)" }}>
                  {node.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
