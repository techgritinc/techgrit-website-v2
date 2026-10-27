# Phase 0 Research: Careers Page

**Feature**: TMS-74 | **Date**: 2026-07-28 | **Input**: spec.md, `raw-files/TechGrit Careers.dc.html`

No `[NEEDS CLARIFICATION]` markers remain in spec.md (confirmed by `checklists/requirements.md`), so this research
resolves the concrete implementation decisions plan.md's Technical Context and UI Design Approach depend on, rather
than open unknowns.

## 1. Token/`@theme inline` coverage audit — do any new design tokens need to be added?

**Decision**: Every color/radius/glass-fill value the reference uses for this page already exists in `tokens.css`
(several are already comment-labeled "Careers" from a prior session). No new token needs to be added. However, one
pre-existing spacing token (`--space-12`, 28px) has no matching `--spacing-tg-12` entry in `app/globals.css`'s
`@theme inline` block — a gap-fix, not a new token.

**Rationale — colors/radius/glass fill (direct reuse, already annotated)**:

| Reference value | Existing token | Annotation in tokens.css |
|---|---|---|
| Image-card border `rgba(255,255,255,0.10)` | `--color-border-image` | "Image card border (Careers)" |
| Benefit-card fill `rgba(255,255,255,0.04)` | `--color-glass-4` | — |
| Image-card / benefit-card radius `18px` | `--radius-xl` | "Image cards (Careers gallery)" |
| Accent dot / Apply hover `#E87722` | `--color-orange` | brand accent |
| Filter-pill active gradient | `--gradient-brand` | — |

**Rationale — spacing, direct reuse (no new token needed)**:

| Reference value | Existing token | Use |
|---|---|---|
| Benefit-card padding `28px` | `--space-12` | `GlassCard` padding override |
| Section vertical rhythm `26px` gaps | `--space-11` | Grid/flex gaps |
| Stat-strip / role-card gap `16px` | `--space-6` | Flex/grid gaps |
| Filter-row / role-list gap `24px` | `--space-10` | Flex/grid gaps |
| Role-card icon box `46px` | `--space-18` | `RoleCard` meta icon container |

**Rationale — the one genuine `@theme inline` gap**: `app/globals.css`'s spacing block (lines ~210–250) maps
`--spacing-tg-1`…`tg-23` selectively but skips `tg-6`, `tg-10`, `tg-12`, and `tg-18` specifically — confirmed by a
full grep of the block. Of these four, only `tg-12` (28px benefit-card padding) is actually needed by this feature's
visual spec (`tg-6`/`tg-10`/`tg-18` gaps above can all be expressed via Tailwind's own default spacing scale at the
same pixel values, so no `@theme inline` entry is required for those three — they aren't a fidelity risk). Adding the
missing `--spacing-tg-12: var(--space-12)` entry is a scoped, one-line Foundational task; this is the exact "token
exists but has no `@theme inline` entry" bug class Principle I documents (previously caused the TMS-62 homepage
fidelity drift), caught here before it caused a visible issue.

**Alternatives considered**: Hardcoding `28px` as an arbitrary Tailwind value (`p-[28px]`) on the benefit cards
instead of fixing the missing `@theme inline` entry was considered and rejected — it would duplicate a value that
already has a canonical token (`--space-12`), violating Principle I's "never hardcode a value that duplicates an
existing token" rule even though the fix is a one-liner either way.

## 2. Job role card — reuse `GlassCard`, or a new bespoke component?

**Decision**: New bespoke, route-local `RoleCard` component (`app/careers/_components/RoleCard.tsx`).

**Rationale**: `GlassCard`'s established shape is icon + title + description (used for benefit/feature grids
site-wide). A role card's data shape — position title, department, location, employment type, an accent-colored
status dot, and an Apply trigger — doesn't fit that shape without stretching `GlassCard`'s API past what it's designed
for (per Principle III, a new component is justified only when no existing convention fits, and this is that case).
`RoleCard` still reuses `Button` (`ghost` variant) for its Apply trigger rather than a hand-rolled button.

