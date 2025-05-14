import inputMixin from '../mixins/input.js';

let maxUid = 0;

const template = `
    <div class="ui-slider">
      <label v-if="label" :for="sliderId">{{ label }}</label>
      <wa-button v-if="$slots.min" :aria-label="'Set to min (' + min + ')'" class="ui-slider-min" appearance="plain" size="small" @click="value = min"><slot name="min"></slot></wa-button>
      <wa-slider ref="slider" :id="sliderId" class="ui-slider" :value  @input="handleInput"
                :min="min" :max="max" :step="step">
      </wa-slider>
      <wa-button v-if="$slots.max" :aria-label="'Set to max (' + max + ')'" class="ui-slider-max" appearance="plain" size="small" @click="value = max"><slot name="max"></slot></wa-button>
    </div>
  `;

export default {
  mixins: [inputMixin],
  props: {
    label: String,
    id: String,
    baseValue: Number,
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default(rawProps) {
        return (rawProps.max - rawProps.min) / 100;
      },
    },
    tooltip: [Function, String],
  },
  data() {
    let uid = ++maxUid;
    return { uid, value: this.modelValue };
  },
  mounted() {
    if (this.tooltip) {
      applySliderTooltip(this.$refs.slider, this.tooltip);
    }
  },
  computed: {
    sliderId() {
      return this.id || `ui-slider-${this.uid}`;
    },
  },

  watch: {
    tooltip(value) {
      applySliderTooltip(this.$refs.slider, value);
    },
  },
  template,

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

async function applySliderTooltip(slider, tooltip) {
  if (!slider || !tooltip) return;

  await customElements.whenDefined('wa-slider');
  await slider.updateComplete;

  if (typeof tooltip === 'function') {
    slider.tooltipFormatter = tooltip;
  } else if (typeof tooltip === 'string') {
    slider.tooltipFormatter = v => tooltip.replaceAll('{value}', v);
  }
}
