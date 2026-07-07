import type { StoryEngine } from "./engine";
import type { Story } from "./types";
import { progressFraction, progressLabel } from "./chapters";
import type { ReaderSettings } from "./settings";
import type { SubscribeResult } from "./net/subscribe";

export interface RenderCallbacks {
  onChoose: (i: number) => void;
  onRestart: () => void;
  onBack: () => void;
  onSettingsChange: (settings: ReaderSettings) => void;
  onSubscribe: (email: string, honeypot: string) => Promise<SubscribeResult>;
  onCtaClick: (target: "subscribe" | "book") => void;
}

export interface RenderContext {
  story: Story;
  settings: ReaderSettings;
  canBack: boolean;
}

let lastChapter = "";

export function resetChapterTracking(): void {
  lastChapter = "";
}

export function render(
  engine: StoryEngine,
  root: HTMLElement,
  ctx: RenderContext,
  cb: RenderCallbacks
): void {
  const node = engine.current;
  const { settings } = ctx;
  root.innerHTML = "";

  const shell = el("div", "reader-shell");

  shell.appendChild(buildChrome(ctx.story, node.chapter, ctx.canBack, settings, cb));

  const view = el("div", "reader-view");
  view.setAttribute("aria-live", "polite");

  const card = el("div", "card");

  if (node.chapter && node.chapter !== lastChapter) {
    lastChapter = node.chapter;
    card.appendChild(el("div", "chapter", node.chapter));
    card.appendChild(el("div", "rule"));
  }
  if (node.speaker) card.appendChild(el("div", "speaker", node.speaker));

  const reveal = !settings.reducedMotion;
  node.text.split("\n\n").forEach((para, i) => {
    if (!para.trim()) return;
    const p = el("p", reveal ? "passage reveal" : "passage");
    if (reveal) p.style.animationDelay = `${i * 0.12}s`;
    p.textContent = para;
    card.appendChild(p);
  });

  if (engine.isEnd()) {
    if (node.cta) {
      card.appendChild(buildSubscribeBlock(cb));
    }
    const again = btn("Begin again", () => {
      resetChapterTracking();
      cb.onRestart();
    });
    again.classList.add("restart");
    card.appendChild(again);
  } else {
    const choices = el("div", "choices");
    engine.availableChoices().forEach((c, i) =>
      choices.appendChild(btn(c.label, () => cb.onChoose(i)))
    );
    card.appendChild(choices);
  }

  view.appendChild(card);
  shell.appendChild(view);
  root.appendChild(shell);

  const scrollBehavior = settings.reducedMotion ? "auto" : "smooth";
  root.scrollTo({ top: 0, behavior: scrollBehavior });
}

