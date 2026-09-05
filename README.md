# OpsPlane Services — company website

The public site for [OpsPlane Services](https://github.com/opsplane-services/platform): landing
page, blog and contact form, in English and Hungarian.

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
content/blog/{en,hu}/*.md    Blog posts, one directory per locale
src/app/                     App Router pages
  page.tsx                   / — picks a locale from the browser
  [locale]/page.tsx          Landing page
  [locale]/blog/             Blog index and post pages
  [locale]/contact/          Contact page
src/components/              Header, Footer, ContactForm, ui/ (Button, Card, Badge)
src/lib/
  dictionaries.ts            All EN/HU copy
  i18n.ts                    Locale list and helpers
  blog.ts                    Markdown loading
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

Create a markdown file in `content/blog/en/` and — to keep the language switcher working on that
post — one with **the same filename** in `content/blog/hu/`:

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

- [ ] Replace the placeholder contact address in `src/lib/site.ts` (`hello@opsplane.io`)
- [ ] Set the `NEXT_PUBLIC_FORMSPREE_ID` repository variable
- [ ] Review the Hungarian copy in `src/lib/dictionaries.ts`
