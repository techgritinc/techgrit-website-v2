# Phase 1 Data Model: Blog Page

All entities below are derived from `spec.md`'s Key Entities. They are modeled as plain TypeScript
types in `app/blog/_data/types.ts`, with the actual content values in
`app/blog/_data/blog-content.ts` (no ORM/DB — per plan.md's Storage note, content is a typed local
module, matching the `app/services/_data/`/`app/about/_data/` convention).

## BlogPageContent (root)

The full static content payload for the page, one export consumed by `app/blog/page.tsx`.

| Field       | Type                  | Notes |
|-------------|-----------------------|-------|
| hero        | `BlogHeroContent`     | FR-001 |
| featuredPost| `FeaturedPost`        | FR-002, FR-003 — authored independently of `posts`, not derived from it (spec.md Key Entities) |
| topics      | `string[]`            | FR-004 — fixed 7-value set per spec.md Assumptions: `["All", "Engineering", "Modernization", "Product", "Methodology", "Industry", "Design"]`; "All" is always first and is the default active selection |
| posts       | `BlogPost[]`          | FR-006 — 9 entries, ordered; the grid's `.filter()` source (research.md §4) |
| newsletter  | `NewsletterPanelContent` | FR-008 |

```ts
interface BlogPageContent {
  hero: BlogHeroContent;
  featuredPost: FeaturedPost;
  topics: string[];
  posts: BlogPost[];
  newsletter: NewsletterPanelContent;
}
```

## BlogHeroContent — FR-001

| Field           | Type     | Validation |
|-----------------|----------|------------|
| eyebrow         | string   | non-empty; e.g. `"The TechGrit Blog"` |
| heading         | string   | non-empty; full headline text |
| headingHighlight| string   | non-empty; must be a substring of `heading` — rendered in the orange/amber gradient accent (`--gradient-brand-text`), matching the reference's gradient-highlighted phrase exactly (mirrors `HeroSection.titleHighlight` in `specs/TMS-66/data-model.md`) |
| lead            | string   | non-empty; supporting statement beneath the headline |

## FeaturedPost — FR-002, FR-003

