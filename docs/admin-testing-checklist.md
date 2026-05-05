# Admin Panel Testing Checklist

## Access & Auth

- [ ] Visiting `/secure-admin-panel-k9x4v2/` loads CMS
- [ ] Unauthenticated users cannot commit content
- [ ] Approved admin accounts can log in
- [ ] Non-admin account is denied by OAuth allowlist

## Posts

- [ ] Create post with English + Bangla fields
- [ ] Save as draft only
- [ ] Publish a draft
- [ ] Edit an existing post and republish
- [ ] Delete a post and confirm it is removed after deploy

## Fact-check Fields

- [ ] Set verdict and verify badge appears on site
- [ ] Add sources and confirm links render correctly
- [ ] Add methodology/evidence and confirm article template renders

## Pages

- [ ] Edit About page title/body and publish
- [ ] Edit Contact page title/body and publish
- [ ] Confirm updates appear in both `/en/` and `/bn/` routes

## Media

- [ ] Upload `.png` image
- [ ] Upload `.jpg` image
- [ ] Upload `.webp` image
- [ ] Confirm generated files in `public/uploads/optimized`
- [ ] Confirm image renders in post card and article page

## Deployment

- [ ] GitHub Action build succeeds
- [ ] No console errors on homepage/article pages
- [ ] Site remains available during content publish
