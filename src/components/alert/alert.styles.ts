import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    border-radius: var(--wa-corners-1x);
    font-family: var(--wa-font-family-body);
    font-size: var(--wa-font-size-m);
    font-weight: var(--wa-font-size-normal);
    line-height: var(--wa-font-line-height-regular);
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
    font-size: var(--wa-font-size-l);
    padding-inline-start: var(--wa-space-l);
  }

  .alert--brand {
    background-color: var(--wa-color-brand-fill-muted);
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-brand-outline-muted);
    color: var(--wa-color-brand-text-on-muted);
  }

  .alert--success {
    background-color: var(--wa-color-success-fill-muted);
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-success-outline-muted);
    color: var(--wa-color-success-text-on-muted);
  }

  .alert--neutral {
    background-color: var(--wa-color-neutral-fill-muted);
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-neutral-outline-muted);
    color: var(--wa-color-neutral-text-on-muted);
  }

  .alert--warning {
    background-color: var(--wa-color-warning-fill-muted);
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-warning-outline-muted);
    color: var(--wa-color-warning-text-on-muted);
  }

  .alert--danger {
    background-color: var(--wa-color-danger-fill-muted);
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-danger-outline-muted);
    color: var(--wa-color-danger-text-on-muted);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--wa-space-m);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: currentColor;
    font-size: var(--wa-font-size-m);
    padding-inline-end: var(--wa-space-m);
  }

  .alert__close-button:hover::part(base) {
    color: currentColor;
  }
`;
