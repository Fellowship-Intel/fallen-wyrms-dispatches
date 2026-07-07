import { describe, it, expect } from "vitest";
import { pickNewerSave } from "./save";

describe("pickNewerSave", () => {
  const a = { currentId: "a", state: {}, updatedAt: "2026-01-01T00:00:00.000Z" };
  const b = { currentId: "b", state: { x: 1 }, updatedAt: "2026-06-01T00:00:00.000Z" };

  it("returns the only save when one is null", () => {
    expect(pickNewerSave(null, b)).toBe(b);
    expect(pickNewerSave(a, null)).toBe(a);
  });

  it("returns the newer save by updatedAt", () => {
    expect(pickNewerSave(a, b)).toBe(b);
    expect(pickNewerSave(b, a)).toBe(b);
  });
});
