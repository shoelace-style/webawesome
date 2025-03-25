const template = `
  <div ref="root">
    <template shadowrootmode="open">
      <slot></slot>
    </template>
  </div>
`;

export default {
  data() {
    return {};
  },

  template,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
