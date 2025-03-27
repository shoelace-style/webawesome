const template = `
<details :name="name || 'panel'":data-value="value" :open class="panel wa-plain" :class="{previous: previous === value}" @toggle="handleToggle">
  <summary :inert="open">
    <h2><slot name="title">{{ title }}</slot></h2>
  </summary>
  <div class="panel-content">
    <slot></slot>
  </div>
</details>
`;

export default {
  props: {
    title: String,
    name: String,

    /** Id of this panel */
    value: String,

    /** Currently selected id */
    modelValue: String,

    /** Previous panel, if this is a list of steps */
    previous: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },

  computed: {
    open() {
      return this.value === this.modelValue;
    },
  },

  methods: {
    handleToggle(event) {
      if (event.target.open) {
        this.$emit('update:modelValue', this.value);
      } else if (this.open) {
        this.$emit('update:modelValue', '');
      }
    },
  },

  template,
  components: {},
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
