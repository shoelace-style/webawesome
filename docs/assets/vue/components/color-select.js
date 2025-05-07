import { capitalize } from '../../scripts/util/string.js';

const template = `
    <wa-select class="color-select" name="brand" :label="label" :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)"
    :style="{'--color': getColor(modelValue)}">
      <template v-for="values, group in computedGroups">
        <template v-if="group">
          <wa-divider v-if="group !== firstGroup"></wa-divider>
          <small>{{ group }}</small>
        </template>
        <wa-option v-if="values?.length" v-for="value of values" :label="getLabel(value)" :value="value" :style="{'--color': getColor(value)}" v-html="getContent?.(value) ?? getLabel(value)"></wa-option>
      </template>
      <slot></slot>
    </wa-select>
  `;

export default {
  props: {
    modelValue: String,
    label: String,
    getLabel: {
      type: Function,
      default: capitalize,
    },
    getContent: {
      type: Function,
    },
    getColor: {
      type: Function,
      default: value => `var(--wa-color-${value})`,
    },
    values: {
      type: Array,
      default: [],
    },
    groups: {
      type: Object,
    },
  },
  emits: ['update:modelValue', 'input'],
  data() {
    return {};
  },
  computed: {
    computedGroups() {
      let ret = {};

      if (this.values?.length) {
        ret[''] = this.values;
      }

      if (this.groups) {
        for (let group in this.groups) {
          if (this.groups[group]?.length) {
            ret[group] = this.groups[group];
          }
        }
      }

      return ret;
    },

    firstGroup() {
      return Object.keys(this.computedGroups)[0];
    },
  },

  methods: {
    capitalize,
    handleInput(e) {
      this.$emit('input', this.modelValue);
    },
  },
  template,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
