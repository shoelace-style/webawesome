# Design-skill test prompts

A small corpus of prompts that exercise the failure modes the `webawesome-design` skill is written to prevent. Used to baseline an AI tool's output before/after edits to the skill, so we can tell whether a change actually helps.

## How to use

Each `NN-*.md` file contains a single prompt. Hand it (verbatim) to a fresh Claude Code session with the `webawesome-design` and `webawesome` skills installed; have it produce a single self-contained HTML file. Save the output under `outputs/baseline/NN-*.html` before any skill edits, then re-run after each edit and save to `outputs/post-edit/NN-*.html`.

Diff or visually inspect (open both in a browser, side by side).

## The prompts

Numbering matches the table in the review notes — prompts 1–8 from there. Initially scaffolded with the two highest-value tests:

- `05-brand-hero.md` — wa-button host-vs-part trap + outlined-on-matching-band invisibility
- `06-custom-callout.md` — wa-callout dark-on-dark via host-background override

Both target specific named failure modes in `SKILL.md` Rule 9. If those regress after an edit, the edit broke something. If they stay clean or improve, the edit is safe.

## Outputs

`outputs/baseline/` and `outputs/post-edit/` hold generated HTML for comparison. They're committed for the duration of a review iteration; gitignore them in the long run.
