# AGENTS.md: Fallen Wyrms: Dispatches

You are building the MVP of a choice-driven interactive-fiction game. This repo already runs. Your job is to extend and harden it, keeping the tests green.

## The one thing this MVP proves
That short, elegiac, choice-driven chapters in the Chronicler's voice hold attention on a phone and convert players into newsletter subscribers and book readers.

## Current state (works today)
- `npm install && npm run dev` runs the reader.
- `npm test` passes (22 tests): story graph, engine, history, chapters, save merge, subscribe, analytics, season narrative guards.
- Season One (`src/story/season1.ts`): Prologue + five viewpoints (Keeper, Corvane, Wick, Alaster, Aelinor) + Epilogue, 24 nodes.
- Reader UX: progress bar, chapter labels, back/history stack, text reveal, settings (reduced motion, large text).
- Save/resume: `localStorage` always; Supabase `reading_progress` when `.env` is configured.
- Subscribe: email form with honeypot; Supabase `subscribers` insert when configured.
- Analytics: typed interface; `choice_events` via Supabase when configured.
- PWA: manifest, icons, `public/sw.js` registered in production builds.
- Capacitor wrap documented in `platform/README.md`.

## Build tasks (checklist)
1. [x] **Polish the reader UX.** Progress indicator, text reveal, reduced motion toggle, font sizing.
2. [x] **Persisted history / back.** History stack with flag-integrity tests.
3. [x] **Content authoring pass.** Five chapters including Alaster and Aelinor; narrative tests.
4. [x] **Wire the subscribe CTA.** Supabase insert, success/error UI, honeypot. (See `CURSOR-KICKOFF.md`; migration in `supabase/migrations/`.)
5. [x] **Analytics gate.** `chapter_complete`, `season_complete`, `cta_click`, `choice_made` behind typed interface.
6. [x] **PWA + offline.** Service worker caches app shell; icons present.
7. [x] **Store wrap (stretch).** Documented in `platform/README.md`.

**Remaining for ship:** Apply `supabase/migrations/001_initial.sql` (see `supabase/SETUP.md`), copy `.env.example` to `.env`, manual PWA install QA on a phone.

## Dependencies
- **Runtime:** `@supabase/supabase-js` (optional at runtime; only used when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set).
- **Dev:** TypeScript, Vite, Vitest.

## Acceptance criteria for the MVP
- A player can complete a full season on a phone in about 20 to 40 minutes.
- `npm test` and `npm run build` both pass with zero errors.
- The subscribe CTA works end to end against a real list (requires Supabase migration + `.env`).
- Retention and CTA-click events are recorded through the analytics interface.

## Guardrails
- Follow every rule in `.cursorrules`.
- Read `canon/CANON.md` before writing any story text; stay in canon and in the Chronicler's voice.
- Keep dependencies minimal. Justify any new dependency in this file.
- The story is the product. Prose quality and pacing matter more than mechanics.

## Definition of done for each task
Run `npm test` and `npm run build`, confirm both green, and update `PLAN.md`.

## Related
- Working plan: `PLAN.md`
- Target file tree: `CURSOR-KICKOFF.md` (and `../Games/ARCHITECTURE.md` for reference)
- Shared canon data (bundled): `src/canon/` (regenerate from `../Games/fallen-wyrms-canon/`)
