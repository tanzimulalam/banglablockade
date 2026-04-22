# বাংলা Blockade

A fully responsive, bilingual (English + Bengali) digital journalism platform for **truth, justice, and national identity**.

This project is built as a modern editorial website inspired by contemporary fact-check and investigative layouts, with a strong Bangladesh-first brand identity.

## Core Features

- **Bilingual UX** with localized routes: `/en` and `/bn`
- **Responsive editorial design** for mobile, tablet, and desktop
- **Sticky header + persistent navigation**
- **Grid-based homepage** with categorized article cards
- **Dedicated article pages** with metadata, featured image, and sharing links
- **About, Contact, Privacy, Terms** pages
- **SEO-ready metadata** (title, description, Open Graph)
- **Optimized media flow** using Next.js `Image` component

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint**

## Brand System

- **Primary Red:** `#F31B1D` (sacrifice and unity)
- **Primary Green:** `#026C33` (nation and identity)
- **Typography:**
  - Latin body/UI: Roboto
  - Bengali body/UI: Shadhinata/Kalpurush/Abusayed fallback stack
  - Latin display headlines: Impact

## Routes

- `/` -> redirects to `/en`
- `/en`, `/bn` -> Homepage
- `/en/articles/[slug]`, `/bn/articles/[slug]` -> Article pages
- `/en/about`, `/bn/about`
- `/en/contact`, `/bn/contact`
- `/en/privacy`, `/bn/privacy`
- `/en/terms`, `/bn/terms`

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
  [lang]/
    articles/[slug]/
    about/
    contact/
    privacy/
    terms/
components/
lib/
public/
```

## Content & Localization

Sample editorial data, categories, and UI translation strings are maintained in:

- `lib/content.ts`

## Contact

- `info@banglablockade.com`
- `tips@banglablockade.com`

---

**বাংলা Blockade** is designed to amplify the organized voice of students and people standing against injustice, discrimination, and oppression.
