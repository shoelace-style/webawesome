// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import generatePalette from './color/generate-palette.js';
import getPaletteCode from './color/get-palette-code.js';
import { applyTweaks } from './color/modify-palette.js';
import allPalettes from './color/palettes.js';
import { getContrasts, identifyColor } from './color/util.js';
import ColorInput from './vue-components/color-input.js';
import ColorSelect from './vue-components/color-select.js';
import Prism from '/assets/scripts/prism.js';
import { Permalink } from '/assets/scripts/tweak.js';
import {
  cdnUrl,
  HUE_RANGES,
  hues,
  L_RANGES,
  MAX_CHROMA_BOUNDS,
  maxGrayChroma,
  moreHue,
  tints,
} from '/assets/scripts/tweak/data.js';
import { camelCase, capitalize, slugify, subtractAngles } from '/assets/scripts/tweak/util.js';

await Promise.all(['wa-slider'].map(tag => customElements.whenDefined(tag)));

const percentFormatter = value => value.toLocaleString(undefined, { style: 'percent' });
const roles = ['brand', 'neutral', 'success', 'warning', 'danger'];

let paletteAppSpec = {
  data() {
    let appRoot = document.querySelector('#palette-app');
    let paletteId = appRoot.dataset.paletteId;
    let palette = allPalettes[paletteId];

    return {
      uid: undefined,
      seedColors: [],
      seedColorSamples: [
        'oklch(77% 0.19 70)',
        'rgb(95, 59, 255)',
        '#f06',
        'yellowgreen',
        'oklch(82% 0.185 195)',
        'oklch(30% 0.18 150)',
      ],
      show: paletteId === 'custom' ? 'my' : 'all',
      paletteId,
      originalPaletteTitle: palette.title,
      originalColors: paletteId === 'custom' ? allPalettes.default.colors : palette.colors,
      permalink: new Permalink(),
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      chromaScale: 1,
      grayChroma: undefined,
      grayColor: undefined,
      tweaking: {},
      saved: null,
      unsavedChanges: false,
      savedPalettes: sidebar.palettes.saved,
      roles: Object.fromEntries(roles.map(role => [role, undefined])),
    };
  },

  created() {
    // Non-reactive variables to expose
    Object.assign(this, { moreHue, HUE_RANGES, L_RANGES, hues, tints, MAX_CHROMA_BOUNDS });

    this.grayChroma = this.originalGrayChroma;
    this.grayColor = this.originalGrayColor;

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

      if (this.permalink.has('color')) {
        this.seedColors = this.permalink.getAll('color');
      }

      if (this.permalink.has('uid')) {
        this.uid = Number(this.permalink.get('uid'));
        this.saved = sidebar.palettes.saved.find(p => p.uid === this.uid);
      }
    }
  },

  mounted() {
    for (let ref in this.$refs) {
      this.$refs[ref].tooltipFormatter = percentFormatter;
    }

    nextTick().then(() => {
      this.unsavedChanges = false;
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
      if (this.isCustom) {
        if (this.seedColorObjects.length > 0) {
          return 2;
        } else if (this.seedColors.length > 0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return this.tweaked ? 1 : 0;
      }
    },

    suggestedForRole() {
      let ret = {};

      if (!this.seedHues.green) {
        ret.success = ['green'];
      }

      ret.warning = [];
      if (!this.seedHues.yellow) {
        ret.warning.push('yellow');
      }
      if (!this.seedHues.orange) {
        ret.warning.push('orange');
      }

      if (!this.seedHues.red) {
        ret.danger = ['red'];
      }

      return ret;
    },

    defaultRoles() {
      let seedHues = new Set(this.seedHueList);

      // Arrays define candidates in preference order
      let ret = {
        brand: ['blue', 'indigo', 'purple', 'cyan', 'pink', 'green', 'orange', 'yellow', 'red', 'gray'],
        neutral: 'gray',
        success: ['green'],
        warning: ['yellow', 'orange'],
        danger: ['red'],
      };

      // Reduce to first candidate in seed hues
      for (let role in ret) {
        if (Array.isArray(ret[role])) {
          ret[role] = ret[role].find(hue => seedHues.has(hue));
        }
      }

      if (this.seedColors.length === 0) {
        return ret;
      }

      // Now apply brand color to anything empty
      for (let role in ret) {
        if (!ret[role]) {
          ret[role] = ret.brand;
        }
      }

      return ret;
    },

    computedRoles() {
      return Object.fromEntries(roles.map(role => [role, this.roles[role] ?? this.defaultRoles[role]]));
    },

    suggestedColors() {
      let ret = {};

      for (let hue in this.coreColors) {
        if (!this.seedHues[hue] && hue !== 'gray') {
          ret[hue] = this.coreColors[hue];
        }
      }

      return ret;
    },

    isCustom() {
      return this.paletteId === 'custom';
    },

    slug() {
      if (this.isCustom) {
        return slugify(this.paletteTitle);
      } else {
        // The slug does not change for tweaked palettes
        return this.paletteId;
      }
    },

    /** Default palette title for saving */
    defaultPaletteTitle() {
      if (this.isCustom) {
        return 'My Palette';
      } else {
        return this.originalPaletteTitle + ' (tweaked)';
      }
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

    seedColorObjects() {
      return this.seedColors
        .map(color => {
          if (!color) {
            return null;
          }

          try {
            return Color.get(color);
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean);
    },

    seedHueList() {
      return Object.keys(this.seedHues);
    },

    seedHues() {
      // Make sure hues are in the right order
      let ret = {};
      for (let hue of hues) {
        Object.defineProperty(ret, hue, { value: undefined, enumerable: false, writable: true, configurable: true });
      }

      for (let color of this.seedColorObjects) {
        let { hue, level } = identifyColor(color);

        if (!ret[hue]) {
          // First color of this hue
          delete ret[hue]; // remove non-enumerable descriptor
          ret[hue] = {};
        }

        ret[hue][level] = color;
      }

      return ret;
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
          slug: this.isCustom ? this.slug : undefined,
          colors: this.colors,
          tweaked: this.tweaked,
          roles: this.isCustom ? this.computedRoles : this.roles,
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

    baseColors() {
      if (this.seedColors.length === 0) {
        return this.originalColors;
      }

      let { huesAfter, grayChroma, grayColor } = this;
      return generatePalette(this.seedHues, { huesAfter, grayChroma, grayColor }) ?? this.originalColors;
    },

    colors() {
      return applyTweaks.call(this, this.baseColors, this.tweaks, this.tweaked);
    },

    colorsMinusCurrentTweak() {
      if (!this.tweaked) {
        return this.baseColors;
      }

      let tweaked = { ...this.tweaked };

      for (let thing in this.tweaking) {
        if (thing in tweaked && this.tweaking[thing]) {
          tweaked[thing] = false;
        }
      }

      return applyTweaks.call(this, this.baseColors, this.tweaks, tweaked);
    },

    tweaked() {
      let anyHueTweaked = Object.values(this.hueShifts).some(Boolean);
      let hue = anyHueTweaked
        ? Object.fromEntries(Object.entries(this.hueShifts).map(([hue, shift]) => [hue, shift !== 0]))
        : false;

      let ret = {
        seedColors: this.seedColors.length > 0,
        chromaScale: this.chromaScale !== 1,
        hue,
        grayChroma: this.grayChroma !== this.originalGrayChroma,
        grayColor: this.grayColor !== this.originalGrayColor,
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

        let relHue = shift < 0 ? this.hueBefore[hue] : this.hueAfter[hue];
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
        let maxChromaTintRaw = this.baseColors[hue].maxChromaTintRaw;
        ret[hue] = this.baseColors[hue][maxChromaTintRaw];
      }
      return ret;
    },

    baseMaxChroma() {
      return Math.max(
        ...Object.values(this.baseCoreColors)
          .map(color => color.get('oklch.c'))
          .filter(c => c >= 0),
      );
    },

    coreColors() {
      let ret = {};
      for (let hue in this.colors) {
        let maxChromaTintRaw = this.colors[hue].maxChromaTintRaw;
        ret[hue] = this.colors[hue][maxChromaTintRaw];
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
      let coreTint = this.baseColors.gray.maxChromaTint;
      let grayChroma = this.baseColors.gray[coreTint].get('oklch.c');
      if (grayChroma === 0 || grayChroma === null) {
        return 0;
      }

      let grayColorChroma = this.baseColors[this.originalGrayColor][coreTint].get('oklch.c');
      return grayChroma / grayColorChroma;
    },

    /**
     * We want to preserve the original grayChroma selection so that when the user switches to another undertone
     * that supports higher chromas, their selection will be there.
     * This property is the gray chroma % that is actually applied.
     */
    computedGrayChroma() {
      return Math.min(this.grayChroma, this.maxGrayChroma);
    },

    maxGrayChroma() {
      return maxGrayChroma[this.grayColor] ?? 0.3;
    },

    hueBefore() {
      return Object.fromEntries(hues.map((hue, i) => [hue, hues[i - 1] ?? hues.at(-1)]));
    },

    hueAfter() {
      return Object.fromEntries(hues.map((hue, i) => [hue, hues[i + 1] ?? hues[0]]));
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
  },

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

    seedColors: {
      deep: true,
      handler() {
        this.permalink.set('color', this.seedColors);
        this.permalink.updateLocation();

        if (this.saved || this.isCustom) {
          this.unsavedChanges = true;
        }
      },
    },

    tweaks: {
      deep: true,
      async handler(value, oldValue) {
        await nextTick(); // must run after individual watchers

        // Update page URL
        this.permalink.updateLocation();

        if (this.saved || this.isCustom) {
          this.unsavedChanges = true;
        }
      },
    },
  },

  methods: {
    capitalize,
    slugify,

    /**
     * Testing method. Import all core colors from a given palette.
     * @param {string} paletteId
     */
    emulate(paletteId) {
      this.seedColors = [];

      for (let hue in allPalettes[paletteId].colors) {
        if (hue !== 'gray') {
          let coreTint = allPalettes[paletteId].colors[hue].maxChromaTint;
          let coreColor = allPalettes[paletteId].colors[hue][coreTint];
          this.seedColors.push(coreColor);
        }
      }
    },

    save({ title } = {}) {
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

    setRole(role, hue) {
      if (!this.seedHues[hue]) {
        // We're also adding it
        this.seedColors.push(this.coreColors[hue] + '');
      }

      this.roles[role] = hue;
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

  components: {
    ColorInput,
    ColorSelect,
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
