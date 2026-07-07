import type { State } from "./engine";

export interface HistoryEntry {
  nodeId: string;
  state: State;
}

/** Snapshot stack for in-run back navigation. Truncates forward branch on new choices. */
export class PlayHistory {
  private entries: HistoryEntry[];
  private index: number;

  constructor(startNodeId: string) {
    this.entries = [{ nodeId: startNodeId, state: {} }];
    this.index = 0;
  }

  get current(): HistoryEntry {
    return this.entries[this.index];
  }

  canBack(): boolean {
    return this.index > 0;
  }

  /** Restore the previous snapshot without re-applying choice flags. */
  back(): HistoryEntry | null {
    if (!this.index) return null;
    this.index--;
    return { nodeId: this.entries[this.index].nodeId, state: { ...this.entries[this.index].state } };
  }

  /** Record a forward step after a choice (truncates any forward branch). */
  push(nodeId: string, state: State): void {
    this.entries = this.entries.slice(0, this.index + 1);
    this.entries.push({ nodeId, state: { ...state } });
    this.index = this.entries.length - 1;
  }

  reset(startNodeId: string): void {
    this.entries = [{ nodeId: startNodeId, state: {} }];
    this.index = 0;
  }

  /** Resume mid-run: back is unavailable until the player moves forward again. */
  restore(nodeId: string, state: State): void {
    this.entries = [{ nodeId, state: { ...state } }];
    this.index = 0;
  }
}
