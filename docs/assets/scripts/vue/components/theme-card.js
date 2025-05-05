import PageCard from './page-card.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import themes from '/docs/themes/data.js';

const iconTemplates = {
  colors: `
    <div class="theme-icon theme-color-icon" role="presentation">
      <div style="background: var(--wa-color-brand-fill-loud);   border-color: var(--wa-color-brand-border-loud);   color: var(--wa-color-brand-on-loud);">A</div>
      <div style="background: var(--wa-color-brand-fill-normal); border-color: var(--wa-color-brand-border-normal); color: var(--wa-color-brand-on-normal);">A</div>
      <div style="background: var(--wa-color-brand-fill-quiet);  border-color: var(--wa-color-brand-border-quiet);  color: var(--wa-color-brand-on-quiet);">A</div>
    </div>

    <div class="wa-invert theme-icon theme-color-icon" role="presentation">
      <div style="background: var(--wa-color-brand-fill-loud);   border-color: var(--wa-color-brand-border-loud);   color: var(--wa-color-brand-on-loud);">A</div>
      <div style="background: var(--wa-color-brand-fill-normal); border-color: var(--wa-color-brand-border-normal); color: var(--wa-color-brand-on-normal);">A</div>
      <div style="background: var(--wa-color-brand-fill-quiet);  border-color: var(--wa-color-brand-border-quiet);  color: var(--wa-color-brand-on-quiet);">A</div>
    </div>`,
  theme: `
    <div class="row row-1">
      <h2>Aa</h2>
      <div class="swatches">
        <div class="wa-brand"></div>
        <div class="wa-success"></div>
        <div class="wa-warning"></div>
        <div class="wa-danger"></div>
      </div>
    </div>
    <div class="row row-2">
      <wa-input value="Input" size="small"></wa-input>
      <wa-button size="small" variant="brand">Go</wa-button>
    </div>`,
};

const template = `
  <page-card class="theme-card" :class="type + '-card'" :info="themeMeta">
    <template #icon>
      <wa-scoped slot="header" class="theme-icon-host" inert>
        <template v-html="themeCode"></template>
        <template>
          <link rel="stylesheet" href="/dist/styles/utilities.css">
          <link rel="stylesheet" href="/dist/styles/native/content.css">
          <link rel="stylesheet" href="/assets/styles/theme-icons.css">

          <template v-if="type == 'colors'" >
            ${iconTemplates.colors}
          </template>

          <div v-else class="theme-icon theme-overall-icon" :class="'wa-theme-' + theme" role="presentation">
            ${iconTemplates.theme}
          </div>
        </template>
      </wa-scoped>
    </template>
    <slot></slot>
    <template #extra>
      <slot name="extra" />
    </template>
  </page-card>
`;

export default {
  props: {
    theme: String,
    type: {
      type: String,
      validator(value) {
        return !value || ['colors'].includes(value);
      },
    },
    rest: Object,
  },

  data() {
    return {};
  },

  computed: {
    themeMeta() {
      return themes[this.theme] ?? {};
    },

    themeCode() {
      let theme = { ...(this.rest || {}), [this.type || 'base']: this.theme };
      theme.base ||= 'default';

      return getThemeCode(theme, { id: this.theme, language: 'html', cdnUrl: '/dist/' });
    },
  },

  template,
  components: {
    PageCard,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
