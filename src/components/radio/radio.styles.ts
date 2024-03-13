import { css } from 'lit';

export default css`
  :host {
    --background: var(--wa-form-controls-background);
    --background-checked: var(--wa-form-controls-activated-color);
    --border-color: var(--wa-form-controls-resting-color);
    --border-color-checked: var(--wa-form-controls-activated-color);
    --border-style: var(--wa-border-style);
    --border-width: var(--wa-form-controls-border-width);
    --box-shadow: none;
    --checked-icon-color: var(--wa-color-brand-text-on-spot);
    --checked-icon-scale: 0.4;
    --toggle-size: calc(1em * var(--wa-font-line-height-compact) - 0.125rem);

    display: block;
  }

  :host(:focus-visible) {
    outline: none;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font: inherit;
    color: var(--wa-form-controls-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    font-size: var(--wa-font-size-s);
  }

  .radio--medium {
    font-size: var(--wa-font-size-m);
  }

  .radio--large {
    font-size: var(--wa-font-size-l);
  }

  .radio__checked-icon {
    display: inline-flex;
    fill: currentColor;
    width: var(--toggle-size);
    height: var(--toggle-size);
    scale: var(--checked-icon-scale);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border-color: var(--border-color);
    border-style: var(--border-style);
    border-width: var(--border-width);
    border-radius: 50%;
    background: var(--background);
    box-shadow: var(--box-shadow);
    color: transparent;
    transition:
      var(--wa-transition-fast) border-color,
      var(--wa-transition-fast) background-color,
      var(--wa-transition-fast) color,
      var(--wa-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--checked-icon-color);
    border-color: var(--border-color-checked);
    background: var(--background-checked);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--wa-form-controls-value-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`;
