import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font: inherit;
    color: var(--wa-form-controls-text-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--wa-form-control-toggle-size-s);
    font-size: var(--wa-font-size-s);
  }

  .checkbox--medium {
    --toggle-size: var(--wa-form-control-toggle-size-m);
    font-size: var(--wa-font-size-m);
  }

  .checkbox--large {
    --toggle-size: var(--wa-form-control-toggle-size-l);
    font-size: var(--wa-font-size-l);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: var(--wa-border-style) var(--wa-form-controls-border-width) var(--wa-form-controls-border-color-resting);
    border-radius: var(--wa-corners-half);
    background-color: var(--wa-form-controls-background);
    color: var(--wa-form-controls-text-color);
    transition: var(--wa-transition-fast) border-color, var(--wa-transition-fast) background-color,
      var(--wa-transition-fast) color, var(--wa-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    border-color: var(--wa-form-controls-border-color-activated);
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    color: var(--wa-color-brand-text-on-vivid);
    border-color: var(--wa-color-brand-fill-vivid);
    background-color: var(--wa-color-brand-fill-vivid);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
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
  }

  :host([required]) .checkbox__label::after {
    content: var(--wa-form-controls-required-content);
    color: var(--wa-form-controls-required-content-color);
    margin-inline-start: var(--wa-form-controls-required-content-offset);
  }
`;
