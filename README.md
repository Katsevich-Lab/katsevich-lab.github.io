# Katsevich Lab website

The public website for the Katsevich Lab at the University of Pennsylvania.

## Local development

Use Node 22 (the version recorded in `.nvmrc`), then install the locked dependency set:

```sh
npm ci
npm run dev
```

Astro prints the local URL when the development server starts.

## Production build

```sh
npm test
npm run preview
```

`npm test` runs Astro and TypeScript diagnostics, creates the static site, and verifies its routes and metadata. The site is deployed to GitHub Pages through `.github/workflows/deploy.yml` only from the `gh-pages` branch.

## Updating content

Public-facing people, research, software, funding, updates, and publication records live in `src/data/site.ts`. Images are imported from `images/teampic` and `images/softwarepic` so they are optimized during the build.

## Legacy URLs

The retired paths `/team/`, `/vacancies/`, `/allnews/`, `/pictures/`, `/aboutwebsite.html`, `/allnews.html`, and `/aoa.html` are part of the site's compatibility contract. Keep their noindex, follow-through redirect pages in place when changing routes; `npm test` verifies every destination.
