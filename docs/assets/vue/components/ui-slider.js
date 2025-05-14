import inputMixin from '../mixins/input.js';
import InfoTip from './info-tip.js';

let maxUid = 0;

const template = `
    <div class="ui-slider">
      <div class="ui-slider-header">
        <label :for="sliderId">{{ label }}</label>
        <info-tip v-if="value !== defaultValue ?? initialValue" :text="'Reset to ' + tooltipFormatter(defaultValue ?? initialValue)">
          <wa-icon-button @click="value = defaultValue ?? initialValue" class="clear-button" name="circle-xmark" library="system" variant="regular" :label="'Reset to ' + tooltipFormatter(defaultValue ?? initialValue)"></wa-icon-button>
        </info-tip>
      </div>
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
    defaultValue: Number,
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
    clearable: Boolean,
  },
  data() {
    let uid = ++maxUid;
    return { uid, value: this.modelValue };
  },
  mounted() {
    if (this.tooltip) {
      this.$refs.slider.tooltipFormatter = this.tooltipFormatter;
    }
  },
  computed: {
    sliderId() {
      return this.id || `ui-slider-${this.uid}`;
    },
    tooltipFormatter() {
      if (typeof this.tooltip === 'string') {
        return v => this.tooltip.replaceAll('{value}', v);
      }

      return this.tooltip;
    },
  },

  watch: {
    tooltip() {
      if (this.$refs.slider) {
        this.$refs.slider.tooltipFormatter = this.tooltipFormatter;
      }
    },
  },
  template,

  components: {
    InfoTip,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
