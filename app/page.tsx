export default function StyleTest() {
  return (
    <div style={{ background: "var(--color-ink)", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", minHeight: "100vh" }}>

      {/* NAV BAR */}
      <div style={{ background: "var(--color-nav-glass)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--color-border-subtle)", padding: "18px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>TechGrit Style Kit</span>
        <span className="badge badge-glass">Design Tokens Live</span>
      </div>

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "48px var(--container-padding)", display: "flex", flexDirection: "column", gap: 56 }}>

        {/* 1. TYPOGRAPHY */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>Typography</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", fontWeight: 700, letterSpacing: "var(--ls-tight)", lineHeight: "var(--lh-tight)", marginBottom: 12 }}>
            Software is no longer built. It&apos;s <span className="text-gradient">orchestrated.</span>
          </h1>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", fontWeight: 700, letterSpacing: "var(--ls-tightest)", lineHeight: "var(--lh-tight)", marginBottom: 12 }}>
            It&apos;s <span className="text-gradient-flow">animated.</span>
          </h1>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 700, letterSpacing: "var(--ls-snug)", marginBottom: 8 }}>Our AI-First Delivery Platform.</h2>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 700, letterSpacing: "var(--ls-normal)", marginBottom: 8 }}>Autonomous Agent Integration</h3>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--lh-body)", color: "var(--color-text-secondary)", maxWidth: 560, marginBottom: 4 }}>
            TechGrit is the AI-First Software Engine — from vision to production in weeks, not years.
          </p>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>Caption / card meta text — 14px Manrope</p>
        </section>

        <hr className="divider" />

        {/* 2. BUTTONS */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Buttons</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <button className="btn btn-primary btn-lg">Build AI-First Future →</button>
            <button className="btn btn-ghost btn-lg">View Methodology <span style={{ color: "var(--color-orange)" }}>→</span></button>
            <button className="btn btn-outline btn-lg">Documentation</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <button className="btn btn-primary">Default →</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-ghost btn-sm">Small Ghost</button>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn btn-primary" disabled>Disabled</button>
            <button className="btn btn-primary" style={{ position: "relative", overflow: "hidden" }}>
              <span className="btn-shine" />Shine Effect →
            </button>
          </div>
        </section>

        <hr className="divider" />

        {/* 3. BADGES & STATUS */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Badges & Status</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <span className="badge badge-orange">Live Webinar</span>
            <span className="badge badge-glass">AI-First Partner</span>
            <span className="badge badge-blue">Intelligence</span>
            <span className="badge badge-teal">Architecture</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span className="status-dot status-live" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Live</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span className="status-dot status-orange" />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Active</span>
            </span>
          </div>
        </section>

        <hr className="divider" />

        {/* 4. CARDS */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Cards</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            <div className="card" style={{ padding: 24 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>Glass Card</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Agent Integration</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)", lineHeight: "var(--lh-body)" }}>Agents handle PR reviews, test generation, and CI/CD autonomously. Hover me.</p>
            </div>
            <div className="card-solid" style={{ padding: 24 }}>
              <span className="badge badge-orange" style={{ display: "inline-block", marginBottom: 12 }}>Case Study</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Solid Dark Card</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)", lineHeight: "var(--lh-body)" }}>Used for blog posts, case studies. Hover to see shadow lift.</p>
            </div>
            <div className="glass-card">
              <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>Glass Panel</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Subscribe / CTA Panel</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)", lineHeight: "var(--lh-body)" }}>Heavier backdrop blur. Used for subscribe band and CTA sections.</p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* 5. FORM */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Form Fields</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 520 }}>
            <input className="field" type="text" placeholder="Name" />
            <input className="field" type="email" placeholder="Business Email" />
            <textarea className="field" rows={3} placeholder="Message" style={{ gridColumn: "span 2", resize: "vertical" }} />
            <button className="btn btn-primary" style={{ gridColumn: "span 2" }}>Submit →</button>
          </div>
          <p style={{ marginTop: 10, fontSize: 12, color: "var(--color-text-ghost)" }}>Focus any field — border turns orange.</p>
        </section>

        <hr className="divider" />

        {/* 6. COLORS */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Brand Colors</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              ["ink", "var(--color-ink)", true],
              ["ink-mid", "var(--color-ink-mid)", true],
              ["orange", "var(--color-orange)", false],
              ["amber", "var(--color-amber)", false],
              ["blue", "var(--color-blue)", false],
              ["blue-light", "var(--color-blue-light)", false],
              ["teal", "var(--color-teal)", false],
              ["teal-light", "var(--color-teal-light)", false],
              ["green", "var(--color-green)", false],
              ["surface-off", "var(--color-surface-off)", false],
            ].map(([label, bg, border]) => (
              <div key={label as string} style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: border ? "1px solid var(--color-border)" : "none", minWidth: 100 }}>
                <div style={{ height: 44, background: bg as string }} />
                <div style={{ padding: "6px 8px", background: "var(--color-ink-card)", fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)" }}>{label as string}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* 7. ANIMATIONS */}
        <section>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Animations</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              { label: "tgorb", color: "var(--color-orange)", anim: "tgorb 4s ease-in-out infinite" },
              { label: "tgfloat", color: "var(--color-blue-light)", anim: "tgfloat 3s ease-in-out infinite" },
              { label: "tgpulse", color: "var(--color-green)", anim: "tgpulse 2s ease-in-out infinite" },
              { label: "tgrise", color: "var(--color-amber)", anim: "tgrise 1.2s cubic-bezier(.2,.7,.2,1) both" },
            ].map(({ label, color, anim }) => (
              <div key={label} style={{ padding: "16px 20px", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border)", textAlign: "center", minWidth: 100 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: color, margin: "0 auto 10px", animation: anim }} />
                <span style={{ fontSize: 11, color: "var(--color-text-ghost)" }}>{label}</span>
              </div>
            ))}
            <div style={{ padding: "16px 20px", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border)", textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span className="status-dot status-live" />
                <span style={{ fontSize: 12, fontWeight: 700 }}>LIVE</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--color-text-ghost)" }}>tgblink</div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div style={{ borderTop: "1px solid var(--color-border-subtle)", paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--color-text-ghost)" }}>
            <code style={{ background: "var(--color-ink-card)", padding: "2px 8px", borderRadius: 6 }}>tokens.css</code>
            {" → "}
            <code style={{ background: "var(--color-ink-card)", padding: "2px 8px", borderRadius: 6 }}>globals.css</code>
            {" — Manrope + Space Grotesk via next/font"}
          </p>
        </div>

      </div>
    </div>
  );
}

