// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import { cdnUrl, getPaletteCode, hueRanges, hues, Permalink, tints } from '../../assets/scripts/tweak.js';
import Prism from '/assets/scripts/prism.js';

await Promise.all(['wa-slider'].map(tag => customElements.whenDefined(tag)));

// // Detect https://bugs.webkit.org/show_bug.cgi?id=287637
// const SAFARI_OKLCH_BUG = (() => {
//   let dummy = document.createElement('div');
//   document.body.appendChild(dummy);
//   dummy.style.color = 'oklch(from #d5e0e6 l c h)';
//   let computedColor = getComputedStyle(dummy).color;
//   dummy.remove();
//   return computedColor.endsWith(' 0)');
// })();

let allPalettes = await fetch('/docs/palettes/data.json').then(r => r.json());
globalThis.allPalettes = allPalettes;

for (let palette in allPalettes) {
  for (let hue in allPalettes[palette].colors) {
    let scale = allPalettes[palette].colors[hue];
    for (let tint of tints) {
      let color = scale[tint];

      if (Array.isArray(color)) {
        scale[tint] = new Color('oklch', color);
      }
    }
  }
}

let paletteAppSpec = {
  data() {
    let appRoot = document.querySelector('#palette-app');
    let paletteId = appRoot.dataset.paletteId;
    let palette = allPalettes[paletteId];

    return {
      paletteId,
      paletteTitle: palette.title,
      originalColors: palette.colors,
      permalink: new Permalink(),
      hueRanges,
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      chromaScale: 1,
      tweaking: {},
      saved: null,
    };
  },

  created() {
    // Read URL params and apply them. This facilitates permalinks.
    this.permalink.mapObject(this.hueShifts, {
      keyTo: key => key.replace(/-shift$/, ''),
      keyFrom: key => key + '-shift',
      valueFrom: value => (!value ? '' : Number(value)),
      valueTo: value => (!value ? 0 : Number(value)),
    });

    if (location.search) {
      // Update from URL
      this.permalink.writeTo(this.hueShifts);

      if (this.permalink.has('chroma-scale')) {
        this.chromaScale = Number(this.permalink.get('chroma-scale') || 1);
      }

      let palette = { id: this.paletteId, search: location.search };
      this.saved = sidebar.palette.getSaved(palette);
    }
  },

  computed: {
    global() {
      return globalThis;
    },

    tweaks() {
      return { hueShifts: this.hueShifts, chromaScale: this.chromaScale };
    },

    isTweaked() {
      return Object.values(this.hueShifts).some(Boolean);
    },

    code() {
      let ret = {};
      for (let language of ['html', 'css']) {
        let code = getPaletteCode(this.paletteId, this.tweaks, { language, cdnUrl });
        ret[language] = {
          raw: code,
          highlighted: Prism.highlight(code, Prism.languages[language], language),
        };
      }

      return ret;
    },

    colors() {
      let ret = {};

      for (let hue in this.originalColors) {
        ret[hue] = {};

        for (let tint of tints) {
          let oklch = this.originalColors[hue][tint].coords.slice();

          if (this.hueShifts[hue]) {
            oklch[2] += this.hueShifts[hue];
          }

          if (this.chromaScale !== 1) {
            oklch[1] *= this.chromaScale;
          }

          ret[hue][tint] = new Color('oklch', oklch);
        }
      }

      return ret;
    },

    tweaked() {
      return {
        chroma: this.chromaScale !== 1,
        hue: Object.values(this.hueShifts).some(Boolean),
      };
    },

    originalContrasts() {
      let ret = {};

      for (let hue in this.originalColors) {
        ret[hue] = {};

        for (let tintBg of tints) {
          ret[hue][tintBg] = {};
          let bgColor = this.originalColors[hue][tintBg];

          if (!bgColor || !bgColor.contrast) {
            console.log(hue, tintBg, bgColor);
            continue;
          }

          for (let tintFg of tints) {
            let contrast = bgColor.contrast(this.originalColors[hue][tintFg], 'WCAG21');
            ret[hue][tintBg][tintFg] = contrast;
          }
        }
      }

      return ret;
    },

    contrasts() {
      let ret = {};

      for (let hue in this.colors) {
        ret[hue] = {};

        for (let tintBg in this.colors[hue]) {
          ret[hue][tintBg] = {};
          let bgColor = this.colors[hue][tintBg];

          for (let tintFg in this.colors[hue]) {
            let fgColor = this.colors[hue][tintFg];
            let value = bgColor.contrast(fgColor, 'WCAG21');
            let original = this.originalContrasts[hue][tintBg][tintFg];
            ret[hue][tintBg][tintFg] = { value, original, bgColor, fgColor };
          }
        }
      }

      return ret;
    },
  },

  watch: {
    hueShifts: {
      deep: true,
      handler() {
        this.permalink.readFrom(this.hueShifts);
      },
    },

    chromaScale() {
      this.permalink.set('chroma-scale', this.chromaScale, 1);
    },

    tweaks: {
      deep: true,
      async handler(value, oldValue) {
        await nextTick(); // must run after individual watchers

        // Update page URL
        this.permalink.updateLocation();

        if (this.saved) {
          this.save({ silent: true });
        }
      },
    },
  },

  methods: {
    save({ silent } = {}) {
      let title = silent
        ? (this.saved?.title ?? this.paletteTitle)
        : prompt('Palette title:', `${this.paletteTitle} (tweaked)`);

      if (!title) {
        return;
      }

      let palette = { title, id: this.paletteId, search: location.search };
      sidebar.palette.save(palette, this.saved);
      this.saved = palette;
    },

    rename() {
      if (!this.saved) {
        return;
      }

      let newTitle = prompt('New title:', this.saved.title);

      if (!newTitle) {
        return;
      }

      this.saved.title = newTitle;
      sidebar.palette.save(this.saved);
    },

    deleteSaved() {
      sidebar.palette.delete(this.saved);
      this.saved = null;
    },
  },

  directives: {
    // Like v-text, but doesn't complain if the element has content,
    // making it possible to use in a PE fashion, with the contents being the fallback
    content(el, { value, arg }) {
      if (!el.dataset.fallback) {
        // Store the original content as a fallback the first time
        el.dataset.fallback = el.textContent;
      }

      if (value === '') {
        value = el.dataset.fallback;
      } else {
        if (arg === 'number') {
          value = Number(value).toLocaleString(undefined, { maximumSignificantDigits: 2 });
        }
      }

      if (arg === 'html') {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    },
  },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function init() {
  globalThis.paletteApp?.unmount?.();
  globalThis.paletteApp = createApp(paletteAppSpec).mount('#palette-app');
}

init();
addEventListener('turbo:render', init);
