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

To enable subscribe, progress sync, and analytics on the live site:

1. Apply `supabase/migrations/001_initial.sql` (see `supabase/SETUP.md`).
2. In GitHub: **Settings → Secrets and variables → Actions**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Re-run the deploy workflow (**Actions → Deploy to GitHub Pages → Run workflow**) or push any commit to `main`.

Without secrets, the live game still works; saves stay in the browser only.

## Manual deploy (local)

```bash
npm run build
npx wrangler pages deploy dist --project-name fallen-wyrms-dispatches
```

GitHub Pages is the default; use Cloudflare or Netlify only if you prefer a custom domain there.
