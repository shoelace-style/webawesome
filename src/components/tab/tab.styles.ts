import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    border-radius: var(--wa-corners-1x);
    color: var(--wa-color-neutral-text-on-surface);
    padding: var(--wa-space-m) var(--wa-space-l);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--wa-color-neutral-text-on-surface);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-border-width-thick) - var(--wa-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--wa-color-brand-text-on-surface);
  }

  .tab.tab--closable {
    padding-inline-end: var(--wa-space-s);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--wa-font-size-m);
    margin-inline-start: var(--wa-space-s);
  }

  .tab__close-button::part(base) {
    padding: var(--wa-space-3xs);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;
