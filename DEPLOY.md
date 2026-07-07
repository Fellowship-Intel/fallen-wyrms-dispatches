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

## Supabase on production

GitHub Actions secrets are configured. **One step left:** run the schema SQL once.

1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/sdfrazqtlpdcxckfdpyi/sql/new)
2. Paste `supabase/migrations/001_initial.sql` and click **Run**
3. Wait for the deploy workflow to finish (or trigger it manually)

After that, subscribe, progress sync, and choice analytics work on the live site. See `supabase/SETUP.md`.

## Manual deploy (local)

```bash
npm run build
npx wrangler pages deploy dist --project-name fallen-wyrms-dispatches
```

GitHub Pages is the default; use Cloudflare or Netlify only if you prefer a custom domain there.
