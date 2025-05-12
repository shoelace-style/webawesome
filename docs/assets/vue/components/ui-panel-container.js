const template = `
<section class="panel-container" ref="container" :style="{'--panel-step': step}" @open="handleOpen">
  <slot ref="panels"></slot>
</section>
`;

export default {
  props: {
    /** Currently selected id */
    modelValue: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: '',
      previousValue: '',
      step: 0,
      trail: [],
    };
  },

  mounted() {
    let { container } = this.$refs;
    let activePanel = container.querySelector(':scope > .open');

    if (activePanel) {
      let { step, value } = activePanel.dataset;
      this.step = Number(step);
      this.value = value;
      this.$emit('update:modelValue', this.value);
    }
  },

  computed: {
    panels() {
      if (!this.$refs.container) {
        return new Map();
      }

      let { container } = this.$refs;

      return new Map(
        [...container.querySelectorAll(':scope > .panel')].map(panel => [
          panel.dataset.value,
          Number(panel.dataset.step),
        ]),
      );
    },
  },

  methods: {
    handleOpen(e) {
      let { value, step } = e.detail;
      this.value = value;
      this.step = step;
    },

    updatePanels() {
      let { container } = this.$refs;

      if (!container) {
        return;
      }

      let { step, value } = this;

      if (this.panels.get(value) !== step) {
        // Hasn't stabilized yet
        return;
      }

      let previousValue = this.trail.findLast(panel => this.panels.get(panel) === step - 1);

      for (let panel of container.querySelectorAll(':scope > .panel')) {
        let panelStep = Number(panel.dataset.step);
        let panelValue = panel.dataset.value;
        let isPrevious = previousValue ? panelValue === previousValue : panelStep === step - 1;
        let isOpen = panelValue === value;
        let isNext = panelStep === step + 1;

        panel.classList.toggle('previous', isPrevious);
        panel.classList.toggle('open', isOpen);
        panel.classList.toggle('next', isNext);
      }
    },
  },

  watch: {
    value() {
      if (this.value !== this.modelValue) {
        this.$emit('update:modelValue', this.value);
      }
    },

    modelValue: {
      immediate: true,
      async handler(value, previousValue) {
        if (this.value !== this.modelValue) {
          this.value = this.modelValue;
        }

        if (previousValue) {
          this.trail.push(previousValue);
        }

        this.updatePanels();
      },
    },

    step() {
      this.updatePanels();
    },
  },

  template,
  components: {},
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
