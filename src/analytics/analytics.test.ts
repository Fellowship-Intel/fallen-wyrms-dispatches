import { describe, it, expect } from "vitest";
import { NoopAnalytics, trackEvent, setAnalyticsProvider } from "./analytics";

describe("analytics", () => {
  it("noop provider does not throw", () => {
    setAnalyticsProvider(new NoopAnalytics());
    expect(() =>
      trackEvent({ type: "choice_made", season: "season1", nodeId: "a", choiceIndex: 0 })
    ).not.toThrow();
  });
});
