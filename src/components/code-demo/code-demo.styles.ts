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
    container-type: inline-size;
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

      --_zoom: calc(var(--preview-width-px) / var(--viewport-width-px));
      --zoom: var(--_zoom, 1);
      zoom: var(--_zoom);

      width: var(--_width);
      height: var(--viewport-height);

      box-sizing: border-box;

      /* Style iframe like a window */

      --em: calc(1em / var(--zoom));
      --_bezel-width: var(--viewport-bezel-width, calc(0.25em / var(--zoom)));
      --_button-size: 0.5em;
      --_button-y: 0.4em;
      --_button-size-unzoomed: calc(var(--_button-size) / var(--zoom));
      --_button-y-unzoomed: calc(var(--_button-y) / var(--zoom));
      --_button-params: var(--_button-y-unzoomed) / var(--_button-size-unzoomed) var(--_button-size-unzoomed) border-box;

      box-sizing: border-box;
      border: var(--_bezel-width) solid transparent;
      border-top-width: calc(0.9 * var(--em) + var(--_bezel-width));
      border-radius: calc(var(--wa-border-radius-s) / var(--zoom));

      background:
        linear-gradient(var(--preview-background) 0 100%) 0 0 / 100% 100% padding-box,
        radial-gradient(circle closest-side, var(--wa-color-red-60) 80%, var(--wa-color-red-50) 98%, transparent)
          calc(0.4em / var(--zoom)) var(--_button-params),
        radial-gradient(circle closest-side, var(--wa-color-yellow-80) 80%, var(--wa-color-yellow-70) 98%, transparent)
          calc(1.1em / var(--zoom)) var(--_button-params),
        radial-gradient(circle closest-side, var(--wa-color-green-70) 80%, var(--wa-color-green-60) 98%, transparent)
          calc(1.8em / var(--zoom)) var(--_button-params);
      background-color: var(--wa-color-gray-95);
      background-origin: border-box;
      background-repeat: no-repeat;
      box-shadow:
        0 0 0 calc(0.7px / var(--zoom)) var(--wa-color-gray-80),
        0 0 0 calc(1px / var(--zoom)) var(--wa-color-gray-90) inset,
        calc(var(--wa-shadow-offset-x-l) / var(--zoom)) calc(var(--wa-shadow-offset-y-l) / var(--zoom))
          calc(var(--wa-shadow-blur-l) / var(--zoom)) calc(var(--wa-shadow-spread-l) / var(--zoom))
          var(--wa-color-shadow);
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
