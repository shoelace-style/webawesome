import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --border-radius: var(--wa-corners-xs);
    --border-style: var(--wa-border-style);
    --border-width: var(--wa-border-width-s);

    display: inline-block;
  }

  :host([variant='brand']) {
    --background: var(--wa-color-brand-fill-subtle);
    --border-color: var(--wa-color-brand-border-highlight);
    --content-color: var(--wa-color-brand-text-on-fill);
  }

  :host([variant='success']) {
    --background: var(--wa-color-success-fill-subtle);
    --border-color: var(--wa-color-success-border-highlight);
    --content-color: var(--wa-color-success-text-on-fill);
  }

  :host([variant='warning']) {
    --background: var(--wa-color-warning-fill-subtle);
    --border-color: var(--wa-color-warning-border-highlight);
    --content-color: var(--wa-color-warning-text-on-fill);
  }

  :host([variant='neutral']) {
    --background: var(--wa-color-neutral-fill-subtle);
    --border-color: var(--wa-color-neutral-border-highlight);
    --content-color: var(--wa-color-neutral-text-on-fill);
  }

  :host([variant='danger']) {
    --background: var(--wa-color-danger-fill-subtle);
    --border-color: var(--wa-color-danger-border-highlight);
    --content-color: var(--wa-color-danger-text-on-fill);
  }

  .tag {
    display: flex;
    align-items: center;
    background: var(--background);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    color: var(--content-color);
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  .tag:active > wa-icon-button {
    color: var(--content-color);
  }

  /*
   * Size modifiers
   */

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
