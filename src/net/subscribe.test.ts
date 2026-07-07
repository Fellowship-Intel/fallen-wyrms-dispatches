import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./supabase", () => ({
  getSupabase: vi.fn(),
}));

import { getSupabase } from "./supabase";
import { subscribeEmail } from "./subscribe";

describe("subscribeEmail", () => {
  beforeEach(() => {
    vi.mocked(getSupabase).mockReset();
  });

  it("rejects invalid email", async () => {
    expect(await subscribeEmail("", "")).toBe("error");
    expect(await subscribeEmail("not-an-email", "")).toBe("error");
  });

  it("returns offline when Supabase is not configured", async () => {
    vi.mocked(getSupabase).mockReturnValue(null);
    expect(await subscribeEmail("reader@example.com", "")).toBe("offline");
  });

  it("treats filled honeypot as success without calling the network", async () => {
    expect(await subscribeEmail("reader@example.com", "bot")).toBe("success");
    expect(getSupabase).not.toHaveBeenCalled();
  });
});
