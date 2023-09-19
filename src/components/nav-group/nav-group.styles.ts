import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .base {
    padding: var(--wa-space-square-s);
    display: grid;
    align-content: start;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 6px;
  }
`;
