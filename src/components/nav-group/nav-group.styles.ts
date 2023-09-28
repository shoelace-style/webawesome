import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
    --gap: 6px;
  }

  p {
    margin: 0;
    margin-bottom: var(--wa-space-xs);
  }

  .base {
    color: var(--wa-color-text-normal);
    height: 100%;
  }

  .label {
    font-weight: var(--wa-font-weight-heading);
    color: var(--wa-color-neutral-text-on-surface);
    padding-inline-start: var(--wa-space-xs);
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    height: 100%;
  }
`;
