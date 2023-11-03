import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --border-radius: var(--wa-panel-corners);
    --border-style: var(--wa-panel-border-style);
    --border-width: var(--wa-panel-border-width);
    --icon-size: var(--wa-font-size-l);
    --padding: var(--wa-space-m);

    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  :host([variant='brand']) {
    --background: var(--wa-color-brand-fill-muted);
    --border-color: var(--wa-color-brand-outline-muted);
    --content-color: var(--wa-color-brand-text-on-muted);
  }

  :host([variant='success']) {
    --background: var(--wa-color-success-fill-muted);
    --border-color: var(--wa-color-success-outline-muted);
    --content-color: var(--wa-color-success-text-on-muted);
  }

  :host([variant='neutral']) {
    --background: var(--wa-color-neutral-fill-muted);
    --border-color: var(--wa-color-neutral-outline-muted);
    --content-color: var(--wa-color-neutral-text-on-muted);
  }

  :host([variant='warning']) {
    --background: var(--wa-color-warning-fill-muted);
    --border-color: var(--wa-color-warning-outline-muted);
    --content-color: var(--wa-color-warning-text-on-muted);
  }

  :host([variant='danger']) {
    --background: var(--wa-color-danger-fill-muted);
    --border-color: var(--wa-color-danger-outline-muted);
    --content-color: var(--wa-color-danger-text-on-muted);
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
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--icon-size);
    padding-inline-start: var(--padding);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--padding);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: currentColor;
    font-size: var(--wa-font-size-m);
    padding-inline-end: var(--padding);
  }

  .alert__close-button:hover::part(base) {
    color: currentColor;
  }
`;
