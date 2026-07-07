import type { Story } from "./types";

/** Unique chapter titles in narrative order (BFS from start). */
export function chapterOrder(story: Story): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  const visited = new Set<string>();
  const queue = [story.start];
  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const node = story.nodes[id];
    if (node.chapter && !seen.has(node.chapter)) {
      seen.add(node.chapter);
      order.push(node.chapter);
    }
    for (const ch of node.choices ?? []) queue.push(ch.to);
  }
  return order;
}

/** Viewpoint chapters only (excludes Prologue and The Record). */
export function viewpointChapters(story: Story): string[] {
  return chapterOrder(story).filter((c) => c !== "Prologue" && c !== "The Record");
}

export function progressLabel(story: Story, chapter?: string): { text: string; aria: string } {
  if (!chapter) return { text: "", aria: "" };
  if (chapter === "Prologue") return { text: "Prologue", aria: "Prologue" };
  if (chapter === "The Record") return { text: "Epilogue", aria: "Epilogue" };
  const views = viewpointChapters(story);
  const idx = views.indexOf(chapter);
  if (idx >= 0) {
    const n = idx + 1;
    const total = views.length;
    return {
      text: `Chapter ${n} of ${total}`,
      aria: `Chapter ${n} of ${total}, ${chapter}`,
    };
  }
  return { text: chapter, aria: chapter };
}

/** Progress fraction 0–1 for the bar (Prologue = 0, Epilogue = 1). */
export function progressFraction(story: Story, chapter?: string): number {
  const order = chapterOrder(story);
  if (!chapter || order.length <= 1) return 0;
  const idx = order.indexOf(chapter);
  if (idx < 0) return 0;
  return idx / (order.length - 1);
}
