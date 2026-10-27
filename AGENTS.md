<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:frontend-design-rules -->
## UI work uses the vendored `frontend-design` skill

Any user-visible frontend work in this repo — components, pages, layouts, styling — MUST invoke the vendored `frontend-design` skill at `.claude/skills/frontend-design/SKILL.md` before writing code. This is Constitution Principle VI (`.specify/memory/constitution.md`) and is enforced through the speckit workflow: `/speckit.specify` detects UI intent, `/speckit.plan` records the design approach, `/speckit.tasks` tags UI tasks with `[UI]`, and `/speckit.implement` invokes the skill before executing any `[UI]`-tagged task.

The skill shapes creative direction and craft. Principles I–V (tokens, breakpoints, component library, reference-file translation, dark-first brand) remain the authority for repo-specific rules — where they conflict with the skill's generic aesthetic suggestions, the repo principles win.
<!-- END:frontend-design-rules -->
