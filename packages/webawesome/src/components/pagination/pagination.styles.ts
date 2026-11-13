import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: contents;
    }
  }

  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* Sizing is relative to the current font size, so we use em rather than spacing tokens */
    gap: 1em;
  }

  .summary {
    font-size: 0.875em;
    color: var(--wa-color-text-quiet);
    white-space: nowrap;
  }

  /* Compact layout */
  .label {
    display: inline-flex;
    align-items: center;
    min-height: max(2.16em, 24px);
    padding-inline: 0.75em;
    color: var(--wa-color-text-normal);
    white-space: nowrap;
  }

  .pagination {
    display: flex;
  }

  .pages {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pages li {
    display: flex;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    /* Guarantee a minimum 24×24px target (WCAG 2.5.8) while still scaling with font-size. */
    min-width: max(2.16em, 24px);
    min-height: max(2.16em, 24px);
    padding-inline: 0.25em;

    font: inherit;
    font-size: inherit;
    line-height: 1;
    color: var(--wa-color-text-normal);
    text-decoration: none;

    background-color: transparent;
    /* Default (outlined) appearance */
    border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-border-radius-m);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast),
      color var(--wa-transition-fast);
  }

  /* Ellipsis */
  .button.ellipsis {
    color: var(--wa-color-text-quiet);
    position: relative;
  }

  .button.ellipsis:hover,
  .button.ellipsis:focus-visible {
    color: var(--wa-color-text-normal);
  }

  .button:hover {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Current page */
  .button.current {
    font-weight: var(--wa-font-weight-bold);
    color: var(--wa-color-brand-on-loud);
    background-color: var(--wa-form-control-activated-color);
    /* Read as a solid chip: drop the outlined border so it doesn't double up against the fill. */
    border-color: transparent;
  }

  .button.current:hover {
    background-color: var(--wa-form-control-activated-color);
  }

  /* Disabled (pagination buttons use aria-disabled so they stay focusable) */
  .button[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button[aria-disabled='true']:hover {
    background-color: transparent;
  }

  wa-icon {
    font-size: 0.875em;
  }

  /* Filled */
  :host([appearance='filled']) .button {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled']) .button:hover {
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host([appearance='filled']) .button.current,
  :host([appearance='filled']) .button.current:hover {
    background-color: var(--wa-form-control-activated-color);
  }

  /* Plain */
  :host([appearance='plain']) .button {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance='plain']) .button:hover {
    background-color: transparent;
  }

  :host([appearance='plain']) .button.current {
    color: var(--wa-color-brand-on-loud);
    background-color: var(--wa-form-control-activated-color);
  }
`;
