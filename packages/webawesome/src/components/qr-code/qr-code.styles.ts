import { css } from 'lit';

export default css`
  :host {
    --size: 128px;
    display: inline-block;
  }

  .qr-code__base {
    display: block;
    box-sizing: content-box;
  }

  canvas {
    display: block;
    width: var(--size);
    height: var(--size);
  }
`;
