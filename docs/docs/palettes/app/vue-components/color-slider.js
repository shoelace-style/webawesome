const template = `
<div class="color-slider" :style="{
  '--color': colorCurrent, '--color-1': colorMin, '--color-2': colorMax,
  '--default-value-progress': (computedDefaultValue - min) / (max - min),
  }" :data-component="colorComponent || null">
  <wa-slider ref="slider" :min="min" :max="max" :step="step" :value="value" @change="$emit('update:tweaking', false)"  @input="handleInput">
    <div slot="label">
      {{ label }}
      <wa-icon-button v-if="value !== computedDefaultValue" @click="reset" class="clear-button" name="circle-xmark" library="system" variant="regular" label="Reset"></wa-icon-button>
      <info-tip>
        <div class="tick"></div>
        <template #content>Default value</template>
      </info-tip>
    </div>
  </wa-slider>
  <div class="label-min">{{ labelMin }}</div>
  <div class="label-max">{{ labelMax }}</div>
</div>
`;

import Color from 'https://colorjs.io/dist/color.js';
import InfoTip from './info-tip.js';
import { capitalize, clamp, promise } from '/assets/scripts/tweak/util.js';

const percentFormatter = value => value.toLocaleString(undefined, { style: 'percent' });

export default {
  props: {
    colorComponent: String,
    defaultColor: {
      type: Color,
    },
    defaultValue: {
      type: Number,
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
      default(rawProps) {
        return clamp(0, Math.abs((rawProps.max - rawProps.min) / 100), 1);
      },
    },

    type: {
      type: String,
      default: 'raw',
    },

    getColor: {
      type: Function,
    },
    color: {
      type: Color,
      default(rawProps) {
        if (rawProps.defaultColor) {
          return rawProps.defaultColor;
        }

        return rawProps.getColor(getValue(rawProps), rawProps.modelValue);
      },
    },

    label: String,
    labelMin: String,
    labelMax: String,

    tweaking: Boolean,
  },
  emits: ['update:modelValue', 'update:tweaking', 'update:color'],
  data() {
    let { type, modelValue, defaultValue } = this;
    let value = getValue({ type, modelValue, defaultValue });

    return {
      mounted: promise(),
      initialColor: this.color,
      value,
    };
  },
  mounted() {
    if (this.value === undefined) {
      this.value = this.computedDefaultValue;
    }

    if (this.$refs.slider) {
      if (this.type === 'scale') {
        this.$refs.slider.tooltipFormatter = percentFormatter;
      }
      this.$refs.slider.colorSliderData = this; // for debugging
    }

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
  },
  methods: {
    capitalize,

    getColorAt(value) {
      if (this.getColor) {
        return this.getColor(value, this.modelValue);
      }

      if (this.computedDefaultColor && this.colorComponent) {
        return this.computedDefaultColor.clone().set(this.colorComponent, value);
      }
    },

    handleInput(event) {
      let value = (this.value = event.target.value);
      let modelValue = getModelValue({ type: this.type, value, defaultValue: this.computedDefaultValue });

      this.$emit('update:tweaking', true);
      this.$emit('update:modelValue', modelValue);
    },

    reset() {
      let { value, type, defaultValue } = this;
      this.$emit('update:modelValue', getModelValue({ value, type, defaultValue }));
    },
  },
  watch: {
    colorCurrentString() {
      this.$emit('update:color', this.colorCurrent);
    },
  },
  template,
  components: { InfoTip },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function getValue({ type, modelValue, defaultValue }) {
  if (defaultValue === undefined && (type === 'shift' || type === 'scale')) {
    return undefined;
  }

  if (type === 'shift') {
    return modelValue + defaultValue;
  }

  if (type === 'scale') {
    return modelValue * defaultValue;
  }

  return modelValue;
}

function getModelValue({ value, type, defaultValue }) {
  if (defaultValue === undefined && (type === 'shift' || type === 'scale')) {
    return undefined;
  }

  if (type === 'shift') {
    return value - defaultValue;
  }

  if (type === 'scale') {
    return value / defaultValue;
  }

  return value;
}
