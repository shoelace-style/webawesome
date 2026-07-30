import { css } from 'lit';

export default css`
  :host(:focus) {
    outline: none;
  }

  /* Segments container */
  .segments {
    position: relative;
    /* Codes read left-to-right regardless of locale — keep segment order and caret movement LTR
       even when the surrounding page is RTL. */
    direction: ltr;
    display: inline-flex;
    align-items: center;
    align-self: start;
    gap: var(--segment-gap, var(--wa-space-xs));
    cursor: text;
    /* Never grow past the host's available width — long values or large segment sizes scroll
       horizontally instead of overflowing the page. */
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    /* Setting overflow-x forces overflow-y to also compute to non-visible, which would otherwise
       clip the focus ring's bleed around the active segment — above/below for any segment, and
       left/right for the first/last segment specifically. Reserve room for it with padding, then
       cancel the layout impact with an equal negative margin on both axes. */
    padding: calc(var(--wa-focus-ring-offset) + var(--wa-focus-ring-width));
    margin: calc(-1 * (var(--wa-focus-ring-offset) + var(--wa-focus-ring-width)));
  }

  .segments::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  :host(:state(disabled)) .segments {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host(:state(readonly)) .segments {
    cursor: default;
  }

  /* Focus ring on the active segment, and on every segment in a multi-character selection */
  .segments:focus-within .segment--active,
  .segments:focus-within .segment--selected {
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Readonly has no per-segment active/selected state (see render()), so every segment rings
     at once to show the control as a whole has focus. */
  :host(:state(readonly)) .segments:focus-within .segment {
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Contained segments sit flush with zero gap and have no border of their own, so a ring drawn
     outside the segment edge (the default, positive offset) bleeds into the neighboring segment.
     Draw it inward instead so it stays within this segment's own box. */
  :host([appearance='contained']) .segments:focus-within .segment--active,
  :host([appearance='contained']) .segments:focus-within .segment--selected,
  :host([appearance='contained']:state(readonly)) .segments:focus-within .segment {
    outline-offset: calc(-1 * var(--wa-focus-ring-width));
  }

  /* Hidden real input — off-screen but focusable.
     Chromium mishandles typing over a full selection (drops the inserted character) when a
     text input has zero layout size, so this stays a non-zero 1x1px box instead of 0x0. */
  .hidden-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    border: none;
    padding: 0;
    margin: 0;
  }

  /* Individual visual segment */
  .segment {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--segment-size, 2.5em);
    height: var(--segment-size, 2.5em);
    border-radius: var(--segment-border-radius, var(--wa-form-control-border-radius));
    font-size: 1em;
    font-family: inherit;
    font-variant-numeric: tabular-nums;
    position: relative;
    user-select: none;
    /* Zero-width outline present at all times so the focus ring can grow in smoothly
       instead of popping in the instant .segment--active/--selected starts matching. */
    outline: var(--wa-focus-ring-style) 0 var(--wa-color-focus);
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast),
      outline-width var(--wa-transition-fast),
      outline-offset var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
  }

  /* Blinking caret in the active segment */
  .caret {
    position: absolute;
    width: 1.5px;
    height: 60%;
    background-color: currentColor;
    animation: wa-otp-caret-blink 1s step-end infinite;
  }

  @keyframes wa-otp-caret-blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  /* Literal separator character between segment groups */
  .segment-literal {
    display: inline-block;
    flex-shrink: 0;
    color: var(--wa-color-text-quiet);
    white-space: pre;
    user-select: none;
  }

  /* Appearance: outlined (default) */
  :host([appearance='outlined']) .segment,
  :host(:not([appearance])) .segment {
    background-color: var(--wa-form-control-background-color);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
  }

  /* Appearance: filled */
  :host([appearance='filled']) .segment {
    background-color: var(--wa-color-neutral-fill-quiet);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) transparent;
  }

  /* Appearance: filled-outlined */
  :host([appearance='filled-outlined']) .segment {
    background-color: var(--wa-color-neutral-fill-quiet);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
  }

  /* Appearance: contained */
  :host([appearance='contained']) .segments {
    gap: 0;
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--segment-border-radius, var(--wa-form-control-border-radius));
    background-color: var(--wa-form-control-background-color);
    overflow: hidden;
    /* The focus ring is drawn inward here (see outline-offset above), so there's no outward bleed
       to reserve room for. .segments is also the visible bordered box in this appearance, so the
       padding/negative-margin bleed trick from the base rule would visibly shift and inflate it. */
    padding: 0;
    margin: 0;
  }

  :host([appearance='contained']) .segment {
    border: none;
    border-radius: 0;
  }

  /* Dividers between contained segments */
  :host([appearance='contained']) .segment + .segment,
  :host([appearance='contained']) .segment-literal + .segment {
    border-left: var(--wa-form-control-border-width) var(--wa-form-control-border-style)
      var(--wa-form-control-border-color);
  }

  /* ── Active segment (where next char will go), and every segment in a multi-character
     selection (e.g. from Cmd/Ctrl+A) — same border + focus-ring treatment for both.
     :host(...) wrapper matches the specificity of the appearance rules above so this
     border-color isn't silently lost to the cascade. ── */
  :host(:not(:state(readonly))) .segment--active,
  :host(:not(:state(readonly))) .segment--selected {
    border-color: var(--wa-color-focus);
  }

  /* Masked filled character, and the empty-segment hint shown when with-mask is set, both draw
     --mask-char via a pseudo-element instead of real text, so a masked value never touches the
     DOM as plain text (nothing to find via view-source or copy). */
  .segment--masked::before,
  .segment--mask-hint::before {
    content: var(--mask-char, '•');
  }

  .segment--mask-hint::before {
    opacity: 0.35;
  }
`;
