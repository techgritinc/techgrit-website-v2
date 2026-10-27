# Phase 1 Data Model: Homepage Content Sections

No backend, database, or persistence layer is involved (see `research.md` → "No API contracts").
Every entity below is a static, in-repo TypeScript shape living in `components/home/home-data.ts`,
rendered by the matching section in `components/home/`; the one piece of real runtime state is the
subscribe form's local submission status. Field shapes are recorded here (rather than deferred to
tasks.md, as TMS-63 did) because this feature has materially more content entities for `tasks.md` to
implement against consistently.

## Static content entities (`components/home/home-data.ts`)

### DeliveryStat

| Field | Type | Notes |
|---|---|---|
| `value` | `string` | e.g. `"10X"`, `"6 weeks"`, `"zero"` |
| `label` | `string` | e.g. `"Delivery Speed"` |

### TrustedClientLogo

| Field | Type | Notes |
|---|---|---|
| `src` | `string \| null` | Path under `public/logos/`; all six already exist. `null` renders "Coming soon" text instead of a broken image (fallback rule, not currently triggered) |
| `alt` | `string` | Accessible client name |

### PlatformCapability

| Field | Type | Notes |
|---|---|---|
| `icon` | `IconComponent` | Reference to an icon from `components/ui/icons.tsx` |
| `title` | `string` | |
| `description` | `string` | |

### MethodologyPhase

| Field | Type | Notes |
|---|---|---|
| `n` | `number` | 1–4, sequence/display number |
| `week` | `string` | e.g. `"Week 1"`, `"Weeks 2 to 4"` |
| `title` | `string` | e.g. `"Architect"` |
| `description` | `string` | |
| `deliverables` | `string[]` | Ordered list |

- **State**: exactly one `MethodologyPhase` is "active" at a time, tracked as an `activeIndex:
  number` (0–3) in `MethodologySection`'s local state — not a field on the entity itself.

### DifferentiatorPoint

| Field | Type | Notes |
|---|---|---|
| `icon` | `IconComponent` | |
| `title` | `string` | e.g. `"From Copilot to Agentic"` |
| `description` | `string` | |

### ComparisonMetric

| Field | Type | Notes |
|---|---|---|
| `label` | `string` | e.g. `"Traditional Development"`, `"OrbitAI™ Delivery"` |
| `displayValue` | `string` | e.g. `"Months"`, `"6 Weeks"` |
| `barPercent` | `number` | 0–100, relative bar length for the comparison visual |

### IndustryCard

| Field | Type | Notes |
|---|---|---|
| `id` | `"fintech" \| "healthcare" \| "construction"` | |
| `icon` | `IconComponent` | Reference to an icon from `components/ui/icons.tsx` |
| `title` | `string` | |
| `description` | `string` | |
| `image` | `{ src: string; alt: string } \| null` | Optional — all three already have real imagery under `public/samples/`; `null` (if ever) renders "Coming soon" text (research.md §6) |
| `href` | `string \| null` | Only Construction has its own dedicated link (FR-008); `null` for the others |

### Testimonial

| Field | Type | Notes |
|---|---|---|
| `type` | `"text" \| "video"` | |
| `quote` | `string` | |
| `name` | `string` | |
| `role` | `string` | |
| `initials` | `string` | Used as the avatar fallback for text testimonials |
| `rating` | `5` | Present only when `type === "text"` (fixed 5-star display, per reference) |
| `videoUrl` | `string \| null` | Present only when `type === "video"`; `null` renders the lightbox's no-video fallback state (edge case) |

### CaseStudy

| Field | Type | Notes |
|---|---|---|
| `featured` | `boolean` | Exactly one `true` entry drives the bento's large tile (FR-010) |
| `industry` | `string` | e.g. `"FinTech"` |
| `metric` | `string` | e.g. `"2.5M"`, `"100%"` |
| `metricLabel` | `string` | e.g. `"lines migrated to .NET 10"` |
| `title` | `string` | |
| `description` | `string \| null` | Only populated for the featured case study |
| `accentColor` | `string` (token reference) | Drives the tint/chip color per card |

### CultureGalleryImage

| Field | Type | Notes |
|---|---|---|
| `image` | `{ src: string; alt: string } \| null` | Optional — all four already have real imagery under `public/assets/team/`; `null` (if ever) renders "Coming soon" text (research.md §6) |
| `span` | `"tall" \| "wide" \| "default"` | Matches the reference's bento grid spans |

## Runtime state (not persisted)

### NewsletterSubscriptionSubmission

Local state inside `SubscribeBand`, never sent to a server (Clarification #1):

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | Required, non-empty after trim |
| `email` | `string` | Required, must match a basic email pattern |
| `status` | `"idle" \| "error" \| "success"` | Drives which of the three visual states renders |
| `errorMessage` | `string \| null` | Set when `status === "error"` |

### MethodologyActivePhase

Local state inside `MethodologySection`: `activeIndex: number` (0–3), updated either by clicking a
phase tab or by the scroll-position listener described in `research.md` §1. Always resolves to a
single valid index (edge case requirement) — never `null`/`undefined` once mounted.

### TestimonialLightbox

Local state inside `TestimonialsSection`: `openIndex: number | null` — `null` means closed;
otherwise the index into the testimonials list currently shown in the lightbox.
