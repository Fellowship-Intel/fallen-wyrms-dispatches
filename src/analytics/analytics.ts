import { getSupabase } from "../net/supabase";
import { getPlayerId } from "../state/player";

export type AnalyticsEvent =
  | { type: "choice_made"; season: string; nodeId: string; choiceIndex: number }
  | { type: "chapter_complete"; season: string; chapter: string }
  | { type: "season_complete"; season: string }
  | { type: "cta_click"; target: "subscribe" | "book" };

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
}

export class NoopAnalytics implements AnalyticsProvider {
  track(_event: AnalyticsEvent): void { /* noop */ }
}

export class SupabaseAnalytics implements AnalyticsProvider {
  track(event: AnalyticsEvent): void {
    const sb = getSupabase();
    if (!sb) return;
    const playerId = getPlayerId();
    void (async () => {
      try {
        if (event.type === "choice_made") {
          await sb.from("choice_events").insert({
            player_id: playerId,
            season: event.season,
            node_id: event.nodeId,
            choice_index: event.choiceIndex,
          });
        }
      } catch { /* offline */ }
    })();
  }
}

let provider: AnalyticsProvider = new NoopAnalytics();

export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
}

export function initAnalytics(): void {
  provider = getSupabase() ? new SupabaseAnalytics() : new NoopAnalytics();
}

export function trackEvent(event: AnalyticsEvent): void {
  provider.track(event);
}
