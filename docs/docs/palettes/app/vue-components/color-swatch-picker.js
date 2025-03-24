const template = `
<wa-radio-group class="core-color" orientation="horizontal" :value="modelValue" @input="handleInput($event.target.value)">
<template v-for="h in hues">
	<info-tip>
		<wa-radio-button :label="capitalize(h)" :value="h" :style="{'--color': colors[h]}"></wa-radio-button>
		<template #content>{{ capitalize(h) }}</template>
	</info-tip>
</template>
<div slot="label">{{ label }}</div>
</wa-radio-group>
`;

import Color from 'https://colorjs.io/dist/color.js';
import InfoTip from './info-tip.js';
import { hues } from '/assets/scripts/tweak/data.js';
import { capitalize, promise, roundTo } from '/assets/scripts/tweak/util.js';

export default {
  props: {
    modelValue: String,
    label: {
      type: String,
      default: 'Color',
    },
    colors: Object,
  },
  emits: ['update:modelValue', 'input'],
  data() {
    return {
      defaultValue: this.modelValue,
    };
  },
  created() {
    Object.assign(this, { hues });
  },
  computed: {},
  methods: {
    capitalize,

    /** Called when value changes due to user interaction */
    handleInput(value) {
      this.value = value;
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    },

    reset() {
      this.handleInput(this.defaultValue);
    },
  },
  template,
  components: { InfoTip },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
