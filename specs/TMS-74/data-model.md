# Phase 1 Data Model: Careers Page

All entities below are derived from `spec.md`'s Key Entities. They are modeled as plain TypeScript types plus one
transient interaction-state shape, with the actual content values in `app/careers/_data/careers-data.ts` (no ORM/DB —
per plan.md's Storage note, content is a typed local module, matching the `app/blog/_data/`/`app/services/_data/`
convention).

## CareersPageContent (root)

The full static content payload for the page, one export consumed by `app/careers/page.tsx`.

| Field    | Type              | Notes |
|----------|-------------------|-------|
| hero     | `CareersHeroContent` | FR-001 |
| stats    | `Stat[]`          | FR-002 — exactly 4 entries |
| benefits | `Benefit[]`       | FR-003 — exactly 6 entries |
| filters  | `DepartmentFilter[]` | FR-004 — 5 entries, "All" first and default-active |
| roles    | `OpenRole[]`      | FR-006, FR-019 — 7 entries, the role list's `.filter()` source (research.md §4) |
| lifeAtTechGrit | `LifeAtTechGritContent` | FR-013 — passed as props into the extended `LifeGallery` |
| cta      | `ClosingCtaContent` | FR-014, FR-015 |

```ts
interface CareersPageContent {
  hero: CareersHeroContent;
  stats: Stat[];
  benefits: Benefit[];
  filters: DepartmentFilter[];
  roles: OpenRole[];
  lifeAtTechGrit: LifeAtTechGritContent;
  cta: ClosingCtaContent;
}
```

## CareersHeroContent — FR-001

| Field            | Type   | Validation |
|------------------|--------|------------|
| eyebrow          | string | non-empty; e.g. `"Careers at TechGrit"` |
| heading          | string | non-empty; full headline text |
| headingHighlight | string | non-empty; must be a substring of `heading` — rendered via the orange/amber gradient accent, matching the reference's gradient-highlighted phrase exactly |
| lead             | string | non-empty; supporting statement beneath the headline |
| primaryCta       | `{ label: string; href: string }` | href targets the Open Roles section (in-page anchor, FR-001) |
| secondaryCta     | `{ label: string; href: string }` | href targets the Life at TechGrit section (in-page anchor, FR-001) |
| images           | `CollageImage[]` | exactly 4 entries in fixed order: tall, default, default, wide (FR-001 — "in that exact arrangement, without resizing or reordering") |

```ts
interface CollageImage {
  src: string;
  alt: string;
  span: "tall" | "default" | "wide";
}

interface CareersHeroContent {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  images: [CollageImage, CollageImage, CollageImage, CollageImage];
}
```

## Stat — FR-002

| Field | Type   | Validation |
|-------|--------|------------|
| value | string | non-empty; headline figure as display text (e.g. `"120+"`), not a number — no arithmetic/formatting is required by any FR |
| label | string | non-empty; supporting label beneath the figure |

```ts
interface Stat {
  value: string;
  label: string;
}
```

## Benefit — FR-003 (Key Entities: "Benefit")

| Field       | Type   | Validation |
|-------------|--------|------------|
| icon        | `BenefitIconName` | one of the 6 new named icons added to `components/ui/icons.tsx` (plan.md UI Design Approach) |
| title       | string | non-empty |
| description | string | non-empty |

```ts
type BenefitIconName =
  | "lightning"   // Ship at AI speed
  | "book"        // Continuous learning
  | "home"        // Remote-first
  | "heart"       // Wellbeing
  | "barChart"    // Ownership / equity
  | "users";      // Team celebrations

interface Benefit {
  icon: BenefitIconName;
  title: string;
  description: string;
}
```

## DepartmentFilter — FR-004, FR-005 (Key Entities: "Department Filter")

| Field | Type   | Validation |
|-------|--------|------------|
| value | string | non-empty; stable identifier used for filtering and as the React key (never the label) — e.g. `"all"`, `"engineering"` |
| label | string | non-empty; display text — e.g. `"All"`, `"Engineering"` |

```ts
interface DepartmentFilter {
  value: string;
  label: string;
}
```

Per Key Entities, active/inactive state is transient UI state, not content — it lives as
`const [filter, setFilter] = useState<string>("all")` inside `OpenRolesSection` (research.md §4), matching
`DepartmentFilter["value"]`, not the label.

