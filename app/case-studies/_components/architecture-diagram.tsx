import type { ArchitectureFlow } from "../_data/types";

const NODE_STYLES = [
  {
    background: "color-mix(in srgb, var(--color-blue-light) 10%, transparent)",
    border: "1px solid color-mix(in srgb, var(--color-blue-light) 35%, transparent)",
    minWidth: 120,
    padding: "16px 12px",
    labelSize: 13,
    icon: (
      <svg className="mb-[10px] mx-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    background: "color-mix(in srgb, var(--color-amber) 10%, transparent)",
    border: "1px solid color-mix(in srgb, var(--color-amber) 35%, transparent)",
    minWidth: 120,
    padding: "16px 12px",
    labelSize: 13,
    icon: (
      <svg className="mb-[10px] mx-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    background:
      "linear-gradient(140deg, color-mix(in srgb, var(--color-orange) 22%, transparent), color-mix(in srgb, var(--color-amber) 8%, transparent))",
    border: "1px solid color-mix(in srgb, var(--color-orange) 45%, transparent)",
    minWidth: 140,
    padding: "18px 12px",
    labelSize: 13.5,
    icon: (
      <svg className="mb-[10px] mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
      </svg>
    ),
  },
];

export function ArchitectureDiagram({ flow }: { flow: ArchitectureFlow }) {
  return (
    <div
      className="mt-[26px] border border-border-faint rounded-[20px] px-[30px] py-[38px]"
      style={{ background: "linear-gradient(160deg, var(--color-glass), var(--color-glass-hairline))" }}
    >
      <div className="flex flex-wrap max-tg-sm:flex-col items-center justify-center gap-[8px]">
        {flow.nodes.map((node, index) => {
          const nodeStyle = NODE_STYLES[index] ?? NODE_STYLES[NODE_STYLES.length - 1];
          return (
            <div key={node} className="contents">
              <div className="text-center" style={{ minWidth: nodeStyle.minWidth }}>
                <div
                  className="w-full rounded-[14px]"
                  style={{
                    background: nodeStyle.background,
                    border: nodeStyle.border,
                    padding: nodeStyle.padding,
                  }}
                >
                  {nodeStyle.icon}
                  <div className="font-bold text-primary leading-[normal]" style={{ fontSize: nodeStyle.labelSize }}>
                    {node}
                  </div>
                  {index === flow.nodes.length - 1 ? (
                    <div className="text-[11px] text-text-soft leading-[normal]">core service</div>
                  ) : null}
                </div>
              </div>
              {index < flow.nodes.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="text-text-placeholder text-[20px] max-tg-sm:rotate-90"
                >
                  &#8594;
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {flow.integrations.length > 0 ? (
        <>
          <div className="flex items-center justify-center gap-[10px] mt-[18px]">
            <span className="text-text-whisper" aria-hidden="true">&#8595;</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[14px]">
            {flow.integrations.map((integration) => (
              <div key={integration.label} className="text-center" style={{ minWidth: 110 }}>
                <div className="bg-glass border border-border rounded-card px-[12px] py-[13px] text-[12.5px] font-bold text-text-bright">
                  {integration.label}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
