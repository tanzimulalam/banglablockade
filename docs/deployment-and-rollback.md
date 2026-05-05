# Deployment and Rollback Plan

## Safe Deployment Steps

1. Merge `admin-panel-feature` into `main`.
2. Confirm GitHub Actions `Deploy Next.js site to Pages` succeeds.
3. Validate:
   - Homepage
   - Article page
   - About and Contact pages
   - Admin URL load
4. Notify admins and start UAT with checklist.

## No-Downtime Notes

- Existing production remains active while branch work is in progress.
- Deployment is atomic through GitHub Pages artifact publishing.
- If new deploy fails, previous static artifact remains served until next successful publish.

## Rollback (Fastest Path)

### Option A: Revert commit (recommended)

1. Identify last known-good commit.
2. Run:
   - `git revert <bad_commit_sha>`
   - `git push origin main`
3. Wait for Pages workflow completion.

### Option B: Reset through GitHub UI

1. Open repository commit history.
2. Revert merge commit from UI.
3. Merge revert PR.

## Pre-merge Backup

- Backup content directory:
  - `content/posts`
  - `content/pages`
- Export current `main` commit SHA in release notes.

## Production Verification

- Run manual smoke test of top routes.
- Confirm admin login and one draft create test.
- Confirm no change to DNS, domain, or SSL settings.
