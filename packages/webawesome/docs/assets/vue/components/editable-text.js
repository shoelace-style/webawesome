import inputMixin from '../mixins/input.js';

const template = `
<span class="editable-text">
<template v-if="isEditing">
  <input ref="input" class="wa-size-s" :aria-label="label" :value="value" @input="handleInput" @keydown.enter="done" @keydown.esc="cancel" @blur="handleBlur" />
  <wa-icon-button v-if="blur !== 'done'" name="check" label="Done editing" @click="done"></wa-icon-button>
</template>
<template v-else>
  <span class="text" ref="wrapper" @focus="edit" @click="edit" tabindex="0">{{ value }}</span>
  <wa-icon-button name="pencil" :label="'Edit ' + label" @click="edit"></wa-icon-button>
</template>
</span>
`;

export default {
  mixins: [inputMixin],
  props: {
    label: {
      type: String,
      default: 'Rename',
    },
    blur: {
      type: String,
      validator(value) {
        return ['', 'done', 'cancel'].includes(value);
      },
    },
  },
  emits: ['update:modelValue', 'submit'],
  data() {
    return {
      previousValue: undefined,
      isEditing: false,
    };
  },
  computed: {},

  methods: {
    edit(event) {
      if (this.isEditing) {
        return;
      }

      event.stopPropagation();

      this.isEditing = true;
      this.previousValue = this.value;

      this.$nextTick(() => {
        this.$refs.input.focus();
        this.$refs.input.select();
      });
    },
    done(event) {
      if (!this.isEditing) {
        return;
      }

      event.stopPropagation();

      this.isEditing = false;

      if (!this.previousValue || this.previousValue !== this.value) {
        this.$emit('submit', this.value);
      }
    },
    cancel(event) {
      if (!this.isEditing) {
        return;
      }

      event.stopPropagation();

      this.isEditing = false;
      this.value = this.previousValue;
    },
    handleBlur(event) {
      this.done(event);
    },
  },
  template,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
