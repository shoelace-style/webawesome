import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .base {
    color: var(--wa-color-neutral-text-on-surface);
  }

  .nav-items {
    display: grid;
    align-content: start;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 6px;
  }

  .details::part(base) {
    border: none;
  }

  .details::part(content) {
    padding-top: 6px;
  }

  .details::part(header) {
    padding: var(--wa-space-square-s);
    border-radius: var(--wa-panel-corners);
  }

  .details::part(header):hover {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-neutral-text-on-vivid);
  }
`;
