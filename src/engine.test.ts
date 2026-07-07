import { describe, it, expect } from "vitest";
import { StoryEngine, validateStory } from "./engine";
import { season1 } from "./story/season1";
import type { Story } from "./types";

describe("season1 data", () => {
  it("passes static validation (no dangling refs, all reachable, has an end, no em dashes)", () => {
    expect(validateStory(season1)).toEqual([]);
  });
  it("starts at the prologue", () => {
    expect(season1.start).toBe("prologue");
    expect(season1.nodes.prologue).toBeTruthy();
  });
});

describe("StoryEngine", () => {
  it("navigates choices and applies state flags", () => {
    const e = new StoryEngine(season1);
    e.choose(0);                 // prologue -> keeper1
    expect(e.currentId).toBe("keeper1");
    e.choose(0);                 // keeper1 -> keeper2a, sets keeper_tried=oil
    expect(e.state.keeper_tried).toBe("oil");
  });

  it("can be played from start to a marked ending", () => {
    const e = new StoryEngine(season1);
    let steps = 0;
    while (!e.isEnd() && steps < 100) { e.choose(0); steps++; }
    expect(e.isEnd()).toBe(true);
    expect(e.current.end).toBe(true);
    expect(e.current.cta).toBe(true);
  });

  it("resets to the start", () => {
    const e = new StoryEngine(season1);
    e.choose(0);
    e.reset();
    expect(e.currentId).toBe("prologue");
    expect(Object.keys(e.state).length).toBe(0);
  });

  it("respects `requires` on choices", () => {
    const s: Story = {
      title: "t", start: "a",
      nodes: {
        a: { id: "a", text: "start", choices: [
          { label: "always", to: "b" },
          { label: "gated", to: "b", requires: "hasKey" }
        ]},
        b: { id: "b", text: "the end", end: true }
      }
    };
    const e = new StoryEngine(s);
    expect(e.availableChoices().length).toBe(1);
    e.state.hasKey = true;
    expect(e.availableChoices().length).toBe(2);
  });
});
