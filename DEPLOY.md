# Deploy: Fallen Wyrms Dispatches

The game deploys automatically to **GitHub Pages** on every push to `main`.

## Live URL

After the first deploy completes:

**https://fellowship-intel.github.io/fallen-wyrms-dispatches/**

(Check **Actions** tab in the repo if the link is not up yet; first deploy takes 1 to 2 minutes.)

## Install on a phone

1. Open the live URL in **Chrome** (Android) or **Safari** (iPhone).
2. **Android:** Menu → **Install app** or **Add to Home screen**.
3. **iPhone:** Share → **Add to Home Screen**.

HTTPS is required for install; GitHub Pages provides it.

## Custom domain

To use **dispatches.fallenwyrms.com** (or another subdomain), see **`docs/CUSTOM-DOMAIN.md`**.

## Supabase on production

**Live.** Schema applied, GitHub Actions secrets set, API smoke tests return HTTP 201 for subscribe, progress, and choice events.

Dashboard: [Supabase SQL Editor](https://supabase.com/dashboard/project/sdfrazqtlpdcxckfdpyi/sql/new) | See `supabase/SETUP.md` for details.

## Manual deploy (local)

```bash
npm run build
npx wrangler pages deploy dist --project-name fallen-wyrms-dispatches
```

GitHub Pages is the default; use Cloudflare or Netlify only if you prefer a custom domain there.
