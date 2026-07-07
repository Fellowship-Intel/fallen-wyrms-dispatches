const KEY = "fw-dispatches-player-id";

export function getPlayerId(): string {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "offline-player";
  }
}
