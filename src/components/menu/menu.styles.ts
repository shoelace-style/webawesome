import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
    position: relative;
    background-color: var(--wa-color-surface-raised);
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-surface-border);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-xs) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(wa-divider) {
    --spacing: var(--wa-space-xs);
  }
`;
