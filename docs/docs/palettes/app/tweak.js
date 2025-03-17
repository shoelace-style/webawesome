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
import ColorInput from './vue-components/color-input.js';
import ColorPopup from './vue-components/color-popup.js';
import ColorSelect from './vue-components/color-select.js';
import ColorSlider from './vue-components/color-slider.js';
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
  maxGrayChroma,
  moreHue,
  ROLES,
  tints,
} from '/assets/scripts/tweak/data.js';
import { camelCase, capitalize, log, slugify, subtractAngles } from '/assets/scripts/tweak/util.js';

const firstSeedColor = '#0071ec';

let paletteAppSpec = {
  data() {
    let appRoot = document.querySelector('#palette-app');
    let paletteId = appRoot.dataset.paletteId;
    let palette = allPalettes[paletteId];

    return {
      uid: undefined,
      maxSeedUid: 0,
      seedColors: [],
      seedColorSamples: [
        '#0071ec',
        'oklch(77% 0.19 70)',
        'rgb(95, 59, 255)',
        '#f06',
        'yellowgreen',
        'oklch(82% 0.185 195)',
        'oklch(30% 0.18 150)',
      ],
      paletteId,
      originalPaletteTitle: palette.title,
      originalColors: paletteId === 'custom' ? allPalettes.default.colors : palette.colors,
      permalink: new Permalink(),
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      chromaScale: 1,
      grayChroma: undefined,
      grayColor: undefined,
      saved: null,
      unsavedChanges: false,
      savedPalettes: sidebar.palettes.saved,
      roles: Object.fromEntries(ROLES.map(role => [role, undefined])),
    };
  },

  created() {
    // Non-reactive variables to expose
    Object.assign(this, { moreHue, hueBefore, hueAfter, HUE_RANGES, L_RANGES, hues, tints, MAX_CHROMA_BOUNDS });

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
        this.seedColors = this.permalink.getAll('color').map(value => {
          if (value.startsWith('{')) {
            try {
              return JSON.parse(value);
            } catch (e) {
              return { value };
            }
          } else {
            return { value };
          }
        });
      }

      if (this.permalink.has('uid')) {
        this.uid = Number(this.permalink.get('uid'));
        this.saved = sidebar.palettes.saved.find(p => p.uid === this.uid);
      }

      for (let role in this.roles) {
        let value = this.permalink.get(`role-${role}`);
        if (value) {
          this.roles[role] = value;
        }
      }
    }
  },

  mounted() {
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
        if (this.isSeeded) {
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
          ret[role] = 'brand';
        }
      }

      return ret;
    },

    computedRoles() {
      return Object.fromEntries(ROLES.map(role => [role, this.roles[role] ?? this.defaultRoles[role]]));
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

    seedColorValues() {
      return this.seedColors.map(c => {
        if (c.pinnedHue) {
          let { value, pinnedHue } = c;
          return { value, pinnedHue };
        } else {
          return c.value;
        }
      });
    },

    seedColorObjectsRaw() {
      return this.seedColors.map(c => c.colorRaw);
    },

    seedColorObjects() {
      return this.seedColors.map(c => c.color);
    },

    isSeeded() {
      return this.seedColorObjectsRaw.filter(Boolean).length > 0;
    },

    seedColorInfo() {
      return this.seedColors.map(({ hue, level }) => ({ hue, level }));
    },

    /**
     * Map hue + level to index in seedColors
     */
    colorToIndex() {
      let ret = {};

      for (let hue of allHues) {
        ret[hue] = {};
      }

      if (!this.isSeeded) {
        return ret;
      }

      for (let i = 0; i < this.seedColors.length; i++) {
        let { hue, level } = this.seedColors[i];

        if (!hue || !level) {
          continue;
        }

        ret[hue][level] = i;
      }

      for (let hue in this.coreLevels) {
        if (ret[hue]) {
          ret[hue].core = ret[hue][this.coreLevels[hue]];
        }
      }

      return ret;
    },

    hueRoles() {
      let ret = {};
      for (let role in this.computedRoles) {
        let value = this.computedRoles[role];
        ret[value] ??= [];
        ret[value].push(role);
      }
      return ret;
    },

    seedColorRoles() {
      return this.seedColorInfo.map(info => {
        if (!info) {
          return [];
        }

        let { hue } = info;
        return this.hueRoles[hue];
      });
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

      for (let i = 0; i < this.seedColors.length; i++) {
        let seed = this.seedColors[i];
        let { hue, level, color } = seed;

        if (!hue) {
          continue;
        }

        if (!ret[hue]) {
          // First color of this hue
          delete ret[hue]; // remove non-enumerable descriptor
          ret[hue] = {};
        }

        ret[hue][level] = color;
      }

      return ret;
    },

    paletteScales() {
      if (!this.isCustom) {
        return this.colors;
      }

      let ret = Object.fromEntries(
        Object.keys(this.colors)
          .filter(hue => this.seedHues[hue] || hue === 'gray')
          .map(hue => [hue, this.colors[hue]]),
      );

      // Ensure gray is last
      if (ret.gray) {
        let grayScale = ret.gray;
        delete ret.gray;
        ret.gray = grayScale;
      }

      return ret;
    },

    paletteScalesList() {
      return Object.keys(this.paletteScales);
    },

    paletteScalesSet() {
      return new Set(this.paletteScalesList);
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
      if (!this.isSeeded) {
        return this.originalColors;
      }

      let { huesAfter, grayChroma = 0.15, grayColor = 'indigo' } = this;
      return generatePalette(this.seedHues, { huesAfter, grayChroma, grayColor }) ?? this.originalColors;
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
        seedColors: this.seedColors.length > 0,
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
      return getContrasts(this.paletteScales, this.originalContrasts);
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
      let grayChroma = this.grayChroma ?? this.originalGrayChroma;
      return Math.min(grayChroma, this.maxGrayChroma);
    },

    computedGrayColor() {
      return this.grayColor ?? this.originalGrayColor;
    },

    maxGrayChroma() {
      return maxGrayChroma[this.grayColor] ?? 0.3;
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

    /** When tweaking a non-core tint, which tint are we tweaking relative to? */
    tweakBase() {
      let ret = {};

      for (let hue in this.paletteScales) {
        let pinned = Object.keys(this.seedHues[hue] ?? {}).sort((a, b) => a - b);
        let core = this.coreLevels[hue];
        ret[hue] ??= {};

        for (let tint in this.paletteScales[hue]) {
          if (tint === core) {
            continue;
          }

          let delta = tint - core;

          if (pinned.length <= 1) {
            // If nothing is pinned or just the core level is pinned, all other tints are edited relative to that
            ret[hue][tint] = core;
          } else {
            // Find closest pinned tint in the direction of the core color
            if (delta < 0) {
              // We want the first pinned tint that is larger than tint
              ret[hue][tint] = pinned.find(pinnedTint => pinnedTint > tint);
            } else {
              // We want the last pinned tint that is smaller than tint
              ret[hue][tint] = pinned.findLast(pinnedTint => pinnedTint < tint);
            }
          }
        }
      }

      return ret;
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

    seedColorValues: {
      deep: true,
      handler() {
        this.permalink.set('color', this.seedColorValues);

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

    roles: {
      deep: true,
      handler() {
        for (let role in this.roles) {
          this.permalink.set(`role-${role}`, this.roles[role]);
        }

        // Update page URL
        this.permalink.updateLocation();

        if (this.saved || this.isCustom) {
          this.unsavedChanges = true;
        }
      },
    },

    paletteScalesSet: {
      deep: true,
      handler() {
        for (let role in this.roles) {
          if (this.roles[role] && !this.paletteScalesSet.has(this.roles[role])) {
            // Role color is no longer in the palette
            this.roles[role] = undefined;
          }
        }
      },
    },
  }, // end watch

  methods: {
    capitalize,
    slugify,
    getMaxChroma,
    log,

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
          this.addColor(coreColor);
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

    /**
     * Assign a hue to a role
     * @param {string} role - Role we are setting
     * @param {string} hue - Hue (literal or semantic)
     */
    setRoleColor(role, hue) {
      if (!this.seedHues[hue] && hue !== 'gray') {
        // We're also adding it
        this.addColor(this.coreColors[hue]);
      }

      this.roles[role] = hue;
    },

    /**
     * Set a color's role(s)
     * @param {string | number} hueOrIndex
     * @param {string | string[]} roles
     */
    setColorRole(hueOrIndex, roles) {
      let hue = hueOrIndex >= 0 ? this.seedColorInfo[hueOrIndex]?.hue : hueOrIndex;
      roles = new Set(Array.isArray(roles) ? roles : [roles]);

      for (let role in this.roles) {
        if (roles.has(role)) {
          this.roles[role] = hue;
        } else if (this.roles[role] === hue) {
          this.roles[role] = undefined;
        }
      }
    },

    addColor(value, options) {
      if (!value) {
        if (this.seedColors.length === 0) {
          value = firstSeedColor;
        } else {
          // Add suggestions
          for (let hue of ['red', 'green', 'yellow', 'blue', 'orange', 'cyan', 'purple', 'pink', 'indigo']) {
            if (hue in this.suggestedColors) {
              value = { hue };
              break;
            }
          }
        }
      }

      if (value?.hue) {
        // Pinning a generated color
        let { hue, level, pinnedHue } = value;

        level ??= this.coreLevels[hue];
        let color = this.colors[hue][level];
        value = { value: color + '', color, pinnedHue };
      }

      if (typeof value === 'string') {
        value = { value };
      } else if (value instanceof Color || value?.constructor.name === 'Color') {
        value = { value: value + '', color: value };
      }

      if (options) {
        Object.assign(value, options);
      }

      value.uid ??= this.maxSeedUid++;
      this.seedColors.push(value);
    },

    deleteColor(index) {
      this.seedColors.splice(index, 1);
    },

    getColor(ref) {
      let color, index;

      if (this.isCustom) {
        if (ref?.hue) {
          let { hue, level } = ref;
          color = this.colors[hue][level];
          index = this.colorToIndex[hue][level];
        } else if (ref > 0) {
          index = ref;
          color = this.seedColors[index]?.color;
        }
      } else {
        let { hue, level } = ref;
        color = this.baseColors[hue][level];
      }

      return { color, index };
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
    ColorInput,
    ColorSelect,
    ColorSlider,
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
