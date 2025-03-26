const template = `
  <template ref="root">
    <slot></slot>
  </template>
`;

export default {
  props: {
    inject: String,
  },

  data() {
    return {};
  },

  async mounted() {
    await this.$nextTick();
    let templateElement = this.$refs.root;
    let root = templateElement?.parentNode;

    if (root && !root.shadowRoot) {
      root.attachShadow({ mode: 'open' });
    }

    root.shadowRoot.innerHTML = this.inject || '';
    root.shadowRoot.append(...templateElement.childNodes);
  },

  template,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-') || tag === 'fake-style',
  },
};
