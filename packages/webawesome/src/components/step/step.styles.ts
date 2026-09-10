import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: flex;
      flex: 1 1 0%;
      min-width: max-content;
      cursor: pointer;
      outline: none;
    }
  }

  :host([data-wa-step-vertical]) {
    flex: 0 0 auto;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  :host(:state(locked)) {
    cursor: default;
  }

  :host(:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    border-radius: var(--wa-border-radius-s);
  }

  .step {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    min-width: 0;
    font-family: inherit;
    color: var(--wa-color-text-normal);
    text-align: center;
  }

  :host([data-wa-step-vertical]) .step {
    flex-direction: row;
    align-items: flex-start;
    text-align: start;
    gap: 1em;
  }

  :host(:not([data-wa-step-vertical]):first-child) .step {
    align-items: flex-start;
    text-align: start;
  }

  :host(:not([data-wa-step-vertical]):last-child) .step {
    align-items: flex-end;
    text-align: end;
  }

  :host(:state(disabled)) .label,
  :host(:state(disabled)) .description {
    opacity: 0.5;
  }

  .connector,
  .connector-trailing {
    position: absolute;
    z-index: 0;
    background-color: var(--connector-color, var(--wa-color-surface-border));
  }

  :host(:not([data-wa-step-vertical]):first-child) .connector,
  :host([data-wa-step-vertical]:first-child) .connector,
  :host(:not([data-wa-step-vertical]):last-child) .connector-trailing,
  :host([data-wa-step-vertical]) .connector-trailing {
    display: none;
  }

  :host(:not([data-wa-step-vertical])) .connector,
  :host(:not([data-wa-step-vertical])) .connector-trailing {
    top: calc(var(--marker-size, 2em) / 2);
    height: var(--wa-border-width-m, 2px);
    translate: 0 -50%;
  }

  :host(:not([data-wa-step-vertical]):not(:first-child)) .connector {
    inset-inline-start: calc(-1 * var(--gap, var(--wa-space-l)) / 2);
  }

  :host(:not([data-wa-step-vertical]):last-child) .connector {
    inset-inline-end: calc(var(--marker-size, 2em) + var(--connector-gap, 0.35em));
  }

  :host(:not([data-wa-step-vertical]):not(:first-child):not(:last-child)) .connector {
    inset-inline-end: calc(50% + var(--marker-size, 2em) / 2 + var(--connector-gap, 0.35em));
  }

  :host(:not([data-wa-step-vertical]):first-child) .connector-trailing {
    inset-inline-start: calc(var(--marker-size, 2em) + var(--connector-gap, 0.35em));
  }

  :host(:not([data-wa-step-vertical]):not(:first-child):not(:last-child)) .connector-trailing {
    inset-inline-start: calc(50% + var(--marker-size, 2em) / 2 + var(--connector-gap, 0.35em));
  }

  :host(:not([data-wa-step-vertical]):not(:last-child)) .connector-trailing {
    inset-inline-end: calc(-1 * var(--gap, var(--wa-space-l)) / 2);
  }

  :host([data-wa-step-vertical]) .connector {
    inset-inline-start: calc(var(--marker-size, 2em) / 2);
    width: var(--wa-border-width-m, 2px);
    translate: -50% 0;
  }

  :host([data-wa-step-vertical]:not(:first-child)) .connector {
    inset-block-start: calc(-1 * var(--gap, var(--wa-space-l)) + var(--connector-gap, 0.35em));
    inset-block-end: calc(var(--marker-size, 2em) + var(--connector-gap, 0.35em));
  }

  :host(:state(connector-active)) .connector {
    background-color: var(--connector-active, var(--wa-color-brand-fill-loud));
  }

  :host(:state(trailing-connector-active)) .connector-trailing {
    background-color: var(--connector-active, var(--wa-color-brand-fill-loud));
  }

  .marker {
    position: relative;
    z-index: 1;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: var(--marker-size, 2em);
    height: var(--marker-size, 2em);
    font-weight: var(--wa-font-weight-semibold);
    line-height: 1;
    color: var(--marker-color, var(--wa-color-neutral-on-normal));
    background-color: var(--marker-background-color, var(--wa-color-neutral-fill-normal));
    border: solid var(--wa-border-width-s) var(--marker-border-color, var(--wa-color-neutral-border-normal));
    border-radius: 50%;
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast),
      color var(--wa-transition-fast);
  }

  .marker slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
  }

  .marker wa-spinner {
    font-size: 0.875em;
    color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
  }

  :host(:not([variant=''])) .marker {
    color: var(--marker-color, var(--wa-color-on-quiet));
    background-color: var(--marker-background-color, var(--wa-color-fill-quiet));
    border-color: var(--marker-border-color, var(--wa-color-border-normal));
  }

  :host(:state(active)) .marker,
  .marker-completed {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
  }

  :host(:state(loading)) .marker {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  :host(:state(locked)) .marker {
    color: var(--wa-color-text-quiet);
    background-color: var(--wa-color-neutral-fill-quiet);
    border-style: dashed;
  }

  :host([disabled]) .marker {
    color: var(--wa-color-text-quiet);
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  /* Label & description */
  .label {
    font-weight: var(--wa-font-weight-semibold);
  }

  :host(:state(active)) .label {
    color: var(--wa-color-text-normal);
  }

  .description {
    font-size: 0.875em;
    color: var(--wa-color-text-quiet);
  }

  .description[hidden] {
    display: none;
  }

  @media (forced-colors: active) {
    :host(:state(active)) .marker {
      outline: dashed 1px SelectedItem;
    }
  }
`;
