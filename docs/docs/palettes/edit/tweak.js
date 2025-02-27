// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import CoreColorInput from './core-color-input.js';
import { generateGrays, generateScale, placeColor } from './generateScale.js';
import Prism from '/assets/scripts/prism.js';
import { Permalink } from '/assets/scripts/tweak.js';
import { cssImport, cssLiteral, cssRule } from '/assets/scripts/tweak/code.js';
import {
  cdnUrl,
  HUE_RANGES,
  hues,
  L_RANGES,
  MAX_CHROMA_BOUNDS,
  maxGrayChroma,
  moreHue,
  selectors,
  tints,
  urls,
} from '/assets/scripts/tweak/data.js';
import {
  camelCase,
  capitalize,
  clampAngle,
  interpolate,
  interpolateAngles,
  progressAngle,
  subtractAngles,
} from '/assets/scripts/tweak/util.js';

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

const percentFormatter = value => value.toLocaleString(undefined, { style: 'percent' });

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
      paletteId,
      paletteTitle: palette.title,
      originalColors: palette.colors,
      permalink: new Permalink(),
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      chromaScale: 1,
      grayChroma: undefined,
      grayColor: undefined,
      tweaking: {},
      saved: null,
      factor: 1.2,
    };
  },

  created() {
    // Non-reactive variables to expose
    Object.assign(this, { moreHue, HUE_RANGES, L_RANGES, hues, tints, MAX_CHROMA_BOUNDS });

    // Read URL params and apply them. This facilitates permalinks.
    this.permalink.mapObject(this.hueShifts, {
      keyTo: key => key.replace(/-shift$/, ''),
      keyFrom: key => key + '-shift',
      valueFrom: value => (!value ? '' : Number(value)),
      valueTo: value => (!value ? 0 : Number(value)),
    });

    this.grayChroma = this.originalGrayChroma;
    this.grayColor = this.originalGrayColor;

    if (location.search) {
      // Update from URL
      this.permalink.writeTo(this.hueShifts);

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
      }

      this.saved = sidebar.palette.getSaved(this.getPalette());
    }
  },

  mounted() {
    for (let ref in this.$refs) {
      this.$refs[ref].tooltipFormatter = percentFormatter;
    }
  },

  computed: {
    seedColorObjects() {
      return this.seedColors
        .map(color => {
          try {
            return Color.get(color);
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean);
    },

    seedHues() {
      // Make sure hues are in the right order
      let ret = Object.fromEntries(hues.map(hue => [hue, undefined]));

      for (let color of this.seedColorObjects) {
        let { hue, level } = placeColor(color);
        ret[hue] ??= {};
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
        let code = getPaletteCode(this.paletteId, this.colors, this.tweaked, { language, cdnUrl });
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

      let ret = {};

      // Generate scales from seed hues
      let firstSeedHue;
      for (let hue in this.seedHues) {
        let seedColors = this.seedHues[hue];

        if (seedColors) {
          firstSeedHue ??= hue;
          ret[hue] = generateScale(seedColors);
        }
      }

      // Fill in remaining hues
      let hueBefore = firstSeedHue;

      for (let hue of this.huesAfter[firstSeedHue]) {
        if (hue in ret) {
          continue;
        }

        // Shift if too close to pinned hues
        let huesAfter = this.huesAfter[hue];
        let pinnedHuesAfter = huesAfter.filter(hue => hue in ret);
        let pinnedHue = [pinnedHuesAfter.at(-1), pinnedHuesAfter[0]];
        let hueProgress =
          pinnedHuesAfter.length === 1
            ? 0
            : progressAngle(
                HUE_RANGES[hue].mid,
                pinnedHue.map(hue => HUE_RANGES[hue].mid),
              );

        let pinnedScale = pinnedHue.map(hue => ret[hue]);
        let h = HUE_RANGES[hue].mid;

        let hBefore = ret[hueBefore][ret[hueBefore].maxChromaTint].get('oklch.h');
        let hDelta = subtractAngles(h, hBefore);

        if (hDelta < 40) {
          h = hBefore + 40;
        }

        h = clampAngle(HUE_RANGES[hue].min, h, HUE_RANGES[hue].max);

        let c = interpolate(
          hueProgress,
          pinnedScale.map(scale => scale.maxChroma),
        );
        let l = interpolate(
          hueProgress,
          pinnedScale.map(scale => L_RANGES[scale.maxChromaTint].mid),
        );

        let coreColor = new Color('oklch', [l, c, h]).toGamut('p3');

        ret[hue] = generateScale(coreColor);
        hueBefore = hue;
      }

      ret.gray = generateGrays(ret, this);

      return ret;
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

        if (this.saved) {
          this.save({ silent: true });
        }
      },
    },
  },

  methods: {
    capitalize,

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

    getPalette() {
      return { id: this.paletteId, uid: this.uid, search: location.search };
    },

    save({ silent } = {}) {
      let title = silent
        ? (this.saved?.title ?? this.paletteTitle)
        : prompt('Palette title:', `${this.paletteTitle} (tweaked)`);

      if (!title) {
        return;
      }

      let uid = this.uid;

      if (!uid) {
        // First time saving
        this.uid = uid = sidebar.palette.getUid();

        this.permalink.set('uid', uid);
        this.permalink.updateLocation();
      }

      let palette = { ...this.getPalette(), uid, title };

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
    CoreColorInput,
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

export function getPaletteCode(paletteId, colors, tweaked, options = {}) {
  let imports = [];

  if (paletteId && options.imports !== false) {
    imports.push(urls.palette(paletteId));
  }

  let css = '';
  let declarations = [];
  let prefix = options.prefix ?? 'wa-color';

  if (tweaked) {
    for (let hue in colors) {
      if (hue === 'orange') {
        continue;
      } else if (hue === 'gray') {
        if (!tweaked.grayChroma && !tweaked.grayColor) {
          continue;
        }
      } else if (!tweaked.chromaScale && !tweaked.hue?.[hue]) {
        continue;
      }

      for (let tint of tints) {
        let color = colors[hue][tint];
        let stringified = color.toString({ format: color.inGamut('srgb') ? 'hex' : undefined });
        declarations.push(`--${prefix}-${hue}-${tint}: ${stringified};`);
      }

      declarations.push('');
    }

    if (declarations.length > 0) {
      let selector = options.selector ?? selectors.palette(paletteId);
      css += cssRule(selector, declarations);
    }
  }

  let ret = imports.map(url => cssImport(url, options)).join('\n');

  if (css) {
    ret += `\n\n${cssLiteral(css, options)}`;
  }

  return ret;
}

function applyTweaks(baseColors, tweaks, tweaked) {
  let ret = {};
  let { hueShifts, chromaScale = 1, grayColor, grayChroma } = tweaks;

  if (!tweaked) {
    return baseColors;
  }

  if (tweaked.grayChroma) {
    grayChroma = this.computedGrayChroma;
  }

  for (let hue in baseColors) {
    let originalScale = baseColors[hue];
    let scale = (ret[hue] = {});
    let descriptors = Object.getOwnPropertyDescriptors(originalScale);
    Object.defineProperties(scale, {
      maxChromaTint: { ...descriptors.maxChromaTint, enumerable: false },
      maxChromaTintRaw: { ...descriptors.maxChromaTintRaw, enumerable: false },
    });

    if (hue === 'gray') {
      if (tweaked.grayChroma || tweaked.grayColor) {
        ret.gray = generateGrays(baseColors, { grayColor, grayChroma });
      } else {
        ret.gray = originalScale;
      }
      continue;
    }

    for (let tint of tints) {
      let color = originalScale[tint].clone();

      let tweak = {};
      let thisTweaked = false;

      if (tweaked.hue && hueShifts[hue]) {
        tweak.h = h => h + hueShifts[hue];
        thisTweaked = true;
      }

      if (tweaked.chromaScale && chromaScale !== 1) {
        tweak.c = c => c * chromaScale;
        thisTweaked = true;
      }

      if (thisTweaked) {
        color = color.to('oklch').set(tweak);
      }

      scale[tint] = color;
    }
  }

  return ret;
}

function getContrasts(colors, originalContrasts) {
  let ret = {};

  for (let hue in colors) {
    ret[hue] = {};

    for (let tintBg of tints) {
      ret[hue][tintBg] = {};
      let bgColor = colors[hue][tintBg];

      if (!bgColor || !bgColor.contrast) {
        continue;
      }

      for (let tintFg of tints) {
        let fgColor = colors[hue][tintFg];
        let value = bgColor.contrast(fgColor, 'WCAG21');
        if (originalContrasts) {
          let original = originalContrasts[hue][tintBg][tintFg];
          ret[hue][tintBg][tintFg] = { value, original, bgColor, fgColor };
        } else {
          ret[hue][tintBg][tintFg] = value;
        }
      }
    }
  }

  return ret;
}
