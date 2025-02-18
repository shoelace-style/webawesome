// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { cdnUrl, hueRanges, hues, Permalink, tints } from '../../assets/scripts/tweak.js';
import { cssImport, cssLiteral, cssRule } from '../../assets/scripts/tweak/code.js';
import { selectors, urls } from '../../assets/scripts/tweak/data.js';
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
      uid: undefined,
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

      if (this.permalink.has('uid')) {
        this.uid = Number(this.permalink.get('uid'));
      }

      let palette = { id: this.paletteId, uid: this.uid, search: location.search };
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
        let originalScale = this.originalColors[hue];
        let scale = (ret[hue] = {});
        let descriptors = Object.getOwnPropertyDescriptors(originalScale);
        Object.defineProperties(scale, {
          maxChromaTint: { ...descriptors.maxChromaTint, enumerable: false },
          maxChromaTintRaw: { ...descriptors.maxChromaTintRaw, enumerable: false },
        });

        for (let tint of tints) {
          let oklch = originalScale[tint].coords.slice();

          if (this.hueShifts[hue]) {
            oklch[2] += this.hueShifts[hue];
          }

          if (this.chromaScale !== 1) {
            oklch[1] *= this.chromaScale;
          }

          scale[tint] = new Color('oklch', oklch);
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

    tweaksHumanReadable() {
      let ret = {};

      if (this.chromaScale !== 1) {
        ret.chromaScale = 'more ' + (this.chromaScale > 1 ? 'vibrant' : 'muted');
      }

      for (let hue in this.hueShifts) {
        let shift = this.hueShifts[hue];

        if (!shift) {
          continue;
        }

        let relHue = shift < 0 ? arrayPrevious(hues, hue) : arrayNext(hues, hue);
        let hueTweak =
          {
            red: 'redder',
            orange: 'oranger',
            indigo: 'more indigo',
          }[relHue] ?? relHue + 'er';

        ret[hue] = hueTweak + ' ' + hue + 's';
      }

      return ret;
    },

    originalContrasts() {
      let ret = {};

      for (let hue in this.originalColors) {
        ret[hue] = {};

        for (let tintBg of tints) {
          ret[hue][tintBg] = {};
          let bgColor = this.originalColors[hue][tintBg];

          if (!bgColor || !bgColor.contrast) {
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

      let uid = this.uid;

      if (!uid) {
        this.uid = uid = sidebar.palette.getUid();

        this.permalink.set('uid', uid);
        this.permalink.updateLocation();
      }

      let palette = { title, id: this.paletteId, uid, search: location.search };
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

    reset() {
      for (let hue in this.hueShifts) {
        this.hueShifts[hue] = 0;
      }
      this.chromaScale = 1;
    },

    removeTweak(param) {
      if (param === 'chromaScale') {
        this.chromaScale = 1;
      } else {
        this.hueShifts[param] = 0;
      }
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

export function getPaletteCode(paletteId, tweaks, options) {
  let palette = allPalettes[paletteId].colors;

  let imports = [];

  if (paletteId) {
    imports.push(urls.palette(paletteId));
  }

  let css = '';

  if (tweaks) {
    let { hueShifts, chromaScale = 1 } = tweaks;
    let declarations = [];

    if (hueShifts || chromaScale !== 1) {
      for (let hue in hueShifts) {
        let shift = hueShifts[hue];

        if ((!shift && chromaScale === 1) || hue === 'orange') {
          continue;
        }

        let scale = palette[hue];

        for (let tint of ['05', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95']) {
          let color = scale[tint];

          if (Array.isArray(color)) {
            color = new Color('oklch', coords);
          } else {
            color = color.clone();
          }
          color.set({ h: h => h + shift, c: c => c * chromaScale });
          let stringified = color.toString({ format: color.inGamut('srgb') ? 'hex' : undefined });

          declarations.push(`--wa-color-${hue}-${tint}: ${stringified};`);
        }

        declarations.push('');
      }
    }

    if (declarations.length > 0) {
      css += cssRule(selectors.palette(paletteId), declarations);
    }
  }

  let ret = imports.map(url => cssImport(url, options)).join('\n');

  if (css) {
    ret += `\n\n${cssLiteral(css, options)}`;
  }

  return ret;
}

function arrayNext(array, element) {
  let index = array.indexOf(element);
  return array[(index + 1) % array.length];
}

function arrayPrevious(array, element) {
  let index = array.indexOf(element);
  return array[(index - 1 + array.length) % array.length];
}
