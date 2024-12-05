import { css } from 'lit';

export default css`
  :host {
    --preview-background: var(--wa-color-surface-default, canvas);
    --preview-backdrop: var(--wa-color-surface-lowered, rgb(0 0 0 / 0.25));
    --preview-resize: inline;
    --preview-min-width: min-content;
    --preview-max-width: 100%;

    display: block;
    border: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-code-demo-rounding, var(--wa-border-radius-m));
    color: var(--wa-color-text-normal);
    margin-block-end: var(--wa-flow-spacing);
    background: var(--preview-backdrop);
  }

  #preview {
    display: block;
    resize: var(--preview-resize);
    overflow: auto;
    min-width: var(--preview-min-width, min-content);
    max-width: min(var(--preview-max-width), 100%);
    padding: 2rem;
    border-block-end: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
    background: var(--preview-background);
    border-start-start-radius: inherit;
    border-start-end-radius: inherit;

    > :first-child {
      margin-block-start: 0;
    }

    > :last-child {
      margin-block-end: 0;
    }
  }

  #source {
    border-bottom: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);

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

    button {
      all: unset;
      flex: 1 0 auto;
      font-size: 0.875rem;
      color: var(--wa-color-text-quiet);
      border-left: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
      text-align: center;
      padding: 0.5rem;
      cursor: pointer;

      &:first-of-type {
        /* left in en */
        border-inline-start: none;
        /* bottom left in en */
        border-end-start-radius: var(--wa-code-demo-rounding, var(--wa-border-radius-m));
      }

      &:last-of-type {
        /* bottom right in en */
        border-end-end-radius: var(--wa-code-demo-rounding, var(--wa-border-radius-m));
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
