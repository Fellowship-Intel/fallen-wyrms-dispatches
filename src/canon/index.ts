// Typed access to the shared canon. Consumers can also import canon.json directly.
import data from "./canon.json";
import type { Canon, CanonEntry, CanonSection } from "./types";

export const canon = data as unknown as Canon;

export function section(key: string): CanonSection | undefined {
  return canon.sections.find((s) => s.key === key);
}
export function entry(id: string): CanonEntry | undefined {
  for (const s of canon.sections) {
    const e = s.entries.find((x) => x.id === id);
    if (e) return e;
  }
  return undefined;
}
export function allEntries(): CanonEntry[] {
  return canon.sections.flatMap((s) => s.entries);
}
export * from "./types";
