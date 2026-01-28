import { css } from 'lit';

export default css`
  .number-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    padding: 0;

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    /* Style disabled inputs */
    &:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .number-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .number-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .number-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .number-field {
    border-radius: var(--wa-border-radius-pill);
  }

  :host([pill]) .stepper-decrement {
    border-start-start-radius: calc(var(--wa-border-radius-pill) - var(--wa-form-control-border-width));
    border-end-start-radius: calc(var(--wa-border-radius-pill) - var(--wa-form-control-border-width));
  }

  :host([pill]) .stepper-increment {
    border-start-end-radius: calc(var(--wa-border-radius-pill) - var(--wa-form-control-border-width));
    border-end-end-radius: calc(var(--wa-border-radius-pill) - var(--wa-form-control-border-width));
  }

  .number-field {
    /* Show autofill styles over the entire number field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input {
      height: 100%;
      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    /* Center-align and use tabular numbers for better alignment */
    text-align: center;
    font-variant-numeric: tabular-nums;

    /* Hide the number spinners in Firefox */
    -moz-appearance: textfield;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:focus {
      outline: none;
    }

    /* Hide the number spinners in Chrome/Safari */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      display: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
    margin-inline: var(--wa-space-m);

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  /*
   * Steppers - horizontal layout with minus on start, plus on end
   */

  .stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--stepper-width, 2.5em);
    height: 100%;
    flex: 0 0 auto;
    border: none;
    background: transparent;
    color: var(--wa-color-neutral-on-quiet);
    cursor: pointer;
    padding: 0;
    font-size: inherit;
    transition: var(--wa-transition-normal) color;

    @media (hover: hover) {
      &:hover:not(:disabled) {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active:not(:disabled) {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  }

  /* Decrement button on the start (left in LTR, right in RTL) */
  .stepper-decrement {
    border-inline-end: var(--wa-form-control-border-width) var(--wa-form-control-border-style)
      var(--wa-form-control-border-color);
  }

  /* Increment button on the end (right in LTR, left in RTL) */
  .stepper-increment {
    border-inline-start: var(--wa-form-control-border-width) var(--wa-form-control-border-style)
      var(--wa-form-control-border-color);
  }

  :host([without-steppers]) .stepper {
    display: none;
  }

  /* Add padding when steppers are hidden */
  :host([without-steppers]) .number-field {
    padding: 0 var(--wa-form-control-padding-inline);
  }
`;
