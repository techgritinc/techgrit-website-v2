# Data Model: Consumer Lending Industries Page

Source of truth: live CMS response at `/api/pages/by-slug/consumer-lending`. Field names below are
the CMS's actual returned field names; "→" shows the presentation-shape field it maps to, following
the same naming conventions already used by `data-ai-engineering.ts`/`ai-modernization.ts`.

## HeroSection (`page-reusable-sections.hero`)

| CMS field | → | Notes |
|---|---|---|
| `badgeLabel` | `eyebrow` | "Consumer Lending" |
| `title` | `title` | |
| `highlightTitle` | `titleHighlight` | only applied if it's a substring of `title` (shared helper's existing rule) |
| `subtitle` | `subtitle` | |
| `primaryBtnLabel`/`primaryBtnLink` | `primaryCtaLabel`/`primaryCtaLink` | link is `null` in current data — known, pre-existing CMS data-quality gap, not fixed by this feature |
| `secondaryBtnLabel`/`secondaryBtnLink` | `secondaryCtaLabel`/`secondaryCtaLink` | same null-link caveat |
| `backgroundImage[0]` | `image` | |

## MetricsSection (`page-reusable-sections.statistics`)

| CMS field | → |
|---|---|
| `statistics[].title` | `value` |
| `statistics[].subtitle` | `label` |

4 entries: founding year, projects delivered, systems integrated, lifecycle stages.

## IntroSection — "Why lenders call us" (`page-reusable-sections.modernization-challenges`)

| CMS field | → | Notes |
|---|---|---|
| `eyebrow` | `eyebrow` | populated directly (unlike the AI-Modernization page's occurrence of this component, which needs `title→eyebrow` reinterpretation) |
| `title` | `title` | |
| `subtitle` | `description` | |
| `blockers.features[].title` | `blockers[].label` | "01".."06" |
| `blockers.features[].subtitle` | `blockers[].description` | the paragraph — unlike `data-ai-engineering.ts`'s `toBlockers`, which discards `subtitle`, this page's reference content needs both title+subtitle rendered per point |
| `extraTitle` | *(unused)* | generic leftover CMS text not present in the reference content; intentionally not rendered |

## DomainDepthSection (`industries-construction.pd-lending-lifecycle`) — NEW mapper

| CMS field | → |
|---|---|
| `badgeLabel` | `eyebrow` |
| `title` | `title` |
| `subtitle` | `description` |
| `tabItems[].label`/`.value`/`.isDefault` | tab list — `value` used as the stable key/id (Constitution's stable-identity rule), `isDefault` selects initial active tab |
| `controlTabs[].tabValue` | joins to `tabItems[].value` |
| `controlTabs[].title` | stage title (left column) |
| `controlTabs[].subtitle` | stage description (left column) |
| `controlTabs[].features[].title` | right-column capsule point text (no `subtitle` used per point — reference has single-line items here) |

**State**: client-side only, one `activeTab` state value defaulting to the `tabItems[].value` where
`isDefault === true` (falls back to the first item if none is flagged). No URL/query-param sync
required by the spec.

## CapabilitiesSection (`page-reusable-sections.pd-modernization-capabilities`) — used 3×

Same `__component`, three distinct presentational roles distinguished by `badgeLabel`:

| Usage | `badgeLabel` | `capabilityCard[].features` | `capabilityCard[].structureInfo` |
|---|---|---|---|
| The ecosystem | "The ecosystem" | populated (system chips) | absent/null |
| Our work | "Our work" | empty `[]` | populated — `.label` (bold metric heading, e.g. "3 in 1") + `.description` (supporting text) |
| Operating context | "Operating context" | populated (regulation/metric chips) | absent/null |

Common mapping (extends the existing `Capability` shape from `data-ai-engineering.ts`):

| CMS field | → |
|---|---|
| `capabilityCard[].categoryLabel` | `stepLabel` (eyebrow) |
| `capabilityCard[].title` | `title` |
| `capabilityCard[].subtitle` | `lede` (description) |
| `capabilityCard[].features[].title` | `bullets[].text` |
| `capabilityCard[].structureInfo.description` | `note` (existing field) |
| `capabilityCard[].structureInfo.label` | `metricLabel` (**NEW field** — only "Our work" populates this; renders as a bold heading, precedent: `outcomeLabel` in `orbit-ai-ecosystem.ts`/`engagement-models.ts`) |

## ServiceDetailSection (`page-reusable-sections.service-detail`) — used 4×, disambiguated by `variant`

| `variant` | Section | Shape |
|---|---|---|
| `PD-modernizationLifecycle` | Applied AI | `approachSteps[]` → 2-col cards: `stepLabel` (status), `title`, `subtitle` (description) |
| `PD-strategiesWeSupport` | Institutional platforms | `approachSteps[]` (5 items: 2 + 3) → row-1 2 cards, row-2 3 cards; section-level `extraTitle` → the extra plain-text card |
| `PD-whyAI-assistedModernization` | Quote | `approachSteps.length === 0` → outcome/quote shape: `title` → citation, `subtitle` → quote text (same role-swap as `data-ai-engineering.ts`'s `toOutcomeSection` branch) |
| `PD-IndustriesWeModernize` | How we work | `approachSteps[]` → 3 cards: `stepLabel` (eyebrow), `title`, `subtitle` (description), no bullets |

## FaqSection (`page-reusable-sections.pd-faq`)

| CMS field | → | Notes |
|---|---|---|
| `title` | `eyebrow` | role-swap — same as `ai-modernization.ts`/`data-ai-engineering.ts`'s `toFaqSection` |
| `subtitle` | `title` | the actual on-page heading |
| `questions[].question`/`.answer` | `items[].question`/`.answer` | first item defaults open |

## FinalCtaSection (`page-reusable-sections.cta-banner`)

| CMS field | → | Notes |
|---|---|---|
| `title`/`subtitle` | `title`/`description` | |
| `primaryCtaLabel`/`primaryCtaLink` | `primaryCtaLabel`/`primaryCtaLink` | present in live data ("Talk to us" → `/contact-us/`) |
| `secondaryCtaLabel`/`secondaryCtaLink` | `secondaryCtaLabel`/`secondaryCtaLink` | **both null in live data** — per Clarifications, always falls back to `"Request an estimate"` / `/request-for-estimate/` rather than being conditionally omitted |

## Excluded sections

`Engagement models` and `Who is accountable` do not appear in the live CMS response at all — no
mapper needed, `toSection`'s `default: return null` (or simply their absence from the response)
handles this without special-casing.
