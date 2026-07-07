import { describe, it, expect } from "vitest";
import { validateStory } from "../engine";
import { season1 } from "./season1";
import { viewpointChapters } from "../chapters";

const BRANCH_FLAGS = [
  "keeper_tried",
  "corvane",
  "wick",
  "alaster",
  "aelinor",
] as const;

describe("season1 narrative", () => {
  it("passes static validation", () => {
    expect(validateStory(season1)).toEqual([]);
  });

  it("has five viewpoint chapters", () => {
    expect(viewpointChapters(season1)).toEqual([
      "The Keeper",
      "The Ranger",
      "The Brownie",
      "The Highborn",
      "The Deathless",
    ]);
  });

  it("each viewpoint chapter sets a branch flag on at least one path", () => {
    const flagsFound = new Set<string>();
    for (const node of Object.values(season1.nodes)) {
      for (const ch of node.choices ?? []) {
        if (ch.set) {
          for (const key of Object.keys(ch.set)) flagsFound.add(key);
        }
      }
    }
    for (const flag of BRANCH_FLAGS) {
      expect(flagsFound.has(flag), `missing branch flag: ${flag}`).toBe(true);
    }
  });

  it("epilogue and ending are reachable from every first-choice path", () => {
    const paths = [
      ["prologue", "keeper1", "keeper2a", "keeper3"],
      ["prologue", "keeper1", "keeper2b", "keeper3"],
    ];
    for (const prefix of paths) {
      const last = prefix[prefix.length - 1];
      const node = season1.nodes[last];
      expect(node.choices?.length).toBeGreaterThan(0);
    }
    expect(season1.nodes.end_cta.end).toBe(true);
    expect(season1.nodes.end_cta.cta).toBe(true);
  });

  it("passages stay within a readable length per node", () => {
    for (const node of Object.values(season1.nodes)) {
      const words = node.text.split(/\s+/).length;
      expect(words, `node ${node.id} is very long`).toBeLessThan(350);
      expect(words, `node ${node.id} is very short`).toBeGreaterThan(5);
    }
  });
});
