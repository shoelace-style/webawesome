import Color from 'https://colorjs.io/dist/color.js';
import { identifyColor } from '../color/util.js';
import { capitalize } from '/assets/scripts/tweak/util.js';

export default {
  props: ['modelValue'],
  emits: ['update:modelValue', 'delete'],
  data() {
    return {};
  },
  computed: {
    color() {
      if (this.modelValue instanceof Color) {
        return this.modelValue;
      }

      try {
        return new Color(this.modelValue);
      } catch (e) {
        return null;
      }
    },

    colorInfo() {
      if (!this.color) return '';
      return identifyColor(this.color);
    },
  },
  methods: {
    capitalize,
    handleInput(e) {
      this.$emit('input', this.modelValue);
    },
  },
  template: `
    <wa-card class="color" size="small">
      <div slot="image" :style="{'--color': modelValue, colorScheme: colorInfo.level <= 60 ? 'dark' : 'light'}">
        <wa-icon-button name="trash" label="Delete" variant="regular" class="delete-button" @click="$emit('delete')"></wa-icon-button>
      </div>
      <div class="name">{{ capitalize(colorInfo.hue) || 'New color' }} {{ colorInfo.level }}</div>
      <wa-input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></wa-input>
    </wa-card>
  `,
};
