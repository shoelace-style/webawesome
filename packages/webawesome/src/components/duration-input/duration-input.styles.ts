import { css } from 'lit';

export default css`
  .duration-field {
    display: flex;
    align-items: center;
    height: var(--wa-form-control-height);
    padding-inline: var(--wa-form-control-padding-inline);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    background: var(--wa-form-control-background-color);
    color: var(--wa-form-control-value-color);
    font-weight: var(--wa-form-control-value-font-weight);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }
  }

  :host([appearance='filled']) .duration-field,
  :host([appearance='filled-outlined']) .duration-field {
    background: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled']) .duration-field {
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([disabled]) .duration-field {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    width: 2ch;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-variant-numeric: tabular-nums;
    text-align: center;

    &:last-child {
      width: 3ch;
    }
  }
`;
