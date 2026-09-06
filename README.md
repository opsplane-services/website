# OpsPlane Services — company website

The public site for OpsPlane Services: landing page, blog and contact form.

The platform source is not public, so the site deliberately carries no links to a source
repository, no "view on GitHub" buttons and no clone/quickstart instructions.

Built as a static export so it can be served straight from GitHub Pages.

## Stack

- **Next.js 14** (App Router, `output: 'export'`)
- **Tailwind CSS** — design tokens copied from `platform/web` so the site and the product UI match
- **Markdown blog** — `gray-matter` + `marked`, rendered at build time
- **No runtime backend** — the contact form posts to Formspree from the browser

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build` writes the static site to `out/`.

## Project layout

```
content/blog/*.md            Blog posts
src/app/                     App Router pages
  layout.tsx                 Shell: header, footer, theme, metadata
  page.tsx                   Landing page
  blog/                      Blog index and post pages
  contact/                   Contact page
src/components/              Header, Footer, ContactForm, ui/ (Button, Card, Badge)
src/lib/
  content.ts                 All site copy, in one typed object
  blog.ts                    Markdown loading
  paths.ts                   basePath helper
  site.ts                    URLs, contact address, Formspree id
  theme.tsx                  Light/dark/system theme
```

## Design

The visual language is copied from the platform console, not re-invented:

- Pure black and white accents, no colour beyond severity states
- `border-radius: 0` and no shadows everywhere
- Inter, with `lucide-react` icons at `strokeWidth={1.5}`
- CSS-variable tokens in `src/app/globals.css`, `.dark` class for dark mode

If the product UI tokens change in `platform/web`, mirror them in `src/app/globals.css` and
`tailwind.config.ts`.

## Adding a blog post

Drop a markdown file in `content/blog/`. The filename becomes the URL slug:

```markdown
---
title: 'Post title'
date: '2026-09-05'
excerpt: 'One or two sentences shown on the blog index.'
author: 'The OpsPlane team'
tags: ['kubernetes']
---

Body in markdown.
```

Posts are sorted by `date`, newest first. Reading time is calculated automatically.

## Contact email

The address shown on the contact page and in the footer comes from
`src/lib/site.ts`, and defaults to `opsplane@opslane.eu`. To change it without editing code,
add a repository variable named `NEXT_PUBLIC_CONTACT_EMAIL` under
**Settings → Secrets and variables → Actions → Variables** — the Pages workflow passes it
through to the build. Locally, put it in `.env.local`.

## Contact form

The form posts directly to [Formspree](https://formspree.io) from the browser — there is no server
to run.

1. Create a form on Formspree and copy its id (the part after `/f/` in the endpoint URL).
2. In the repository, go to **Settings → Secrets and variables → Actions → Variables** and add a
   variable named `NEXT_PUBLIC_FORMSPREE_ID` with that id.

Until that variable is set, the contact page shows an email button instead of a form, so the page
is never broken — just simpler.

For local testing, put the id in `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=xyzabcde
```

## Deployment

Pushes to `master` trigger `.github/workflows/pages.yml`, which builds the site and publishes it to
GitHub Pages.

**One-time setup:** in the repository, go to **Settings → Pages** and set **Source** to
**GitHub Actions**.

The site is then served at `https://opsplane-services.github.io/website/`, which is why the
workflow sets `NEXT_PUBLIC_BASE_PATH=/website`.

### Moving to a custom domain

1. Add a `public/CNAME` file containing the domain, e.g. `opsplane.io`.
2. In `.github/workflows/pages.yml`, remove the `NEXT_PUBLIC_BASE_PATH` line and set
   `NEXT_PUBLIC_SITE_URL` to `https://opsplane.io`.
3. Point a `CNAME` DNS record at `opsplane-services.github.io`, then set the custom domain under
   **Settings → Pages**.

## Before launch

- [ ] Set the `NEXT_PUBLIC_FORMSPREE_ID` repository variable to switch the contact form on
- [ ] The AI Stack and Durable Execution service cards describe capabilities presented as
      available. Keep the copy in step with what the platform actually does by launch.
