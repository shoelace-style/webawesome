export default (breakpoint: string = '768px') => `
  @media screen and (width < ${breakpoint}) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;
