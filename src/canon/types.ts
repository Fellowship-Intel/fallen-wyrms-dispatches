// Types for the shared Fallen Wyrms canon data (canon.json). Player-safe.
export interface CanonEntry {
  id: string;
  name: string;
  epithet: string;
  camp?: string | null;
  description: string;
  role: string;        // suggested tabletop/game role
  powers: string;      // signature abilities/powers
  threat: string;      // Social | Low | Moderate | High | Legendary | Cosmic | Varies | "-"
  hooks: string[];     // adventure/story hooks
  image?: string;      // primary art filename (webp), lives in the shared art library
  images?: string[];   // for multi-image entries (e.g., Men)
}
export interface CanonSection {
  key: string;         // cast | pantheon | dragons | peoples | natural | corrupted | places | orders
  title: string;
  subtitle: string;
  blurb: string;
  entries: CanonEntry[];
}
export interface Camp { name: string; description: string; }
export interface StoryPart { heading: string; paragraphs: string[]; }
export interface Canon {
  title: string;
  subtitle: string;
  tagline: string;
  version: string;
  note: string;
  premise: string[];
  camps: Camp[];
  story: StoryPart[];
  sections: CanonSection[];
}
