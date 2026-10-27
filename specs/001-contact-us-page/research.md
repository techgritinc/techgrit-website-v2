# Phase 0 Research: Contact Us Page

## Decision 1: Breakpoint token mapping

**Decision**: Add `--breakpoint-sm: 560px`, `--breakpoint-md: 960px`, `--breakpoint-lg: 1140px`
to the `@theme inline` block in `app/globals.css`, so that Tailwind's `sm:`/`md:`/`lg:` variant
prefixes resolve to the constitution's documented breakpoint contract instead of Tailwind's
built-in defaults (640/768/1024).

**Rationale**: Constitution Principle II mandates reusing 1140/960/560 "via Tailwind's `sm:`/
`md:`/`lg:` prefixes rather than inventing new pixel breakpoints," but no prior feature has
needed responsive grid collapsing, so the mapping was never added to the shared `@theme` block.
This page is the first to need a two-column hero/form grid that collapses to one column, and a
three-column steps grid that collapses to one column — exactly the documented contract's job.
Adding the mapping once, in the shared token file, is a small and directly justified
infrastructure change (not a per-component override, not speculative).

**Implementation note (discovered during build)**: the `@theme inline` values in `globals.css`
must be literal pixel values, not `var(--breakpoint-*)` indirection — Tailwind/Lightning CSS
inlines these directly into generated `@media` conditions at build time and cannot resolve a
CSS custom property there (`next build --webpack` fails with "Unexpected token Function(var)"
if attempted). The canonical values still live in `app/tokens.css` as the documented source of
truth; the `@theme` block's copy is a necessarily-literal duplicate, with a comment in both
files cross-referencing the other so they're kept in sync by hand if ever changed.

**Alternatives considered**:
- *Arbitrary Tailwind variants* (`min-[960px]:grid-cols-3`) inline in this feature's components —
  rejected: would duplicate the 1140/960/560 values ad hoc in component code, violating the
  "reuse via `sm:`/`md:`/`lg:`" instruction and Principle I's token-only-styling spirit.
- *Raw CSS media queries scoped to this feature's stylesheet* — rejected: this repo has no
  per-route CSS files; all shared responsive rules live in `globals.css`.

## Decision 2: No API contract / backend for form submission

**Decision**: The contact form's "submit" action is a client-side state transition only
(`sent: true`), with no network request, matching the reference file's own `DCLogic` behavior
(`onSubmit` just calls `setState({ sent: true })` with no `fetch`/API call visible anywhere in
`TechGrit Contact.dc.html`). No `contracts/` directory or API route is produced by this plan.

**Rationale**: This repository has no backend of any kind today (Next.js App Router only, no
`app/api/` routes, no database, no server actions in use elsewhere) and the feature spec's own
Assumptions & Dependencies section defers "how the message is transmitted or stored" as a
separate implementation concern. Scoping TMS-64 to page content (per the user's explicit
instruction) means the actual message-delivery mechanism (email relay, CRM webhook, server
action, etc.) is a follow-up feature, not part of this plan.

**Alternatives considered**:
- *Next.js Server Action stub* — rejected for now: would require deciding on a real delivery
  target (email service, ticketing system) that has not been specified anywhere in the ticket or
  spec; introducing a stub risks becoming a silently-wrong placeholder that looks production-real.
- *Client-only `fetch` to a placeholder endpoint* — rejected: same risk, plus would fail at
  runtime with no backend to receive it.

## Decision 3: Component split

**Decision**: Two new components inside `app/(marketing)/contact/_components/`:
- `contact-hero-form.tsx` — `'use client'`, owns all interactive state (selected topic, field
  values, submitted/reset state) for the hero-intro + contact-info + form + success sections
  (User Stories 1 & 2 share this single visual block per the reference layout).
- `next-steps.tsx` — plain server component, fully static markup (User Story 3).

`page.tsx` stays a server component that only composes these two and sets route metadata.

**Rationale**: Matches Next.js's server/client boundary guidance (`node_modules/next/dist/docs/
01-app/03-api-reference/01-directives/use-client.md`): keep the client boundary as small and as
low in the tree as possible, and let static content (`next-steps.tsx`) stay a server component.
It also matches the reference file's own visual grouping — the hero/info column and the form
card are one interlocking layout in `TechGrit Contact.dc.html`, while "What happens next" is a
visually and behaviorally independent section below it.

**Alternatives considered**:
- *One single client component for the whole page* — rejected: would force the static
  "what happens next" cards to be client-rendered for no reason, against Next.js's own
  server/client composition guidance.
- *Splitting hero-intro and the form card into two separate client components* — rejected as
  premature: they share no state today, but they are visually one unit in the reference and in
  the spec's User Stories 1/2; splitting them adds a file and a prop-passing boundary with no
  present benefit (no other page reuses either piece yet).

## Summary

All "NEEDS CLARIFICATION" items from the Technical Context are resolved:
- No unresolved language/dependency/testing/platform unknowns — this is a standard addition to
  the existing Next.js/TypeScript/Tailwind stack already in use.
- The three decisions above cover the only genuinely open implementation questions (breakpoints,
  submission mechanism, component boundaries).
