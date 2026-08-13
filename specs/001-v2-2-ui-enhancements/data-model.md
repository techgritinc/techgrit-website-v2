# Data Model: Careers Apply Modal (User Story 8)

**Companion to**: [plan.md](./plan.md), "Careers Apply-Modal Field Alignment (User Story 8 —
FR-037a/FR-037b)" | **Spec**: [spec.md](./spec.md), User Story 8, FR-037a, FR-037b

**Scope note**: presentation-only. This models the Apply modal's in-memory form state inside
`app/careers/_components/application-dialog.tsx` — there is no backend, database, or API; nothing
here is persisted beyond the current page session (spec.md Clarifications, Session 2026-08-05: the
success confirmation is a client-side-only state transition). No other data shape in this feature
(Home, Services, Industries, Insights, About, Contact) is covered here — this file is scoped to
User Story 8's Apply modal only, per the rest of `plan.md`'s repeated "no `data-model.md`" note for
every other slice.

## Entity: `ApplicationFormValues` (client-side form state)

| Field | Type | Required | Notes |
|---|---|---|---|
| `fullName` | `string` | Yes | Single field — replaces today's split `firstName`/`lastName`, matching the reference's one `applyName` field. |
| `email` | `string` | Yes | Validated against the existing `EMAIL_PATTERN` regex (unchanged). |
| `linkedInOrPortfolioUrl` | `string` | No | New, optional. Rendered as `type="url"`, matching the reference's `applyLink`. |
| `resumeFile` | `File \| null` | Yes | New. Must be `.pdf`/`.doc`/`.docx` (`accept` attribute); rejected immediately on selection if larger than 5MB (FR-037b) — see Validation rules below. |
| `message` | `string` | No | Optional "Why TechGrit?" field — replaces today's required `fitStatement`; not validated. |

**Dropped**: `phone` — no equivalent in `TechGrit Careers.dc.html`'s Apply form; removed rather than
kept as a silently-ignored field.

## Entity: `ApplicationContext` (pre-existing, unchanged by this addendum)

| Field | Type | Notes |
|---|---|---|
| `mode` | `"role" \| "general"` | Which entry point opened the modal — a role card's Apply button, or `CareersCta`'s "Send your resume". |
| `roleSlug` | `string \| null` | The triggering role's slug (`null` for `general`). |
| `roleTitle` | `string \| null` | The triggering role's title, shown in the modal header (`null` renders "General Application"). |

No fields change here — `ApplicationContext` already carries everything FR-037a's "role title MUST
appear in the modal header" requirement needs.

## Validation rules

1. **On file selection** (`resumeFile` field): if the selected file's size exceeds 5MB, immediately
   set a specific over-size error message and clear the selection (`resumeFile` stays `null`) —
   checked at selection time, not deferred to submit (FR-037b).
2. **On submit**: `fullName`, `email`, and `resumeFile` must all be present; a missing required field
   sets a validation error and keeps the modal open (FR-037a). `linkedInOrPortfolioUrl` and `message`
   are never validated as required.
3. **On submit**: `email` must match the existing `EMAIL_PATTERN` regex (unchanged from today's
   behavior).
4. **On successful submit**: no network/backend call is made — the only side effect is the local
   state transition to the success view (FR-037a; consistent with the Contact form's existing
   client-side-only behavior, FR-040).

## State transitions

```
idle (all fields empty, no error)
  → editing (any field change / file selection)
      → validation error (missing required field, invalid email, or oversized file) → stays editing
      → submitted (all required fields valid) → success confirmation, no persistence
  → closed
      → reopened (same role, a different role, or the general entry point) → resets to idle
        (every field and any prior error clears — FR-037b; already implemented via
        `application-dialog.tsx`'s existing `prevIsOpen` reset effect, no change needed there)
```

## Relationships

`ApplicationFormValues` is scoped 1:1 to a single open/close lifecycle of the modal — it is never
persisted, never keyed to a backend record, and carries no relationship to `OpenRole` beyond the
display label (`roleTitle`) already captured on `ApplicationContext` at open time. `OpenRole` itself
(`app/careers/_data/careers-data.ts`) is unchanged by this addendum.

---

## Entity: `LifeGalleryImage` (extended — FR-038)

**Companion to**: [plan.md](./plan.md), "Careers Page — Full User Story 8 Coverage" addendum |
**Spec**: [spec.md](./spec.md), User Story 8, FR-038

**Scope note**: presentation-only, same as above — static configuration consumed by
`app/_home-components/LifeGallery.tsx`, not persisted, not fetched. Shared by two variants (`home`,
`careers`); only the `careers` variant's data populates the two new fields below.

| Field | Type | Required | Notes |
|---|---|---|---|
| `src` | `string` | Yes | Unchanged. |
| `alt` | `string` | Yes | Unchanged. |
| `span` | `"tall" \| "wide" \| "default" \| "wide3"` | Yes | Unchanged as a type; every `careers`-variant image's *value* changes to `"default"` (FR-038 — the reference's 4 Careers tiles are equal-size, unlike `home`'s asymmetric layout, which keeps its own existing span values). |
| `captionLabel` | `string` | No — new | Only populated for `careers`-variant images (e.g. "The team", "The office", "Craft", "Together"); `home`'s images leave this `undefined`. |
| `caption` | `string` | No — new | The hover-reveal `<figcaption>` text paired with `captionLabel` (e.g. "Builders and designers behind the engineering."); `home`'s images leave this `undefined`. |

**Validation rule**: `LifeGallery.tsx` only renders the caption-overlay markup when
`variant === "careers"` **and** the image has both `captionLabel` and `caption` set — this keeps the
`home` variant's rendering byte-identical to today (its images never set these two fields).

## Entity: `LifeAtTechGritContent` (unchanged shape, corrected values — FR-038)

| Field | Type | Notes |
|---|---|---|
| `heading` | `string` | Value corrected from `"Life at TechGrit"` to `"Life at TechGrit."` (reference's trailing period). |
| `description` | `string` | Value corrected from the current placeholder copy to the reference's "The people and the culture behind the engineering." |
| `images` | `LifeGalleryImage[]` | Same 4 entries; each gains `captionLabel`/`caption`, and `span` becomes `"default"` for all four (see above). |

No relationship changes — `LifeAtTechGritContent` still belongs 1:1 to `CareersPageContent`
(`app/careers/_data/careers-data.ts`), unaffected by this addendum's field additions.
