/**
 * Mixin for components that behave like form controls.
 */

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      initialValue: this.modelValue,
      value: this.modelValue,
    };
  },
  emits: ['update:modelValue', 'input'],
  methods: {
    handleInput(e) {
      this.value = e.target.value;
      this.$emit('input', this.value);
    },
  },
  watch: {
    value(value) {
      this.$emit('update:modelValue', value);
    },
    modelValue(value) {
      this.value = value;
    },
  },
};
