import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid var(--wa-border-width-thin);
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--brand {
    background-color: var(--wa-color-brand-fill-subtle);
    border-color: var(--wa-color-brand-border-highlight);
    color: var(--wa-color-brand-text-on-fill);
  }

  .tag--brand:active > wa-icon-button {
    color: var(--wa-color-brand-text-on-fill);
  }

  .tag--success {
    background-color: var(--wa-color-success-fill-subtle);
    border-color: var(--wa-color-success-border-highlight);
    color: var(--wa-color-success-text-on-fill);
  }

  .tag--success:active > wa-icon-button {
    color: var(--wa-color-success-text-on-fill);
  }

  .tag--neutral {
    background-color: var(--wa-color-neutral-fill-subtle);
    border-color: var(--wa-color-neutral-border-highlight);
    color: var(--wa-color-neutral-text-on-fill);
  }

  .tag--neutral:active > wa-icon-button {
    color: var(--wa-color-neutral-text-on-fill);
  }

  .tag--warning {
    background-color: var(--wa-color-warning-fill-subtle);
    border-color: var(--wa-color-warning-border-highlight);
    color: var(--wa-color-warning-text-on-fill);
  }

  .tag--warning:active > wa-icon-button {
    color: var(--wa-color-warning-text-on-fill);
  }

  .tag--danger {
    background-color: var(--wa-color-danger-fill-subtle);
    border-color: var(--wa-color-danger-border-highlight);
    color: var(--wa-color-danger-text-on-fill);
  }

  .tag--danger:active > wa-icon-button {
    color: var(--wa-color-danger-text-on-fill);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--wa-font-size-xs);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-3xs) var(--wa-space-2xs);
  }

  .tag--medium {
    font-size: var(--wa-font-size-s);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-2xs) var(--wa-space-xs);
  }

  .tag--large {
    font-size: var(--wa-font-size-m);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-2xs) var(--wa-space-xs);
  }

  .tag--small {
    font-size: var(--wa-font-size-xs);
    height: calc(var(--wa-form-controls-height-s) * 0.8);
    line-height: calc(var(--wa-form-controls-height-s) - var(--wa-form-controls-border-width) * 2);
    border-radius: var(--wa-corners-s);
    padding: 0 var(--wa-space-xs);
  }

  .tag--medium {
    font-size: var(--wa-font-size-s);
    height: calc(var(--wa-form-controls-height-m) * 0.8);
    line-height: calc(var(--wa-form-controls-height-m) - var(--wa-form-controls-border-width) * 2);
    border-radius: var(--wa-corners-s);
    padding: 0 var(--wa-space-s);
  }

  .tag--large {
    font-size: var(--wa-font-size-m);
    height: calc(var(--wa-form-controls-height-l) * 0.8);
    line-height: calc(var(--wa-form-controls-height-l) - var(--wa-form-controls-border-width) * 2);
    border-radius: var(--wa-corners-s);
    padding: 0 var(--wa-space-m);
  }

  .tag__remove {
    margin-inline-start: var(--wa-space-xs);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--wa-corners-pill);
  }
`;
