import Color from 'https://colorjs.io/dist/color.js';
import { stringifyColor } from '../color/util.js';

export default {
  props: {
    token: String,
    color: {
      type: Color,
    },
  },
  data() {
    return {};
  },
  computed: {
    stringifiedColor() {
      return stringifyColor(this.color);
    },
  },
  template: `
  <wa-dropdown>
    <slot name="trigger" slot="trigger"></slot>
    <div class="popup">
      <slot></slot>
      <div class="wa-stack wa-gap-xs">
        <div class="copyable-code" v-if="token">
          <code>{{ token }}</code>
          <wa-copy-button :value="token"></wa-copy-button>
        </div>
        <div class="copyable-code" v-if="color">
          <code>{{ stringifiedColor }}</code>
          <wa-copy-button :value="stringifiedColor"></wa-copy-button>
        </div>
      </div>
    </div>
  </wa-dropdown>`,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
