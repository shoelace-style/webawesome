// import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createApp, nextTick } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';
import { IconsCard, PageCard, PaletteCard, ThemeCard, UiPanel } from '/assets/scripts/vue/components/index.js';
import palettes from '/docs/palettes/data.js';
import themes from '/docs/themes/data.js';

let appSpec = {
  data() {
    return {
      theme: {
        base: '',
        palette: '',
        typography: '',
      },
      ui: {
        panel: 'theme',
        preview: 'app',
      },
    };
  },

  created() {
    Object.assign(this, { themes, palettes, setTimeout: setTimeout.bind(globalThis) });

    this.theme.base = 'glossy';
    this.ui.panel = 'styles';
  },

  computed: {
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
  },

  watch: {},

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
