import { css } from 'lit';

export default css`
  @layer wa-component {
    :host {
      --gap: var(--wa-space-l);
      --marker-size: 2em;
      --connector-color: var(--wa-color-neutral-fill-normal);
      --connector-width: var(--wa-border-width-m);
      --connector-gap: 0.35em;
      display: block;
    }

    .stepper {
      display: block;
    }

    .steps {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: var(--gap);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    :host([orientation='vertical']) .steps,
    :host(:state(stacked)) .steps {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;
