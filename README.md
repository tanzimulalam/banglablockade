# বাংলা Blockade

An independent, bilingual (English & Bengali) digital investigative media platform dedicated to **truth, justice, and national identity**.

Bangla Blockade serves as the organized voice against misinformation and injustice. The platform focuses on verification-first reporting, digital investigations, and transparent fact-checking with clear methodology and open evidence.

## 🚀 Key Features

* **Bilingual Experience:** Seamlessly switch between English (`/en`) and Bengali (`/bn`) with fully localized content and UI.
* **Fact-Checking Engine:** Dedicated fact-check reports with clear verdicts (True, False, Misleading), evidence analysis, methodology transparency, and claim origin tracking.
* **Modern Editorial Design:** A premium, responsive layout inspired by contemporary investigative journalism platforms. Features a grid-based homepage, categorized article cards, and a sticky navigation header.
* **Dynamic Content Management:** Fully integrated with **Supabase** for real-time article fetching, database management, and structured content delivery.
* **SEO & Performance Optimized:** Built on Next.js App Router for optimal performance, SSR, and built-in SEO metadata (Title, Description, Open Graph).
* **Responsive & Accessible:** Designed to work flawlessly across mobile, tablet, and desktop devices.

## 💻 Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Custom CSS Variables
* **Database & Backend:** Supabase (PostgreSQL)
* **Linting & Formatting:** ESLint

## 🎨 Brand Identity

* **Primary Red:** `#F31B1D` (representing sacrifice and unity)
* **Primary Green:** `#026C33` (representing nation and identity)
* **Typography:**
  * Latin text: *Roboto* & *Impact* (for display)
  * Bengali text: *Shadhinata*, *Kalpurush*, or system fallback

## 🗺️ Application Routes

* `/` -> Auto-redirects to `/en`
* `/[lang]` -> Homepage featuring latest investigations and fact-checks
* `/[lang]/fact-checks` -> Dedicated hub for all fact-checking reports
* `/[lang]/investigations` -> Deep-dive investigative journalism
* `/[lang]/articles/[slug]` -> Individual article reading experience
* `/[lang]/about` -> Platform mission and information
* `/[lang]/contact` -> Contact details and secure tips channel

## 🛠️ Local Development Setup

### 1. Clone and Install
```bash
git clone https://github.com/tanzimulalam/banglablockade.git
cd banglablockade
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials. **(Never commit this file!)**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 3. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to view the application.

## 📦 Production Build

```bash
npm run build
npm run start
```

## 🗄️ Supabase Schema Overview

The platform uses a unified `articles_content` table to serve both English and Bengali content dynamically. Key fields include localized titles, excerpts, full markdown/paragraph bodies, and specialized fact-checking metadata (verdict, claim origin, methodology, evidence). 

*(Refer to `docs/supabase-seed.sql` or the provided schema definitions for exact table structures).*

## 📬 Contact & Tips

* **General Inquiries:** `info@banglablockade.com`
* **Secure Tips:** `tips@banglablockade.com`

---
*Fundamental change begins from the people's hands.*
