/**
 * Generic component for displaying a (possibly interactive) card that represents a page
 * For more specific use cases check out theme-card, icons-card, etc.
 */
export const ICON_PLACEHOLDER = `
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7C1 3.68629 3.68629 1 7 1H43C46.3137 1 49 3.68629 49 7V43C49 46.3137 46.3137 49 43 49H7C3.68629 49 1 46.3137 1 43V7Z" stroke="var(--wa-color-surface-border)" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 6"/>
<path d="M14.1566 18.7199L21.5367 16.7424C22.6036 16.4565 23.7003 17.0896 23.9862 18.1566L26.8463 28.8306C27.1322 29.8975 26.499 30.9942 25.4321 31.2801L18.052 33.2576C16.985 33.5435 15.8884 32.9103 15.6025 31.8434L12.7424 21.1694C12.4565 20.1024 13.0897 19.0057 14.1566 18.7199Z" stroke="var(--wa-color-neutral-border-normal)" stroke-width="2"/>
<path d="M33.8449 16.3273H26.2045C23.9953 16.3273 22.2045 18.1181 22.2045 20.3273V31.3778C22.2045 33.587 23.9953 35.3778 26.2045 35.3778H33.8449C36.0541 35.3778 37.8449 33.587 37.8449 31.3778V20.3273C37.8449 18.1181 36.0541 16.3273 33.8449 16.3273Z" fill="var(--wa-color-neutral-border-normal)" stroke="var(--wa-color-neutral-fill-quiet)" stroke-width="2"/>
</svg>`;

const template = `
<wa-card with-header class="page-card" :aria-disabled="disabled ? 'true' : null" :inert="disabled"
         @click="handleClick" @keyup.enter="handleClick"  @keyup.space="handleClick"
         :role="action ? 'button' : null" :tabindex="action? 0 : null">
  <slot name="icon" slot="header">
    <div slot="header" v-html="icon || ICON_PLACEHOLDER"></div>
  </slot>

  <div class="page-name">
    <div>
      <slot>
        {{ content.title }}
        <wa-badge class="pro" v-if="pro">PRO</wa-badge>
        <div v-if="content.subtitle" class="wa-caption-m">{{ content.subtitle }}</div>
      </slot>
    </div>
    <slot name="extra"></slot>
    <wa-icon v-if="action" name="angle-right" class="angle-right" variant="regular"></wa-icon>
  </div>
</wa-card>
`;

export default {
  props: {
    title: String,
    subtitle: String,
    info: Object,
    icon: String,
    pro: Boolean,
    disabled: Boolean,
    action: Function,
  },

  data() {
    return {};
  },

  created() {
    Object.assign(this, { ICON_PLACEHOLDER });
  },

  computed: {
    content() {
      let defaultTitle = this.info?.title ?? {};

      if (this.title) {
        return { title: this.title, subtitle: this.subtitle ?? defaultTitle };
      } else {
        return { title: defaultTitle, subtitle: this.subtitle };
      }
    },
  },

  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.stopImmediatePropagation();
        return;
      }

      if (this.action) {
        this.action(event);
      }
    },
  },

  template,
  components: {},
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
