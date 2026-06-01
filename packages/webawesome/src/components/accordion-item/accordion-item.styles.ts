import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: block;
    }

    :host(:not(:first-child)) {
      border-top: var(
        --border,
        var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border)
      );
    }

    [part~='heading'] {
      margin: 0;
      font: inherit;
    }

    [part~='button'] {
      display: flex;
      align-items: center;
      gap: var(--padding, 1em);
      padding: var(--padding, 1em);
      width: 100%;
      background: none;
      border: none;
      cursor: pointer;
      text-align: start;
      color: var(--wa-color-text-normal);
      font: inherit;
      font-weight: var(--wa-font-weight-semibold);

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
        outline-offset: calc(0px - var(--wa-focus-ring-offset));
      }
    }

    /* Icon at end (default) */
    :host([icon-placement='end']) [part~='button'] {
      justify-content: space-between;
    }

    /* Icon at start */
    :host([icon-placement='start']) [part~='button'] {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) [part~='button'] {
      cursor: not-allowed;
      pointer-events: none;
    }

    :host(:first-child) [part~='button'] {
      border-top-left-radius: var(--radius, var(--wa-panel-border-radius));
      border-top-right-radius: var(--radius, var(--wa-panel-border-radius));
    }

    :host(:last-child:not([expanded])) [part~='button'] {
      border-bottom-left-radius: var(--radius, var(--wa-panel-border-radius));
      border-bottom-right-radius: var(--radius, var(--wa-panel-border-radius));
    }

    [part~='icon'] {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      color: var(--wa-color-text-quiet);
      transition: rotate var(--duration, 200ms) var(--easing, ease);
    }

    :host(:dir(rtl)) [part~='icon'] {
      rotate: 180deg;
    }

    :host([expanded]) [part~='icon'] {
      rotate: 90deg;
    }

    .body {
      overflow: hidden;
      color: var(--wa-color-text-quiet);
    }

    :host([expanded]) .body:not(.animating) {
      overflow: visible;
    }

    .content {
      display: block;
      padding: 0 var(--padding, 1em) var(--padding, 1em);
    }
  }
`;
