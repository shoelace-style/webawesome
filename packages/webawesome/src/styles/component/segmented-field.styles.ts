import { css } from 'lit';

/**
 * Shared trailing-affordance styling for segmented-field pickers (`<wa-date-input>`,
 * `<wa-time-input>`). Keeps their clear and expand buttons — and their start/end decoration
 * slots — on the same trailing optical axis as `<wa-select>`'s chevron and end-slot icons,
 * while preserving each button's padded hit target and focus ring.
 *
 * How the alignment works:
 *  - Each button keeps `0.25em` padding (hit area + focus-ring breathing room).
 *  - `margin-inline-end: -0.25em` lets that trailing padding overhang the trailing content
 *    edge instead of pushing the glyph inboard.
 *  - Each button is given a fixed `inline-size` equal to its natural width (glyph + 2×padding):
 *    `1.75em` for the expand glyph (1.25em) and `1.5em` for the clear glyph (1em). Because the
 *    width is fixed and the glyph is centered, a custom-slotted icon of any width stays centered
 *    on the axis — the alignment is glyph-agnostic, not tuned to one icon.
 *  - The expand button's `margin-inline-start` sets the gap that positions the clear button onto
 *    `<wa-select>`'s clear axis given those fixed widths.
 */
export default css`
  /* font: inherit lifts the UA default button font-size so children that size with em
     (e.g. the expand icon) resolve against the host size-driven font-size instead of ~13px. */
  [part~='clear-button'],
  [part~='expand-button'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--wa-color-text-quiet);
    font: inherit;
    padding: 0.25em;
    /* Trailing padding overhangs the content edge rather than displacing the glyph. */
    margin-inline-end: -0.25em;
    border-radius: var(--wa-border-radius-s);
    transition: color var(--wa-transition-fast);
  }

  /* Fixed widths (= glyph + 2×0.25em padding) keep each glyph centered on the trailing axis
     regardless of the slotted icon's intrinsic width. */
  [part~='expand-button'] {
    inline-size: 1.75em;
    /* Leading gap that lands the clear button on <wa-select>'s clear axis. Scales with the
       form-control padding token (like select's own spacing) so it holds across themes; the
       0.125em offset accounts for the fixed button widths. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
  }

  [part~='clear-button'] {
    inline-size: 1.5em;
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  [part~='clear-button']:hover,
  [part~='expand-button']:hover {
    color: var(--wa-color-text-loud);
  }

  [part~='expand-button']:focus-visible {
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);
    outline-offset: 2px;
  }

  /* font-size scales the glyph with the host size attribute; the button width handles centering. */
  [part~='expand-icon'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--wa-color-text-quiet);
    font-size: 1.25em;
  }

  /* Start / end decoration slots. Spaced with the same --wa-form-control-padding-inline gap as
     <wa-input>/<wa-select> so slotted icons line up with the rest of the form controls, rather
     than the tighter 0.25em the pickers used before. */
  [part~='start'],
  [part~='end'] {
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
  }

  [part~='start']::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='end']::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }
`;
