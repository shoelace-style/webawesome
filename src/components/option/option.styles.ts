import { css } from 'lit';

export default css`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-color-neutral-text-on-surface);
    padding: var(--wa-space-xs) var(--wa-space-m) var(--wa-space-xs) var(--wa-space-2xs);
    transition: var(--wa-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--wa-color-neutral-fill-highlight);
    color: var(--wa-color-neutral-text-on-fill);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--wa-color-brand-spot);
    color: var(--wa-color-brand-text-on-spot);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--wa-line-height-compact);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875em;
    visibility: hidden;
    width: var(--wa-space-xl);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--wa-space-xs);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--wa-space-xs);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;
