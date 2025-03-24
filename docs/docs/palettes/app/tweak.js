// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
// import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createApp, nextTick } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';
import generatePalette from './color/generate-palette.js';
import getMaxChroma from './color/get-max-chroma.js';
import getPaletteCode from './color/get-palette-code.js';
import allPalettes from './color/palettes.js';
import { tweakColor, tweakPalette } from './color/tweak.js';
import { getContrasts, identifyColor } from './color/util.js';
import ColorPopup from './vue-components/color-popup.js';
import ColorSlider from './vue-components/color-slider.js';
import ColorSwatchPicker from './vue-components/color-swatch-picker.js';
import InfoTip from './vue-components/info-tip.js';
import Prism from '/assets/scripts/prism.js';
import { Permalink } from '/assets/scripts/tweak.js';
import {
  allHues,
  cdnUrl,
  HUE_RANGES,
  hueAfter,
  hueBefore,
  hues,
  L_RANGES,
  MAX_CHROMA_BOUNDS,
  MAX_GRAY_CHROMA_SCALE,
  moreHue,
  ROLES,
  tints,
} from '/assets/scripts/tweak/data.js';
import { camelCase, capitalize, log, slugify, subtractAngles } from '/assets/scripts/tweak/util.js';

let paletteAppSpec = {
  data() {
    let appRoot = document.querySelector('#palette-app');
    let paletteId = appRoot.dataset.paletteId;
    let palette = allPalettes[paletteId];

    return {
      uid: undefined,
      paletteId,
      originalPaletteTitle: palette.title,
      originalColors: palette.colors,
      baseColors: { ...palette.colors },
      permalink: new Permalink(),
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      chromaScale: 1,
      grayChroma: undefined,
      grayColor: undefined,
      saved: null,
      unsavedChanges: false,
      savedPalettes: sidebar.palettes.saved,
    };
  },

  created() {
    // Non-reactive variables to expose
    Object.assign(this, {
      moreHue,
      hueBefore,
      hueAfter,
      HUE_RANGES,
      L_RANGES,
      hues,
      allHues,
      tints,
      MAX_CHROMA_BOUNDS,
    });

    if (location.search) {
      // Read URL params and apply them. This facilitates permalinks.
      for (let hue in this.hueShifts) {
        if (this.permalink.has(hue + '-shift')) {
          this.hueShifts[hue] = Number(this.permalink.get(hue + '-shift'));
        }
      }

      for (let param of ['chroma-scale', 'gray-color', 'gray-chroma']) {
        if (this.permalink.has(param)) {
          let value = this.permalink.get(param);

          if (!isNaN(value)) {
            // Convert numeric values to numbers
            value = Number(value);
          }

          let prop = camelCase(param);
          this[prop] = value;
        }
      }

      if (this.permalink.has('uid')) {
        this.uid = Number(this.permalink.get('uid'));
        this.saved = sidebar.palettes.saved.find(p => p.uid === this.uid);
      }
    }
  },

  mounted() {
    nextTick().then(() => {
      if (!this.tweaked || this.saved) {
        this.unsavedChanges = false;
      }
    });
  },

  computed: {
    /**
     * Stage of interaction with the palette app
     * 0: Static
     * 1: Started editing
     * 2: Edited
     * @returns
     */
    step() {
      return this.tweaked ? 1 : 0;
    },

    slug() {
      return this.paletteId;
    },

    /** Default palette title for saving */
    defaultPaletteTitle() {
      return this.originalPaletteTitle + ' (tweaked)';
    },

    paletteTitle() {
      if (this.step === 0) {
        return this.originalPaletteTitle;
      } else if (this.saved) {
        return this.saved.title;
      } else {
        return this.defaultPaletteTitle;
      }
    },

    tweaks() {
      return {
        hueShifts: this.hueShifts,
        chromaScale: this.chromaScale,
        grayColor: this.grayColor,
        grayChroma: this.grayChroma,
      };
    },

    code() {
      let ret = {};
      for (let language of ['html', 'css']) {
        let code = getPaletteCode({
          base: this.paletteId,
          colors: this.colors,
          tweaked: this.tweaked,
          language,
          cdnUrl,
        });
        ret[language] = {
          raw: code,
          highlighted: Prism.highlight(code, Prism.languages[language], language),
        };
      }

      return ret;
    },

    colors() {
      return tweakPalette.call(this, this.baseColors, this.tweaks, this.tweaked);
    },

    tweaked() {
      let anyHueTweaked = Object.values(this.hueShifts).some(Boolean);
      let hue = anyHueTweaked
        ? Object.fromEntries(Object.entries(this.hueShifts).map(([hue, shift]) => [hue, shift !== 0]))
        : false;

      let ret = {
        chromaScale: this.chromaScale !== 1,
        hue,
        grayChroma: this.grayChroma !== undefined && this.grayChroma !== this.originalGrayChroma,
        grayColor: this.grayColor !== undefined && this.grayColor !== this.originalGrayColor,
      };

      let anyTweaked = Object.values(ret).some(Boolean);
      return anyTweaked ? ret : false;
    },

    tweaksHumanReadable() {
      let ret = {};

      if (this.chromaScale !== 1) {
        ret.chromaScale = 'More ' + (this.chromaScale > 1 ? 'vibrant' : 'muted');
      }

      for (let hue in this.hueShifts) {
        let shift = this.hueShifts[hue];

        if (!shift) {
          continue;
        }

        let relHue = shift < 0 ? hueBefore[hue] : hueAfter[hue];
        let hueTweak = moreHue[relHue] ?? relHue + 'er';

        ret[hue] = capitalize(hueTweak + ' ' + hue + 's');
      }

      if (this.tweaked.grayChroma || this.tweaked.grayColor) {
        if (this.tweaked.grayChroma === 0) {
          ret.grayChroma = 'Achromatic grays';
        } else {
          if (this.tweaked.grayColor) {
            ret.grayColor = capitalize(this.grayColor) + ' gray undertone';
          }

          if (this.tweaked.grayChroma) {
            let more = this.tweaked.grayChroma > this.originalGrayChroma;
            ret.grayChroma = `More ${more ? 'colorful' : 'neutral'} grays`;
          }
        }
      }

      return ret;
    },

    originalContrasts() {
      return getContrasts(this.baseColors);
    },

    contrasts() {
      return getContrasts(this.colors, this.originalContrasts);
    },

    baseCoreColors() {
      let ret = {};
      for (let hue in this.baseColors) {
        ret[hue] = this.baseColors[hue].core;
      }
      return ret;
    },

    baseMaxChromaHue() {
      let maxChroma = -1;
      let maxChromaHue = null;

      for (let hue in this.baseCoreColors) {
        let color = this.baseCoreColors[hue];
        let chroma = color.get('oklch.c');
        if (chroma > maxChroma || !maxChromaHue) {
          maxChroma = chroma;
          maxChromaHue = hue;
        }
      }
      return maxChromaHue;
    },

    baseMaxChromaColor() {
      return this.baseCoreColors[this.baseMaxChromaHue];
    },

    baseMaxChroma() {
      return this.baseMaxChromaColor.get('oklch.c');
    },

    coreColors() {
      let ret = {};
      for (let hue in this.colors) {
        ret[hue] = this.colors[hue].core;
      }

      return ret;
    },

    maxChroma() {
      return Math.max(
        ...Object.values(this.coreColors)
          .map(color => color.get('oklch.c'))
          .filter(c => c >= 0),
      );
    },

    coreLevels() {
      let ret = {};

      for (let hue in this.colors) {
        let maxChromaTint = this.colors[hue].maxChromaTint;
        ret[hue] = maxChromaTint;
      }

      return ret;
    },

    level() {
      let levels = Object.values(this.coreLevels).sort((a, b) => a - b);
      levels = levels.slice(levels.length / 4, -levels.length / 4); // Remove top and bottom 25%
      let trimmedMean = levels.map(Number).reduce((a, b) => a + b, 0) / levels.length;
      return Math.round(trimmedMean / 10) * 10;
    },

    shiftBounds() {
      return Object.fromEntries(
        hues.map(hue => {
          let range = HUE_RANGES[hue];
          let coreHue = Math.round(this.baseCoreColors[hue].get('oklch.h'));
          return [hue, { min: range.min - coreHue, max: range.max - coreHue }];
        }),
      );
    },

    chromaScaleBounds() {
      return { min: MAX_CHROMA_BOUNDS.min / this.baseMaxChroma, max: MAX_CHROMA_BOUNDS.max / this.baseMaxChroma };
    },

    originalGrayColor() {
      let grayHue = this.baseCoreColors.gray.get('oklch.h');
      let minDistance = Infinity;
      let closestHue = null;

      // Find core color whose hue is closest to our gray
      for (let name in this.baseCoreColors) {
        if (name === 'gray') {
          continue;
        }

        let hue = this.baseCoreColors[name].get('oklch.h');
        let distance = Math.abs(subtractAngles(hue, grayHue));
        if (distance < minDistance) {
          minDistance = distance;
          closestHue = name;
        }
      }

      return closestHue ?? 'indigo';
    },

    originalGrayChroma() {
      let grayChroma = this.baseColors.gray.core.get('oklch.c');
      if (grayChroma === 0 || grayChroma === null) {
        return 0;
      }

      let grayColorChroma = this.baseColors[this.originalGrayColor].core.get('oklch.c');
      return grayChroma / grayColorChroma;
    },

    /**
     * We want to preserve the original grayChroma selection so that when the user switches to another undertone
     * that supports higher chromas, their selection will be there.
     * This property is the gray chroma % that is actually applied.
     */
    computedGrayChroma() {
      let grayChroma = this.grayChroma ?? this.originalGrayChroma;
      return Math.min(grayChroma, this.maxGrayChroma);
    },

    computedGrayColor() {
      return this.grayColor ?? this.originalGrayColor;
    },

    maxGrayChroma() {
      return MAX_GRAY_CHROMA_SCALE[this.grayColor] ?? 0.3;
    },

    huesAfter() {
      let ret = {};
      let huesRotated = [...hues];
      for (let hue of hues) {
        let first = huesRotated.shift();
        ret[hue] = huesRotated.slice();
        huesRotated.push(first);
      }
      return ret;
    },

    /** Get other variants of the same base palette that are not this one */
    savedVariations() {
      return this.savedPalettes.filter(palette => palette.id === this.paletteId && palette.uid !== this.uid);
    },
  }, // end computed

  watch: {
    hueShifts: {
      deep: true,
      handler() {
        for (let hue in this.hueShifts) {
          this.permalink.set(hue + '-shift', this.hueShifts[hue], 0);
        }
      },
    },

    chromaScale() {
      this.permalink.set('chroma-scale', this.chromaScale, 1);
    },

    grayColor() {
      this.permalink.set('gray-color', this.grayColor, this.originalGrayColor);
    },

    grayChroma() {
      this.permalink.set('gray-chroma', this.grayChroma, this.originalGrayChroma);
    },

    tweaks: {
      deep: true,
      async handler(value, oldValue) {
        await nextTick(); // must run after individual watchers

        // Update page URL
        this.permalink.updateLocation();

        this.unsavedChanges = true;
      },
    },
  }, // end watch

  methods: {
    capitalize,
    slugify,
    getMaxChroma,
    log,

    async save({ title } = {}) {
      let uid = this.uid;

      this.saved ??= { id: this.paletteId, uid: this.uid, search: location.search };

      if (title) {
        // Renaming
        this.saved.title = title;
      } else {
        this.saved.title ??= this.defaultPaletteTitle;
      }

      sidebar.palette.save(this.saved);

      if (uid !== this.saved.uid) {
        // UID changed (most likely from saving a new palette)
        this.uid = this.saved.uid;
        this.permalink.set('uid', uid);
        this.permalink.updateLocation();
      }

      this.unsavedChanges = false;
    },

    rename() {
      let newTitle = prompt('Palette title:', this.saved?.title ?? this.defaultPaletteTitle);

      if (newTitle && newTitle !== this.saved?.title) {
        this.save({ title: newTitle });
      }
    },

    // Cannot name this delete() because Vue complains
    deleteSaved() {
      sidebar.palette.delete(this.saved);
    },

    postDelete() {
      this.saved = null;
      this.permalink.delete('uid');
      this.uid = undefined;
      this.permalink.updateLocation();
    },

    /**
     * Remove a specific tweak or all tweaks
     * @param {string} [param] - The tweak to remove. If not provided, all tweaks are removed.
     */
    reset(param, context = this) {
      if (!param || param === 'chromaScale') {
        context.chromaScale = 1;
      }

      if (param in this.hueShifts) {
        context.hueShifts[param] = 0;
      } else if (!param) {
        for (let hue in this.hueShifts) {
          context.hueShifts[hue] = 0;
        }
      }

      if (!param || param === 'grayColor') {
        context.grayColor = this.originalGrayColor;
      }

      if (!param || param === 'grayChroma') {
        context.grayChroma = this.originalGrayChroma;
      }

      return context;
    },
  }, // end methods

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

  components: {
    ColorPopup,
    ColorSlider,
    ColorSwatchPicker,
    InfoTip,
  },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function init() {
  let paletteAppContainer = document.querySelector('#palette-app');
  globalThis.paletteApp?.unmount?.();

  if (!paletteAppContainer) {
    return;
  }

  globalThis.paletteApp = createApp(paletteAppSpec).mount(paletteAppContainer);
}

init();
addEventListener('turbo:render', init);
