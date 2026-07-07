import { StoryEngine } from "./engine";
import { season1 } from "./story/season1";
import { PlayHistory } from "./history";
import { applySettings, loadSettings, saveSettings, type ReaderSettings } from "./settings";
import { render, resetChapterTracking } from "./ui";
import { initAnalytics, trackEvent } from "./analytics/analytics";
import { loadProgress, persistProgress } from "./state/save";
import { subscribeEmail, type SubscribeResult } from "./net/subscribe";

const SEASON = "season1";
const root = document.getElementById("app")!;
const engine = new StoryEngine(season1);
const history = new PlayHistory(season1.start);
let settings = loadSettings();
let lastChapter = "";
applySettings(settings);
initAnalytics();

function save(): void {
  void persistProgress(SEASON, engine.currentId, engine.state);
}

function trackChapterIfNew(chapter?: string): void {
  if (chapter && chapter !== lastChapter && lastChapter) {
    trackEvent({ type: "chapter_complete", season: SEASON, chapter: lastChapter });
  }
  if (chapter) lastChapter = chapter;
}

function draw(): void {
  render(
    engine,
    root,
    { story: season1, settings, canBack: history.canBack() },
    {
      onChoose: choose,
      onRestart: restart,
      onBack: goBack,
      onSettingsChange: updateSettings,
      onSubscribe: handleSubscribe,
      onCtaClick: (target) => trackEvent({ type: "cta_click", target }),
    }
  );
}

function choose(i: number): void {
  const fromNode = engine.currentId;
  trackEvent({ type: "choice_made", season: SEASON, nodeId: fromNode, choiceIndex: i });
  engine.choose(i);
  trackChapterIfNew(engine.current.chapter);
  if (engine.isEnd() && engine.current.end) {
    trackEvent({ type: "season_complete", season: SEASON });
  }
  history.push(engine.currentId, engine.state);
  save();
  draw();
}

function goBack(): void {
  const prev = history.back();
  if (!prev) return;
  engine.currentId = prev.nodeId;
  engine.state = { ...prev.state };
  lastChapter = engine.current.chapter ?? lastChapter;
  save();
  draw();
}

function restart(): void {
  engine.reset();
  history.reset(season1.start);
  lastChapter = "";
  resetChapterTracking();
  save();
  draw();
}

function updateSettings(next: ReaderSettings): void {
  settings = next;
  saveSettings(settings);
  applySettings(settings);
  draw();
}

async function handleSubscribe(email: string, honeypot: string): Promise<SubscribeResult> {
  trackEvent({ type: "cta_click", target: "subscribe" });
  return subscribeEmail(email, honeypot);
}

async function boot(): Promise<void> {
  try {
    const legacy = localStorage.getItem("fw-dispatches-save");
    if (legacy && !localStorage.getItem(`fw-dispatches-save-${SEASON}`)) {
      const parsed = JSON.parse(legacy);
      if (parsed.currentId) {
        await persistProgress(SEASON, parsed.currentId, parsed.state ?? {});
        localStorage.removeItem("fw-dispatches-save");
      }
    }
  } catch { /* ignore */ }

  const saved = await loadProgress(SEASON);
  if (saved && season1.nodes[saved.currentId]) {
    engine.currentId = saved.currentId;
    engine.state = saved.state ?? {};
    history.restore(engine.currentId, engine.state);
    lastChapter = engine.current.chapter ?? "";
  }
  draw();
}

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => { /* ignore */ });
}

void boot();
