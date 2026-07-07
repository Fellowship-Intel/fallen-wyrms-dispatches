import type { State } from "../engine";
import { getSupabase } from "../net/supabase";
import { getPlayerId } from "./player";

export interface SaveData {
  currentId: string;
  state: State;
  updatedAt: string;
}

const localKey = (season: string) => `fw-dispatches-save-${season}`;

export function loadLocal(season: string): SaveData | null {
  try {
    const raw = localStorage.getItem(localKey(season));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    if (!parsed.currentId || !parsed.updatedAt) return null;
    return {
      currentId: parsed.currentId,
      state: parsed.state ?? {},
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
}

export function saveLocal(season: string, data: SaveData): void {
  try {
    localStorage.setItem(localKey(season), JSON.stringify(data));
  } catch { /* ignore */ }
}

export async function loadRemote(season: string): Promise<SaveData | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const playerId = getPlayerId();
  const { data, error } = await sb
    .from("reading_progress")
    .select("node_id, flags, updated_at")
    .eq("player_id", playerId)
    .eq("season", season)
    .maybeSingle();
  if (error || !data) return null;
  return {
    currentId: data.node_id,
    state: (data.flags as State) ?? {},
    updatedAt: data.updated_at,
  };
}

export async function saveRemote(season: string, data: SaveData): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const playerId = getPlayerId();
  await sb.from("reading_progress").upsert(
    {
      player_id: playerId,
      season,
      node_id: data.currentId,
      flags: data.state,
      updated_at: data.updatedAt,
    },
    { onConflict: "player_id,season" }
  );
}

/** Prefer the newer of local and remote saves. */
export function pickNewerSave(a: SaveData | null, b: SaveData | null): SaveData | null {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(b.updatedAt) > Date.parse(a.updatedAt) ? b : a;
}

export async function loadProgress(season: string): Promise<SaveData | null> {
  const local = loadLocal(season);
  let remote: SaveData | null = null;
  try {
    remote = await loadRemote(season);
  } catch { /* offline */ }
  return pickNewerSave(local, remote);
}

export async function persistProgress(season: string, currentId: string, state: State): Promise<void> {
  const data: SaveData = {
    currentId,
    state,
    updatedAt: new Date().toISOString(),
  };
  saveLocal(season, data);
  try {
    await saveRemote(season, data);
  } catch { /* offline */ }
}
