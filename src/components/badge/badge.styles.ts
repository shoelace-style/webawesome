import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--wa-font-weight-medium);
    line-height: 1;
    border-radius: var(--wa-corners-xs);
    border: solid 1px var(--wa-color-surface-default);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--brand {
    background-color: var(--wa-color-brand-spot);
    color: var(--wa-color-brand-text-on-spot);
  }

  .badge--success {
    background-color: var(--wa-color-success-spot);
    color: var(--wa-color-success-text-on-spot);
  }

  .badge--neutral {
    background-color: var(--wa-color-neutral-spot);
    color: var(--wa-color-neutral-text-on-spot);
  }

  .badge--warning {
    background-color: var(--wa-color-warning-spot);
    color: var(--wa-color-warning-text-on-spot);
  }

  .badge--danger {
    background-color: var(--wa-color-danger-spot);
    color: var(--wa-color-danger-text-on-spot);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--wa-corners-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--brand {
    --pulse-color: var(--wa-color-brand-spot);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--wa-color-success-spot);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--wa-color-neutral-spot);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--wa-color-warning-spot);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--wa-color-danger-spot);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;
