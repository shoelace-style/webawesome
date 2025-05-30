const template = `
	<slot>
  		<wa-icon :slot class="info-tip-default-trigger" :id="id" name="circle-question" variant="regular" tabindex="0"></wa-icon>
	</slot>
	<wa-tooltip :slot :for="id" ref="tooltip"><slot name="content">{{ text }}</slot></wa-tooltip>
  `;

let maxUid = 0;

export default {
  props: {
    slot: String,
    text: String,
  },
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
