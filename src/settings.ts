export type FontSize = "default" | "large";

export interface ReaderSettings {
  reducedMotion: boolean;
  fontSize: FontSize;
}

const KEY = "fw-dispatches-settings";

const defaults: ReaderSettings = {
  reducedMotion: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  fontSize: "default",
};

export function loadSettings(): ReaderSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw) as Partial<ReaderSettings>;
    return {
      reducedMotion: parsed.reducedMotion ?? defaults.reducedMotion,
      fontSize: parsed.fontSize === "large" ? "large" : "default",
    };
  } catch {
    return { ...defaults };
  }
}

export function saveSettings(settings: ReaderSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch { /* ignore */ }
}

export function applySettings(settings: ReaderSettings): void {
  const root = document.documentElement;
  root.classList.toggle("reduced-motion", settings.reducedMotion);
  root.classList.toggle("font-large", settings.fontSize === "large");
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
