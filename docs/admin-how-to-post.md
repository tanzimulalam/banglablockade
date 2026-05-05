# Bangla Blockade Admin Guide

## Login

1. Open `https://banglablockade.com/secure-admin-panel-k9x4v2/`
2. Click **Login with GitHub**
3. Use your approved GitHub account.

> Approved admins now:
> - `tanzimulalam`
> - `mdbabulmiah-phd`
> - Two more can be added later by granting repository write access and OAuth allowlist access.

## Create a New Post

1. Click **Posts**.
2. Click **New Posts**.
3. Fill all fields:
   - Slug
   - Category
   - English + Bangla title
   - English + Bangla excerpt
   - Paragraph list in both languages
   - Author, date, cover image
4. For fact-check posts, also fill:
   - Verdict
   - Claim origin
   - Methodology
   - Evidence
   - Conclusion
   - Sources
5. Click **Save**.

## Save Draft vs Publish

- **Save Draft**: keeps post in editorial workflow draft/review state.
- **Publish**: merges content into production branch and triggers deployment.

## Edit About/Contact Pages

1. Click **Editable Pages**
2. Open **About Page** or **Contact Page**
3. Update fields and save/publish

## Upload Images

1. Click image field and upload `.jpg`, `.png`, or `.webp`
2. CMS stores originals in `public/uploads/`
3. Build pipeline auto-generates optimized WebP variants

## Quick Safety Rules

- Never delete a published post unless necessary.
- Always preview changes before publishing.
- Keep slug stable after publishing (changing slug breaks old links).

## Screenshot Checklist

Add these screenshots for training handoff:
1. Login screen
2. New post form
3. Draft vs publish controls
4. Editable pages screen
5. Media upload dialog