**Alternatives considered**: Forcing the role list into `GlassCard` by repurposing its "title" slot for the position
and "description" slot for a concatenated meta string was considered and rejected — it would lose the semantic
per-field structure (department/location/type as distinct badges/icons) the reference gives each role row, and would
make the department-filter logic harder to reason about (filtering would need to parse the description string instead
of matching a discrete field).

## 3. Department filter pills — `Badge`, or a new bespoke component?

**Decision**: New bespoke, route-local `RoleFilters` component, built from plain `<button>`s with token-backed
Tailwind classes — not `Badge`.

**Rationale**: `Badge`'s existing visual contract (10.5px, uppercase, extrabold, fixed tone palette, non-interactive
display element) doesn't match the reference's filter pills (13.5px, normal case, distinct interactive active/inactive
background+border states, keyboard-operable). Reusing `Badge` here would mean overriding most of its default styling
via `className`/inline overrides just to make it look and behave differently — effectively fighting the component
rather than reusing it, which produces worse code than a small dedicated component. `RoleFilters` holds the
`useState<string>("All")` filter value and renders the 5 filters from `careers-data.ts`, keyed by each filter's stable
`value` field (never the display label), per the constitution's "stable identity for repeated content" rule.

**Alternatives considered**: Extending `Badge` with a new interactive/pill variant was considered and rejected —
`Badge` is used elsewhere in the app purely as a non-interactive display element (status/category tags); giving it an
`onClick`/active-state variant would conflate two different component responsibilities (display tag vs. interactive
filter control) inside one primitive.

## 4. Filter behavior — implementation approach

**Decision**: Client component holding `const [filter, setFilter] = useState<string>("All")`, filtering the static
7-role array via `.filter()` at render time — no routing, no server round-trip. Matches the reference's own `filter`
state + `.filter()` logic exactly (reimplemented as plain React per Principle IV, not copied from the `DCLogic`
script block).

**Rationale**: Simplest approach satisfying the spec's "fully functional" filter requirement; filter state and the
role list must live in the same client component (`OpenRolesSection`) since selecting a pill must synchronously
re-render the list.

**Alternatives considered**: URL query-param-driven filtering (`?dept=Engineering`) was considered (would allow
deep-linking) and rejected as out of scope — nothing in spec.md requires deep-linkable filter state.

## 5. Application dialog — Modal primitive design

**Decision**: New `components/ui/Modal.tsx` — the first Modal/Dialog primitive in this codebase (confirmed via
`grep` — no existing Modal/Dialog component anywhere in `components/` or `reusable-components/`). Simple
conditional-render overlay: fixed-position full-screen backdrop (click-to-close) + centered glass panel, styled to
match the existing `.nav-dd` dropdown's glass-panel language (`rgba(13,26,37,0.97)` fill, `blur(16px)`,
`border-white/12`, large drop shadow) rather than inventing a new elevation treatment. Closes on Escape key, backdrop
click, and an explicit close control using the existing `CloseIcon` from `components/ui/icons.tsx`. No portal library
— React's own conditional rendering is sufficient at this scale (one dialog, one route).

**Rationale**: Both the per-role "Apply" flow and the general "Send your resume" flow need identical dialog chrome
and behavior (per spec.md Assumptions, this is one reusable dialog, not two), so a single new shared primitive avoids
duplicating overlay/focus/Escape-handling logic within this same feature (Principle III). Reusing the `.nav-dd`
aesthetic keeps the new primitive visually consistent with the one dark glass-panel-over-content pattern this app
already has, rather than authoring a third distinct elevation style.

**Alternatives considered**: A headless-UI/Radix-style dependency was considered and rejected — this repo has no
existing dialog/portal dependency, and one dialog on one route doesn't justify a new dependency; a hand-rolled
per-call-site overlay (one for Apply, one for "Send resume") was rejected as direct duplication of identical
chrome/behavior.

## 6. Application form fields — `FormField` extension approach

**Decision**: Add an additive `multiline` boolean prop to `components/ui/FormField.tsx` that renders a `<textarea>`
instead of an `<input>` (same `label`/`error`/`useId`/`aria-*` wiring), for the "Tell us why you're a great fit" field.
The dialog composes four existing single-line `FormField`s (first name, last name, email, phone) plus one
`multiline` `FormField`, and two `Button`s (`primary` = Submit, `ghost` = Cancel).

