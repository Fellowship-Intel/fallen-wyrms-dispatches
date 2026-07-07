# CURSOR KICKOFF: Fallen Wyrms Dispatches

You are the coding agent for this project. Read this first, then read `AGENTS.md` and `.cursorrules`. Your job is to take this MVP from its current working state to a shippable interactive-fiction app, in small verified steps.

## Step 0: make a plan before you code
Read `AGENTS.md`, `.cursorrules`, `README.md`, and skim `src/`. Then create a `PLAN.md` in the repo root that breaks the milestones below into concrete tasks with acceptance criteria, and lists open questions. Do not start coding until `PLAN.md` exists. After each task, update `PLAN.md` and keep the tests green.

## What this is
Fallen Wyrms: Dispatches is a mobile-first, web-first interactive-fiction game set in the twilight of the gods, told in the Chronicler's voice. The player reads short branching chapters and makes choices. It is also a funnel to the newsletter and the novels. Stack: TypeScript + Vite, no framework, PWA. Backend: Supabase.

## How to work (the rules)
- Tests are the gate. Nothing is "done" until `npm run build` (TypeScript strict) and `npm test` (Vitest) both pass. Run them after every task.
- Never use the em dash character in any in-world or UI text. Use commas, colons, semicolons, periods, or parentheses. There is a test that enforces this on story content; keep it passing.
- Read lore from `src/canon/` (bundled canon data: 72 entries, premise, story, camps). Do not hardcode lore.
- Brand: Void Black #0a0b0f, Ember Gold #c8a865 / #e6ca8c, Parchment #e9e3d6. Fonts Cinzel (display), Cormorant Garamond (body). Tone is the Chronicler: calm, precise, elegiac, no hype.
- Keep scope tight. This proves narrative-to-reader conversion; it is not an RPG.

## Commands
```bash
npm install
npm run dev     # play locally
npm test        # Vitest
npm run build   # tsc --noEmit + vite build
```

## Current state (works today)
- `src/engine.ts`: `StoryEngine` + `validateStory()` (checks dangling refs, reachability, em dashes, empty text, has an end).
- `src/story/season1.ts`: Season One "The Night the Light Went Out", four viewpoints (keeper, Corvane, Wick, Alaster), 19 nodes, branching.
- `src/ui.ts`, `src/main.ts`: reader UI, localStorage save/resume, a placeholder subscribe CTA.
- `src/style.css`: brand theme. `public/`: PWA manifest and full icon set.
- `src/engine.test.ts`: 6 tests, all passing.
- `src/canon/`: bundled canon (`canon.json`, `types.ts`, `index.ts` with `canon`, `entry(id)`, `section(key)`, `allEntries()`).

## Supabase (the backend)
The Supabase MCP is configured in Cursor, so you can create tables and RLS policies directly (use read-only tools to inspect, then propose migrations for the user to approve). Build these tables:
- `subscribers` (id, email unique, created_at, source) for newsletter capture.
- `reading_progress` (id, player_id, season, node_id, flags jsonb, updated_at) so a player can resume across devices; key on an anonymous player_id stored client-side.
- `choice_events` (id, player_id, season, node_id, choice_index, created_at) for privacy-safe choice analytics.
Rules: enable RLS on every table; a player can read/write only their own rows; `subscribers` is insert-only from the client. Put the Supabase URL and anon key in `.env` (Vite `VITE_` prefix); never commit real keys. Keep the app fully playable offline if Supabase is unreachable (progress falls back to localStorage).

## Milestones (turn these into PLAN.md tasks)
1. Reader polish: chapter dividers, a progress indicator, a back/history stack, smooth transitions, accessible font sizing and reduced-motion.
2. Content pass: add the fifth viewpoint (Aelinor) to reach five chapters; add per-season narrative tests. Keep validation green.
3. Supabase progress: wire `reading_progress` with anonymous player_id and localStorage fallback; resume on load.
4. Subscribe: replace the placeholder CTA with a real `subscribers` insert; success and error states; honeypot for spam.
5. Analytics: log `choice_events` through a small typed interface; no PII.
6. Offline + installable: service worker for offline reads; verify the PWA installs on Android and iOS.
7. (Stretch) Store wrap via Capacitor for the app stores.

## Definition of done (MVP)
A first-time player can read Season One start to finish on a phone, resume where they left off, subscribe, and install to the home screen. `npm run build` and `npm test` pass. No em dashes in content. Supabase is optional at runtime (offline still works).

## Guardrails
Follow `.cursorrules`. Stay in canon (`src/canon/`). Do not add a framework, accounts/passwords, multiplayer, or a CMS. Any change to the engine or story adds or updates a test.

## Reference
`AGENTS.md` (task list), `README.md`, `../Games/ARCHITECTURE.md` (full target tree), `../Games/fallen-wyrms-canon/` (canon master, for regeneration).
