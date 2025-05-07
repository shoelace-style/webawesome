import UiScrollable from './ui-scrollable.js';

const template = `
<div role="group" :name="name || 'panel'" :data-value="value" :data-step="step" class="panel" :class="{open}" ref="panel">
  <h2 :inert="open" class="panel-header" @click="openPanel">
    <wa-icon name="chevron-left" class="back-icon" />
    <slot name="title">{{ title }}</slot>
  </h2>
  <ui-scrollable class="panel-content">
    <slot></slot>
  </ui-scrollable>
</div>
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
      this.$refs.panel.dispatchEvent(
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
        if (open && this.$refs.panel) {
          this.$refs.panel.dispatchEvent(
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
