import { css } from 'lit';

export default css`
  :host {
    --background-color: var(--wa-form-control-background-color);
    --background-color-checked: var(--wa-form-control-activated-color);
    --border-color: var(--wa-form-control-resting-color);
    --border-color-checked: var(--wa-form-control-activated-color);
    --border-radius: min(
      calc(var(--toggle-size) * 0.375),
      var(--wa-border-radius-xs)
    ); /* min so it doesn't look like a circle/radio */
    --border-style: var(--wa-border-style);
    --border-width: var(--wa-form-control-border-width);
    --box-shadow: none;
    --toggle-size: calc(1em * var(--wa-form-control-value-line-height));

    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: flex;
    align-items: flex-start;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    font-size: var(--wa-font-size-s);
  }

  .checkbox--medium {
    font-size: var(--wa-font-size-m);
  }

  .checkbox--large {
    font-size: var(--wa-font-size-l);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border-color: var(--border-color);
    border-radius: var(--border-radius);
    border-style: var(--border-style);
    border-width: var(--border-width);
    background-color: var(--background-color);
    box-shadow: var(--box-shadow);
    color: var(--wa-form-control-value-color);
    transition:
      background var(--wa-transition-normal) var(--wa-transition-easing),
      border-color var(--wa-transition-fast) var(--wa-transition-easing),
      box-shadow var(--wa-transition-fast) var(--wa-transition-easing),
      color var(--wa-transition-fast) var(--wa-transition-easing);
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
    height: 100%;
    width: 100%;
  }

  .checkbox__icon--invisible {
    visibility: hidden;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:has(> input:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    color: var(--wa-color-brand-on-loud);
    border-color: var(--border-color-checked);
    background-color: var(--background-color-checked);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:has(> input:focus-visible),
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:has(> input:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    line-height: var(--toggle-size);
    margin-inline-start: var(--wa-space-xs);
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`;