function buildChrome(
  story: Story,
  chapter: string | undefined,
  canBack: boolean,
  settings: ReaderSettings,
  cb: RenderCallbacks
): HTMLElement {
  const chrome = el("header", "reader-chrome");

  const progress = el("div", "progress-wrap");
  const { text, aria } = progressLabel(story, chapter);
  const label = el("div", "progress-label", text);
  label.setAttribute("aria-label", aria || "Reading progress");
  progress.appendChild(label);

  const track = el("div", "progress-track");
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", "100");
  const pct = Math.round(progressFraction(story, chapter) * 100);
  track.setAttribute("aria-valuenow", String(pct));
  track.setAttribute("aria-label", aria || "Season progress");
  const fill = el("div", "progress-fill");
  fill.style.width = `${pct}%`;
  track.appendChild(fill);
  progress.appendChild(track);
  chrome.appendChild(progress);

  const actions = el("div", "chrome-actions");

  const backBtn = btn("Back", cb.onBack);
  backBtn.className = "chrome-btn";
  backBtn.setAttribute("aria-label", "Go to previous passage");
  backBtn.disabled = !canBack;
  actions.appendChild(backBtn);

  const panel = el("div", "settings-panel");
  panel.id = "reader-settings";
  panel.hidden = true;

  const settingsBtn = btn("Reading", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    settingsBtn.setAttribute("aria-expanded", String(open));
  });
  settingsBtn.className = "chrome-btn";
  settingsBtn.setAttribute("aria-expanded", "false");
  settingsBtn.setAttribute("aria-controls", "reader-settings");
  actions.appendChild(settingsBtn);

  chrome.appendChild(actions);

  const motionLabel = el("label", "settings-row");
  const motionCheck = document.createElement("input");
  motionCheck.type = "checkbox";
  motionCheck.checked = settings.reducedMotion;
  motionCheck.id = "setting-reduced-motion";
  motionLabel.appendChild(motionCheck);
  motionLabel.appendChild(document.createTextNode(" Reduce motion"));
  panel.appendChild(motionLabel);

  const sizeLabel = document.createElement("label");
  sizeLabel.className = "settings-row";
  sizeLabel.htmlFor = "setting-font-size";
  sizeLabel.appendChild(document.createTextNode("Text size"));
  const sizeSelect = document.createElement("select");
  sizeSelect.id = "setting-font-size";
  sizeSelect.className = "settings-select";
  for (const [val, label] of [
    ["default", "Default"],
    ["large", "Large"],
  ] as const) {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = label;
    opt.selected = settings.fontSize === val;
    sizeSelect.appendChild(opt);
  }
  sizeLabel.appendChild(sizeSelect);
  panel.appendChild(sizeLabel);

  function applyFromPanel(): void {
    cb.onSettingsChange({
      reducedMotion: motionCheck.checked,
      fontSize: sizeSelect.value === "large" ? "large" : "default",
    });
  }

  motionCheck.addEventListener("change", applyFromPanel);
  sizeSelect.addEventListener("change", applyFromPanel);

  chrome.appendChild(panel);
  return chrome;
}

function buildSubscribeBlock(cb: RenderCallbacks): HTMLElement {
  const cta = el("div", "cta-block");
  cta.appendChild(el("div", "cta-title", "Stay on the record"));

  const form = document.createElement("form");
  form.className = "subscribe-form";
  form.noValidate = true;

  const emailLabel = document.createElement("label");
  emailLabel.className = "subscribe-label";
  emailLabel.textContent = "Your email";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.className = "subscribe-input";
  emailInput.required = true;
  emailInput.autocomplete = "email";
  emailInput.id = "subscribe-email";
  emailLabel.htmlFor = emailInput.id;
  form.appendChild(emailLabel);
  form.appendChild(emailInput);

  const honeypot = document.createElement("input");
  honeypot.type = "text";
  honeypot.name = "website";
  honeypot.className = "subscribe-honeypot";
  honeypot.tabIndex = -1;
  honeypot.autocomplete = "off";
  honeypot.setAttribute("aria-hidden", "true");
  form.appendChild(honeypot);

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "cta";
  submit.textContent = "Join the dispatches";
  form.appendChild(submit);

  const status = el("div", "subscribe-status");
  status.setAttribute("role", "status");
  form.appendChild(status);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit.disabled = true;
    status.textContent = "";
    void cb.onSubscribe(emailInput.value, honeypot.value).then((result) => {
      submit.disabled = false;
      if (result === "success") {
        status.textContent = "You are on the record. Watch for the next dispatch.";
        form.reset();
      } else if (result === "duplicate") {
        status.textContent = "That address is already on the record.";
      } else if (result === "offline") {
        status.textContent = "Cannot reach the archive right now. Try again when you are online.";
      } else {
        status.textContent = "Something went wrong. Check the address and try again.";
      }
    });
  });

  cta.appendChild(form);

  const a2 = el("a", "cta plain") as HTMLAnchorElement;
  a2.textContent = "Read the opening";
  a2.href = "https://fallenwyrms.com/the-opening.html";
  a2.target = "_blank";
  a2.rel = "noopener";
  a2.addEventListener("click", () => cb.onCtaClick("book"));
  cta.appendChild(a2);

  return cta;
}

function el(tag: string, cls: string, text?: string): HTMLElement {
  const e = document.createElement(tag);
  e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function btn(label: string, on: () => void): HTMLButtonElement {
  const b = document.createElement("button");
  b.className = "choice";
  b.type = "button";
  b.textContent = label;
  b.addEventListener("click", on);
  return b;
}
