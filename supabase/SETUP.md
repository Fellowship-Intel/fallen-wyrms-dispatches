# Supabase setup for Dispatches

One-time setup to enable cross-device resume, newsletter signup, and choice analytics.

## 1. Apply the schema

In your [Supabase dashboard](https://supabase.com/dashboard) → **SQL Editor** → **New query**, paste the contents of:

```
supabase/migrations/001_initial.sql
```

Run the query. You should see three tables: `subscribers`, `reading_progress`, `choice_events`.

Verify in **Table Editor** that RLS is enabled on each table.

## 2. Configure the app

Copy the example env file:

```bash
cp .env.example .env
```

Fill in from **Project Settings → API**:

| Variable | Source |
|----------|--------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | `anon` / publishable key |

Never commit `.env`. Rebuild or restart the dev server after changing env vars.

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
