# PLAN.md: Fallen Wyrms Dispatches MVP

Last updated: 2026-07-07 (Milestones 1–7 implemented; Supabase migration pending apply)

This file is the working task list. After each task, update status here and run `npm test` + `npm run build`.

---

## Verification gate (every task)

- [ ] `npm test` passes (Vitest)
- [ ] `npm run build` passes (tsc strict + Vite)
- [ ] No em dashes (`—`) in story or UI copy
- [ ] `PLAN.md` status updated for completed tasks

---

## Current baseline (audited 2026-07-07)

| Area | Status |
|------|--------|
| Story engine | `src/engine.ts`: navigate, flags, `validateStory()` |
| Season One | 24 nodes; Prologue + 5 viewpoints + Epilogue |
| Reader UI | Progress bar, settings, back stack, text reveal, subscribe form |
| Save/resume | `localStorage` + optional Supabase `reading_progress` |
| Subscribe CTA | Supabase insert with honeypot; offline/error states |
| Analytics | Typed interface; Supabase `choice_events` when configured |
| Supabase | Migration SQL ready; client wired; **apply migration + `.env` for E2E** |
| PWA | Manifest, icons, `public/sw.js` (production) |
| Tests | 22 tests, all passing |
| Canon | Bundled at `src/canon/` (72 entries); read before writing story |
| Dependencies | TypeScript, Vite, Vitest only (zero runtime deps) |

**Note:** `AGENTS.md` still references Zoho Campaigns for subscribe; `CURSOR-KICKOFF.md` directs Supabase `subscribers` insert. This plan follows the kickoff (Supabase). Update `AGENTS.md` when subscribe is implemented.

---

## Milestone 1: Reader polish

Goal: mobile-first reader that feels finished; accessible and calm.

### 1.1 Progress indicator

**Status:** done

**Acceptance criteria:**
- Player always sees which chapter they are in and how many remain before the epilogue.
- Progress bar or text does not use em dashes.
- Keyboard and screen-reader accessible.
- Tests green.

---

### 1.2 Text reveal animation

**Status:** done

**Acceptance criteria:**
- Text reveals feel deliberate, not flashy (Chronicler tone).
- Animation disabled when `prefers-reduced-motion: reduce` or when user toggles reduced motion (1.3).
- Tests green.

---

### 1.3 Settings: reduced motion and font size

**Status:** done

**Acceptance criteria:**
- Settings persist across sessions.
- Large text remains readable on a 375px-wide viewport without horizontal scroll.
- Tests green.

---

### 1.4 History / back stack

**Status:** done

**Acceptance criteria:**
- Player can step back through passages in the current run.
- Forward choices after going back behave predictably (document chosen behavior: truncate forward history vs. branch).
- Flag integrity test in `src/engine.test.ts` or new `src/state/history.test.ts`.
- Tests green.

---

### 1.5 Smooth node transitions

**Status:** done

**Acceptance criteria:**
- Transitions feel smooth on mobile; no jank on choice tap.
- Reduced motion = instant swap.
- Tests green.

---

### 1.6 Refactor UI modules (optional, when touching UI)

**Status:** not started

**Tasks:** Split `src/ui.ts` toward `src/ui/reader.ts`, `progress.ts`, `settings.ts` per `ARCHITECTURE.md` when scope warrants it. Not blocking; do when Milestone 1 tasks accumulate enough surface area.

**Acceptance criteria:** Same rendered output; tests green.

---

## Milestone 2: Content pass (five chapters)

Goal: Season One has five viewpoint chapters converging on the epilogue; narrative tests guard quality.

### 2.1 Aelinor chapter (deathless viewpoint)

**Status:** done

**Acceptance criteria:**
- `validateStory(season1)` returns `[]`.
- Every new node reachable from `prologue`; at least one path to `end_cta`.
- No em dashes; Chronicler voice; player-safe canon only.
- Play-through time still roughly 20 to 40 minutes for the full season.
- Tests green.

---

### 2.2 Per-season narrative tests

**Status:** done

**Acceptance criteria:**
- Tests fail if a chapter is dropped or a branch flag is missing.
- Tests green with full five-chapter content.

---

## Milestone 3: Supabase reading progress

Goal: resume across devices via anonymous `player_id`; offline-first with localStorage fallback.

### 3.1 Database schema and RLS

**Status:** done (SQL in `supabase/migrations/001_initial.sql`; apply to project)

**Acceptance criteria:**
- Migration reviewed and applied to Supabase project.
- RLS enabled; cross-player access denied.

---

### 3.2 Client: player ID and sync layer

**Status:** done

**Acceptance criteria:**
- App works fully with no `.env` (localStorage only).
- With Supabase configured, progress syncs and resumes on a second device/browser with same `player_id` (manual QA).
- No secrets committed.
- Unit tests for merge/preference logic.
- Tests green.

---

## Milestone 4: Subscribe CTA

Goal: real newsletter capture via Supabase; graceful UI; spam honeypot.

### 4.1 Subscribers table and RLS

**Status:** done (in migration SQL)

**Acceptance criteria:**
- Duplicate email handled gracefully (unique violation → user-friendly message).
- Migration reviewed and applied.

---

### 4.2 Subscribe UI and wiring

**Status:** done

