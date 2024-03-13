import { css } from 'lit';

export default css`
  :host {
    display: block;
    position: relative;
    background-color: var(--wa-color-surface-raised);
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-xs) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(wa-divider) {
    --spacing: var(--wa-space-xs);
  }
`;
