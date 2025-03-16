import Color from 'https://colorjs.io/dist/color.js';
import { stringifyColor } from '../color/util.js';
import InfoTip from './info-tip.js';

export default {
  props: {
    title: String,
    token: String,
    color: Color,
    deletable: Boolean,
    pinnable: Boolean,
    pinned: Object,
    placement: String,
  },
  data() {
    return {};
  },
  emits: ['delete', 'pin'],
  mounted() {
    let popup = this.$refs.popup;

    if (popup) {
      // Find trigger
      let trigger = popup.previousElementSibling;
      if (trigger) {
        trigger.slot ||= 'trigger';
      }
    }
  },
  computed: {
    stringifiedColor() {
      return stringifyColor(this.color);
    },
  },
  template: `
  <wa-dropdown class="color-popup" :placement>
    <slot></slot>
    <component :is="title ? 'fieldset' : 'div'" class="popup" ref="popup">
      <component :is="title ? 'legend' : 'div'"  class="wa-heading-s" v-if="title || token || deletable || pinnable">
        <span v-if="title">{{ title }}</span>
        <wa-copy-button v-if="title && token" :value="token" :copy-label="token"></wa-copy-button>

        <info-tip v-if="deletable && pinned">
          <wa-button size="small" variant="danger" appearance="plain" class="delete-button align-end" @click="$emit('delete')">
            <wa-icon name="trash" variant="regular"></wa-icon>
          </wa-button>
          <template #content>
            Delete from my colors
          </template>
        </info-tip>
        <info-tip v-if="pinnable && !pinned">
          <wa-button appearance="outlined" size="small" class="pin-color align-end" @click="$emit('pin')">
            <wa-icon name="thumbtack" variant="regular" slot="prefix"></wa-icon>
            Pin
          </wa-button>
          <template #content>
            Prevent this color from changing as others are edited
          </template>
        </info-tip>
      </component>

      <slot name="content"></slot>

      <div class="wa-stack wa-gap-xs">
        <div class="copyable-code" v-if="token && !title">
          <code>{{ token }}</code>
          <wa-copy-button :value="token"></wa-copy-button>
        </div>
        <div class="copyable-code" v-if="color">
          <code>{{ stringifiedColor }}</code>
          <wa-copy-button :value="stringifiedColor"></wa-copy-button>
        </div>
      </div>
    </component>
  </wa-dropdown>`,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
  components: {
    InfoTip,
  },
};
