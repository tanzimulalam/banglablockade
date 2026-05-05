# Technical Notes: Admin Architecture

## Overview

Bangla Blockade runs as a static-exported Next.js site on GitHub Pages.
The admin panel is implemented with Decap CMS in a hidden static route:

- `/secure-admin-panel-k9x4v2/`

This avoids introducing runtime server dependencies into production website delivery.

## Content Model

- Posts: `content/posts/*.md`
- Editable static pages:
  - `content/pages/about.md`
  - `content/pages/contact.md`

Markdown frontmatter stores structured bilingual fields:

- `title.en` / `title.bn`
- `excerpt.en` / `excerpt.bn`
- `content[]` (localized paragraph objects)
- metadata (`slug`, `category`, `author`, `publishedAt`, `image`)
- optional fact-check fields (`verdict`, `sources`, etc.)

## Runtime Content Loading

`lib/cms-content.ts` reads frontmatter during build using `gray-matter`.
If content files are missing, safe fallbacks are used.

## Media Pipeline

- Uploaded files land in `public/uploads/`.
- `scripts/optimize-images.mjs` creates WebP derivatives in:
  - `public/uploads/optimized/`
- Build hook:
  - `prebuild -> node scripts/optimize-images.mjs`

## Authentication Model

Decap is configured with GitHub backend and OAuth proxy endpoint.
Security is enforced by:

1. OAuth app approval
2. GitHub repository write permissions
3. OAuth proxy allowlist for approved usernames

Current known admin usernames:

- `tanzimulalam`
- `mdbabulmiah-phd`

## Future Additions

- Add more editable pages by extending `content/pages/*.md` + Decap config.
- Add search index generation from markdown at build time if needed.
- Add image alt/caption fields in collection schema for accessibility.
