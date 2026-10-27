# Research: Managed Services Page (TMS-86-managed-services)

## 1. Route & folder structure

**Decision**: `app/what-we-do/managed-services/page.tsx` → `/what-we-do/managed-services`, with `_components/` and `_data/` colocated per Next.js's `_`-prefixed private-folder convention — the exact same shape as `app/what-we-do/ai-modernization/`, `app/what-we-do/software-product-engineering/`, `app/what-we-do/data-ai-engineering/`, and `app/what-we-do/platform-engineering/`.

**Rationale**: The user's request explicitly requires following "the same folder/file architecture, naming patterns, and component organization already established by the sibling 'What We Do' pages." That family already established the `what-we-do` parent segment and the `_components/`/`_data/` shape; there is nothing left to decide here, only to replicate.

**Alternatives considered**: None — the architecture is a direct, explicit requirement, not an open design choice.

## 2. Content/data layer: static module vs. CMS integration

**Decision**: A plain static, typed content array in `_data/managed-services-content.ts` (discriminated by a `type` field per section), rendered by a `switch` in `page.tsx` — no CMS fetch, no `async`/`await` data layer.

**Rationale**: Resolved in spec.md's Assumptions, following the exact precedent the Data & AI Engineering and Platform Engineering tickets each independently confirmed via clarification when they hit this same fork. All four sibling pages shipped this exact way first (`app/construction/`'s pattern) and only later received CMS integration as their own separate, dedicated tickets. Direct inspection of the *current* `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering,platform-engineering}/page.tsx` confirms all four now call an async `get*Data()` CMS fetcher — but this feature's scope is static-only, matching the siblings' original, pre-upgrade shape and FR-008.

**Alternatives considered**: Wiring `getManagedServicesData()` against a new `cms/api/what-we-do/managed-services.ts` module now, matching the siblings' *current* (post-integration) shape — rejected because nothing in this request asks for CMS wiring, a live Strapi page/slug for this content isn't confirmed to exist, and building it now would be scope creep the user did not authorize (Constitution Development Workflow: no speculative work ahead of an actual ticket).

## 3. Component reuse — zero new shared primitives

