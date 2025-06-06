import inputMixin from '../mixins/input.js';
import InfoTip from './info-tip.js';

let maxUid = 0;

const template = `
    <div class="ui-slider">
      <div class="ui-slider-header">
        <label :for="sliderId">{{ label }}</label>
        <info-tip v-if="clearable && (value !== defaultValue ?? initialValue)" :text="'Reset to ' + valueFormatter(defaultValue ?? initialValue)">
          <wa-button @click="value = defaultValue ?? initialValue" class="clear-button">
            <wa-icon name="circle-xmark" library="system" variant="regular" :label="'Reset to ' + tooltipFormatter(defaultValue ?? initialValue)"></wa-icon>
          </wa-button>
        </info-tip>
      </div>
      <info-tip v-if="$slots.min" :text="'Set to min (' + valueFormatter(min) + ')'">
        <wa-button class="ui-slider-min" appearance="plain" size="small" @click="value = min"><slot name="min"></slot></wa-button>
      </info-tip>
      <wa-slider ref="slider" :id="sliderId" class="ui-slider" :value  @input="handleInput"
                :min="min" :max="max" :step="step">
      </wa-slider>
      <info-tip v-if="$slots.max" :text="'Set to max (' + valueFormatter(max) + ')'">
        <wa-button class="ui-slider-max" appearance="plain" size="small" @click="value = max"><slot name="max"></slot></wa-button>
      </info-tip>
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
    format: [Function, String],
    clearable: Boolean,
  },
  data() {
    let uid = ++maxUid;
    return { uid, value: this.modelValue };
  },
  mounted() {
    if (this.format) {
      this.$refs.slider.tooltipFormatter = this.valueFormatter;
    }
  },
  computed: {
    sliderId() {
      return this.id || `ui-slider-${this.uid}`;
    },
    valueFormatter() {
      if (typeof this.format === 'string') {
        return v => this.format.replaceAll('{value}', v);
      }

      return this.format;
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
