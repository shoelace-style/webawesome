const template = `
	<slot>
  		<wa-icon-button :id="id" name="circle-question" variant="regular"></wa-icon-button>
	</slot>
	<wa-tooltip :for="id" ref="tooltip"><slot name="content"></slot></wa-tooltip>
  `;

let maxUid = 0;

export default {
  props: {},
  data() {
    let uid = ++maxUid;
    return { uid, id: 'info-tip-' + uid };
  },
  mounted() {
    let tooltip = this.$refs.tooltip;
    if (tooltip) {
      // Find trigger
      let trigger = tooltip.previousElementSibling;
      if (trigger) {
        if (trigger.id) {
          // Already has id
          this.id = trigger.id;
        } else {
          trigger.id = this.id;
        }
      }
    }
  },
  computed: {},
  template,
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
