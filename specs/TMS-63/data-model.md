# Phase 1 Data Model: Global Header & Footer Layout

**N/A — no persistent data entities or relationships apply to this feature.**

This is a UI-only Header/Footer implementation. There is no API, backend, database, or
persistence layer involved (see `research.md` → "No API contracts"). The navigation and footer
link content described in spec.md's Key Entities section (Navigation Item, Footer Link Group,
Contact Detail, Legal Link, Social Link) is implemented purely as static, in-memory TypeScript
config objects (`components/layout/nav-config.ts`, `components/layout/footer-config.ts`) — not as
a data model with storage, validation, or persistence concerns. Field-level shapes for that config
are defined directly in the implementation task in `tasks.md`, not here.
