import type { Story, StoryNode, Choice } from "./types";

export type State = Record<string, boolean | number | string>;

export class StoryEngine {
  readonly story: Story;
  currentId: string;
  state: State = {};

  constructor(story: Story) {
    this.story = story;
    this.currentId = story.start;
  }

  get current(): StoryNode {
    const n = this.story.nodes[this.currentId];
    if (!n) throw new Error(`Unknown node: ${this.currentId}`);
    return n;
  }

  /** Choices visible given current state (respecting `requires`). */
  availableChoices(): Choice[] {
    const c = this.current.choices ?? [];
    return c.filter((ch) => !ch.requires || !!this.state[ch.requires]);
  }

  /** Follow a visible choice by its index in availableChoices(). */
  choose(index: number): StoryNode {
    const choices = this.availableChoices();
    const ch = choices[index];
    if (!ch) throw new Error(`No choice at index ${index}`);
    if (ch.set) for (const [k, v] of Object.entries(ch.set)) this.state[k] = v;
    if (!this.story.nodes[ch.to]) throw new Error(`Choice points to unknown node: ${ch.to}`);
    this.currentId = ch.to;
    return this.current;
  }

  isEnd(): boolean {
    return !!this.current.end || this.availableChoices().length === 0;
  }

  reset(): void {
    this.currentId = this.story.start;
    this.state = {};
  }
}

/** Static validation used by tests and CI: returns a list of problems (empty = valid). */
export function validateStory(story: Story): string[] {
  const errors: string[] = [];
  const ids = new Set(Object.keys(story.nodes));
  if (!ids.has(story.start)) errors.push(`start node "${story.start}" does not exist`);
  for (const node of Object.values(story.nodes)) {
    if (!node.text || !node.text.trim()) errors.push(`node "${node.id}" has empty text`);
    if (node.text && node.text.includes("—")) errors.push(`node "${node.id}" contains an em dash (house rule: none)`);
    const choices = node.choices ?? [];
    if (choices.length === 0 && !node.end) errors.push(`node "${node.id}" has no choices and is not marked end`);
    for (const ch of choices) {
      if (!ids.has(ch.to)) errors.push(`node "${node.id}" choice "${ch.label}" points to missing node "${ch.to}"`);
      if (!ch.label || !ch.label.trim()) errors.push(`node "${node.id}" has a choice with no label`);
    }
  }
  // reachability from start
  const seen = new Set<string>();
  const stack = [story.start];
  while (stack.length) {
    const id = stack.pop()!;
    if (seen.has(id) || !ids.has(id)) continue;
    seen.add(id);
    for (const ch of story.nodes[id].choices ?? []) stack.push(ch.to);
  }
  for (const id of ids) if (!seen.has(id)) errors.push(`node "${id}" is unreachable from start`);
  // at least one reachable ending
  const hasEnd = [...seen].some((id) => story.nodes[id].end);
  if (!hasEnd) errors.push("no reachable node is marked end");
  return errors;
}
