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
    --viewport-bezel-width: 0.25em;

    --code-expand-duration: var(--wa-transition-fast, 0.3s);
    --code-collapse-duration: var(--wa-transition-normal, 0.3s);

    display: flex;
    flex-flow: column;
    border: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-code-demo-rounding, var(--wa-border-radius-m));
    color: var(--wa-color-text-normal);
    margin-block-end: var(--wa-flow-spacing);
    background: var(--preview-backdrop);
    interpolate-size: allow-keywords;
  }

  /* Different defaults for isolated demos */
  :host([viewport]) {
    --preview-resize: both;
    --preview-backdrop: var(--preview-background);
    --preview-padding: var(--wa-space-l, 1rem);
  }

  #preview {
    display: block;
    padding: var(--preview-padding);
    border-block-end: inherit;
    border-block-end-width: var(--divider-width);
    border-start-start-radius: inherit;
    border-start-end-radius: inherit;
    background: var(--preview-background);
    contain: inline-size;
    container-type: inline-size;
    container-name: preview;

    &:has(#viewport) {
      background: var(--preview-backdrop);
    }

    &:not(:has(#viewport)) {
      max-width: min(var(--preview-max-width), 100%);
      min-width: var(--preview-min-width, min-content);
    }

    &:not(:has(#viewport)),
    #viewport {
      resize: var(--preview-resize);
      overflow: auto;
    }

    > :first-child {
      margin-block-start: 0;
    }

    > :last-child {
      margin-block-end: 0;
    }
  }

  #source {
    border-block-end: inherit;
    overflow: hidden;
    transition-property: height, display;
    transition-behavior: allow-discrete;

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

  .toggle wa-icon {
    transition-property: rotate;
  }

  :host(:not([open])) {
    #source,
    .toggle wa-icon {
      transition-duration: var(--code-collapse-duration);
    }

    #source {
      /* Collapsed */
      height: 0px;
      display: none;
    }
  }

  :host([open]) {
    #source,
    .toggle wa-icon {
      transition-duration: var(--code-expand-duration);
    }

    #source {
      /* Expanded */
      height: auto;
      display: block;
    }

    .toggle wa-icon {
      rotate: 180deg;
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
        background: var(--wa-color-surface-lowered, rgb(0 0 0 / 0.05));
      }

      &:first-child {
        /* bottom left in en */
        border-end-start-radius: inherit;
      }

      &:last-child {
        /* bottom right in en */
        border-end-end-radius: inherit;
      }

      &:not(:first-child) {
        /* bottom left in en */
        border-end-start-radius: 0;
        border-inline-start: inherit;
        border-inline-start-width: var(--divider-width);
      }

      &:not(:last-child) {
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
