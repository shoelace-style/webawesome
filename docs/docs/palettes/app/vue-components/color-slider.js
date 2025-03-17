const template = `
<div class="color-slider" :style="{
  '--color': computedColor, '--color-1': colorMin, '--color-2': colorMax,
  '--default-value-progress': defaultProgress,
  }" :data-component="coord || null">
  <wa-slider ref="slider" :min="min" :max="max" :step="step" :value="value"
    @input="handleInput($event.target.value);" @change="inputEnd($event.target.value)">
    <div slot="label">
      {{ label }}
      <wa-icon-button v-if="value !== computedDefaultValue" @click="reset" class="clear-button" name="circle-xmark" library="system" variant="regular" label="Reset"></wa-icon-button>
      <info-tip>
        <div class="tick"></div>
        <template #content>{{ computedLabelDefault }}</template>
      </info-tip>
    </div>
  </wa-slider>
  <div class="label-min">{{ labelMin }}</div>
  <div class="label-max">{{ labelMax }}</div>
</div>
`;

import Color from 'https://colorjs.io/dist/color.js';
import InfoTip from './info-tip.js';
import { capitalize, clamp, promise, roundTo } from '/assets/scripts/tweak/util.js';

export default {
  props: {
    coord: {
      type: String,
      required: true,
      validator(value) {
        return ['l', 'c', 'h'].includes(value);
      },
    },
    color: {
      type: Color,
    },
    defaultColor: {
      type: Color,
    },

    defaultValue: {
      type: Number,
    },
    /** Used for formatting only. Only specify if different from default value. */
    baseValue: {
      type: Number,
      default: undefined,
    },

    modelValue: {
      type: Number,
      default(rawProps) {
        return rawProps.defaultValue;
      },
    },
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1,
    },

    type: {
      type: String,
      default: 'raw',
    },
    formatType: {
      type: String,
    },

    label: String,
    labelMin: String,
    labelMax: String,
    labelDefault: String,
  },
  emits: ['update:modelValue', 'update:color', 'input'],
  data() {
    return {
      mounted: promise(),
      initialColor: this.color,
      value: undefined,
      tweaking: false,
    };
  },
  created() {
    if (!this.color && !this.defaultColor) {
      console.warn(
        `[${this.label}]`,
        '<color-slider> requires at least one of the following props: color, defaultColor',
      );
    }
  },
  mounted() {
    if (this.$refs.slider) {
      this.$refs.slider.tooltipFormatter = value => this.formatValue(value);
      this.$refs.slider.colorSliderData = this; // for debugging
    }

    this.value = getAbsoluteValue({
      type: this.type,
      relativeValue: this.modelValue,
      baseValue: this.computedDefaultValue,
    });

    this.mounted.resolve();
  },
  beforeUnmount() {
    delete this.$refs.slider?.colorSliderData;
  },
  computed: {
    computedColor() {
      return this.getColorAt(this.value);
    },

    computedColorCoords() {
      return this.computedColor.oklch.slice();
    },

    colorCoords() {
      let color = this.color ?? this.computedColor;
      return color?.oklch.slice();
    },

    computedColorString() {
      return `oklch(${this.computedColorCoords.join(' ')})`;
    },

    colorString() {
      return `oklch(${this.colorCoords.join(' ')})`;
    },

    defaultCoords() {
      if (this.defaultColor) {
        return this.defaultColor.oklch.slice();
      }

      let ret = this.color.oklch.slice();

      if (this.defaultValue !== undefined) {
        ret[this.coordIndex] = this.defaultValue;
      }

      return ret;
    },

    coordIndex() {
      return ['l', 'c', 'h'].indexOf(this.coord);
    },

    colorMin() {
      return this.getColorAt(this.min);
    },

    colorMax() {
      return this.getColorAt(this.max);
    },

    computedDefaultValue() {
      return this.defaultValue ?? this.defaultCoords[this.coordIndex];
    },

    computedDefaultColor() {
      return this.defaultColor ?? this.getColorAt(this.computedDefaultValue);
    },

    computedLabelDefault() {
      let labelDefault = this.labelDefault || 'Default value';
      let formattedDefaultValue = this.formatValue(this.computedDefaultValue);
      return `${labelDefault} (${formattedDefaultValue})`;
    },

    defaultProgress() {
      return (this.computedDefaultValue - this.min) / (this.max - this.min);
    },
  },
  methods: {
    capitalize,

    formatValue(value = this.value) {
      let formatType = this.formatType ?? this.type;
      let style = formatType === 'scale' ? 'percent' : undefined;

      if (formatType && formatType !== 'raw') {
        let baseValue = this.baseValue ?? this.computedDefaultValue;
        value = getRelativeValue({ type: formatType, absoluteValue: value, baseValue });
      }

      value = roundTo(value, this.step);
      return value.toLocaleString(undefined, { style });
    },

    getColorAt(value) {
      let coords = this.defaultCoords.slice();
      coords[this.coordIndex] = value;
      return new Color('oklch', coords);
    },

    /** Called when value changes due to user interaction */
    handleInput(value) {
      this.value = value;
      this.tweaking = true;

      let modelValue = getRelativeValue({
        type: this.type,
        absoluteValue: value,
        baseValue: this.computedDefaultValue,
      });

      this.$emit('update:modelValue', modelValue);
      this.$emit('input', modelValue);
    },

    inputEnd() {
      this.tweaking = false;
    },

    reset() {
      this.handleInput(this.computedDefaultValue);
      this.inputEnd();
    },
  },
  watch: {
    computedColorString() {
      if (this.color && this.colorString !== this.computedColorString) {
        // Color changed, communicate to the outside world
        this.$emit('update:color', this.computedColor);
      }
    },

    async colorString() {
      await this.$nextTick();
      await this.mounted;

      if (this.color && this.colorString !== this.computedColorString) {
        // Color changed in the outside world, update our internals
        if (this.colorCoords[this.coordIndex] !== this.value) {
          this.value = this.colorCoords[this.coordIndex];

          await this.$nextTick();

          let modelValue = getRelativeValue({
            type: this.type,
            absoluteValue: this.value,
            baseValue: this.computedDefaultValue,
          });

          this.$emit('update:modelValue', modelValue);
        }
      }
    },
  },
  template,
  components: { InfoTip },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function getAbsoluteValue({ type, relativeValue, baseValue }) {
  if (baseValue === undefined) {
    type = 'raw';
  }

  if (type === 'shift') {
    return relativeValue + baseValue;
  }

  if (type === 'scale') {
    return relativeValue * baseValue;
  }

  return relativeValue;
}

function getRelativeValue({ type, absoluteValue, baseValue }) {
  if (baseValue === undefined) {
    type = 'raw';
  }

  if (type === 'shift') {
    return absoluteValue - baseValue;
  }

  if (type === 'scale') {
    return absoluteValue / baseValue;
  }

  return absoluteValue;
}
