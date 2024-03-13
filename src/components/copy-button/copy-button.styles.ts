import { css } from 'lit';

export default css`
  :host {
    --error-color: var(--wa-color-danger-spot);
    --success-color: var(--wa-color-success-spot);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--wa-corners-s);
    font-size: inherit;
    color: inherit;
    padding: var(--wa-space-xs);
    cursor: pointer;
    transition: var(--wa-transition-faster) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`;
