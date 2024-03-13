import { css } from 'lit';

export default css`
  :host {
    display: block;
    font-size: var(--wa-font-size-s);
  }

  .menu-label {
    display: inline-block;
    font: inherit;
    font-weight: var(--wa-font-weight-medium);
    color: var(--wa-color-neutral-text-on-surface);
    padding: var(--wa-space-2xs) calc(var(--wa-space-2xs) + var(--wa-space-xl));
    user-select: none;
    -webkit-user-select: none;
  }
`;
