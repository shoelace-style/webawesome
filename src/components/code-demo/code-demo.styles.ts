import { css } from 'lit';

export default css`
  :host {
    --preview-background: var(--wa-color-surface-default, canvas);
    --preview-backdrop: var(--wa-color-surface-lowered, rgb(0 0 0 / 0.25));
    --preview-resize: inline;
    --preview-min-width: min-content;
    --preview-max-width: 100%;
    --preview-padding: var(--wa-space-2xl, 2rem);
    --divider-width: var(--wa-border-width-s, 1px);
    --viewport-initial-aspect-ratio: 16 / 9;

    display: block;
    border: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-code-demo-rounding, var(--wa-border-radius-m));
    color: var(--wa-color-text-normal);
    margin-block-end: var(--wa-flow-spacing);
    background: var(--preview-backdrop);
  }

  #preview {
    display: block;

    min-width: var(--preview-min-width, min-content);
    max-width: min(var(--preview-max-width), 100%);
    padding: var(--preview-padding);
    border-block-end: inherit;
    border-block-end-width: var(--divider-width);
    border-start-start-radius: inherit;
    border-start-end-radius: inherit;
    background: var(--preview-background);
    contain: inline-size;
    container-type: inline;
    container-name: preview;

    &:not(:has(> iframe)),
    > iframe {
      resize: var(--preview-resize);
      overflow: auto;
    }

    > :first-child {
      margin-block-start: 0;
    }

    > :last-child {
      margin-block-end: 0;
    }

    > iframe {
      /* Convert pure numbers to lengths */
      --viewport-width: calc(var(--viewport-width-px) * 1px);
      --viewport-height: calc(var(--viewport-height-px) * 1px);

      /* Values with fallback */
      --_width: var(--viewport-width, 100%);
      --_height: var(--viewport-height, calc(var(--viewport-width) / (var(--viewport-initial-aspect-ratio))));

      --_zoom: calc(var(--preview-width-inner-px) / var(--viewport-width-px));
      --zoom: var(--_zoom, 1);
      zoom: var(--_zoom);

      width: var(--_width);
      height: var(--viewport-height);

      box-sizing: border-box;

      /* TODO style iframe like a window */
      border: calc(1px / var(--zoom)) var(--wa-color-gray-80) solid;
      border-radius: calc(var(--wa-border-radius-s) / var(--zoom));
    }
  }

  #source {
    border-block-end: inherit;

    &:not(:host([open]) *) {
      display: none;
    }
  }

  :host([open]) {
    .toggle wa-icon {
      rotate: 180deg;
    }
  }

  #source {
    &::slotted(pre) {
      position: relative;
      border-radius: 0 !important;
      margin: 0;
      white-space: normal;
    }

    &:has(+ #buttons) {
      border-end-start-radius: 0;
      border-end-end-radius: 0;
    }

    &:not(:has(+ #buttons)) {
      border-bottom: none;
    }
  }

  #buttons {
    display: flex;
    align-items: stretch;
    background: var(--controls-background, var(--wa-color-surface-default, canvas));
    border-end-start-radius: inherit;
    border-end-end-radius: inherit;
    border: inherit;
    /* so that we don't get a visible border
      border-style: none would be better but it affects how the others cascade :(
     */
    border-width: 0;

    button {
      all: unset;
      flex: 1 0 auto;
      font-size: 0.875rem;
      color: var(--wa-color-text-quiet);
      text-align: center;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background: var(--wa-color-surface-raised, rgb(0 0 0 / 0.05));
      }

      &:not(:first-of-type) {
        /* bottom left in en */
        border-end-start-radius: 0;
        border-inline-start: inherit;
        border-inline-start-width: var(--divider-width);
      }

      &:not(:last-of-type) {
        /* bottom right in en */
        border-end-end-radius: 0;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
      }
    }

    .pen {
      flex: 0 0 100px;
      white-space: nowrap;
    }

    wa-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.1em;
    }
  }
`;
