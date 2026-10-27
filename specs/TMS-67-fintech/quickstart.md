# Quickstart: FinTech Industry Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/industries/fintech`. Requires `CMS_API_URL` pointed at a Strapi
instance that serves `GET /api/pages/by-slug/fintech` — if unreachable, `fetchCms` returns `null`
and the page 404s, same as Construction/Healthcare.

Also re-check `http://localhost:3000/industries/healthcare` — it must look and behave identically
to before this feature (SC-007), since it's now consuming the extracted shared components.

## Verify against the spec (manual — no test framework configured)

1. **Hero**: eyebrow "Industry · FinTech", headline with "FinTech Companies" highlighted,
   description, exactly one CTA ("Talk to Our Engineering Team"), fixed-size picture on the
   right (no stat chips, no breadcrumb). Resize the window and confirm the picture area's
   dimensions don't change.
2. **What We Build**: intro paragraph under the heading, then 8 icon+title+description cards.
3. **AI Across the FinTech Product Lifecycle**: 6 cards, step label `1`–`6`, title, description,
   3-column grid at desktop width. Confirm the heading reads "FinTech", not "Healthcare".
4. **Our FinTech Engineering Services**: 7 rows, title, description; no icon (or any substitute,
   including a numbered label) renders for any row — CMS supplies no icon for this page, and the
   shared component has no fallback of any kind. Confirm the heading reads "FinTech", not
   "HealthTech".
5. **FinTech Solutions We Support**: eyebrow "We Support", title, then all 18 plain-title tiles.
   Resize and confirm: 3 columns ≥ `md` (960px), 2 columns between `sm` (560px) and `md`, 1 column
   below `sm`.
6. **Featured Case Studies**: 2 cards, title + description + a "Read case study" link (to
   `/insights/case-studies/`); no metric number.
7. **Closing CTA**: heading "Build the Future of Financial Technology", one CTA ("Talk to Our
   Engineering Team").
8. **Responsive**: mobile (375–430px), tablet (768–1024px), desktop (1280px+). No horizontal
   scrollbar at any width.

## Shared-component regression check (Healthcare)

- Diff Healthcare's rendered page before/after this feature at desktop/tablet/mobile — every
  section (including the one with no intro paragraph, which must stay exactly as-is) must be
  pixel-identical.
- Confirm the six deleted `app/industries/healthcare/_components/healthcare-*.tsx` files are
  actually gone (not left as unused dead files) and `app/industries/healthcare/page.tsx` imports
  from `components/ui/Industry*.tsx` instead.

## Edge cases

- Null out the hero's `backgroundImage` and confirm the fixed-size placeholder renders with no
  layout shift.
- Confirm "Featured Case Studies" cards render cleanly with no icon slot/gap (CMS supplies none).
- Confirm "Our FinTech Engineering Services" renders cleanly with all 7 icon slots omitted — no
  fallback/placeholder icon anywhere.
- Tab through the page with a keyboard and confirm the hero CTA and closing CTA are reachable and
  operable.
