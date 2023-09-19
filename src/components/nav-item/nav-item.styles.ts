import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: list-item;
    position: relative;
    width: auto;
    cursor: pointer;
    list-style-type: " ";
  }

  .link {
    display: inline-grid;
    grid-auto-flow: column;
    gap: 8px;
    align-items: center;
    justify-content: start;
    width: 100%;
    border: none;
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition: var(--wa-transition-faster) background-color, var(--wa-transition-faster) color,
      var(--wa-transition-faster) border, var(--wa-transition-faster) box-shadow;
    cursor: inherit;

    color: var(--wa-color-neutral-text-on-surface);
    line-height: var(--wa-font-height-compact);
    padding: var(--wa-space-square-s);
    border-radius: var(--wa-corners-1x);
  }

  .link::-moz-focus-inner {
    border: 0;
  }

  .link:focus {
    outline: transparent;
  }

  .link:hover {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-neutral-text-on-vivid);
  }

  .link:active {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-active));
  }

  .link:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    outline-color: var(--wa-color-neutral-fill-vivid);
  }

  .link.link--active {
    background-color: var(--wa-color-brand-fill-vivid);
    color: var(--wa-color-brand-text-on-vivid);
  }

  .link--active:focus-visible {
    outline-color: var(--wa-color-brand-fill-vivid);
  }

  .link--active:active {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
  }

  .link--active:hover {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-brand-text-on-vivid);
  }
`;
