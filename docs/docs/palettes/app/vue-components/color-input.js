import Color from 'https://colorjs.io/dist/color.js';
import { nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { identifyColor, stringifyColor } from '../color/util.js';
import { ROLES } from '/assets/scripts/tweak/data.js';
import { capitalize } from '/assets/scripts/tweak/util.js';

await customElements.whenDefined('wa-select');

let maxUid = 0;

export default {
  props: {
    modelValue: {
      type: Object,
      default(rawProps) {
        return { value: '' };
      },
    },
    otherColors: {
      type: Array,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  emits: ['update:modelValue', 'update:color', 'update:roles', 'delete'],
  data() {
    let uid = this.modelValue.uid ?? maxUid++;
    if (this.modelValue.uid) {
      maxUid = Math.max(maxUid, uid);
    }
    this.modelValue.uid = uid;

    let valueRaw = this.modelValue.value;
    let inputValueRaw = this.modelValue.inputValue ?? valueRaw;
    let color = tryColor(this.modelValue.value);
    let inputColor = tryColor(inputValueRaw);

    return {
      ROLES,
      uid,
      initialProps: { ...this.modelValue },
      valueRaw,
      value: color ? valueRaw : undefined,
      color,
      inputValueRaw,
      inputValue: inputColor ? inputValueRaw : undefined,
      inputColor,
      editing: 0,
      inputFocused: false,
    };
  },
  computed: {
    tweaked() {
      if (this.inputFocused || this.editing > 0 || !this.color || !this.inputColor) {
        return false;
      }

      return !this.inputColor.equals(this.color.to(this.inputColor.space));
    },

    computedValue() {
      let ret = {};
      for (let property of [
        'valueRaw',
        'value',
        'inputValueRaw',
        'inputValue',
        'colorRaw',
        'color',
        'inputColorRaw',
        'inputColor',
        'hue',
        'level',
        'tweaked',
      ]) {
        ret[property] = this[property];
      }

      return ret;
    },

    colorRaw() {
      let ret = tryColor(this.modelValue.valueRaw);

      if (ret) {
        this.value = this.modelValue.valueRaw;
      }

      return ret;
    },

    colorInfo() {
      if (!this.color) {
        return { hue: undefined, level: undefined };
      }

      return identifyColor(this.color, this.otherColors);
    },

    hue() {
      return this.colorInfo.hue;
    },

    level() {
      return this.colorInfo.level;
    },

    stringifiedColor() {
      // return stringifyColor(this.colorRaw);
      return this.color + '';
    },

    inputColorRaw() {
      let ret = tryColor(this.inputValueRaw);

      if (ret) {
        this.inputValue = this.inputValueRaw;
      }

      return ret;
    },
  },
  methods: {
    capitalize,

    handleInput(event) {
      this.editing++;

      let value = event.target.value;
      // Editing the input manually also incorporates tweaks as part of the color itself
      // I.e. input color and color are now the same
      this.valueRaw = this.modelValue.valueRaw = this.modelValue.inputValueRaw = this.inputValueRaw = value;
      this.$emit('update:modelValue', this.modelValue);

      nextTick().then(() => {
        if (this.colorRaw) {
          this.$refs.input.setCustomValidity('');
          this.$emit('update:color', this.colorRaw);
        } else {
          this.$refs.input.setCustomValidity('Invalid color');
          this.$refs.input.reportValidity();
        }

        this.editing--;
      });
    },

    revert() {
      this.$emit('update:modelValue', this.inputValue);
      this.$emit('update:color', this.inputColor);
    },
  },
  watch: {
    colorRaw: {
      deep: true,
      handler() {
        if (this.colorRaw) {
          this.color = this.colorRaw;
        }
      },
    },
    inputColorRaw: {
      deep: true,
      handler() {
        if (this.inputColorRaw) {
          this.inputColor = this.inputColorRaw;
        }
      },
    },
    color: {
      deep: true,
      handler() {
        if (this.tweaked && this.color) {
          // If tweaked, color is the source of truth
          this.value = this.valueRaw = this.modelValue.value = this.color + '';
          this.$emit('update:modelValue', this.modelValue);
        }
      },
    },
    computedValue: {
      deep: true,
      immediate: true,
      handler() {
        Object.assign(this.modelValue, this.computedValue);
        this.$emit('update:modelValue', this.modelValue);
      },
    },
  },
  template: `
    <wa-card size="small" class="color" :class="{tweaked}"
      :style="{'--color': value, '--color-original': inputValue}">
      <div slot="image" :style="{ colorScheme: level <= 60 ? 'dark' : 'light'}">
        <div class="original-color" v-if="tweaked">
          <wa-icon-button name="sliders-simple" class="tweak-icon"></wa-icon-button>
        </div>
        <wa-icon-button name="trash" label="Delete" variant="regular" class="delete-button" @click="$emit('delete')"></wa-icon-button>
        <div class="name">{{ capitalize(hue) || 'New color' }} {{ level }}</div>
      </div>

      <wa-select class="color-to-role" multiple appearance="plain" placeholder="(No states)" max-options-visible="2"
        :value.attr="roles.join(' ')" :value="roles"
        @input="$emit('update:roles', $event.target.value)">
        <wa-option v-for="role in ROLES" :value="role">{{ capitalize(role) }}</wa-option>
      </wa-select>

      <wa-input :value="valueRaw" @input="handleInput" @focus="inputFocused = true" @blur="inputFocused = false" ref="input"></wa-input>
    </wa-card>
  `,
};

function tryColor(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Color) {
    return value;
  }

  try {
    return new Color(value);
  } catch (e) {
    return null;
  }
}
