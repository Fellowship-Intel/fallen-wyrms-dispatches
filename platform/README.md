# Store wrap (stretch)

This PWA can ship to app stores via [Capacitor](https://capacitorjs.com/) without changing the story engine.

## Steps

1. Build the web app: `npm run build`
2. Install Capacitor in this repo: `npm install @capacitor/core @capacitor/cli`
3. Initialize: `npx cap init "Fallen Wyrms Dispatches" com.fallenwyrms.dispatches --web-dir dist`
4. Add platforms: `npx cap add ios` and `npx cap add android`
5. Copy web build after each release: `npx cap copy`
6. Open native projects: `npx cap open ios` / `npx cap open android`

## Environment

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` before `npm run build` so the bundled app includes them, or inject via native build configs for production.

## Icons and splash

Reuse `public/icons/` (512 and maskable variants). Generate platform splash screens from the sigil in Xcode and Android Studio asset tools.

## Offline

The service worker in `public/sw.js` caches the app shell. Capacitor WebView loads the same `dist/` output; offline play works after first launch with network.

## Not in MVP scope

Push notifications, in-app purchases, and native account systems are out of scope for the Dispatches MVP.
