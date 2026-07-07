![TechGrit logo](public/logos/techgrit-logo-white.png)

# TechGrit Website V2

This repository is the revamp of the TechGrit company website, built with [Next.js](https://nextjs.org) and designed as a modern, content-first marketing platform.

## Overview

This monorepo is structured to support a content-driven TechGrit website rebuild with a separate frontend app, CMS app, shared packages, and infrastructure code.

### Repository layout

```text
techgrit-webiste-v2/
├── .husky/                 # Git hooks configuration
├── app/                    # current root-level Next.js app scaffold
├── docs/
│   ├── adr/                # architecture decision records
│   └── superpowers/specs/  # design and implementation specs
├── infra/                  # infrastructure and deployment code
├── packages/
│   ├── config/             # shared config presets and tooling
│   ├── types/              # shared TypeScript types
│   └── ui/                 # shared UI component library
├── public/
│   ├── icons/
│   │   └── favicon.png     # browser tab icon (wired via metadata in app/layout.tsx)
│   └── logos/
│       └── techgrit-logo-white.png   # white logo — dark backgrounds
├── apps/
│   ├── web/
│   │   ├── app/            # App Router routes and pages
│   │   ├── components/     # reusable frontend components
│   │   ├── lib/            # utilities, CMS client, server actions
│   │   └── public/         # web app static assets
│   └── cms/
│       └── src/
│           ├── api/        # Strapi collection and single-type APIs
│           └── components/ # Strapi dynamic zone blocks
├── package.json
├── README.md
└── tsconfig.json
```

### What each folder is for

- `public/` — static assets served at the root URL. `logos/` holds the TechGrit brand logo; `icons/` holds the favicon used across all pages.
- `app/` — the existing root-level Next.js scaffold from the starter template.
- `apps/web/` — intended main frontend application for the website rebuild.
- `apps/cms/` — Strapi CMS app structure for content modeling and API work.
- `packages/ui/` — shared React/UI components and design system primitives.
- `packages/types/` — shared TypeScript definitions, contracts, and content schemas.
- `packages/config/` — reusable Tailwind, ESLint, TypeScript, and build presets.
- `infra/` — deployment and infrastructure-as-code artifacts.
- `docs/` — project documentation, specs, and ADRs.
- `public/` — shared static assets such as logos and icons.

## Quick start

Install dependencies and install Husky hooks:

```bash
npm install
npm run prepare
```

Start the development server from the repo root:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build the Next.js app
- `npm run start` — run the production build locally
- `npm run lint` — lint the repository with ESLint
- `npm run prepare` — install Husky hooks

## Git hooks

A Husky `pre-commit` hook is configured at `.husky/pre-commit` and runs:

- `npm run lint`
- `npm run build`

This ensures linting and build validation before commits are created.

## Notes

- The frontend entry file is currently `apps/web/app/page.tsx` once the app content is added.
- The logo shown above is sourced from `public/logos/techgrit-logo-white.png`.
- `apps/cms` is a placeholder structure for later Strapi content modeling and API work.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Husky](https://typicode.github.io/husky/#/)
