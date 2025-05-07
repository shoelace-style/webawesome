// import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';
import { pairingsList, sameAs } from '/assets/data/fonts.js';
import { allHues, cdnUrl, iconLibraries } from '/assets/data/index.js';
import { themeDefaults } from '/assets/data/theming.js';
import Prism from '/assets/scripts/prism.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import { deepClone, deepEach, deepMerge } from '/assets/scripts/util/deep.js';
import { capitalize, slugify } from '/assets/scripts/util/string.js';
import {
  ColorSelect,
  EditableText,
  FontsCard,
  IconsCard,
  InfoTip,
  PageCard,
  PaletteCard,
  SwatchSelect,
  ThemeCard,
  UiPanel,
  UiPanelContainer,
} from '/assets/vue/components/index.js';
import content from '/assets/vue/directives/content.js';
import savedMixin from '/assets/vue/mixins/saved.js';
import palettes from '/docs/palettes/data.js';
import themes from '/docs/themes/data.js';

let appSpec = {
  mixins: [savedMixin],

  data() {
    let mobileMQ = window.matchMedia('(max-width: 768px)');
    let isMobile = mobileMQ.matches;
    mobileMQ.addEventListener('change', e => {
      this.isMobile = e.matches;
    });

    let id = location.pathname.match(/\/themes\/([^/]+)\/?$/)?.[1];
    let isCustom = id === 'custom' || id === 'edit';

    return {
      type: 'theme',
      collection: 'themes',
      id: id === 'edit' ? 'custom' : id,
      isCustom,
      urlParams: location.search,
      theme: {
        base: isCustom ? '' : id,
        palette: '',
        typography: '',
        colors: '',
        brand: '',
        icon: {
          kit: '',
          library: '',
          family: '',
          style: '',
        },
      },
      ui: {
        panel: 'styles',
        showCode: false,
        code: 'css',
        preview: 'app',
      },
      isMobile,
      isCreated: false,
    };
  },

  created() {
    // Data that won't change so we don't need reactivity.
    // By adding them here instead of in data() we skip having them wrapped in Proxies.
    Object.assign(this, {
      themes,
      palettes,
      hues: allHues,
      iconLibraries,
      themeDefaults,
      sameAs,
      pairings: pairingsList,
    });

    if (location.search) {
      let urlTheme = this.permalink.getAll();
      deepMerge(this.theme, urlTheme, { emptyValues: [undefined, ''] });
    }

    this.isCreated = true;
  },

  computed: {
    originalTitle() {
      if (this.isCustom) {
        return 'My Theme';
      }

      return themes[this.computed.base]?.title ?? 'Unknown Theme';
    },

    /** Default theme title for saving */
    defaultTitle() {
      let ret = this.originalTitle;

      if (!this.isCustom) {
        ret += ' (remixed)';
      }

      return ret;
    },

    slug() {
      return slugify(this.title);
    },

    cssFilename() {
      return `theme-${this.slug}.css`;
    },

    computedBase() {
      return this.theme.base || themeDefaults.base;
    },

    baseTheme() {
      return themes[this.computedBase];
    },

    // Resolved defaults for the current theme
    defaults() {
      let ret = deepClone(themeDefaults);

      deepEach(ret, value => {
        // Resolve defaults that depend on other values based on the current theme params
        if (typeof value === 'function') {
          return value.call(this.theme, this.baseTheme);
        }
      });

      return ret;
    },

    computed() {
      let ret = deepClone(themeDefaults);

      deepMerge(ret, this.theme, { emptyValues: [undefined, ''] });

      deepEach(ret, value => {
        // Resolve defaults that depend on other values
        if (typeof value === 'function') {
          return value.call(ret, this.baseTheme);
        }
      });

      return ret;
    },

    code() {
      let ret = {};
      let theme = { ...this.theme };
      theme.base ||= 'default';

      for (let language of ['html', 'css']) {
        let code = getThemeCode(theme, { id: this.slug, language, cdnUrl });
        ret[language] = {
          raw: code,
          highlighted: Prism.highlight(code, Prism.languages[language], language),
        };
      }

      ret.css.dataURI = `data:text/css;charset=utf-8,${encodeURIComponent(ret.css.raw)}`;
      ret.css.blob = URL.createObjectURL(new Blob([ret.css.raw], { type: 'text/css' }));

      return ret;
    },

    codeToUse() {
      let attributes = this.theme.icon.kit ? ` data-fa-kit-code="${this.theme.icon.kit}"` : '';
      let code = `<link rel="stylesheet" href="path/to/${this.cssFilename}"${attributes}>`;
      return {
        raw: code,
        highlighted: Prism.highlight(code, Prism.languages.html, 'html'),
      };
    },

    tweaked() {
      return Object.values(this.theme).filter(Boolean).length > 0;
    },
  },

  watch: {
    theme: {
      deep: true,
      handler() {
        this.permalink.setAll(this.theme, this.defaults);

        // Update page URL
        this.permalink.updateLocation();
        let theme = JSON.parse(JSON.stringify(this.theme));
        this.$refs.preview?.contentWindow.postMessage({
          type: 'updatePreview',
          theme,
          id: this.slug,
        });

        this.unsavedChanges = true;
      },
    },

    'ui.preview': {
      immediate: true,
      handler() {
        if (!this.isCreated) {
          return;
        }

        // Update urlParams only when the preview changes
        // We use postMessage for other updates
        let urlParams = new URLSearchParams(this.computed);
        urlParams.sort();
        urlParams = urlParams + '';

        this.urlParams = urlParams ? '?' + urlParams : '';
      },
    },
  },

  methods: {
    capitalize,

    log(...args) {
      console.log(...args);
      return args[0];
    },
  },

  components: {
    ColorSelect,
    EditableText,
    FontsCard,
    IconsCard,
    InfoTip,
    PageCard,
    PaletteCard,
    ThemeCard,
    UiPanel,
    UiPanelContainer,
    SwatchSelect,
  },

  directives: { content },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function init() {
  let appContainer = document.querySelector('#theme-app');
  globalThis.app?.unmount?.();

  if (!appContainer) {
    return;
  }

  globalThis.app = createApp(appSpec).mount(appContainer);
}

init();
addEventListener('turbo:render', init);
