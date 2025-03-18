const template = `
<color-popup :title :token="token" :color="modelValue"
  :pinned :pinnable @pin="$emit('pin')" :deletable @delete="$emit('delete')">
  <div slot="trigger" class="color swatch" :style="{ '--color': modelValue, colorScheme: level > 60 ? 'light' : 'dark' }">
    <wa-icon class="pinned-icon" name="thumbtack" variant="regular" v-if="pinned"></wa-icon>
    <wa-icon name="sliders-simple" class="tweak-icon"></wa-icon>
  </div>
  <template #content>
    <color-slider v-if="(isEdge || pinned) && tweakBase && HUE_RANGES[hue]"
      :color="modelValue" @update:model-value="$emit('update:modelValue', $event)" :default-value="colors[hue][tweakBase].oklch.h"
      @input="!pinned ? $emit('pin') : null"
      coord="h" :min="HUE_RANGES[hue].min + 1" :max="HUE_RANGES[hue].max" :step="1"
      label="Hue shift" :label-min="moreHue[hueBefore[hue]]" :label-max="moreHue[hueAfter[hue]]"
      :label-default="\`\${capitalize(hue)} \${tweakBase}\`"
      ></color-slider>
  </template>
</color-popup>
`;

import Color from 'https://colorjs.io/dist/color.js';
import ColorPopup from './color-popup.js';
import ColorSlider from './color-slider.js';
import InfoTip from './info-tip.js';
import { HUE_RANGES, hueAfter, hueBefore, hues, moreHue } from '/assets/scripts/tweak/data.js';
import { capitalize, clamp, promise, roundTo } from '/assets/scripts/tweak/util.js';

export default {
  props: {
    modelValue: Color,
    hue: {
      type: String,
      required: true,
    },
    level: {
      type: [String, Number],
      required: true,
    },
    coreLevel: {
      type: [String, Number],
      required: true,
    },
    pinned: Boolean,
    pinnable: Boolean,
    deletable: Boolean,
    colors: {
      type: Object,
      required: true,
    },
    tweakBase: [String, Number],
  },
  emits: ['update:modelValue', 'pin', 'delete'],
  data() {
    return {};
  },
  created() {
    // Attach non-reactive data
    Object.assign(this, { moreHue, HUE_RANGES });
  },
  computed: {
    title() {
      return capitalize(this.hue) + ' ' + this.level;
    },
    hueBefore() {
      return hueBefore[this.hue];
    },
    hueAfter() {
      return hueAfter[this.hue];
    },
    token() {
      return `--wa-color-${this.hue}-${this.level}`;
    },
    isEdge() {
      return this.level == '95' || this.level == '05';
    },
    isCore() {
      return this.level == this.coreLevel;
    },
  },
  methods: { capitalize },
  template,
  components: { InfoTip, ColorSlider, ColorPopup },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
