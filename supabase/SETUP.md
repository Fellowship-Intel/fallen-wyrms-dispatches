# Supabase setup for Dispatches

Project: **sdfrazqtlpdcxckfdpyi**  
Dashboard SQL editor: [Open SQL Editor](https://supabase.com/dashboard/project/sdfrazqtlpdcxckfdpyi/sql/new)

One-time setup to enable cross-device resume, newsletter signup, and choice analytics.

## 1. Apply the schema (required once)

In the SQL Editor link above, paste the full contents of:

```
supabase/migrations/001_initial.sql
```

Click **Run**. You should see three tables: `subscribers`, `reading_progress`, `choice_events`.

Verify in **Table Editor** that RLS is enabled on each table.

**Production:** GitHub Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are already set. After you run the SQL, redeploy is automatic on the next push, or run the deploy workflow manually.

## 2. Configure local dev (optional)

Copy the example env file if you do not already have `.env`:

```bash
cp .env.example .env
```

Fill in from **Project Settings → API** (same values as GitHub secrets):

| Variable | Source |
|----------|--------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | `anon` / publishable key |

Never commit `.env`. Restart `npm run dev` after changing env vars.

## 3. Smoke test

```bash
npm run dev
```

1. Play through a few choices; check **reading_progress** for a row with your `player_id`.
2. Complete Season One; submit an email on the subscribe form; check **subscribers**.
3. Confirm **choice_events** rows appear when you make choices.

## 4. Offline behavior

Remove or empty `.env` and reload. The app should still play fully on `localStorage`. Subscribe shows an offline message instead of failing silently.

## Security note

RLS policies allow anon inserts and broad progress reads for MVP simplicity. Tighten with Supabase Auth anonymous sessions or Edge Functions before scaling.
