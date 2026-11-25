import { css } from 'lit';

export default css`
  :host {
    min-width: 0;
  }

  .duration-field {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    min-height: var(--wa-form-control-height);
    padding-inline: var(--wa-form-control-padding-inline);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    background-color: var(--wa-form-control-background-color);
    color: var(--wa-form-control-value-color);
    cursor: text;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }
  }

  :host([appearance='filled']) .duration-field,
  :host([appearance='filled-outlined']) .duration-field {
    background-color: var(--wa-color-surface-lowered);
  }

  :host([appearance='filled']) .duration-field {
    border-color: transparent;
  }

  :host([pill]) .duration-field {
    border-radius: var(--wa-border-radius-pill);
  }

  :host([disabled]) .duration-field,
  :host(:state(disabled)) .duration-field {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .segments {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
  }

  [part~='clear-button']:focus-visible {
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);
    outline-offset: 2px;
  }

  .divider {
    flex: none;
    white-space: pre;
  }

  input {
    flex: none;
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

    &[data-segment='Milliseconds'] {
      width: 3ch;
    }
  }
`;
