import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-color-neutral-fill-vivid-alt);
  }

  .tooltip::part(popup) {
    pointer-events: none;
    z-index: var(--wa-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-corners-1x);
    background-color: var(--wa-color-neutral-fill-vivid-alt);
    font: inherit;
    line-height: var(--wa-line-height-regular);
    color: var(--wa-color-neutral-text-on-vivid);
    padding: var(--wa-space-2xs) var(--wa-space-xs);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;
