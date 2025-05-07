import UiScrollable from './ui-scrollable.js';

const template = `
<ui-scrollable :disabled="!open" role="group" :name="name || 'panel'" :data-value="value" :data-step="step" class="panel" :class="{open}">
  <h2 :inert="open" class="panel-header" @click="openPanel" ref="panelHeader">
    <wa-icon name="chevron-left" class="back-icon" />
    <slot name="title">{{ title }}</slot>
  </h2>
  <div class="panel-content">
    <slot></slot>
  </div>
</ui-scrollable>
`;

export default {
  props: {
    title: String,
    name: String,
    step: Number,

    /** Id of this panel */
    value: String,

    /** Currently selected id */
    modelValue: String,
  },
  emits: ['update:modelValue', 'open'],
  data() {
    return {};
  },

  mounted() {
    if (this.open) {
      this.$refs.panelHeader.dispatchEvent(
        new CustomEvent('open', { detail: { value: this.value, step: this.step }, bubbles: true }),
      );
    }
  },

  computed: {
    open() {
      return this.value === this.modelValue;
    },
  },

  methods: {
    openPanel() {
      let wasOpen = this.open;
      this.$emit('update:modelValue', wasOpen ? '' : this.value);
    },
  },

  watch: {
    open: {
      immediate: true,
      handler(open) {
        if (open && this.$refs.panelHeader) {
          this.$refs.panelHeader.dispatchEvent(
            new CustomEvent('open', { detail: { value: this.value, step: this.step }, bubbles: true }),
          );
        }
      },
    },
  },

  template,
  components: {
    UiScrollable,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
