import { capitalize } from '../../scripts/util/string.js';
import inputMixin from '../mixins/input.js';
import InfoTip from './info-tip.js';

const template = `
<wa-radio-group :label class="swatch-select" :class="'swatch-shape-' + shape" orientation="horizontal" :value @input="handleInput">
  <info-tip v-for="value in values">
      <wa-radio-button :value :label="getLabel(value)" :style="{'--color': getColor(value)}"></wa-radio-button>
      <template #content>
        {{ getLabel(value) }}
      </template>
  </info-tip>
</wa-radio-group>
  `;

export default {
  mixins: [inputMixin],
  props: {
    modelValue: String,
    name: String,
    label: String,
    shape: {
      type: String,
      default: 'rounded',
      validator: value => ['circle', 'rounded'].includes(value),
    },
    getLabel: {
      type: Function,
      default: capitalize,
    },
    getColor: {
      type: Function,
      default: value => `var(--wa-color-${value})`,
    },
    values: {
      type: Array,
      default: [],
    },
  },
  computed: {},

  methods: {
    capitalize,
  },

  template,
  components: {
    InfoTip,
  },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