## OpenRole — FR-006, FR-019 (Key Entities: "Open Role")

| Field      | Type   | Validation |
|------------|--------|------------|
| slug       | string | non-empty; stable unique identifier, distinct from `title` — this is what `Application Submission.roleSlug` references (per spec.md's clarification), not the title, so a later title edit doesn't break association |
| title      | string | non-empty; position title |
| department | string | non-empty; must match one of `DepartmentFilter.value` (excluding `"all"`) — drives FR-005 filtering |
| location   | string | non-empty; free text, not a fixed enum (Key Entities: "neither is constrained to a fixed enum") |
| type       | string | non-empty; free text employment type (e.g. `"Full-time"`), not a fixed enum |
| accent     | string | non-empty; hex or token reference for the role card's status-dot accent identity |

```ts
interface OpenRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  accent: string;
}
```

## LifeAtTechGritContent — FR-013

The props passed into the extended `LifeGallery` (research.md §9) — not a new component's content shape, but this
page's values for that component's now-configurable props.

| Field       | Type              | Validation |
|-------------|-------------------|------------|
| eyebrow     | string            | non-empty |
| heading     | string            | non-empty |
| description | string            | non-empty |
| images      | `CollageImage[]`  | exactly 4 entries; spans `["tall","wide","default","wide3"]` per research.md §9's 4-column collage |

```ts
interface LifeAtTechGritContent {
  eyebrow: string;
  heading: string;
  description: string;
  images: CollageImage[];
}
```

## ClosingCtaContent — FR-014, FR-015

| Field   | Type   | Validation |
|---------|--------|------------|
| heading | string | non-empty |
| copy    | string | non-empty |
| ctaLabel| string | non-empty; e.g. `"Send your resume"` |

```ts
interface ClosingCtaContent {
  heading: string;
  copy: string;
  ctaLabel: string;
}
```

## Application Submission — FR-007–FR-012, FR-020 (Key Entities: "Application Submission"; UI state, not content)

Per Key Entities, this is the application dialog's transient interaction state — it lives as local `useState` inside
`ApplicationDialog`, mirroring the established client-side-only submission pattern this repo already uses (Blog's
`NewsletterPanel`/`SubscribeBand`). Not modeled as a persisted type; no network call reads or writes this state
(FR-020).

```ts
interface ApplicationContext {
  mode: "role" | "general";
  roleSlug: string | null;   // the OpenRole.slug this submission is for; null for a general application (FR-012, FR-015)
  roleTitle: string | null;  // display title shown top-left in the dialog; null renders "General Application" (FR-008, FR-015)
}

interface ApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fitStatement: string;
}

type ApplicationSubmissionStatus = "idle" | "submitted";
```

`ApplicationDialog` receives an `ApplicationContext` as a prop when opened (set by whichever trigger — a `RoleCard`'s
Apply action passing `{ mode: "role", roleSlug, roleTitle }`, or the closing CTA / hero secondary flows passing
`{ mode: "general", roleSlug: null, roleTitle: null }`), holds `ApplicationFormValues` and
`ApplicationSubmissionStatus` as local state, and on valid submit sets `status: "submitted"` to swap the form for the
in-dialog success message (FR-010), matching research.md §7.

## Mapping to components

| Entity / content field                  | Component |
|------------------------------------------|-----------|
| `CareersPageContent.hero`                 | `app/careers/_components/CareersHero.tsx` |
| `CareersPageContent.stats`                 | `app/careers/_components/StatsStrip.tsx` |
| `CareersPageContent.benefits`              | `app/careers/_components/WhyJoinSection.tsx` |
| `CareersPageContent.filters` + `.roles`    | `app/careers/_components/OpenRolesSection.tsx` (owns filter state), `RoleFilters.tsx`, `RoleCard.tsx` |
| `CareersPageContent.lifeAtTechGrit`        | `app/_home-components/LifeGallery.tsx` (extended, research.md §9) |
| `CareersPageContent.cta`                   | `app/careers/_components/CareersCta.tsx` |
| `ApplicationContext` / form state          | `components/ui/Modal.tsx` (shell) + `app/careers/_components/ApplicationDialog.tsx` (form logic) |

## Footer / Header (out of scope)

Per spec.md Assumptions and FR-016, the shared `Header`/`Footer` (`components/layout/`) are reused as-is and are not
part of this feature's content model.
