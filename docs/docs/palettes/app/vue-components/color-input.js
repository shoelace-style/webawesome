import Color from 'https://colorjs.io/dist/color.js';
import { identifyColor } from '../color/util.js';
import { capitalize } from '/assets/scripts/tweak/util.js';

await customElements.whenDefined('wa-select');

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
    colorOriginal: {
      type: Color,
      default: null,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  emits: ['update:modelValue', 'update:colorObject', 'update:roles', 'delete'],
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
    <wa-card size="small"
      class="color" :class="{tweaked: !!colorOriginal}"
      :style="{'--color': modelValue, '--color-original': colorOriginal, colorScheme: colorInfo?.level <= 60 ? 'dark' : 'light'}">
      <div slot="image" >
      <wa-icon name="sliders-simple" class="tweak-icon" v-if="colorOriginal"></wa-icon>
        <wa-icon-button name="trash" label="Delete" variant="regular" class="delete-button" @click="$emit('delete')"></wa-icon-button>
        <div class="name">{{ capitalize(colorInfo?.hue) || 'New color' }} {{ colorInfo.level }}</div>
      </div>
      <wa-select class="color-to-role" multiple size="small" appearance="plain" placeholder="(No states)"
        :value.attr="roles.join(' ')" :value="roles"
        @input="$emit('update:roles', $event.target.value)">
        <wa-option v-for="role in ['brand', 'neutral', 'success', 'warning', 'danger']" :value="role">{{ capitalize(role) }}</wa-option>
      </wa-select>
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
