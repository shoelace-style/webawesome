import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    width: auto;
    cursor: pointer;
    list-style-type: none;

    --background-color: transparent;
    --background-color-hover: var(--wa-color-neutral-fill-muted-alt);
    --background-color-active: transparent;

    --text-color: var(--wa-color-text-normal);
    --text-color-hover: var(--wa-color-text-normal);
    --text-color-active: var(--wa-color-text-normal);

    --border-color: transparent;
    --border-color-active: transparent;
    --border-color-hover: color-mix(in oklab, var(--background-color-hover), var(--wa-color-tint-hover));
  }

  :host(:is([current="page"], [current="true"])) {
    --background-color: var(--wa-color-brand-fill-vivid);
    --text-color: var(--wa-color-brand-text-on-vivid);
    --background-color-hover: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    --border-color-hover: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    --text-color-hover: var(--wa-color-brand-text-on-vivid);
  }

  .base {
    /* when we change to "display: list-item" apparently it sets box-sizing to content-box... */
    box-sizing: border-box;
    display: grid;
    height: 100%;
  }

  .control,
  .details::part(header) {
    padding: var(--wa-space-square-xs);
    border-radius: var(--wa-corners-1x);
    font: inherit;
    font-weight: var(--wa-font-weight-action);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    transition: var(--wa-transition-faster) background-color, var(--wa-transition-faster) color,
      var(--wa-transition-faster) border, var(--wa-transition-faster) box-shadow;
    cursor: inherit;
    line-height: var(--wa-font-height-compact);

    background-color: var(--background-color);
    color: var(--text-color);


  }

  .control {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--border-color);
    gap: 8px;
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .suffix {
    align-self: end;
  }

  .control::-moz-focus-inner {
    border: 0;
  }

  .control:focus {
    outline: transparent;
  }

  .details::part(header):is(:hover),
  .control:is(:hover) {
    background-color: var(--background-color-hover);
    color: var(--text-color-hover);
    border-color: var(--border-color-hover);
  }

  .details::part(header):focus-visible,
  .control:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    outline-color: var(--background-color-hover);
  }

  .details::part(base) {
    border-color: transparent;
  }

  .details::part(content) {
    padding-top: 6px;
    padding-inline-end: 0px;
    padding-inline-start: 2em;
  }


  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: 100%;
  }
`;
