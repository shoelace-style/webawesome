import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    width: auto;
    cursor: pointer;
    list-style-type: none;
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
    color: var(--wa-color-text-normal);
    line-height: var(--wa-font-height-compact);
  }

  .control {
    display: flex;
    align-items: center;
    width: 100%;
    border: none;
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

  .details::part(header):is(:active, :hover),
  .control:is(:active, :hover) {
    background-color: var(--wa-color-neutral-fill-muted-alt);
    color: var(--wa-color-text-normal);
    border-color: color-mix(in oklab, var(--wa-color-neutral-fill-vivid), var(--wa-color-tint-hover));
  }

  .details::part(header):focus-visible,
  .control:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    outline-color: var(--wa-color-neutral-fill-vivid);
  }

  .base--active .details::part(header),
  .base--active .control {
    background-color: var(--wa-color-brand-fill-vivid);
    color: var(--wa-color-brand-text-on-vivid);
  }

  .base--active .details::part(header):focus-visible,
  .base--active .control:focus-visible {
    outline-color: var(--wa-color-brand-fill-vivid);
  }

  .base--active .details::part(header):active,
  .base--active .control:active {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
    border-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-active));
  }

  .base--active .details::part(header):hover,
  .base--active .control:hover {
    background-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    border-color: color-mix(in oklab, var(--wa-color-brand-fill-vivid), var(--wa-color-tint-hover));
    color: var(--wa-color-brand-text-on-vivid);
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
