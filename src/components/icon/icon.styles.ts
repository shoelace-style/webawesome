import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    width: auto;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: auto;
    fill: currentColor;
  }
`;
