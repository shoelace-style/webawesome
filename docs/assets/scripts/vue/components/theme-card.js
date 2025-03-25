import PageCard from './page-card.js';
import VueIsolate from './vue-isolate.js';
import themes from '/docs/themes/data.js';
/*
<div>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="/dist/styles/native/content.css">
    <link rel="stylesheet" href="/dist/styles/native/blockquote.css">
    <link rel="stylesheet" href="/dist/styles/themes/{{ page.fileSlug or 'default' }}.css">
    <link rel="stylesheet" href="/dist/styles/themes/{{ themeId }}/typography.css">
    <link rel="stylesheet" href="/assets/styles/theme-icons.css">

    <div class="theme-typography-icon wa-theme-{{ themeId }}" data-no-outline data-no-anchor role="presentation">
      <h3>Title</h3>
      <p>Body text</p>
    </div>
  </template>
</div>
*/
const template = `
	<page-card>
		<div slot="header" v-html="icon || ICON_PLACEHOLDER"></div>
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
  components: { VueIsolate, PageCard },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
