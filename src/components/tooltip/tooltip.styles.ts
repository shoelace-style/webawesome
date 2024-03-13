import { css } from 'lit';

export default css`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-color-neutral-spot);
  }

  .tooltip::part(popup) {
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
    border-radius: var(--wa-corners-s);
    background-color: var(--wa-color-neutral-spot);
    font: inherit;
    line-height: var(--wa-line-height-regular);
    color: var(--wa-color-neutral-text-on-spot);
    padding: var(--wa-space-2xs) var(--wa-space-xs);
    user-select: none;
    -webkit-user-select: none;
  }
`;
