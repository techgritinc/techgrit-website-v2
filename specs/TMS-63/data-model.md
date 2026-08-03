# Phase 1 Data Model: Global Header & Footer Layout

**N/A — no persistent data entities or relationships apply to this feature.**

This is a UI-only Header/Footer implementation. There is no API, backend, database, or
persistence layer involved (see `research.md` → "No API contracts"). The navigation and footer
link content described in spec.md's Key Entities section (Navigation Item, Footer Link Group,
Contact Detail, Legal Link, Social Link) is implemented purely as static, in-memory TypeScript
config objects (`components/layout/nav-config.ts`, `components/layout/footer-config.ts`) — not as
a data model with storage, validation, or persistence concerns. Field-level shapes for that config
are defined directly in the implementation task in `tasks.md`, not here.

## V2 Update — Header Pixel-Perfect Refactor (2026-07-30)

Still N/A — no persistent data entities are introduced. `components/layout/nav-config.ts`'s shape
changes from a flat list of up-to-one-level dropdown children to five mega-menu groups, each a
list of `{ icon, title, description, href }` items (plus an optional trailing CTA-row `{ label,
href }` for the two groups that have one). This remains a static, in-memory TypeScript config —
no storage, validation, or persistence concerns are introduced. The exact field shape is defined
directly in `tasks.md`'s implementation task, consistent with the v1 pattern above.

## UI Findings — Header Interaction & Styling Corrections (2026-07-31)

Still N/A — no persistent data entities. `MegaGroup` gains one additional top-level field per
FR-019a: `href: string` — the trigger's own destination when clicked with a mouse (`/services`,
`/frameworks`, `/construction`, `/case-studies`, `/about`), independent of the group's existing
`items[].href` (the mega-panel's own links) and `cta?.href` (the panel's "see all" row). No other
shape change; still a static, in-memory TypeScript config.
