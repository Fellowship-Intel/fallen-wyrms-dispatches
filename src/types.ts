// Story data model for Fallen Wyrms: Dispatches.
export interface Choice {
  label: string;
  to: string;                       // id of the next node
  set?: Record<string, boolean | number | string>; // optional state flags to apply
  requires?: string;                // optional flag that must be truthy for this choice to show
}
export interface StoryNode {
  id: string;
  chapter?: string;                 // shows a chapter divider when it changes
  speaker?: string;                 // e.g., "The Chronicler"
  text: string;                     // the passage (may contain simple \n paragraphs)
  choices?: Choice[];               // omit for endings
  end?: boolean;                    // terminal node
  cta?: boolean;                    // show the newsletter / read-the-book call to action
}
export interface Story {
  title: string;
  start: string;
  nodes: Record<string, StoryNode>;
}
