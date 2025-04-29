import InfoTip from './info-tip.js';

const template = `
<wa-radio-group :label class="swatch-select" orientation="horizontal" :value="modelValue" @input="handleInput">
  <info-tip v-for="value in values">
      <wa-radio-button :value :label="getLabel(value)" :style="{'--color': getColor(value)}"></wa-radio-button>
      <template #content>
        {{ getLabel(value) }}
      </template>
  </info-tip>
</wa-radio-group>
  `;

export default {
  props: {
    modelValue: String,
    name: String,
    label: String,
    getLabel: {
      type: Function,
      default: capitalize,
    },
    getColor: {
      type: Function,
      default: value => `var(--wa-color-${value})`,
    },
    values: {
      type: Array,
      default: [],
    },
  },
  emits: ['update:modelValue', 'input'],
  data() {
    return {
      value: this.modelValue,
    };
  },
  computed: {},

  methods: {
    capitalize,
    handleInput(e) {
      this.value = e.target.value;
      this.$emit('input', this.value);
    },
  },

  watch: {
    value() {
      this.$emit('update:modelValue', this.value);
    },
  },

  template,
  components: {
    InfoTip,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function capitalize(str) {
  str += '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
