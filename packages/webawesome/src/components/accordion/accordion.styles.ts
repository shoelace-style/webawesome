import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      display: block;
    }

    [part~='base'] {
      border: var(--border, var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border));
      border-radius: var(--radius, var(--wa-panel-border-radius));
      overflow: hidden;
    }
  }
`;
