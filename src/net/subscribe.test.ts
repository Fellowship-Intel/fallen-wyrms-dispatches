import { describe, it, expect } from "vitest";
import { subscribeEmail } from "./subscribe";

describe("subscribeEmail", () => {
  it("rejects invalid email when offline", async () => {
    expect(await subscribeEmail("", "")).toBe("error");
    expect(await subscribeEmail("not-an-email", "")).toBe("error");
  });

  it("returns offline when Supabase is not configured", async () => {
    expect(await subscribeEmail("reader@example.com", "")).toBe("offline");
  });

  it("treats filled honeypot as success without calling the network", async () => {
    expect(await subscribeEmail("reader@example.com", "bot")).toBe("success");
  });
});
