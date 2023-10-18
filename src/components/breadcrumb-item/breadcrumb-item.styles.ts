import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    color: var(--wa-color-neutral-text-on-surface);
    line-height: var(--wa-line-height-regular);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--wa-corners-1x);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--wa-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--wa-color-brand-text-on-surface);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: color-mix(in oklab, var(--wa-color-brand-text-on-surface), var(--wa-color-tint-hover));
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--wa-color-brand-text-on-surface);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--wa-space-xs);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--wa-space-xs);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--wa-space-xs);
    user-select: none;
    -webkit-user-select: none;
  }
`;
