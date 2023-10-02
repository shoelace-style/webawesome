import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
    --gap: 6px;
  }

  .base {
    color: var(--wa-color-text-normal);
    height: 100%;
  }

  .label {
    font-weight: var(--wa-font-weight-heading);
    color: var(--wa-color-neutral-text-on-surface);
    padding-inline-start: var(--wa-space-xs);
    margin: 0;
    /** This is a cheap way to have labels have a bottom margin withot needing slot test controllers. */
    line-height: calc(1em + 32px);
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    height: 100%;
  }
`;
