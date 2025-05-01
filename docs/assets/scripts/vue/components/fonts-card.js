import PageCard from './page-card.js';
import { defaultTitle, pairings, sameAs } from '/assets/data/fonts.js';
import { themeConfig } from '/assets/data/theming.js';
import { cssImport, getThemeCode } from '/assets/scripts/tweak/code.js';
import themes from '/docs/themes/data.js';

const template = `
  <page-card class="fonts-card'">
    <template #icon>
      <wa-scoped slot="header" class="fonts-icon-host" inert>
        <template v-html="html"></template>
        <template>
          <link rel="stylesheet" href="/dist/styles/native/content.css">
          <link rel="stylesheet" href="/assets/styles/theme-icons.css">

          <div class="fonts-icon" role="presentation">
            <h2>Heading</h2>
            <p>This is your paragraph.</p>
          </div>
        </template>
      </wa-scoped>
    </template>
    <div>
      <slot>
      {{ content.title }}
      <div v-if="content.subtitle" class="wa-caption-m">{{ content.subtitle }}</div>
      </slot>
    </div>
    <template #extra>
      <slot name="extra" />
    </template>
  </page-card>
`;

export default {
  props: {
    title: String,
    subtitle: String,
    theme: String,
    src: String,
    fonts: Object,
    pairing: Object,
  },

  data() {
    return {};
  },

  computed: {
    content() {
      let pairingTitle = this.computedPairing.title;
      let themeTitle = this.themeId ? `As seen in ${this.themeMeta.title}` : '';

      if (this.title) {
        return { title: this.title, subtitle: this.subtitle ?? pairingTitle };
      } else {
        return { title: pairingTitle, subtitle: this.subtitle ?? themeTitle };
      }
    },

    url() {
      let ret = this.src ?? this.pairing?.url;

      if (!ret && this.theme) {
        return themeConfig.typography.url(this.theme);
      }

      return ret;
    },

    themeId() {
      return this.theme ?? this.pairing?.id;
    },

    themeMeta() {
      return themes[this.themeId] ?? {};
    },

    computedFonts() {
      let ret = this.fonts ?? this.pairing?.fonts ?? this.themeMeta?.fonts;
      let defaults = themes.default.fonts;
      return Object.assign({}, defaults, { ...ret });
    },

    computedPairing() {
      let ret;

      if (this.pairing) {
        ret = { ...this.pairing };
      } else {
        // Get from theme
        let fonts = this.computedFonts;
        let { body, heading = sameAs.body } = fonts;
        let pairing = pairings[body]?.[heading];
        ret = Object.assign({ fonts }, pairing);
      }

      ret.url = this.url;
      ret.title ??= defaultTitle(fonts);
      return ret;
    },

    computed() {
      let ret = { fonts: this.computedFonts };

      for (let key in ret.fonts) {
        if (ret.fonts[key] === sameAs.body) {
          ret.fonts[key] = ret.fonts.body;
        }
      }

      ret.pairing = this.computedPairing;
      ret.theme = this.themeId;
      ret.url = this.url;

      return ret;
    },

    html() {
      let { id, url } = this.computedPairing;

      if (id) {
        let theme = { typography: id };

        return getThemeCode(theme, { id, language: 'html' });
      } else {
        return cssImport(url, { language: 'html' });
      }
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
