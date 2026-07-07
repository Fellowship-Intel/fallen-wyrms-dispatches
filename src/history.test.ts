import { describe, it, expect } from "vitest";
import { StoryEngine } from "./engine";
import { season1 } from "./story/season1";
import { chapterOrder, progressLabel, viewpointChapters } from "./chapters";
import { PlayHistory } from "./history";

describe("chapters", () => {
  it("lists chapters in narrative order", () => {
    const order = chapterOrder(season1);
    expect(order[0]).toBe("Prologue");
    expect(order).toContain("The Keeper");
    expect(order).toContain("The Highborn");
    expect(order[order.length - 1]).toBe("The Record");
  });

  it("counts five viewpoint chapters", () => {
    expect(viewpointChapters(season1).length).toBe(5);
  });

  it("labels prologue and epilogue distinctly", () => {
    expect(progressLabel(season1, "Prologue").text).toBe("Prologue");
    expect(progressLabel(season1, "The Record").text).toBe("Epilogue");
    expect(progressLabel(season1, "The Keeper").text).toBe("Chapter 1 of 5");
  });
});

describe("PlayHistory", () => {
  it("back restores prior state without duplicating flags", () => {
    const engine = new StoryEngine(season1);
    const hist = new PlayHistory(season1.start);

    engine.choose(0); // prologue -> keeper1
    hist.push(engine.currentId, engine.state);
    engine.choose(0); // keeper1 -> keeper2a, sets keeper_tried=oil
    hist.push(engine.currentId, engine.state);
    expect(engine.state.keeper_tried).toBe("oil");

    const prev = hist.back()!;
    engine.currentId = prev.nodeId;
    engine.state = { ...prev.state };
    expect(engine.currentId).toBe("keeper1");
    expect(engine.state.keeper_tried).toBeUndefined();

    engine.choose(1); // keeper1 -> keeper2b, sets keeper_tried=breath
    hist.push(engine.currentId, engine.state);
    expect(engine.state.keeper_tried).toBe("breath");
    expect(engine.state.keeper_tried).not.toBe("oil");
  });

  it("truncates forward branch when choosing after back", () => {
    const hist = new PlayHistory("a");
    hist.push("b", { x: 1 });
    hist.push("c", { x: 2 });
    hist.back();
    expect(hist.canBack()).toBe(true);
    hist.push("d", { x: 3 });
    expect(hist.canBack()).toBe(true);
    hist.back();
    const entry = hist.back();
    expect(entry?.nodeId).toBe("a");
  });
});
