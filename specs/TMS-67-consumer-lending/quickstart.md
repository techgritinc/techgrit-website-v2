# Quickstart: Consumer Lending Industries Page

## Verify locally

```bash
npm run dev
```

Visit `http://localhost:3000/industries/consumer-lending`.

## Manual test scenarios (from spec.md's acceptance scenarios)

1. **Hero + metrics**: page loads with eyebrow "Consumer Lending", headline, description, two CTA
   buttons, and a 4-value metrics strip directly below.
2. **Domain depth tabs**: "Dealer network" is active by default. Click each of the other 5 tabs
   ("Origination", "Funding", "Servicing", "Collections", "Finance & compliance") — body content
   (title, description, right-column capsule points) updates each time, only one tab active at a
   time.
3. **Ecosystem / Applied AI / Institutional platforms / Our work / Quote**: scroll through and
   confirm 3-col system cards, 2-col status cards, 2+3 card rows + one plain-text card, 3-col case
   summaries with metric heading, and the full-width quote card.
4. **How we work / Operating context**: 3-col cards (no bullets) then 2-col cards (with bullets +
   supporting text).
5. **FAQ**: click a closed question, confirm it expands; matches AI-Accelerated Modernization's FAQ
   interaction.
6. **Final CTA**: confirm both "Talk to us" and "Request an estimate" buttons render and link out
   (`/contact-us/`, `/request-for-estimate/`).
7. **Excluded sections**: confirm "Engagement models" and "Who is accountable" do not appear
   anywhere on the page.
8. **Responsive**: resize to `sm`/`md`/`lg` breakpoints (560/960/1140px) and confirm no horizontal
   scroll or overlapping content, including the Domain depth tab row and its 2-column point list.

## CMS failure mode

If `/api/pages/by-slug/consumer-lending` is unreachable, the page calls `notFound()` — same
behavior as every other CMS-backed page in this app (`fetchCms` returns `null` on any fetch
failure, per `cms/api/fetcher.ts`).