The single, editorially curated flagship entry (spec.md Key Entities: "not automatically derived
from" the grid).

| Field           | Type              | Validation |
|-----------------|-------------------|------------|
| topic           | string            | non-empty; shown as the panel's topic label (reference: "Featured · Engineering") |
| title           | string            | non-empty |
| excerpt         | string            | non-empty |
| author          | `PostAuthor`      | name + role (full role string, e.g. "Principal Engineer · 9 min read" is split — see below) |
| readTime        | string            | non-empty; e.g. `"9 min read"` |
| ctaLabel        | string            | non-empty; e.g. `"Read article"` |
| href            | string            | non-empty; destination article page (out of scope to build — spec.md Assumptions) |

```ts
interface PostAuthor {
  name: string;
  role: string;      // FeaturedPost only — e.g. "Principal Engineer"
  initials: string;  // avatar fallback glyph, e.g. "AR"
}

interface FeaturedPost {
  topic: string;
  title: string;
  excerpt: string;
  author: PostAuthor;
  readTime: string;
  ctaLabel: string;
  href: string;
}
```

## BlogPost (grid item) — FR-006, FR-007

| Field       | Type              | Validation |
|-------------|-------------------|------------|
| topic       | string            | non-empty; must be one of `BlogPageContent.topics` (excluding `"All"`) — drives FR-005 filtering |
| accent      | `BlogAccentToken` | drives the card's cover wash/glow/tag tint (research.md §1/§5); authored per-post, not derived from `topic` (spec.md Assumptions — two "Engineering" posts use two different accents) |
| title       | string            | non-empty |
| excerpt     | string            | non-empty |
| author      | `PostAuthor`      | grid posts only use `name`/`initials` (no `role` — the reference shows initials + publish date + read time here, not a role) |
| publishDate | string            | non-empty; reference's display string (e.g. `"Jun 12"`), not a `Date` — no relative/absolute-date computation is required by any FR |
| readTime    | string            | non-empty; e.g. `"6 min read"` |
| href        | string            | non-empty; destination article page (out of scope to build) |

```ts
type BlogAccentToken =
  | "blue-light"   // --color-blue-light  (#38bdf8 — Modernization)
  | "orange"       // --color-orange      (#E87722 — Product)
  | "amber"        // --color-amber       (#F59E0B — Methodology)
  | "teal-light"   // --color-teal-light  (#2dd4bf — Engineering)
  | "blue"         // --color-blue        (#0284C7 — Industry)
  | "yellow"       // --color-yellow      (#fbbf24 — Design)
  | "purple";      // --color-purple      (#a78bfa — Engineering, second accent)

interface BlogPost {
  topic: string;
  accent: BlogAccentToken;
  title: string;
  excerpt: string;
  author: Pick<PostAuthor, "name" | "initials">;
  publishDate: string;
  readTime: string;
  href: string;
}
```

`BlogAccentToken` is a closed union over the 7 tokens research.md §1 already matched to the
reference's 7 accent hex values — never a raw hex/rgba string in content data, per Constitution
Principle I. The per-post `hexA`-style rgba helper (research.md §5) resolves a `BlogAccentToken` to
its token's hex at render time, not the other way around.

## NewsletterPanelContent — FR-008, FR-009, FR-010

| Field            | Type   | Validation |
|------------------|--------|------------|
| heading          | string | non-empty |
| copy             | string | non-empty |
| ctaLabel         | string | non-empty; e.g. `"Subscribe"` |
| helperText       | string | non-empty; default helper shown below the form (reference: "We'll only email when there's something worth reading.") |
| errorText        | string | non-empty; shown in place of `helperText` on invalid submit (FR-010) |
| successText      | string | non-empty; shown once the form is replaced by the confirmation state (FR-009) |

```ts
interface NewsletterPanelContent {
  heading: string;
  copy: string;
  ctaLabel: string;
  helperText: string;
  errorText: string;
  successText: string;
}
```

## Topic Filter — FR-004, FR-005 (UI state, not content)

Per spec.md Key Entities, a Topic Filter's *label* is content (`BlogPageContent.topics`, above) but
its active/inactive state is transient UI state, not part of the static content module — it lives
as `const [activeTopic, setActiveTopic] = useState<string>("All")` inside the client component that
owns both the filter row and the grid (research.md §4). Not modeled as a persisted type.

## Newsletter Subscription — FR-009, FR-010 (UI state, not content)

Per spec.md Key Entities, the entered email value, validation/error message, and
submitted/confirmed flag are transient interaction state, not content — they live as local
`useState` inside the subscribe form's client component (research.md §7), mirroring
`app/_home-components/SubscribeBand.tsx`'s existing `email`/`submitted`/`error` state shape
exactly. Not modeled as a persisted type; no network call reads or writes this state
(spec.md Assumptions).

## Mapping to components

| Entity / content field       | Component                                              |
|-------------------------------|--------------------------------------------------------|
| `BlogPageContent.hero`        | `app/blog/_components/blog-hero.tsx`                   |
| `BlogPageContent.featuredPost`| `app/blog/_components/featured-post.tsx`               |
| `BlogPageContent.topics`      | `app/blog/_components/topic-filter.tsx`                |
| `BlogPageContent.posts`       | `app/blog/_components/blog-post-grid.tsx` (owns both the filter's active-topic state and the grid — research.md §4) |
| `BlogPageContent.newsletter`  | `app/blog/_components/newsletter-panel.tsx`            |

## Footer / Header (out of scope)

Per spec.md Assumptions and FR-012, the shared `Header`/`Footer` (`components/layout/`) are reused
as-is and are not part of this feature's content model.
