import Color from 'https://colorjs.io/dist/color.js';
import { capitalize } from '/assets/scripts/tweak/util.js';

const percentFormatter = value => value.toLocaleString(undefined, { style: 'percent' });

export default {
  props: {
    modelValue: {
      type: Number,
      default(rawProps) {
        return rawProps.defaultValue ?? 0;
      },
    },
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1,
    },
    defaultValue: Number,
    type: {
      type: String,
      default: 'number',
    },

    getColor: {
      type: Function,
    },
    color: {
      type: Color,
      default(rawProps) {
        return rawProps.getColor(rawProps.modelValue);
      },
    },

    label: String,
    labelMin: String,
    labelMax: String,

    tweaking: Boolean,
  },
  emits: ['update:modelValue', 'update:tweaking', 'update:color'],
  data() {
    return {};
  },
  computed: {
    colorCurrent() {
      return this.getColor(this.modelValue);
    },

    colorMin() {
      return this.getColor(this.min);
    },

    colorMax() {
      return this.getColor(this.max);
    },
  },
  mounted() {
    if (this.$refs.slider && this.type === 'percentage') {
      this.$refs.slider.tooltipFormatter = percentFormatter;
    }
  },
  methods: {
    capitalize,
    handleInput(event) {
      this.$emit('update:tweaking', true);
      this.$emit('update:modelValue', event.target.value);
    },
  },
  watch: {
    colorCurrent() {
      this.$emit('update:color', this.colorCurrent);
    },
  },
  template: `
	<div class="decorated-slider" :style="{
		'--color': colorCurrent,
		'--color-1': colorMin,
		'--color-2': colorMax,
		}">
		<wa-slider ref="slider" :min="min" :max="max" :step="step"
		@change="$emit('update:tweaking', false)" :value="modelValue" @input="handleInput">
		<div slot="label">
			{{ label }}
			<wa-icon-button @click="$emit('update:modelValue', defaultValue)" class="clear-button" name="circle-xmark" library="system" variant="regular" label="Reset"></wa-icon-button>
		</div>
		</wa-slider>
		<div class="label-min">{{ labelMin }}</div>
		<div class="label-max">{{ labelMax }}</div>
	</div>
  `,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
