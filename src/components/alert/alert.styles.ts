import { css } from 'lit';

export default css`
  :host {
    --border-radius: var(--wa-panel-corners);
    --border-style: var(--wa-panel-border-style);
    --border-width: var(--wa-panel-border-width);
    --icon-color: currentColor;
    --icon-size: var(--wa-font-size-l);
    --padding: var(--wa-space-m);

    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  :host([variant='brand']) {
    --background: var(--wa-color-brand-fill-subtle);
    --border-color: var(--wa-color-brand-border-subtle);
    --content-color: var(--wa-color-brand-text-on-fill);
  }

  :host([variant='success']) {
    --background: var(--wa-color-success-fill-subtle);
    --border-color: var(--wa-color-success-border-subtle);
    --content-color: var(--wa-color-success-text-on-fill);
  }

  :host([variant='neutral']) {
    --background: var(--wa-color-neutral-fill-subtle);
    --border-color: var(--wa-color-neutral-border-subtle);
    --content-color: var(--wa-color-neutral-text-on-fill);
  }

  :host([variant='warning']) {
    --background: var(--wa-color-warning-fill-subtle);
    --border-color: var(--wa-color-warning-border-subtle);
    --content-color: var(--wa-color-warning-text-on-fill);
  }

  :host([variant='danger']) {
    --background: var(--wa-color-danger-fill-subtle);
    --border-color: var(--wa-color-danger-border-subtle);
    --content-color: var(--wa-color-danger-text-on-fill);
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background: var(--background);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    color: var(--content-color);
    font: inherit;
    padding: var(--padding);
    margin: inherit;
  }

  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--icon-color);
    font-size: var(--icon-size);
  }

  .alert__icon ::slotted(*) {
    margin-inline-end: var(--padding) !important;
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: currentColor;
    font-size: var(--wa-font-size-m);
    padding-inline-start: var(--padding);
  }

  .alert__close-button:hover::part(base) {
    color: currentColor;
  }
`;
