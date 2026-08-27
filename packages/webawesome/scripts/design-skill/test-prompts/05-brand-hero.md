# Prompt 5 — brand-colored hero with primary + secondary buttons

Build a brand-colored hero band as a single self-contained HTML file using Web Awesome. The hero should sit at the top of an otherwise blank page and contain:

- A large headline
- A short supporting paragraph
- Two buttons side by side:
  - A primary "Get started" action
  - A secondary "Watch demo" action

The hero's background should be the brand color (use Web Awesome's brand fill). Both buttons need to be clearly visible against that background — readable label, readable border if outlined.

Output a complete `<!doctype html>` document. Load Web Awesome from the CDN. Set a theme, palette, and color scheme on `<html>`. Reset `html`/`body`. Use design tokens — no raw hex or `px`.

## Failure modes this prompt exercises

(Don't mention these in the output. They're for the grader.)

- **Host-vs-part button styling.** If the secondary button is restyled to be visible on the brand band, the restyling must go through `::part(base)` (or `variant`/`appearance` attributes) — not host `background`/`color`/`border` rules.
- **Outlined-on-matching-band invisibility.** A `<wa-button appearance="outlined" variant="brand">` placed on a brand-fill band has the same hue as the background; the outline and label vanish. The correct fix is to recolor `::part(base)` to a contrasting on-color token or use a filled neutral.
