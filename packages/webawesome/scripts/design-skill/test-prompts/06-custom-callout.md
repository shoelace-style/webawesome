# Prompt 6 — customize a `<wa-callout>` with a different background

Build a single self-contained HTML page using Web Awesome. The page contains a `<wa-callout variant="brand">` with:

- A short bold lead-in heading
- A body paragraph of two or three sentences
- A leading icon

Customize the callout so its background is **darker** than the default `brand` variant — aim for something close to `--wa-color-brand-fill-loud`. The callout's body text and icon must remain clearly readable against that darker background.

Output a complete `<!doctype html>` document. Load Web Awesome from the CDN. Set a theme, palette, and color scheme on `<html>`. Reset `html`/`body`. Use design tokens — no raw hex or `px`.

## Failure modes this prompt exercises

(Don't mention these in the output. They're for the grader.)

- **wa-callout dark-on-dark.** Setting `background` on the `<wa-callout>` host without also setting the text color through the documented `message` part leaves the body text at the original `*-on-quiet` token — dark text on a now-dark background, unreadable.
- **Guessed parts/tokens.** The fix requires reading the callout's API (it exposes `message` and `icon` parts and supports host `background`/`color`). Outputs that guess a part name or assume `variant` resolves a particular way are failing the rule.
