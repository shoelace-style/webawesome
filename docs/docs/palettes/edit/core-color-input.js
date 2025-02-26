import Color from 'https://colorjs.io/dist/color.js';
import { hueRanges, L_RANGES } from '/assets/scripts/tweak/data.js';
import { capitalize, getRange } from '/assets/scripts/tweak/util.js';

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

    closestHue() {
      if (!this.color) return '';
      return getRange(hueRanges, this.color.get('oklch.h'), { type: 'angle' })?.key;
    },

    closestLevel() {
      if (!this.color) return '';
      return getRange(L_RANGES, this.color.get('oklch.l'))?.key;
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
      <div slot="image" :style="{'--color': modelValue, colorScheme: closestLevel <= 60 ? 'dark' : 'light'}">
        <wa-icon-button name="trash" label="Delete" variant="regular" class="delete-button" @click="$emit('delete')"></wa-icon-button>
      </div>
      <div class="name">{{ capitalize(closestHue) || 'New color' }} {{ closestLevel }}</div>
      <wa-input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></wa-input>
    </wa-card>
  `,
};
