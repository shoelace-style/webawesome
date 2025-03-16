const template = `
<div class="color-slider" :style="{
  '--color': colorCurrent, '--color-1': colorMin, '--color-2': colorMax,
  '--default-value-progress': defaultProgress,
  }" :data-component="colorComponent || null">
  <wa-slider ref="slider" :min="min" :max="max" :step="step" :value="value"
    @input="handleInput($event.target.value); $emit('update:tweaking', true); $emit('input', $event.target.value);" @change="$emit('update:tweaking', false)">
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
    colorComponent: String,
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
      default(rawProps) {
        return rawProps.type ?? 'raw';
      },
    },

    getColor: {
      type: Function,
    },
    color: {
      type: Color,
    },

    label: String,
    labelMin: String,
    labelMax: String,
    labelDefault: String,

    tweaking: Boolean,
  },
  emits: ['update:modelValue', 'update:tweaking', 'update:color', 'input'],
  data() {
    return {
      mounted: promise(),
      initialColor: this.color,
      value: undefined,
    };
  },
  mounted() {
    if (this.$refs.slider) {
      this.$refs.slider.tooltipFormatter = value => this.formatValue(value);
      this.$refs.slider.colorSliderData = this; // for debugging
    }

    this.value = getAbsoluteValue({
      type: this.type,
      relativeValue: this.modelValue,
      baseValue: this.defaultValue,
    });

    this.mounted.resolve();
  },
  beforeUnmount() {
    delete this.$refs.slider?.colorSliderData;
  },
  computed: {
    colorCurrent() {
      return this.getColorAt(this.value, this.modelValue) ?? this.initialColor;
    },

    colorCurrentString() {
      return this.colorCurrent + '';
    },

    h() {
      return this.colorCurrent?.get('oklch.h') ?? this.initialColor?.get('oklch.h');
    },

    c() {
      return this.colorCurrent?.get('oklch.c') ?? this.initialColor?.get('oklch.c');
    },

    l() {
      return this.colorCurrent?.get('oklch.l') ?? this.initialColor?.get('oklch.l');
    },

    colorComponentValue() {
      if (this.colorComponent) {
        return this.color?.get(this.colorComponent);
      }
    },

    colorMin() {
      return this.getColorAt(this.min);
    },

    colorMax() {
      return this.getColorAt(this.max);
    },

    computedDefaultValue() {
      let { defaultValue, colorComponent, defaultColor, type, min, max } = this;

      if (defaultValue !== undefined) {
        return defaultValue;
      }

      if (colorComponent && defaultColor) {
        return this.computedDefaultColor.get(colorComponent);
      }

      return clamp(min, type === 'scale' ? 1 : 0, max);
    },

    computedDefaultColor() {
      if (this.defaultColor) {
        return this.defaultColor;
      }

      let defaultValue = this.computedDefaultValue;

      if (this.colorComponent && this.defaultValue !== undefined) {
        switch (this.colorComponent) {
          case 'oklch.l':
            return new Color('oklch', [defaultValue, this.c, this.h]);
          case 'oklch.c':
            return new Color('oklch', [this.l, defaultValue, this.h]);
          case 'oklch.h':
            return new Color('oklch', [this.l, this.c, defaultValue]);
        }
      }

      return this.getColor?.(defaultValue);
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
      let style = this.formatType === 'scale' ? 'percent' : undefined;

      if (this.formatType !== 'raw') {
        let baseValue = this.baseValue ?? this.computedDefaultValue;
        value = getRelativeValue({ type: this.formatType, absoluteValue: value, baseValue });
      }

      value = roundTo(value, this.step);
      return value.toLocaleString(undefined, { style });
    },

    getColorAt(value) {
      if (this.getColor) {
        return this.getColor(value, this.modelValue);
      }

      if (this.computedDefaultColor && this.colorComponent) {
        return this.computedDefaultColor.clone().set(this.colorComponent, value);
      }
    },

    handleInput(value) {
      this.value = value;

      let modelValue = getRelativeValue({
        type: this.type,
        absoluteValue: value,
        baseValue: this.computedDefaultValue,
      });

      this.$emit('update:modelValue', modelValue);
    },

    reset() {
      this.handleInput(this.computedDefaultValue);
      this.$emit('input', this.computedDefaultValue);
    },
  },
  watch: {
    async colorCurrentString() {
      if (!this.colorComponent) {
        // If we're monitoring a specific color component, we can key off changes to that value
        await this.$nextTick();
        if (this.color + '' !== this.colorCurrentString) {
          // Still different
          this.$emit('update:color', this.colorCurrent);
        }
      }
    },

    async colorComponentValue() {
      await this.$nextTick();
      if (this.value !== this.colorComponentValue) {
        // Color changed externally
        this.value = this.colorComponentValue;
        this.$emit('update:color', this.colorCurrent);
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
