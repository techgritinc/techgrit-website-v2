# Phase 1 Data Model: Webinar Series Page

All entities below are derived from `spec.md`'s Key Entities (as clarified). They are modeled as
plain TypeScript types in `app/webinar/_data/types.ts`, with the actual content values in
`app/webinar/_data/webinar-content.ts` (no ORM/DB — content is a typed local module, matching the
`app/blog/_data/`/`app/services/_data/` convention).

## WebinarPageContent (root)

The full static content payload for the page, one export consumed by `app/webinar/page.tsx`.

```ts
interface WebinarPageContent {
  hero: WebinarHeroContent;
  sessionsHeading: string;
  upcomingSession: UpcomingSession;
  releasedSessions: ReleasedSession[];
  subscribePanel: SubscribePanelContent;
}
```

| Field            | Type                 | Notes |
|------------------|----------------------|-------|
| hero             | `WebinarHeroContent` | FR-001, FR-002, FR-003 |
| sessionsHeading  | string               | FR-004 — e.g. `"Sessions"` |
| upcomingSession  | `UpcomingSession`    | FR-005 — exactly one, editorially authored, not derived (spec.md Assumptions) |
| releasedSessions | `ReleasedSession[]`  | FR-007, FR-008 — 3 entries in the reference, ordered |
| subscribePanel   | `SubscribePanelContent` | FR-009 |

## WebinarHeroContent — FR-001, FR-002, FR-003

| Field            | Type                | Validation |
|------------------|---------------------|------------|
| badgeLabel       | string              | non-empty; e.g. `"Webinar Series"` |
| heading          | string              | non-empty; full headline text |
| headingHighlight | string              | non-empty; must be a substring of `heading` — rendered via `--gradient-brand-text` |
| lead             | string              | non-empty; supporting statement beneath the headline |
| formPlaceholder  | string              | non-empty; e.g. `"e.g., email@example.com"` |
| formCtaLabel     | string              | non-empty; e.g. `"Subscribe"` |
| successText      | string              | non-empty; shown once the hero form's own local state is submitted successfully |
| collage          | `HeroCollageTile[]` | exactly 9 entries, position 1–9 (FR-003) |

```ts
interface WebinarHeroContent {
  badgeLabel: string;
  heading: string;
  headingHighlight: string;
  lead: string;
  formPlaceholder: string;
  formCtaLabel: string;
  successText: string;
  collage: HeroCollageTile[];
}
```

## HeroCollageTile — FR-003

| Field    | Type                                    | Validation |
|----------|------------------------------------------|------------|
| position | number                                   | 1–9, unique across the array |
| kind     | `"photo" \| "spin-ring" \| "play-triangle" \| "pulse-dot"` | the three non-`"photo"` kinds are the fixed decorative tiles (research.md §5) |
| image    | `{ src: string; alt: string; objectPosition?: "left" \| "right" }` | required when `kind === "photo"`, otherwise absent |

```ts
type HeroCollageTileKind = "photo" | "spin-ring" | "play-triangle" | "pulse-dot";

interface HeroCollageTile {
  position: number;
  kind: HeroCollageTileKind;
  image?: {
    src: string;
    alt: string;
    objectPosition?: "left" | "right";
  };
}
```

Six tiles are `kind: "photo"` (reusing `public/assets/team/glasses.png`, `rooftop.png`,
`painting.png`, `diwali.png` — two of the four reused twice with a different `objectPosition`, per
spec.md Assumptions); three are the fixed decorative kinds (`spin-ring`, `play-triangle`,
`pulse-dot`), matching the reference's 9-cell layout exactly (positions 1, 5, 9 in the reference).

## UpcomingSession — FR-005, FR-006

| Field       | Type     | Validation |
|-------------|----------|------------|
| statusLabel | string   | non-empty; e.g. `"Upcoming · Live"` |
| title       | string   | non-empty |
| description | string   | non-empty |
| date        | string   | non-empty; e.g. `"30th June 2026"` — kept as a display string per Clarifications (structured, but not a computed `Date`) |
| time        | string   | non-empty; e.g. `"12:00 PM"` |
| timezone    | string   | non-empty; e.g. `"CST"` |
| ctaLabel    | string   | non-empty; e.g. `"Register Now"` |

