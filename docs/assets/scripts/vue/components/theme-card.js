import PageCard from './page-card.js';
import ShadowRootComponent from './shadow-root.js';
import themes from '/docs/themes/data.js';

const template = `
	<page-card class="theme-card" :pro="themeMeta.isPro">
    <template #icon>
      <div slot="header" class="theme-icon-host">
      <shadow-root>
        <link rel="stylesheet" href="/dist/styles/utilities.css">
        <link rel="stylesheet" href="/dist/styles/native/content.css">
        <link rel="stylesheet" href="/assets/styles/theme-icons.css">
        <link rel="stylesheet" :href="\`/dist/styles/themes/\${ theme }.css\`">

        <div v-if="type == 'typography'" class="theme-icon theme-typography-icon" :class="'wa-theme-' + theme" role="presentation">
          <h2>Heading</h2>
          <p>This is your paragraph.</p>
        </div>
        <div v-else-if="type == 'colors'" class="theme-icon theme-color-icon" :class="'wa-theme-' + theme" role="presentation">
          <div class="wa-brand wa-accent">A</div>
          <div class="wa-brand wa-outlined">A</div>
          <div class="wa-brand wa-filled">A</div>
          <div class="wa-brand wa-plain">A</div>

          <div class="wa-neutral wa-accent">A</div>
          <div class="wa-neutral wa-outlined">A</div>
          <div class="wa-neutral wa-filled">A</div>
          <div class="wa-neutral wa-plain">A</div>
        </div>
        <div v-else class="theme-icon theme-overall-icon" :class="'wa-theme-' + theme" role="presentation">
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
          </div>
        </div>
      </shadow-root>
      </div>
    </template>
		{{ themeMeta.title }}
	</page-card>
`;

export default {
  props: {
    theme: String,
    type: {
      type: String,
      validator(value) {
        return !value || ['typography'].includes(value);
      },
    },
  },

  data() {
    return {};
  },

  computed: {
    themeMeta() {
      return themes[this.theme] ?? {};
    },
  },

  template,
  components: {
    ShadowRoot: ShadowRootComponent,
    PageCard,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
