import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--wa-font-family-body);
    font-size: var(--wa-font-size-m);
    font-weight: var(--wa-font-weight-heavy);
    line-height: var(--wa-line-height-regular);
    color: var(--wa-color-neutral-text-on-surface);
    padding: var(--wa-space-2xs) var(--wa-space-xl);
    user-select: none;
  }
`;
