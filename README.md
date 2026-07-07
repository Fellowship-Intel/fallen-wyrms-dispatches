# Fallen Wyrms: Dispatches (Mobile/Web MVP)

Choice-driven interactive fiction in the Chronicler's voice. Web-first (works in any browser and installs as a PWA), later wrappable for the iOS/Android stores. This is the cheapest, fastest game MVP and a funnel to the newsletter and the novels.

## Quickstart
Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev      # local dev server (Vite) at the printed URL
npm test         # run the test suite (Vitest)
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
```

### Supabase (optional)
See **`supabase/SETUP.md`** for step-by-step instructions. Copy `.env.example` to `.env` and apply `supabase/migrations/001_initial.sql`. Without `.env`, the app runs fully on localStorage.

## What is here
- A small, dependency-free **story engine** (`src/engine.ts`) with static validation.
- **Season One** story data (`src/story/season1.ts`): five viewpoints on the opening night.
- A mobile-first **reader UI** with progress, back, settings, and subscribe form.
- Optional **Supabase** backend (progress, subscribers, choice analytics). Copy `.env.example` to `.env`.
- **PWA** with service worker for offline play after first load.
- **Tests** (`src/engine.test.ts`) that validate the story graph and the engine.
- **PWA** manifest so it installs to a phone home screen.

## Structure
```
src/
  types.ts        story data model
  engine.ts       StoryEngine + validateStory()
  ui.ts           renders the current node + choices
  main.ts         wiring, save/resume (localStorage), CTA hook
  style.css       brand theme (Void Black / Ember Gold, Cinzel + Cormorant)
  story/season1.ts  the content
  engine.test.ts  tests
canon/CANON.md    world premise + voice guide (read before writing story)
AGENTS.md         the build plan and rules for an AI coding agent
```

See **AGENTS.md** for the MVP task list and acceptance criteria.