**Acceptance criteria:**
- End-to-end insert works against real Supabase project.
- Honeypot blocks obvious bots in manual test.
- UI accessible (labels, errors announced).
- Tests green (mock Supabase or test insert policy separately).

---

## Milestone 5: Analytics (choice events)

Goal: privacy-safe choice logging behind a typed interface; no PII.

### 5.1 Analytics interface

**Status:** done

**Acceptance criteria:**
- No email, name, or free-text PII in events.
- Events fire without blocking UI (fire-and-forget; queue if offline optional).
- Tests for provider interface and wiring.

---

### 5.2 Choice events table and RLS

**Status:** done (in migration SQL)

**Acceptance criteria:**
- Choices logged in Supabase when online and configured.
- Offline play unaffected.
- Tests green.

---

## Milestone 6: Offline + installable PWA

Goal: finish Season One offline after first load; installable on home screen.

### 6.1 Service worker

**Status:** done

**Acceptance criteria:**
- After one online visit, airplane mode still allows completing Season One.
- SW update does not strand users on stale broken cache (simple `skipWaiting` + reload or version prompt).
- Tests green (SW may be smoke-tested manually; optional unit test for registration guard).

---

### 6.2 PWA install verification

**Status:** pending manual QA on devices

**Acceptance criteria:**
- Lighthouse PWA basics pass (installable).
- Manual install succeeds on at least one Android and one iOS device (or simulator).

---

## Milestone 7 (stretch): Store wrap

Goal: document path to app stores; implementation optional.

### 7.1 Capacitor documentation

**Status:** done (`platform/README.md`)

**Acceptance criteria:**
- Clear steps for wrapping the built `dist/` folder.
- No change required to core app behavior.

---

## Suggested build order

```
1.1 Progress → 1.3 Settings → 1.2 Text reveal → 1.4 History → 1.5 Transitions
     ↓
2.1 Aelinor content → 2.2 Narrative tests
     ↓
3.1–3.2 Supabase progress (+ .env.example, .gitignore)
     ↓
4.1–4.2 Subscribe
     ↓
5.1–5.2 Analytics
     ↓
6.1–6.2 Service worker + PWA QA
     ↓
7.1 Capacitor docs (stretch)
```

Content (Milestone 2) can overlap with reader polish if prose is ready; keep graph validation green after every content commit.

---

## MVP definition of done (checklist)

- [x] First-time player completes Season One on phone (20 to 40 min).
- [x] Resume works (localStorage + Supabase when configured).
- [x] Subscribe CTA inserts email with success/error UI.
- [x] Choice analytics logged via typed interface.
- [ ] PWA installs; offline completion works after first load (manual device QA).
- [x] `npm test` and `npm run build` pass.
- [x] No em dashes in content.
- [x] Supabase optional at runtime.

---

## Open questions

| # | Question | Impact | Default if unanswered |
|---|----------|--------|------------------------|
| 1 | Supabase project URL and anon key: provided or create new? | Blocks 3–5 integration QA | Use `.env.example` placeholders; local-only until keys supplied |
| 2 | Subscribe: Supabase only, or also forward to Zoho Campaigns? | Milestone 4 | Supabase insert per kickoff; Zoho as later webhook/Edge Function |
| 3 | Aelinor narrative placement: after Alaster, or interleaved earlier? | Milestone 2 graph | After Alaster, before epilogue; same hour on Lonely Isle |
| 4 | Progress "chapters": count Prologue/Epilogue or viewpoint chapters only? | Milestone 1.1 UX | Show viewpoint chapters (5) + optional "Prologue" label before ch. 1 |
| 5 | Back stack after going back then choosing anew: truncate forward history? | Milestone 1.4 | Yes, truncate (standard IF behavior) |
| 6 | Font size steps: two or three? | Milestone 1.3 | Default + Large (two steps) |
| 7 | `@supabase/supabase-js` version pin? | Milestone 3 | Latest stable 2.x; note in AGENTS.md |
| 8 | Service worker: hand-written `public/sw.js` vs. `vite-plugin-pwa`? | Milestone 6 deps | Hand-written minimal SW first to avoid new deps; revisit if maintenance hurts |
| 9 | Epilogue "Four lives" rewrite when Aelinor added | Milestone 2 prose | Reframe to five named witnesses or "five lives" without breaking rhythm |
| 10 | Cross-device resume: same browser only, or export/import `player_id`? | Milestone 3 scope | Same `player_id` in localStorage only for MVP; no export UI |

---

## File targets (from ARCHITECTURE.md)

New files expected over the MVP (create as needed):

```
src/ui/reader.ts, progress.ts, settings.ts
src/state/save.ts, history.ts
src/story/season1.test.ts, index.ts
src/analytics/analytics.ts, providers/noop.ts, providers/supabase.ts
src/net/subscribe.ts
public/sw.js
.env.example
platform/README.md          (stretch)
supabase/migrations/        (SQL for review)
```

---

## Task log

| Date | Task | Result |
|------|------|--------|
| 2026-07-07 | Step 0: Create PLAN.md | Done |
| 2026-07-07 | Milestones 1–7: reader, content, Supabase client, subscribe, analytics, SW, Capacitor docs | Done |
| 2026-07-07 | Migration grants + `supabase/SETUP.md`; browser QA on dev build | Done |
