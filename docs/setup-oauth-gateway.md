# Setup OAuth Gateway for Decap CMS

Decap CMS on GitHub Pages needs an auth gateway service.

## Recommended Hosting

- Deploy a small Node service on Vercel (or similar) at:
  - `https://bb-oauth-gateway.vercel.app`

## Required Environment Variables

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_REPO=tanzimulalam/banglablockade`
- `ALLOWED_GITHUB_USERS=tanzimulalam,mdbabulmiah-phd`

Add future admins by appending usernames to `ALLOWED_GITHUB_USERS`.

## Required Endpoints

- `GET /api/auth` -> starts GitHub OAuth flow
- `GET /api/callback` -> exchanges code and returns Decap token payload

## Security Requirements

- Validate authenticated GitHub username against allowlist before issuing token.
- Use server-side secret for token signing.
- Do not expose GitHub client secret in frontend.

## OAuth App Callback URL

Set GitHub OAuth callback URL to:

- `https://bb-oauth-gateway.vercel.app/api/callback`

## After Deployment

1. Confirm gateway URL works.
2. Keep `public/secure-admin-panel-k9x4v2/config.yml` values:
   - `base_url: https://bb-oauth-gateway.vercel.app`
   - `auth_endpoint: /api/auth`
3. Test login with both approved admin accounts.
