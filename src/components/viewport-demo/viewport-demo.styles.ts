import { css } from 'lit';

export default css`
  :host {
    --viewport-background: var(--wa-color-surface-default, canvas);
    --viewport-resize: both;
    --viewport-min-width: 2em;
    --viewport-max-width: 100%;
    --viewport-padding: var(--wa-space-2xl, 2rem);
    --viewport-initial-aspect-ratio: 16 / 9;
    --viewport-bezel-width: 0.25em;
  }

  #viewport {
    --zoom: 1;

    display: flex;
    flex-flow: column;
    align-items: end;

    width: 100%;
    --_aspect-ratio: calc(var(--viewport-width-px) / var(--viewport-height-px));
    --aspect-ratio: var(--_aspect-ratio, var(--viewport-initial-aspect-ratio));

    height: fit-content;
    min-width: var(--viewport-min-width, 2em);
    max-width: min(var(--viewport-max-width), 100%);
    resize: var(--viewport-resize);
    overflow: auto;

    /* Style frame like a window */
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
    &:not([style*='height:']) ::slotted(iframe) {
      aspect-ratio: var(--aspect-ratio);
    }
  }

  ::slotted(iframe) {
    display: block;
    width: 100%;
    height: 100%;
    zoom: var(--zoom);

    /* Divide with var(--zoom) to get lengths that stay constant regardless of zoom level */
    border: calc(1px / var(--zoom)) solid var(--wa-color-gray-90);
    padding: 0em; /* we want this to be scaled by the zoom level */
    background: var(--viewport-background);
  }

  [part~='controls'] {
    display: flex;
    margin-top: -0.2em;
    font-size: var(--wa-font-size-xs);
    padding-block-end: 0.25em;
    padding-inline: 1em 0.2em;

    .dimensions {
      word-spacing: -0.15em;
      margin-inline-end: 1em;
    }

    wa-icon {
      vertical-align: -0.1em;
      font-size: 85%;
      color: var(--wa-color-gray-70);
    }

    wa-icon-button {
      &:not(:hover, :focus) {
        opacity: 0.5;
      }

      &::part(base) {
        padding: 0;
      }
    }

    .zoom {
      display: flex;
      align-items: center;
      gap: 0.3em;
      font-weight: 600;
      color: var(--wa-color-text-quiet);
      opacity: 80%;
    }
  }
`;
