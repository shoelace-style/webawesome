import themes from '../../data/themes.js';
import PageCard from './page-card.js';
import { defaultTitle, pairings, sameAs } from '/assets/data/fonts.js';
import { themeConfig } from '/assets/data/theming.js';
import { cssImport, getThemeCode } from '/assets/scripts/tweak/code.js';

const template = `
  <page-card class="fonts-card" :info="computedPairing">
    <template #icon>
      <wa-scoped slot="header" class="fonts-icon-host" inert :key="html">
        <template v-html="html"></template>
        <template>
          <link rel="stylesheet" href="/dist/styles/native/content.css">
          <link rel="stylesheet" href="/assets/styles/theme-icons.css">

          <div class="fonts-icon" role="presentation">
            <h2>When my six o'clock alarm buzzes, I require a pot of good java.</h2>
            <p>By quarter past seven, I've jotted hazy musings in a flax-bound notebook, sipping lukewarm espresso.</p>
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
      // let themeTitle = this.themeId ? `As seen in ${this.themeMeta.title}` : '';

      if (this.title) {
        return { title: this.title, subtitle: this.subtitle ?? pairingTitle };
      } else {
        return { title: pairingTitle, subtitle: this.subtitle };
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
