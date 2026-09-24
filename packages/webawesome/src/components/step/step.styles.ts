import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --_accent: var(--wa-color-brand-fill-loud);
      --_accent-on: var(--wa-color-brand-on-loud);
      --_filled: var(--wa-color-brand-fill-normal);
      --_filled-on: var(--wa-color-brand-on-normal);
      --_marker-background: transparent;
      --_marker-border-color: var(--wa-color-neutral-border-normal);
      --_marker-border-style: solid;
      --_marker-border-width: var(--wa-form-control-border-width);
      --_marker-color: var(--wa-color-text-quiet);

      display: flex;
      flex: 2 1 0%;
    }

    /* Horizontal steps span the full width. */
    :host(:not([data-wa-step-vertical]):first-child),
    :host(:not([data-wa-step-vertical]):last-child) {
      flex-grow: 1;
    }

    :host([variant]) {
      --_accent: var(--wa-color-fill-loud);
      --_accent-on: var(--wa-color-on-loud);
      --_filled: var(--wa-color-fill-normal);
      --_filled-on: var(--wa-color-on-normal);
      --_marker-border-color: var(--wa-color-border-normal);
      --_marker-color: var(--wa-color-on-quiet);
    }

    :host(:state(completed)) {
      --_marker-background: var(--_filled);
      --_marker-border-color: transparent;
      --_marker-color: var(--_filled-on);
    }

    :host(:state(active)) {
      --_marker-background: var(--_accent);
      --_marker-border-color: transparent;
      --_marker-color: var(--_accent-on);
    }

    :host(:state(locked)) {
      --_marker-background: transparent;
      --_marker-border-color: var(--wa-color-neutral-border-normal);
      --_marker-border-style: dashed;
      --_marker-color: var(--wa-color-text-quiet);
    }

    :host([data-wa-step-vertical]) {
      flex: 0 0 auto;
    }

    .step {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
    }

    .body {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: center;
      gap: 0.5em;
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
      background: none;
      font: inherit;
      color: var(--wa-color-text-normal);
      text-align: center;
      cursor: default;
    }

    :host(:not([data-wa-step-vertical]):first-child) .body {
      align-items: flex-start;
      text-align: start;
    }

    :host(:not([data-wa-step-vertical]):last-child) .body {
      align-items: flex-end;
      text-align: end;
    }

    button.body {
      cursor: pointer;
    }

    button.body:disabled {
      cursor: not-allowed;
    }

    button.body:focus-visible {
      outline: none;
    }

    button.body:focus-visible .marker {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    :host([disabled]) .body {
      opacity: 0.5;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    :host([data-wa-step-vertical]) .body {
      flex-direction: row;
      align-items: flex-start;
      text-align: start;
      gap: 1em;
    }

    :host([data-wa-step-vertical]) .content {
      justify-content: center;
      min-height: var(--marker-size, 2em);
    }

    /* Connector. Each step draws two halves that meet in the middle of the gap. */
    .connector-start,
    .connector-end {
      position: absolute;
      z-index: 0;
      background-color: var(--connector-color, var(--wa-color-neutral-fill-normal));
    }

    :host(:first-child) .connector-start,
    :host([data-wa-step-vertical]) .connector-start,
    :host(:last-child) .connector-end {
      display: none;
    }

    :host(:not([data-wa-step-vertical])) .connector-start,
    :host(:not([data-wa-step-vertical])) .connector-end {
      top: calc(var(--marker-size, 2em) / 2);
      height: var(--connector-width, var(--wa-border-width-m));
      translate: 0 -50%;
    }

    :host(:not([data-wa-step-vertical])) .connector-start {
      inset-inline-start: calc(-1 * var(--gap, var(--wa-space-l)) / 2);
      inset-inline-end: calc(50% + var(--marker-size, 2em) / 2 + var(--connector-gap, 0.35em));
    }

    :host(:not([data-wa-step-vertical])) .connector-end {
      inset-inline-start: calc(50% + var(--marker-size, 2em) / 2 + var(--connector-gap, 0.35em));
      inset-inline-end: calc(-1 * var(--gap, var(--wa-space-l)) / 2);
    }

    :host(:not([data-wa-step-vertical]):first-child) .connector-end {
      inset-inline-start: calc(var(--marker-size, 2em) + var(--connector-gap, 0.35em));
    }

    :host(:not([data-wa-step-vertical]):last-child) .connector-start {
      inset-inline-end: calc(var(--marker-size, 2em) + var(--connector-gap, 0.35em));
    }

    /* Vertical steps only draw the end half, stretched to reach the next step's marker. */
    :host([data-wa-step-vertical]) .connector-end {
      inset-inline-start: calc(var(--marker-size, 2em) / 2);
      inset-block-start: calc(var(--marker-size, 2em) + var(--connector-gap, 0.35em));
      inset-block-end: calc(-1 * var(--gap, var(--wa-space-l)) + var(--connector-gap, 0.35em));
      width: var(--connector-width, var(--wa-border-width-m));
      translate: -50% 0;
    }

    :host(:state(completed)) .connector-end {
      background-color: var(--connector-color-active, var(--_filled));
    }

    /* The leading half takes the completed previous step's fill via the .wa-{variant} class the stepper hands down. */
    .connector-start[data-completed] {
      background-color: var(--connector-color-active, var(--wa-color-fill-normal));
    }

    /* Marker */
    .marker {
      position: relative;
      z-index: 1;
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: var(--marker-size, 2em);
      height: var(--marker-size, 2em);
      font-weight: var(--wa-font-weight-action);
      line-height: 1;
      color: var(--_marker-color);
      background-color: var(--_marker-background);
      border: var(--_marker-border-style) var(--_marker-border-width) var(--_marker-border-color);
      border-radius: var(--wa-border-radius-circle);
      transition:
        background-color var(--wa-transition-fast) var(--wa-transition-easing),
        border-color var(--wa-transition-fast) var(--wa-transition-easing),
        color var(--wa-transition-fast) var(--wa-transition-easing);
    }

    @media (hover: hover) {
      button.body:enabled:hover .marker {
        background-color: color-mix(in oklab, var(--_marker-background), var(--wa-color-mix-hover));
      }
    }

    /* Attention, mirroring <wa-badge> */
    :host([attention='pulse']) .marker {
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 var(--pulse-color, var(--_accent));
      }
      70% {
        box-shadow: 0 0 0 0.5rem transparent;
      }
      100% {
        box-shadow: 0 0 0 0 transparent;
      }
    }

    :host([attention='bounce']) .marker {
      animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
    }

    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-5px);
      }
      60% {
        transform: translateY(-2px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marker {
        transition: none;
        animation: none;
      }
    }

    /* Same content-to-circle ratio as <wa-avatar>, for digits, icons, and the spinner alike. */
    .marker slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: calc(var(--marker-size, 2em) * 0.4);
    }

    .marker wa-spinner {
      color: var(--_accent);
    }

    /* Label & description */
    .label {
      font-weight: var(--wa-font-weight-action);
      line-height: var(--wa-line-height-condensed);
    }

    :host(:not(:state(active), :state(completed))) .label {
      color: var(--wa-color-text-quiet);
    }

    .description {
      font-size: var(--wa-font-size-smaller);
      line-height: var(--wa-line-height-condensed);
      color: var(--wa-color-text-quiet);
    }

    .description[hidden] {
      display: none;
    }

    /* Forced colors flatten backgrounds to Canvas, so anything that's fill-only needs a system-color edge. */
    @media (forced-colors: active) {
      .connector-start,
      .connector-end {
        background-color: CanvasText;
      }

      :host(:state(completed)) .marker,
      :host(:state(active)) .marker {
        border-color: CanvasText;
      }

      :host(:state(active)) .marker {
        outline: dashed 1px SelectedItem;
      }
    }
  }
`;
