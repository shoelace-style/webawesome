// import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createApp, nextTick } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';
import { PageCard, ShadowRootComponent, ThemeCard } from '/assets/scripts/vue/components/index.js';
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
        panel: 'styles',
        preview: 'app',
      },
    };
  },

  created() {
    Object.assign(this, { themes, palettes });
  },

  computed: {
    urlParams() {
      let ret = new URLSearchParams(this.theme);
      ret.sort();
      return ret;
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
    ThemeCard,
    ShadowRoot: ShadowRootComponent,
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