**Decision**: Every section maps onto an existing, unmodified `components/ui/` primitive:

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero` (`mediaFill`, `media=<MediaSlot fill .../>`, no `mediaCaption`) | Same shape as all four siblings' hero — eyebrow, gradient-highlighted title, subtitle, CTA pair, right-side image card — with no caption row beneath the image, matching the Software Product Engineering / Platform Engineering siblings' caption-less treatment. |
| Intro / "Maintaining software shouldn't crowd out building software." | `ContentBlock` | Same `0.9fr 1.1fr` two-column shape, `chipsLabel` ("What we hear from teams") + 6 `chips`, verified byte-identical structure in the reference against all four siblings' own INTRO sections. |
| Capabilities (6 cards) | `GlassCard` variant `serviceCapability` + `GlassCardTitle`/`GlassCardDescription` | Same numbered-eyebrow + heading + lede + 4-item bullet-list shape every sibling's own capability section already uses this exact variant for — no new variant needed. Heading "Six capabilities. One always-on team." already correctly matches the 6 rendered cards (no numeral-bug correction needed, unlike Data & AI Engineering's original "Five"→"Six" fix). |
| Monitor/Detect/Resolve/Optimize/Evolve (5 stages) | `ProcessSteps` | Directly reusable — same numbered-step shape, same 5-item count. |
| Why choose TechGrit (6 tiles) | Page-local `WhyTile` (icon + heading + description, 2-col grid) | All four siblings' own equivalent "why" sections implement this exact same shape as a page-local component, not a shared primitive — this page follows that same precedent rather than introducing a new shared abstraction for a pattern every sibling itself chose to keep route-local. The reference's own grid is 2 columns on desktop (`grid-template-columns:1fr 1fr`), not 3 — confirmed directly from the reference's `data-why-grid` CSS, not assumed from sibling convention. |
| Applications we support (3 cards, all linked) | `GlassCard` variant `serviceCapability` (icon + title + description, always `<Link>`-wrapped) | Same visual shape every sibling's own Industries-style section already reuses via this variant, but on a 3-column desktop track (see §7) with all 3 cards linked — unlike Platform Engineering's distinct mixed-link 4-card case, this page's reference has no non-linked card. |
| FAQ (5 items) | `Faq` | Directly reusable — native `<details>`/`<summary>`, `defaultOpen` on the first item. |
| Related services (6 cards) | `IconTile` (`size="compact"`) | Directly reusable — same icon-left compact tile shape every sibling's own "Related services" section already uses. |
| Closing CTA | `final-cta` (`FinalCta`) | Directly reusable — same tone/props shape every sibling's `finalCta` section type already consumes. |

**Rationale**: Confirmed by direct inspection of every relevant `components/ui/*.tsx` file during planning (`GlassCard.tsx`, `ContentBlock.tsx`, `Faq.tsx`, `ProcessSteps.tsx`, `IconTile.tsx`, `Hero.tsx`, `final-cta.tsx`, `MediaSlot.tsx`) — not inferred. Principle III requires reusing an existing shared primitive wherever it fits and forbids duplicating one; this reference's section shapes are, section-for-section, the same shapes every sibling prototype already had.

**Alternatives considered**: Introducing a `GlassCard` prop for per-card icon-chip accent color (to support the 3 industry cards' distinct teal/blue/amber treatment, §7) — rejected; `GlassCard`'s own icon slot is unused by the `serviceCapability` variant (confirmed in `GlassCard.tsx`: `serviceCapability: ""` in `ICON_VARIANTS`, "capability cards use a numbered eyebrow label, not an icon box"), so the icon chip for this section is composed page-locally (a `<span>` with an inline style/class per card) exactly the way `data-ai-engineering-industries.tsx`'s own `IndustryTile` already composes its icon chip outside of `GlassCard` itself — no component change needed.

## 4. Icon selection for "why" tiles, industry cards, and related services

**Decision**: All fifteen icon slots this page needs already exist in `components/ui/icons.tsx` (confirmed by direct inspection of the file's full ~70-icon export list) — chosen for closest semantic/visual match to the reference's own inline SVGs; several are byte-identical path matches:

- **"Why choose TechGrit" tiles (6)**:
  | Tile | Icon component | Match |
  |---|---|---|
  | Improve reliability | `CheckCircleIcon` | Byte-identical path (`M22 11.08V12a10 10 0 1 1-5.93-9.14` + `polyline points="22 4 12 14.01 9 11.01"`) |
  | Reduce operational overhead | `SelfHealingIcon` | No dollar-sign glyph exists in `icons.tsx`; `SelfHealingIcon`'s automation/radiating-center motif is the closest existing semantic match for this tile's actual copy ("Automation and AIOps free your team from repetitive on-call and toil") |
  | Accelerate delivery | `EradicateDebtIcon` | Byte-identical path (`<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`) — same icon Platform Engineering's own "Accelerate delivery" why-tile already uses for the identical reference glyph |
  | Lower technical debt | `ShieldIcon` | Byte-identical path (`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`) |
  | Extend engineering | `UsersIcon` | Closest existing match — the reference's glyph is a single-person icon (`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>`), a subset of `UsersIcon`'s two-person path; no single-person icon exists in `icons.tsx` |
  | Enable continuous modernization | `AwardIcon` | Byte-identical path (`M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`) — same icon Platform Engineering's own "AI-augmented ops" why-tile already uses for the identical reference glyph |
- **Applications we support (3 cards)** — all three are byte-identical path matches:
  | Card | Icon component | Match |
  |---|---|---|
  | HealthTech | `HealthcareIcon` | Byte-identical path (`M22 12h-4l-3 9L9 3l-3 9H2`) — not `IndustryHealthcareIcon`, a differently-shaped hospital-building glyph used only by the homepage's own Industries section (v2.2 FR-008) |
  | FinTech | `FinTechBankIcon` | Byte-identical path (`<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/>`, exactly 2 elements) — not `FinTechIcon` (a dollar-sign glyph used by the nav mega-menu) nor `IndustryFinTechIcon` (a 3-element variant with an extra bar, used only by the homepage) |
  | Construction Tech | `ConstructionIcon` | Byte-identical path (`M2 20h20M4 20V8l8-5 8 5v12M9 20v-6h6v6`) — not `IndustryConstructionIcon`, a differently-shaped crane glyph used only by the homepage |
- **Related services (6)** — this page's list (AI-Accelerated Modernization, Software Product Engineering, Data & AI Engineering, Platform Engineering, AI Strategy & Roadmap, Startups — excluding itself) maps entirely onto existing dedicated service icons, no gap:
  | Related service | Icon component |
  |---|---|
  | AI-Accelerated Modernization | `SvcModernizationIcon` |
  | Software Product Engineering | `EradicateDebtIcon` (same precedent both prior siblings' related-services lists already used for this exact gap — no dedicated `SvcProductIcon` exists) |
  | Data & AI Engineering | `SvcDataAiIcon` |
  | Platform Engineering | `SvcPlatformIcon` |
  | AI Strategy & Roadmap | `SvcStrategyIcon` |
  | Startups | `SvcStartupsIcon` |

**Rationale**: `icons.tsx` already covers all fifteen icon slots this page needs (6 why + 3 industry + 6 related) with either an exact or closest-available semantic match, confirmed by direct inspection of the file's full icon list — not assumed. Principle III forbids adding a duplicate/new icon to a per-route file when `components/ui/icons.tsx` already has a fitting one; this ticket does not require literal SVG-path-for-path fidelity, only equivalent iconography (spec.md FR-006 governs typography/color/spacing/dimensions, not exact vector path data), matching the exact bar every sibling page's own icon decisions were held to (confirmed in `specs/TMS-86-platform-engineering/research.md` §4, which accepted the same kind of closest-semantic-match substitution for its own two gaps). `EradicateDebtIcon` is deliberately reused twice on this one page (once for "Accelerate delivery," once for "Software Product Engineering") and `AwardIcon` reused across sibling pages for different concepts — both are genuinely separate semantic contexts and no functional requirement forbids reusing one icon in multiple places.

**Alternatives considered**: Adding new dedicated icons for the literal dollar-sign ("Reduce operational overhead") and single-person ("Extend engineering") glyphs to hit exact path fidelity — rejected; `icons.tsx` already has close-enough semantic equivalents and Principle III's bar for this pattern (confirmed above) has consistently been "equivalent iconography," not exact-path matching, across every sibling page's own icon decisions.

## 5. Per-industry icon-chip accent color (Applications we support)

**Decision**: Reuse existing color tokens for each of the 3 industry cards' icon-chip background/foreground, matching the reference's own per-industry tint and the site's existing header-nav Industries-dropdown color convention for these same three industries:

| Industry | Foreground | Background |
|---|---|---|
| HealthTech | `--color-teal-light` (`#2dd4bf`) | `--color-icon-bg-teal` (`rgba(15,118,110,0.20)` — reference wants `0.18`; existing token accepted as a small, already-precedented delta) |
| FinTech | `--color-blue-light` (`#38bdf8`) | `--color-icon-bg-blue` (`rgba(2,132,199,0.16)` — reference wants `0.14`; same small-delta acceptance) |
| Construction Tech | `--color-yellow` (`#FBBF24`) | `--color-overlay-amber-12` (`rgba(245,158,11,0.12)` — reference wants `0.14`; same small-delta acceptance) |

**Rationale**: All three foreground colors are exact, pre-existing token matches. The three background tints are each within a 2-percentage-point opacity delta of the reference's literal value — the same order of magnitude as the already-accepted delta this codebase's own `--gradient-webinar-released-orange` token comment documents ("replaces the borrowed `--gradient-blog-featured` (0.20, a 2% delta)"). No new token is needed for this section (contrast with §6, where the delta is large enough on two dimensions at once to warrant one).

**Alternatives considered**: Adding three new precisely-matched overlay tokens (`0.18`/`0.14`/`0.14`) instead of reusing the closest existing ones — rejected as unnecessary token duplication for a 2-point opacity difference on a small icon-chip background, inconsistent with the instruction to avoid adding a token when an existing one is close enough.

## 6. Ambient-orb color mismatch (hero background decoration)

**Decision**: Add one new token, `--color-overlay-violet-10: rgba(124, 58, 237, 0.10)`, to `tokens.css`'s existing overlay section, **plus its required mirror entry, `--color-overlay-violet-10: var(--color-overlay-violet-10);`, in `globals.css`'s `@theme inline` block** (alongside the existing `--color-overlay-violet-14`/`--color-overlay-red-14` mirrors at `globals.css:438,440`), and one new pathname branch in `components/ui/ambient-orbs.tsx` for `pathname === "/what-we-do/managed-services"`, reusing this page's exact orb geometry (position/size/blur/timing) from the reference but with this new violet token (consumed via a `bg-overlay-violet-10` Tailwind utility class, matching the branch's existing `bg-overlay-orange-18`-style usage) in place of the shared `/what-we-do/` branch's blue second orb.

**Rationale**: `components/ui/ambient-orbs.tsx`'s existing `/what-we-do/` branch was built exact-to-AI-Modernization's own reference file (per its own comment) and reused for all four sibling routes. Direct inspection of `TechGrit Managed Services.dc.html` lines 141-146 shows this page's own reference uses a *violet* second orb (`rgba(124,58,237,0.10)`), not blue — a literal, confirmed mismatch, not a stylistic judgment call. The closest existing token, `--color-overlay-violet-14` (`rgba(147,51,234,0.14)`), differs in both hue (147,51,234 vs. 124,58,237) and opacity (0.14 vs. 0.10) enough that it would visibly diverge from the reference, unlike the single-dimension few-percent deltas already accepted elsewhere (§5) — this crosses the line into "the reference genuinely requires a value that doesn't already exist" (Principle I). The `globals.css` mirror is required, not optional: Principle I states any `tokens.css` color value Tailwind can represent as a utility "MUST have a matching entry" in `@theme inline`, and calls a token missing that mirror "exactly as wrong as hardcoding the wrong value directly" — confirmed by inspecting every existing `--color-overlay-*` entry in `tokens.css`, each of which has a corresponding mirror line in `globals.css`.

**Alternatives considered**:
- Reusing `--color-overlay-violet-14` as-is — rejected per the above; two-dimensional mismatch, not a small delta.
- Reusing the shared `/what-we-do/` branch unmodified (blue second orb) and treating the violet-vs-blue difference as out of this ticket's scope — rejected because the request's explicit "no visible difference when switching between the two UIs" bar covers background decoration too, and the fix is a single new token plus a single new pathname branch, not a redesign.
- Editing the existing `/what-we-do/` branch in place to change its color for all five pages — rejected: that would silently change the four already-shipped sibling pages' own backgrounds (all still exact-matched to blue per their own references, confirmed by their own `plan.md`/`research.md` where written), which is an unrelated-page change this ticket must not make (spec.md FR-009).

## 7. "Applications we support" 3-card, 3-column grid

**Decision**: Render exactly 3 linked industry cards (HealthTech, FinTech, Construction Tech) on a 3-column desktop track using `GlassCard` variant `serviceCapability`, always `<Link>`-wrapped (no optional-`href`/mixed-link data shape needed, unlike Platform Engineering's distinct 4-card case).

**Rationale**: The reference's own grid CSS declares `grid-template-columns:repeat(4,1fr)` (line 350) but only 3 `<a class="cap-card">` children exist in that grid — confirmed by reading the full section markup, not inferred. Rendered literally this would leave one empty trailing column on desktop; every other sibling "Industries" section for this exact same 3-industry set (Healthcare, FinTech, Construction) already renders as 3 columns. Treated as a template artifact (most likely copy-pasted from the Capabilities section immediately above it in the same reference file, which does have exactly 4/3/1-column breakpoints via the same `data-cap-grid` attribute name) rather than an intentional fourth column, per spec.md Assumptions.

**Alternatives considered**: Rendering a literal 4-column grid with one visually empty trailing slot on desktop — rejected; this would be a visible, confirmable layout defect with no reference content to justify it, and every sibling's own equivalent section for this identical 3-industry content already resolves to 3 columns.

## 8. Nav/footer repointing (FR-010)

**Decision**: Two one-line edits:
- `cms/api/footer.ts`: the `slug: "svc-managed"` entry's `href` from `/services#svc-managed` to `/what-we-do/managed-services`.
- `cms/api/header.ts`'s `toMegaGroup()`: extend the existing four-service ternary chain (`"AI-Accelerated Modernization" ? ... : "Software Product Engineering" ? ... : "Data and AI Engineering" ? ... : "Platform Engineering" ? ... : section.ctaLink`) to also match `"Managed Services"` → `/what-we-do/managed-services`.

**Rationale**: Confirmed by direct inspection of both files during planning. `cms/api/header.ts`'s `toMegaGroup()` already special-cases exactly four services by title string to override their stale CMS-supplied links; this is the established, extend-in-place precedent, not a new pattern.

**Alternatives considered**: Generalizing the ternary chain into a lookup map instead of a fifth `||` condition — a reasonable implementation-time micro-decision left to `/speckit.tasks`/`/speckit.implement`, not load-bearing enough to gate here; either shape satisfies FR-010 identically.

## 9. Testing approach

**Decision**: No automated tests — manual verification via `quickstart.md`, matching this repo's project-wide convention (no test framework configured anywhere).

**Rationale**: Constitution, Development Workflow: "No test framework is configured anywhere in the repo today... do not silently invent a coverage target." `npm run lint` and `npm run build` (already gated by Husky's pre-commit hook) remain the enforced automated gates.

**Alternatives considered**: None — introducing a test framework for one feature would be an unrelated, unauthorized project-wide change.
