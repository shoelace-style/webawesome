import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  p {
    margin: 0;
    margin-bottom: 0.25rem;
  }

  .base {
    color: var(--wa-color-text-normal);
  }

  .heading {
    color: var(--wa-color-neutral-text-on-surface);
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: 100%;
  }

  .details::part(base) {
    border-color: transparent;
  }

  .details::part(content) {
    padding-top: 6px;
    padding-inline-start: 2em;
  }

  .details::part(header) {
    padding: var(--wa-space-square-s);
    border-radius: var(--wa-corners-1x);
  }

  .details::part(header):hover {
    background-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-neutral-text-on-vivid);
  }
`;
