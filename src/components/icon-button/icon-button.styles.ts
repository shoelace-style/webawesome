import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    color: var(--wa-color-text-quiet);
  }

  .icon-button {
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
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--wa-color-brand-spot);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: color-mix(in oklab, var(--wa-color-brand-spot), var(--wa-color-mix-active));
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;
