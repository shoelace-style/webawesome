export default (breakpoint: number) => `
  @media screen and (
    max-width: ${(Number.isSafeInteger(breakpoint) ? breakpoint.toString() : '768') + 'px'}
  ) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;
