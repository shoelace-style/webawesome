const template = `
<span class="editable-text">
<template v-if="isEditing">
  <input ref="input" class="wa-size-s" :aria-label="label" :value="value" @input="handleInput" @keydown.enter="done" @keydown.esc="cancel" />
  <wa-icon-button name="check" label="Done editing" @click="done"></wa-icon-button>
  <wa-icon-button name="xmark" label="Cancel" @click="cancel"></wa-icon-button>
</template>
<template v-else>
  <span class="text" ref="wrapper" @focus="edit" @click="edit" tabindex="0">{{ value }}</span>
  <wa-icon-button name="pencil" :label="'Edit ' + label" @click="edit"></wa-icon-button>
</template>
</span>
`;

export default {
  props: {
    modelValue: String,
    label: {
      type: String,
      default: 'Rename',
    },
  },
  emits: ['update:modelValue', 'submit'],
  data() {
    return {
      value: this.modelValue,
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
    handleInput(event) {
      this.value = event.target.value;
    },
  },
  watch: {
    value(newValue) {
      this.$emit('update:modelValue', newValue);
    },
  },
  template,
};
