const template = `
<div class="scrollable" :class="{'can-scroll-top': canScrollTop, 'can-scroll-bottom': canScrollBottom}" ref="container">
  <div v-if="!disabled" class="scroll-shadow scroll-shadow-top"></div>
  <slot></slot>
  <div v-if="!disabled" class="scroll-shadow scroll-shadow-bottom"></div>
</div>
`;

export default {
  props: {
    disabled: Boolean,
  },
  data() {
    return {
      scrollTop: 0,
      scrollHeight: 0,
      height: 0,
    };
  },

  mounted() {
    let { container, content } = this.$refs;
    container.addEventListener('scroll', this.handleScroll, { passive: true });

    this.scrollHeight = container.scrollHeight;
    this.height = container.clientHeight;
  },

  computed: {
    canScrollTop() {
      return !this.disabled && this.scrollTop > 1;
    },

    maxScrollTop() {
      return this.scrollHeight - this.height;
    },

    canScrollBottom() {
      return !this.disabled && this.scrollTop < this.maxScrollTop - 1;
    },

    scrollProgress() {
      return this.scrollTop / this.maxScrollTop;
    },

    scrollProgressEnd() {
      return this.scrollProgress + this.maxScrollTop / this.scrollHeight;
    },

    scrollBottom() {
      return this.scrollHeight * this.scrollProgressEnd;
    },
  },

  methods: {
    handleScroll(event) {
      let { container } = this.$refs;
      this.scrollTop = container.scrollTop;
    },
  },

  watch: {
    scrollTop(value, oldValue) {
      let { container } = this.$refs;
      if (container && oldValue === 0) {
        this.scrollHeight = container.scrollHeight;
        this.height = container.clientHeight;
      }
    },
  },

  template,
  components: {},
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
