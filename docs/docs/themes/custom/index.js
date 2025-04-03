// import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';
import Prism from '/assets/scripts/prism.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import { cdnUrl, hues } from '/assets/scripts/tweak/data.js';
import { IconsCard, PageCard, PaletteCard, ThemeCard, UiPanel } from '/assets/scripts/vue/components/index.js';
import content from '/assets/scripts/vue/directives/content.js';
import savedMixin from '/assets/scripts/vue/mixins/saved.js';
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
    let isCustom = id === 'custom';

    return {
      type: 'theme',
      collection: 'themes',
      id,
      isCustom,
      theme: {
        base: isCustom ? '' : id,
        palette: '',
        typography: '',
        colors: '',
        brand: '',
      },
      ui: {
        panel: 'theme',
        showCode: false,
        code: 'css',
        preview: 'app',
      },
      isMobile,
    };
  },

  created() {
    Object.assign(this, { themes, palettes, hues: [...hues, 'gray'] });

    if (location.search) {
      for (let key in this.theme) {
        if (this.permalink.has(key)) {
          this.theme[key] = this.permalink.get(key);
        }
      }
    }

    if (this.theme.base) {
      this.ui.panel = 'styles';
    }
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

    baseTheme() {
      let id = this.computed.base;
      let ret = themes[id];
      ret.id ??= id;
      return ret;
    },

    defaults() {
      return {
        base: themes[this.id] ? this.id : 'default',
        get colors() {
          return this.base;
        },
        get palette() {
          return themes[this.base].palette;
        },
        get brand() {
          return themes[this.base].brand;
        },
        get typography() {
          return this.base;
        },
      };
    },

    computed() {
      let ret = Object.create(this.defaults, Object.getOwnPropertyDescriptors(this.theme));

      for (let key in this.theme) {
        if (!this.theme[key]) {
          delete ret[key];
        }
      }

      return ret;
    },

    urlParams() {
      let ret = new URLSearchParams(this.computed);
      ret.sort();
      ret = ret + '';
      return ret ? '?' + ret : '';
    },

    previousPanel() {
      switch (this.ui.panel) {
        case 'styles':
          return 'theme';
        case 'theme':
          return undefined;
      }

      return 'styles';
    },

    code() {
      let ret = {};

      for (let language of ['html', 'css']) {
        let code = getThemeCode(this.id, this.theme, { language, cdnUrl });
        ret[language] = {
          raw: code,
          highlighted: Prism.highlight(code, Prism.languages[language], language),
        };
      }

      ret.css.dataURI = `data:text/css;charset=utf-8,${encodeURIComponent(ret.css.raw)}`;
      ret.css.blob = URL.createObjectURL(new Blob([ret.css.raw], { type: 'text/css' }));

      return ret;
    },
  },

  watch: {
    theme: {
      deep: true,
      handler() {
        for (let key in this.theme) {
          if (key !== 'base' || this.theme.base !== this.id) {
            this.permalink.set(key, this.theme[key]);
          }
        }

        // Update page URL
        this.permalink.updateLocation();

        this.unsavedChanges = true;
      },
    },
  },

  methods: {
    capitalize(str) {
      return (str + '').charAt(0).toUpperCase() + str.slice(1);
    },

    log(...args) {
      console.log(...args);
      return args[0];
    },
  },

  components: {
    PageCard,
    PaletteCard,
    ThemeCard,
    IconsCard,
    UiPanel,
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
