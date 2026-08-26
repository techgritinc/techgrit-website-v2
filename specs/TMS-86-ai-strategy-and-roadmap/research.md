# Phase 0 Research: AI Strategy & Roadmap Page (What We Do)

All unknowns from the Technical Context were resolved by direct inspection of the reference
prototype (`raw-files-v3/TechGrit Website V2.3/TechGrit AI Strategy.dc.html`), the five already-built
"What We Do" sibling pages, and the shared `components/ui/` primitives they established. No
`NEEDS CLARIFICATION` markers remain.

## 1. Zero new shared `components/ui/` primitives needed

Every section this page needs already has a matching, unmodified `components/ui/` component,
confirmed by reading each one's current implementation:

| Reference section | Existing component | Confirmed fit |
|---|---|---|
| Hero (crumbs, eyebrow, gradient headline, subtitle, CTA pair, right-side media card) | `Hero` | `media`/`mediaCaption`/`mediaFill` slots exist exactly for the image-replacement treatment (Clarifications); no prop changes needed. |
| "Achieve your business goals..." intro + "When teams need us" chips | `ContentBlock` | Two-column eyebrow/title/description + chips-label/chip-list shape matches verbatim; `chips`/`chipsLabel` are already optional (no change needed — this page always populates them). |
| Capability cards (4×, numbered label + title + lede + bullet list, no icon) | `GlassCard` (`serviceCapability` variant) | `GlassCardTitle`/`GlassCardDescription` `serviceCapability` variant styles (19px bold title, 14.5px muted description) match the reference's `.cap-card h3`/`.cap-lede` values exactly; `ICON_VARIANTS.serviceCapability` is intentionally empty (no icon box) — the reference's capability cards have no icon, confirming this variant already fits with zero icon slot needed. Bullet list (dot-marker `<li>`) is composed page-locally, matching every sibling capability component's own pattern (`ai-modernization-capabilities.tsx` etc.). |
| Engagement flow (5 stages: Diagnose, Roadmap, Execute, Measure, Coach) | `ProcessSteps` | `columns` prop defaults to `5`, exactly this page's stage count — no override needed (unlike Discovery Sprints, which needed `columns={4}`). |
| "Founders. Boards. Scaling technology orgs." cards (4×, all non-linked) | `GlassCard` (`serviceCapability` variant) + page-local conditional `<Link>` wrap | Same pattern Platform Engineering's own "Platforms for every stage of growth" section already established (`IndustryTile` conditionally wraps in `<Link>` only when `href` is present) — reused here with all four `href`s absent, matching this page's reference (all four cards are non-interactive `<div>`s, not `<a>`s). |
| FAQ accordion (5 items, first expanded by default) | `Faq` | Native `<details>`/`<summary>`, independent per-item state, `defaultOpen` prop — matches exactly. |
| Related services (6×, linked, compact icon tiles) | `IconTile` (`size="compact"`) | Matches every sibling's related-services grid exactly. |
| Closing CTA band | `final-cta` (`FinalCta`) | Matches every sibling's closing CTA band exactly. |

The "Why leaders choose TechGrit" tiles (6×) and the "Founders. Boards. Scaling technology orgs."
cards are implemented as page-local compositions rather than the shared `IconTile`/`GlassCard`
primitives being extended — matching the exact precedent every sibling page already set for its
own equivalent "why" section (a page-local `WhyTile` function, not `IconTile`, because the
reference's `.why-tile .why-ico` icon chip has no border while `IconTile`'s icon chip always
renders one — a real, confirmed visual difference, not a stylistic preference).

**Decision**: Build zero new shared primitives. This page's own work is page-local composition
under `app/what-we-do/ai-strategy-roadmap/_components/` supplying this page's content to the
existing primitives above.

## 2. Content shape: static, matching the sibling pages' pre-CMS-upgrade shape

Per Clarifications (2026-08-26), this ticket targets static content only. Confirmed by reading
`specs/TMS-86-platform-engineering/data-model.md` (the most recent sibling spec's own static-phase
design) that the established static shape is:
- A page-local `_data/types.ts` defining a discriminated-union `Section` type (`type: "hero" | "intro" | "capabilities" | ...`) plus per-entity interfaces.
- A page-local `_data/ai-strategy-roadmap-content.ts` static content constant: `{ seo, sections: Section[] }`.
- Icon references stored as a string `iconKey` (e.g. `"boardGrade" | "delivery" | ...`), resolved to
  a `components/ui/icons.tsx` React icon component via a local `Record<IconKey, IconComponent>`
  lookup inside each page-local section component — the exact pattern already used by
  `ai-modernization-related.tsx`'s `RELATED_ICON` map (confirmed by direct read) and by the
  pre-CMS-upgrade `platform-engineering/data-model.md`'s `IndustryIconKey` shape — never a CMS
  media-URL/`next/image` reference (that only appears in the sibling pages' current, later,
  CMS-integrated versions, which this ticket does not target).