```ts
interface UpcomingSession {
  statusLabel: string;
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  ctaLabel: string;
}
```

Per Clarifications, `date`/`time`/`timezone` are separate structured fields (not one freeform
string) — the component composes them for display (e.g. `${date} · ${time} ${timezone}`), never
concatenated at the content-authoring layer. No relative-date computation is implied or required by
any FR — these are authored display values, not a computed `Date`/`Intl` formatting target.

## ReleasedSession — FR-007, FR-008

| Field       | Type                    | Validation |
|-------------|-------------------------|------------|
| id          | string                  | non-empty, unique, content-independent — used as the React `key` when `.map()`-rendering the released-session grid, per Constitution Principle III's stable-identity rule (added during Phase 5 implementation; never key on `title`) |
| statusLabel | string                  | non-empty; e.g. `"Released"` |
| title       | string                  | non-empty |
| description | string                  | non-empty |
| ctaLabel    | string                  | non-empty; e.g. `"Watch Now"` |
| accent      | `"orange" \| "blue" \| "teal"` | drives the card's cover-treatment gradient and hover border color (research.md §4) — a closed union over already-existing color tokens, never a raw hex/rgba in content data (Principle I) |
| cardSize    | `"half" \| "full"`      | fixed, authored per-session (Clarifications) — not computed from array position or auto-cycled |

```ts
type ReleasedSessionAccent = "orange" | "blue" | "teal";
type ReleasedSessionCardSize = "half" | "full";

interface ReleasedSession {
  id: string;
  statusLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  accent: ReleasedSessionAccent;
  cardSize: ReleasedSessionCardSize;
}
```

The reference's 3 seed sessions are `["orange","half"], ["blue","half"], ["teal","full"]` in that
order — carried forward verbatim as the initial content, per spec.md Assumptions (content is static,
hand-authored configuration).

## SubscribePanelContent — FR-009, FR-010, FR-011, FR-015

| Field       | Type   | Validation |
|-------------|--------|------------|
| heading     | string | non-empty |
| copy        | string | non-empty |
| formPlaceholder | string | non-empty |
| ctaLabel    | string | non-empty; e.g. `"Subscribe"` |
| successText | string | non-empty; e.g. `"You're in. We'll email you when the next session goes live."` |

```ts
interface SubscribePanelContent {
  heading: string;
  copy: string;
  formPlaceholder: string;
  ctaLabel: string;
  successText: string;
}
```

## Newsletter Subscription — FR-002, FR-010, FR-011, FR-015 (UI state, not content)

Per spec.md Key Entities/Clarifications, each of the two subscribe entry points (hero form, Subscribe
panel form) owns its own independent, transient `email`/`error`/`submitted` state — not modeled as a
persisted type, no network call reads or writes it. Per research.md §8, the hero's and the
Subscribe panel's forms are each implemented inline within their own section component
(`hero-section.tsx`, `subscribe-panel.tsx`) rather than a shared file, so each instance's state is
naturally isolated — there is no prop or module shared between them.

## Mapping to components

| Entity / content field                    | Component |
|--------------------------------------------|-----------|
| `WebinarPageContent.hero` (incl. collage and its own inline form) | `app/webinar/_components/hero-section.tsx` (research.md §8 — collage and form are internal JSX within this one file) |
| `WebinarPageContent.sessionsHeading`, `upcomingSession`, `releasedSessions` | `app/webinar/_components/sessions-section.tsx` (research.md §8 — upcoming panel and released cards are internal JSX within this one file) |
| `WebinarPageContent.subscribePanel`        | `app/webinar/_components/subscribe-panel.tsx` (its own inline form instance) |

## Footer / Header (out of scope)

Per spec.md Assumptions and FR-012, the shared `Header`/`Footer` (`components/layout/`) are reused
as-is and are not part of this feature's content model.
