import Color from 'https://colorjs.io/dist/color.js';
import { identifyColor } from '../color/util.js';
import { capitalize } from '/assets/scripts/tweak/util.js';

export default {
  props: {
    modelValue: { type: [String, Color], default: '' },
    colorObject: {
      type: Color,
      default(rawProps) {
        return tryColor(rawProps.modelValue);
      },
    },
    colorInfo: {
      type: Object,
      default(rawProps) {
        return identifyColor(rawProps.colorObject);
      },
    },
  },
  emits: ['update:modelValue', 'update:colorObject', 'delete'],
  data() {
    return {};
  },
  computed: {},
  methods: {
    capitalize,
    handleInput(e) {
      this.$emit('input', this.modelValue);
    },
  },
  template: `
    <wa-card class="color" :class="colorInfo?.level < 70 ? 'dark' : 'light'" size="small">
      <div slot="image" :style="{'--color': modelValue, colorScheme: colorInfo?.level <= 60 ? 'dark' : 'light'}">
        <wa-icon-button name="trash" label="Delete" variant="regular" class="delete-button" @click="$emit('delete')"></wa-icon-button>
        <div class="name">{{ capitalize(colorInfo?.hue) || 'New color' }} {{ colorInfo.level }}</div>
      </div>
      <wa-input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></wa-input>
    </wa-card>
  `,
};

function tryColor(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Color) {
    return value;
  }

  try {
    return new Color(value);
  } catch (e) {
    return null;
  }
}