**Rationale**: `FormField` already implements exactly the label/error/accessibility wiring this form's five fields
need; adding one backward-compatible prop (default `false`, so all four existing single-line call sites — the Blog
subscribe form — are untouched) satisfies the requirement with the smallest possible change. The Contact page's
hand-rolled form (`contact-hero-form.tsx`) is explicitly not used as a template per spec.md's Assumptions — it predates
`FormField`/`Button` and doesn't use either, so following it would mean introducing a second, parallel form pattern
instead of the one this spec calls for.

**Alternatives considered**: A separate `TextareaField` component (copy of `FormField` with a swapped element) was
considered and rejected — it would duplicate `FormField`'s label/error/id-wiring logic for one additional element
type, which the additive-prop approach avoids entirely.

## 7. Application submission — data shape for future backend association

**Decision**: The dialog tracks submission state as a single object: `{ mode: "role" | "general", roleSlug: string
| null, roleTitle: string | null, firstName, lastName, email, phone, fitStatement }`, plus a local `status: "idle" |
"submitted"` flag for the client-side success-state transition (per spec.md Assumptions — no backend call exists yet).
`roleSlug` is what a future backend integration would key off of to associate a submission with its role; `roleTitle`
is what the dialog displays in its top-left corner (position name, or "General Application" when `mode === "general"`).

**Rationale**: Directly satisfies the spec's explicit requirement that "the selected position should automatically
populate the application context so backend integration can later associate the submission with the selected role" —
using a stable `slug` (not the display title) as the association key follows the same "stable identity, never display
text" rule already applied to the role/filter list rendering.

**Alternatives considered**: Keying association on the role's array index was considered and rejected — indices
shift if the static role list is ever reordered or extended, whereas a slug is stable identity, consistent with the
constitution's explicit rule against index/text-based keys for repeated content.

## 8. Breakpoint mapping — reference's own breakpoints onto canonical `lg`/`md`/`sm`

**Decision**: No remapping needed — the reference's own breakpoints (1140px nav-collapse, 960px grid/collage
reflow, 560px footer/form stacking) are numerically identical to this project's canonical `lg`/`md`/`sm`, per
spec.md's explicit Assumption.

**Rationale**: Directly stated in spec.md Assumptions; consistent with Constitution Principle II.

**Alternatives considered**: None — this is a documented spec constraint, not an open design choice.

## 9. `LifeGallery` reuse — props-only, or does the grid template also need to change?

**Decision**: Extend `app/_home-components/LifeGallery.tsx` with four new optional props — `heading`, `eyebrow`,
`description`, `images` — each defaulting to today's hardcoded homepage copy/data, so the homepage call site requires
zero changes. The component's grid additionally gains an optional `columns` prop (default `3`, matching today's
`grid-cols-[1.4fr_1fr_1fr]`) and its `SPAN_CLASSES` map gains one additive key, `"wide3"` (`col-span-3`), used only by
the Careers collage's fourth image. Careers passes `columns={4}` and a `span` sequence of
`["tall","wide","default","wide3"]` to reproduce the reference's 4-column collage without forking the component.

**Rationale**: The homepage's collage is a 3-column grid (`tall`/`wide`/`default` spans only), while the Careers
reference's own Life-at-TechGrit collage is a 4-column grid whose fourth image spans 3 columns — a real structural
difference the spec's Assumptions wording (heading/eyebrow/description/images only) doesn't explicitly anticipate.
Making only the content props configurable and leaving the grid hardcoded at 3 columns would either misrender the
Careers collage (wrong column count) or require duplicating the whole component — both worse outcomes than one
additional, backward-compatible `columns` prop and one additive span key, which is a natural extension of the exact
same props-configurability the spec already calls for, not scope creep.

**Alternatives considered**: Forking a second `LifeGallery`-like component for Careers was rejected — it would
duplicate the identical JSX/grid/reveal logic already shipped and tested on the homepage, directly against the
spec's explicit "reuse the existing implementation... code duplication should not happen" instruction. Hardcoding
`columns={4}` unconditionally (removing the default-3 behavior) was rejected — it would change the homepage's
existing rendered output, which is out of scope.