- `page.tsx` renders synchronously (no `async`, no `notFound()`, no CMS fetch) via a `switch` over
  `content.sections`, mirroring `app/construction/page.tsx`'s existing static shape.

**Decision**: Adopt this exact static shape. **Rationale**: it's the confirmed, already-used
pattern for every "What We Do" sibling's own initial build, and keeps this page trivially
upgradable to CMS later (per FR-008) without a structural rewrite — only the data-fetching layer
changes, not the section components' prop shapes.

## 3. Icon reuse audit (16 slots)

Read the complete `components/ui/icons.tsx` (950 lines) and `components/ui/GlassCard.tsx` to check
every icon this page needs against what already exists, per Constitution Principle III (reuse
before duplicating):

| Section | Need | Resolution |
|---|---|---|
| Capabilities (4 cards) | — | **No icon needed.** Confirmed: `GlassCard`'s `serviceCapability` variant renders no icon box (`ICON_VARIANTS.serviceCapability` is `""`), matching the reference's icon-less capability cards exactly. |
| Why tiles | Board-grade thinking (star) | `AwardIcon` — exact path match. |
| Why tiles | Delivery on the same team (check-in-circle) | `CheckCircleIcon` — exact path match. |
| Why tiles | AI-native leadership (axis + trend line) | `SvcStrategyIcon` — exact path match (this page's own nav icon; apt reuse). |
| Why tiles | Fractional flexibility (single-person silhouette) | **No exact match** — see below. |
| Why tiles | Independent & honest (shield) | `ShieldIcon` — exact path match. |
| Why tiles | Cost-conscious (dollar sign) | `FinTechIcon` — exact path match (shape-only reuse, unrelated original name — same pattern as `EradicateDebtIcon` being reused for "Software Product Engineering" on every sibling's related-services grid). |
| Advisory-segment cards | Startup Founders (rocket) | `SvcStartupsIcon` — exact path match. |
| Advisory-segment cards | Scale-ups (single-person silhouette) | Same gap as "Fractional flexibility" above — see below. |
| Advisory-segment cards | PE / VC Portfolio (3 horizontal lines) | `HamburgerIcon` — near-match (see below). |
| Advisory-segment cards | Enterprise Programs (building, no door) | `ConstructionIcon` — near-match (see below). |
| Related services (6×) | AI-Accelerated Modernization, Software Product Engineering, Data & AI Engineering, Platform Engineering, Managed Services, Startups | `SvcModernizationIcon`, `EradicateDebtIcon`, `SvcDataAiIcon`, `SvcPlatformIcon`, `SvcManagedIcon`, `SvcStartupsIcon` — all six exact path matches, confirmed already reused this exact way by `ai-modernization-related.tsx`'s `RELATED_ICON` map. |

**Decision — single-person silhouette (new icon)**: No icon in `icons.tsx` renders only a single
person; the only person-shaped icon is `UsersIcon` (two people — a distinct, larger path that
includes a second body arc + head circle the reference's single-person icon does not have). Since
this page needs a single-person icon **twice** (Fractional flexibility, Scale-ups) and nothing
close exists, add one new `UserIcon` (singular) to `components/ui/icons.tsx`, using the reference's
exact path (`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>` —
literally the first half of `UsersIcon`'s own path data). This satisfies the "genuinely reusable,
not unnecessarily specific to a single section" bar (used twice on this page, and is a generically
useful primitive any future single-person need can reuse) rather than justifying a one-off.

**Decision — PE/VC Portfolio and Enterprise Programs (reuse, no new icon)**: `HamburgerIcon` (3
lines) and `ConstructionIcon` (building) differ from the reference by a few pixels of line inset
and one extra door sub-path, respectively — both differences are imperceptible at the 20px icon
size rendered inside a 40px tinted chip. Per the project's own established precedent (e.g.
`EradicateDebtIcon` reused for a semantically unrelated "Software Product Engineering" link on
every sibling page, `ind-healthcare.png` reused for Managed Services' hero despite being
"thematically-unrelated" per that spec's own Clarifications), a near-exact existing icon is reused
over introducing a near-duplicate one-off icon whose only difference from an existing icon is a
sub-pixel geometry tweak. **Rationale**: Constitution Principle III's core rule is "if an existing
shared primitive already covers it, reuse it — a new one-off is only justified when nothing
existing actually fits," and both of these are close enough that a new icon would itself violate
"avoid duplicate ... implementations" more than the minor visual delta would violate pixel fidelity.

## 4. Ambient orbs: new pathname branch, zero new tokens

Compared the reference's four ambient-orb `<div>`s (lines 141–146 of the reference) against
`components/ui/ambient-orbs.tsx`'s existing branches and `tokens.css`'s existing overlay tokens:

| Reference orb | Color (exact rgba) | Existing token match | Geometry (px) | Existing utility-class match |
|---|---|---|---|---|
| 1 (top-right) | `rgba(232,119,34,0.16)` | `--color-overlay-orange` (exact) | `top:-180,right:-140, 620×620`, blur 130, 16s | `-top-45 -right-35 h-155 w-155` (155×4=620, 45×4=180, 35×4=140 — exact) |
| 2 (mid-left) | `rgba(245,158,11,0.12)` | `--color-overlay-amber-12` (exact) | `top:35%,left:-220, 560×560`, blur 140, 20s reverse | `top-[35%] -left-55 h-140 w-140` (140×4=560, 55×4=220 — exact) |
| 3 (mid-right) | `rgba(232,119,34,0.10)` | `--color-overlay-orange-10` (exact) | `top:60%,right:-160, 520×520`, blur 140, 24s reverse | `top-[60%] -right-40 h-130 w-130` (130×4=520, 40×4=160 — exact) |
| 4 (bottom-center) | `rgba(232,119,34,0.11)` | `--color-overlay-orange-11` (exact) | `bottom:-200,left:38%, 660×660`, blur 150, 22s | `-bottom-50 left-[38%] h-165 w-165` (165×4=660, 50×4=200 — exact) |

All four exact rgba values already exist as named tokens (Tailwind's default spacing scale is
4px/unit, confirmed by cross-checking every existing orb branch's `h-155`/`h-140`/`h-130`/`h-165`
classes against their sibling reference files' own literal pixel values, which all resolve
exactly). The geometry (position + size) is byte-identical to the shared `/what-we-do/`,
`/how-we-work/`, and `careers/about/services` branches' own geometry — only the four colors differ
from every existing branch's specific combination (none of the existing branches happen to use
this exact orange/amber-12/orange-10/orange-11 combination; the closest, the "home" branch, uses
orange-18/amber-light-10/orange-11/orange-13 instead).

**Decision**: Add one new pathname branch — `if (pathname === "/what-we-do/ai-strategy-roadmap/")`
— reusing the same geometry classes as the shared `/what-we-do/`/`/how-we-work/` branches with
`bg-overlay-orange` / `bg-overlay-amber-12` / `bg-overlay-orange-10` / `bg-overlay-orange-11`.
Checked *before* the generic `/what-we-do/` branch (same precedent as the existing
`/what-we-do/managed-services/` branch), so it matches first for this one route. **Zero new
tokens needed** — a simpler outcome than Managed Services' own ambient-orb decision, which
required one genuinely new token (`--color-overlay-violet-10`) because that reference's second
orb had no existing color match at all.

## 5. Hero card image asset

Per Clarifications (2026-08-26, Q2) and spec.md Assumptions, `public/samples/dm-scalability.png`
is used, rendered through `Hero`'s `mediaFill` + `MediaSlot`'s `fill`/`object-cover` path — the
same treatment every image-replaced sibling hero already uses, with no `mediaCaption` (matching
the Software Product Engineering / Platform Engineering siblings' caption-less treatment, since
this page's reference caption references three trademarked framework names that read as
out-of-place marketing copy detached from a now-generic scalability image).

## 6. Navigation-config repoint (FR-010)

Confirmed by reading `cms/api/footer.ts` and `cms/api/header.ts`:
- `cms/api/footer.ts` line 46 already has the "AI Strategy & Roadmap" entry (`slug: "svc-strategy"`, `href: "/services#svc-strategy"`) — needs its `href` updated to `/what-we-do/ai-strategy-roadmap`.
- `cms/api/header.ts`'s `toMegaGroup` already special-cases five sibling titles ("AI-Accelerated Modernization" → `/what-we-do/ai-modernization`, ... → "Managed Services" → `/what-we-do/managed-services`) in a chained ternary. This gets a sixth `: section.title === "AI Strategy & Roadmap" ? "/what-we-do/ai-strategy-roadmap"` clause, following the exact existing pattern.

## 7. Testing approach

No test framework exists in this repo (Constitution, Development Workflow). Verification is
manual: `npm run lint` + `npm run build` (Husky pre-commit gate) for static correctness, and
side-by-side visual comparison against the reference at desktop/laptop/tablet/mobile widths per
`quickstart.md`.
