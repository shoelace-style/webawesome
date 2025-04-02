// import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';
import Prism from '/assets/scripts/prism.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import { cdnUrl } from '/assets/scripts/tweak/data.js';
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

    return {
      type: 'theme',
      collection: 'themes',
      isCustom: location.pathname.endsWith('/themes/custom/'),
      theme: {
        base: '',
        palette: '',
        typography: '',
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
    Object.assign(this, { themes, palettes });

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
    id() {
      if (this.isCustom) {
        return 'custom';
      }

      return this.computed.base;
    },

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

    computed() {
      let ret = { ...this.theme };
      let theme = (ret.base ||= 'default');
      ret.palette ||= themes[theme].palette;
      ret.typography ||= theme;
      return ret;
    },

    urlParams() {
      let ret = new URLSearchParams(this.theme);
      ret.sort();
      return ret;
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
          this.permalink.set(key, this.theme[key]);
        }

        // Update page URL
        this.permalink.updateLocation();

        this.unsavedChanges = true;
      },
    },
  },

  methods: {
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
