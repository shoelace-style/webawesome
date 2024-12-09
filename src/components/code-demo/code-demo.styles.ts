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

  #viewport {
    --zoom: 1;

    display: flex;
    flex-flow: column;
    align-items: end;
    width: 100%;
    height: fit-content;

    min-width: var(--preview-min-width, 2em);
    max-width: min(var(--preview-max-width), 100%);

    /* Style iframe like a window */
    border: var(--viewport-bezel-width) solid transparent;
    border-radius: calc(var(--wa-border-radius-s));

    /* Window-like frame styling */
    background:
      radial-gradient(circle closest-side, var(--wa-color-red-60) 80%, var(--wa-color-red-50) 98%, transparent) 0.4em,
      radial-gradient(circle closest-side, var(--wa-color-yellow-80) 80%, var(--wa-color-yellow-70) 98%, transparent)
        1.1em,
      radial-gradient(circle closest-side, var(--wa-color-green-70) 80%, var(--wa-color-green-60) 98%, transparent)
        1.8em;
    background-color: var(--wa-color-gray-95);
    background-size: 0.5em 0.5em;
    background-position-y: 0.4em;
    background-origin: border-box;
    background-repeat: no-repeat;
    box-shadow:
      0 0 0 1px var(--wa-color-gray-90),
      var(--wa-shadow-m);

    /* User has not yet resized the viewport */
    &:not([style*='height:']) {
      aspect-ratio: var(--viewport-initial-aspect-ratio);
    }

    iframe {
      display: block;
      width: 100%;
      height: 100%;
      zoom: var(--zoom);

      /* Divide with var(--zoom) to get lengths that stay constant regardless of zoom level */
      border: calc(0px / var(--zoom)) solid var(--wa-color-gray-90);
      padding: 0em; /* we want this to be scaled by the zoom level */
      background: var(--preview-background);
    }
  }

  [part~='viewport-info'] {
    margin-top: -0.15em;
    font-size: var(--wa-font-size-xs);
    padding-block-end: 0.25em;
    padding-inline-end: 0.15em;

    .dimensions {
      word-spacing: -0.15em;
    }

    wa-icon,
    .zoom {
      &:is(:host([viewport='']) *) {
        opacity: 50%;
      }
    }

    wa-icon {
      margin-inline-start: 0.5em;
      vertical-align: -0.1em;
      font-size: 85%;
      color: var(--wa-color-gray-70);
    }

    .zoom {
      font-weight: 600;
      color: var(--wa-color-text-quiet);
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
