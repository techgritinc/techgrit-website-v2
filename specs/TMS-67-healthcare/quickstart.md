# Quickstart: Healthcare Industry Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/industries/healthcare`. Requires `CMS_API_URL` pointed at a Strapi
instance that serves `GET /api/pages/by-slug/healthcare` — if unreachable, `fetchCms` returns
`null` and the page 404s, same as Construction.

## Verify against the spec (manual — no test framework configured, see research.md §8)

Walk through each acceptance scenario from `spec.md` directly in the browser:

1. **Hero**: eyebrow "Industry · HealthTech", headline with "HealthTech Companies" highlighted,
   description, exactly one CTA ("Talk to Our Engineering Team"), fixed-size picture on the right
   (no stat chips, no breadcrumb). Resize the window and confirm the picture area's dimensions
   don't change.
2. **What We Build**: 8 icon+title+description cards in the Construction-challenges grid pattern.
3. **AI Across the Healthcare Product Lifecycle**: 6 cards, each showing step label `1`–`6`
   (not an icon), title, description, in a 3-column grid at desktop width.
4. **Our HealthTech Engineering Services**: 7 cards (no numbered step label); each shows the
   icon the CMS supplies for that step, and renders with no icon slot for any step the CMS
   leaves without one (no substitute icon is invented).
5. **HealthTech Solutions We Support**: eyebrow/title/subtitle, then all 17 plain-title tiles.
   Resize the window and confirm: 3 columns ≥ `md` (960px), 2 columns between `sm` (560px) and
   `md`, 1 column below `sm`.
6. **Featured Capabilities**: 2 cards with title + description only (no metric number, no "Read
   case study" link).
7. **Connected Healthcare Systems That Work Together**: one card containing 7 bullets (Electronic
   Health Records, Healthcare Standards, Practice Management & Revenue Cycle, Identity & Security,
   Cloud Platforms, Communication, Analytics), each bullet's feature titles rendered beneath it.
8. **Closing CTA**: same visual treatment as Construction's, heading "Build the Future of Digital
   Healthcare", one CTA ("Talk to Our Engineering Team").
9. **Responsive**: check at mobile (375–430px), tablet (768–1024px), and desktop (1280px+). No
   horizontal scrollbar at any width; every multi-column section collapses per its documented
   column counts.

## Edge cases

- Temporarily null out the hero's `backgroundImage` in the CMS (or simulate via the mapper) and
  confirm the fixed-size placeholder renders with no layout shift.
- Confirm "Featured Capabilities" cards render cleanly with no icon slot/gap, since the CMS
  supplies none.
- Confirm "Our HealthTech Engineering Services" cards render cleanly whether or not a given
  step's CMS `icon` is present — no fallback/placeholder icon should ever appear (research.md §5).
- Give one "Connected Healthcare Systems" bullet far more feature titles than another and confirm
  the card doesn't clip or force equal-height bullets.
- Tab through the page with a keyboard and confirm the hero CTA and closing CTA are reachable and
  operable.
