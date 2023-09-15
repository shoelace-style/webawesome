import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--wa-form-control-toggle-size-s);
    --thumb-size: calc(var(--wa-form-control-toggle-size-s) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']) {
    --height: var(--wa-form-control-toggle-size-m);
    --thumb-size: calc(var(--wa-form-control-toggle-size-m) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--wa-font-size-m);
  }

  :host([size='large']) {
    --height: var(--wa-form-control-toggle-size-l);
    --thumb-size: calc(var(--wa-form-control-toggle-size-l) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--wa-font-size-l);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-controls-text-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-color-neutral-fill-vivid);
    border: solid var(--wa-border-width-thin) var(--wa-color-neutral-fill-muted);
    border-radius: var(--height);
    transition: var(--wa-transition-fast) border-color, var(--wa-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-controls-background);
    border-radius: 50%;
    border: var(--wa-form-controls-border-style) var(--wa-form-controls-border-width)
      var(--wa-color-neutral-outline-vivid);
    translate: calc((var(--width) - var(--height)) / -2);
    transition: var(--wa-transition-fast) translate ease, var(--wa-transition-fast) background-color,
      var(--wa-transition-fast) border-color, var(--wa-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  .switch:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--wa-color-brand-fill-vivid);
    border-color: var(--wa-color-brand-fill-vivid);
  }

  .switch--checked .switch__control .switch__thumb {
    border-color: var(--wa-color-brand-outline-vivid);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--wa-form-controls-required-content);
    color: var(--wa-form-controls-required-content-color);
    margin-inline-start: var(--wa-form-controls-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`;
