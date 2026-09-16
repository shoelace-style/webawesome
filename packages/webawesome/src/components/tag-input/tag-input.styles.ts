import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      border-width: 0;
    }

    :host(:focus) {
      outline: none;
    }

    /* The bordered box. Tags and the text box wrap together inside it. */
    .tag-input {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.25em;
      position: relative;
      width: 100%;
      min-height: var(--wa-form-control-height);
      padding: 0 var(--wa-form-control-padding-inline);
      background-color: var(--wa-form-control-background-color);
      border-color: var(--wa-form-control-border-color);
      border-radius: var(--wa-form-control-border-radius);
      border-style: var(--wa-form-control-border-style);
      border-width: var(--wa-form-control-border-width);
      color: var(--wa-form-control-value-color);
      font-size: var(--wa-form-control-value-font-size);
      font-family: inherit;
      font-weight: var(--wa-form-control-value-font-weight);
      line-height: var(--wa-form-control-value-line-height);
      cursor: text;
      transition:
        background-color var(--wa-transition-normal),
        border-color var(--wa-transition-normal),
        outline-color var(--wa-transition-fast);
      transition-timing-function: var(--wa-transition-easing);
      outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
      outline-offset: var(--wa-focus-ring-offset);

      /* Only ring the box when the text box has focus. A focused tag draws its own ring. */
      &:has(input:focus) {
        outline-color: var(--wa-color-focus);
      }

      /* Tighten the padding around tags, using the same math as multiple selects */
      &.has-tags {
        --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

        padding-block: var(--_padding-with-tags);
        padding-inline-start: var(--_padding-with-tags);
      }

      /* Show autofill styles over the entire box, not just the native input */
      &:has(:autofill),
      &:has(:-webkit-autofill) {
        background-color: var(--wa-color-brand-fill-quiet) !important;
      }
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) .tag-input {
      background-color: var(--wa-form-control-background-color);
      border-color: var(--wa-form-control-border-color);
    }

    :host([appearance='filled']) .tag-input {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-color-neutral-fill-quiet);
    }

    :host([appearance='filled-outlined']) .tag-input {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-form-control-border-color);
    }

    :host([pill]) .tag-input {
      border-radius: var(--wa-border-radius-pill);
    }

    /* States */
    :host(:state(disabled)) .tag-input {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host(:state(disabled)) .tags {
      pointer-events: none;
    }

    :host(:state(readonly)) .tag-input {
      cursor: default;
    }

    /*
     * Tags. The list has no box of its own so each tag is laid out as a sibling of the text box and the text box
     * flows right after the last tag instead of dropping to its own line.
     */
    .tags {
      display: contents;
    }

    wa-tag {
      min-width: 0;
      max-width: 100%;
      cursor: default;

      &::part(content) {
        display: block;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:focus {
        outline: none;
      }

      &:focus-visible,
      &.tag--focused {
        outline: var(--wa-focus-ring);
        outline-offset: var(--wa-focus-ring-offset);
      }
    }

    /* Text box */
    input {
      flex: 1 1 8ch;
      min-width: 8ch;
      width: auto;
      height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: inherit;
      -webkit-appearance: none;

      /*
       * With tags present, match their height so lines stay even when the box wraps, and inset the text so it sits
       * 0.75em from the last tag (0.25em gap + 0.5em), the same inset a tag gives its own text. Without tags, the box's
       * inline padding positions the text and the input has none of its own.
       */
      .has-tags & {
        height: calc(var(--wa-form-control-height) * 0.8);
        padding-inline-start: 0.5em;
      }

      &:autofill {
        &,
        &:hover,
        &:focus,
        &:active {
          box-shadow: none;
          caret-color: var(--wa-form-control-value-color);
        }
      }

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }

      &::placeholder {
        color: var(--wa-form-control-placeholder-color);
        user-select: none;
        -webkit-user-select: none;
      }
    }

    /*
     * Start and end decorations. The slots keep their default display of contents, so the slotted element is the flex
     * item and an empty slot adds no gap. This also sidesteps slot detection, which can't run on the server.
     */
    .start::slotted(*),
    .end::slotted(*) {
      flex: 0 0 auto;
      cursor: default;
    }

    .start::slotted(wa-icon),
    .end::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }

    /* The box's gap already contributes 0.25em, so subtract it to match other form controls */
    .start::slotted(*) {
      margin-inline-end: calc(var(--wa-form-control-padding-inline) - 0.25em);
    }

    .end::slotted(*) {
      margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.25em);
    }

    /* Keep the start decoration aligned with the tighter padding that tags bring */
    .has-tags .start::slotted(*) {
      margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
    }

    /* Clear button */
    .clear {
      position: relative;
      display: inline-flex;
      align-self: center;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      height: 1.5em;
      font-size: inherit;
      color: var(--wa-color-neutral-on-quiet);
      border: none;
      border-radius: var(--wa-border-radius-s);
      background: none;
      padding: 0;
      transition: var(--wa-transition-normal) color;
      cursor: pointer;
      /* The button box is wider than the glyph, so overhang half of that growth on each side. Keeps the glyph
         flush with the box's trailing padding edge, like every other form control. */
      margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.375em);
      margin-inline-end: -0.125em;

      /* Enlarge the hit area to the full height of the box */
      &::after {
        content: '';
        position: absolute;
        inset-inline: 0;
        height: var(--wa-form-control-height);
      }

      @media (hover: hover) {
        &:hover {
          color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
        }
      }

      &:active {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
        outline-offset: var(--wa-focus-ring-offset);
      }
    }
  }
`;
