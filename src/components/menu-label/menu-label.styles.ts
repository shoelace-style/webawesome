import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font: inherit;
    color: var(--wa-color-neutral-text-on-surface);
    padding: var(--wa-space-2xs) var(--wa-space-xl);
    user-select: none;
    -webkit-user-select: none;
  }
`;
