// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import CoreColorInput from './core-color-input.js';
import Prism from '/assets/scripts/prism.js';
import { Permalink } from '/assets/scripts/tweak.js';
import { cssImport, cssLiteral, cssRule } from '/assets/scripts/tweak/code.js';
import {
  cdnUrl,
  HUE_SHIFTS,
  hueRanges,
  hues,
  lRanges,
  maxGrayChroma,
  moreHue,
  selectors,
  tints,
  urls,
} from '/assets/scripts/tweak/data.js';
import {
  arrayNext,
  arrayPrevious,
  camelCase,
  capitalize,
  clamp,
  findClosestRange,
  mapRange,
  progress,
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
      seedColorSamples: ['oklch(77% 0.19 70)', 'rgb(95, 59, 255)', '#f06', 'yellowgreen', 'oklch(82% 0.185 195)'],
      paletteId,
      paletteTitle: palette.title,
      originalColors: palette.colors,
      permalink: new Permalink(),
      hueRanges,
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
    Object.assign(this, { moreHue });

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
      let ret = {};

      for (let color of this.seedColorObjects) {
        let hue = findClosestRange(hueRanges, color.get('oklch.h'), { type: 'angle' }).key;
        let level = findClosestRange(lRanges, color.get('oklch.l')).key;
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

    isTweaked() {
      return Object.values(this.hueShifts).some(Boolean);
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
      for (let hue in this.seedHues) {
        let [coreLevel, coreColor] = Object.entries(this.seedHues[hue])[0];

        let distance = coreColor.get('oklch.l') - (lRanges[coreLevel].max + lRanges[coreLevel].min) / 2;
        let coreChroma = coreColor.get('oklch.c');
        ret[hue] ??= {
          maxChromaTint: coreLevel,
          maxChromaTintRaw: coreLevel,
          maxChroma: coreChroma,
          maxChromaRaw: coreChroma,
        };

        let scale = getLightestChromaScale(hue, coreLevel, coreChroma);
        let chroma95 = clamp(0, coreChroma * scale, 0.1);

        // Find if any hue shift applies to this hue (we assume defined hue shifts are mutually exclusive)
        let autoHueShift = HUE_SHIFTS.find(
          ({ range }) =>
            subtractAngles(range[0], coreColor.get('oklch.h')) <= 0 &&
            subtractAngles(coreColor.get('oklch.h'), range[1]) <= 0,
        );

        for (let tint of tints) {
          if (tint in this.seedHues[hue]) {
            ret[hue][tint] = this.seedHues[hue][tint];
          } else {
            let color = coreColor.clone().to('oklch');

            // Lightness
            let mid = (lRanges[tint].max + lRanges[tint].min) / 2;
            color.set('l', mid + distance);

            // Calculate auto hue shift
            let deltaLevel = tint - coreLevel;
            let edgeLevel = deltaLevel < 0 ? '05' : '95';

            if (autoHueShift && tint !== '05') {
              // No hue shift for darkest tint
              let intensity = 1;

              if (coreColor.get('oklch.h') < autoHueShift.peak[0]) {
                intensity = progress(coreColor.get('oklch.h'), autoHueShift.range[0], autoHueShift.peak[0]);
              } else if (coreColor.get('oklch.h') > autoHueShift.peak[1]) {
                intensity = progress(coreColor.get('oklch.h'), autoHueShift.peak[1], autoHueShift.range[1]);
              }

              let maxShift = deltaLevel < 0 ? autoHueShift.shift.dark : autoHueShift.shift.light;
              let p = progress(tint, coreLevel, Math.max(edgeLevel, 10));
              let shift = maxShift * intensity * p ** 0.75;
              color.set('oklch.h', coreColor.get('oklch.h') + shift);
            }

            // Chroma
            if (tint > coreLevel) {
              // Lighter, reduce chroma
              let chroma = mapRange(tint, {
                from: [coreLevel, 95],
                to: [coreChroma, chroma95],
                progression: p => p ** this.factor,
              });
              color.set('c', chroma);
            }

            color = color.toGamut('p3');

            ret[hue][tint] = color;
          }
        }
      }

      // Get rest of hues from default palette
      // TODO generate from existing colors
      for (let hue of hues) {
        if (hue in ret) {
          continue;
        }

        ret[hue] = this.originalColors[hue];
      }

      ret.gray = generateGrays(ret, this);

      return ret;
    },

    colors() {
      return applyTweaks.call(this, this.baseColors, this.tweaks, this.tweaked);
    },

    colorsMinusChromaScale() {
      let tweaked = { ...this.tweaked, chromaScale: false };
      return applyTweaks.call(this, this.baseColors, this.tweaks, tweaked);
    },

    colorsMinusHueShifts() {
      let tweaked = { ...this.tweaked, hue: false };
      return applyTweaks.call(this, this.baseColors, this.tweaks, tweaked);
    },

    colorsMinusGrayChroma() {
      let tweaked = { ...this.tweaked, grayChroma: false };
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

        let relHue = shift < 0 ? arrayPrevious(hues, hue) : arrayNext(hues, hue);
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
        if (!this.baseColors[hue]) {
          console.log(hue);
        }
        let maxChromaTintRaw = this.baseColors[hue].maxChromaTintRaw;
        ret[hue] = this.baseColors[hue][maxChromaTintRaw];
      }
      return ret;
    },

    coreColors() {
      let ret = {};
      for (let hue in this.colors) {
        let maxChromaTintRaw = this.colors[hue].maxChromaTintRaw;
        ret[hue] = this.colors[hue][maxChromaTintRaw];
      }

      return ret;
    },

    coreLevels() {
      let ret = {};

      for (let hue in this.colors) {
        let maxChromaTint = this.colors[hue].maxChromaTint;
        ret[hue] = maxChromaTint;
      }

      return ret;
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
    /**
     * Testing method. Import all core colors from a given palette.
     * @param {string} paletteId
     */
    emulate(paletteId) {
      for (let hue in allPalettes[paletteId].colors) {
        if (hue !== 'gray') {
          let coreTint = allPalettes.natural.colors[hue].maxChromaTint;
          let coreColor = allPalettes.natural.colors[hue][coreTint];
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
    reset(param) {
      if (!param || param === 'chromaScale') {
        this.chromaScale = 1;
      }

      if (param in this.hueShifts) {
        this.hueShifts[param] = 0;
      } else if (!param) {
        for (let hue in this.hueShifts) {
          this.hueShifts[hue] = 0;
        }
      }

      if (!param || param === 'grayColor') {
        this.grayColor = this.originalGrayColor;
      }

      if (!param || param === 'grayChroma') {
        this.grayChroma = this.originalGrayChroma;
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

export function getPaletteCode(paletteId, colors, tweaked, options) {
  let imports = [];

  if (paletteId) {
    imports.push(urls.palette(paletteId));
  }

  let css = '';
  let declarations = [];

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
        declarations.push(`--wa-color-${hue}-${tint}: ${stringified};`);
      }

      declarations.push('');
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

function generateGrays(baseColors, { grayColor, grayChroma }) {
  let ret = {};
  let undertoneScale = baseColors[grayColor];

  // These will be the same, since scaling them won't change the relationship
  ret.maxChromaTint = undertoneScale.maxChromaTint;
  ret.maxChromaTintRaw = undertoneScale.maxChromaTintRaw;

  for (let tint of tints) {
    let colorUndertone = undertoneScale[tint].clone().to('oklch');
    ret[tint] = colorUndertone.set({ c: c => c * grayChroma });
  }

  ret.maxChroma = ret[ret.maxChromaTint].get('oklch.c');
  ret.maxChromaRaw = ret[ret.maxChromaTintRaw].get('oklch.c');

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

/*
┌─────────┬────────┬───────┬────────┬───────┬───────┬────────┬───────┐
│ (index) │ median │ avg   │ stddev │ min   │ max   │ extent │ count │
├─────────┼────────┼───────┼────────┼───────┼───────┼────────┼───────┤
│ 40      │ 0.069  │ 0.073 │ 0.019  │ 0.047 │ 0.099 │ 0.052  │ 6     │
│ 50      │ 0.09   │ 0.094 │ 0.015  │ 0.073 │ 0.13  │ 0.058  │ 18    │
│ 70      │ 0.17   │ 0.17  │ 0      │ 0.17  │ 0.17  │ 0      │ 1     │
│ 60      │ 0.2    │ 0.2   │ 0      │ 0.2   │ 0.2   │ 0      │ 1     │
│ 80      │ 0.4    │ 0.4   │ 0.07   │ 0.31  │ 0.49  │ 0.17   │ 4     │
└─────────┴────────┴───────┴────────┴───────┴───────┴────────┴───────┘
*/
function getLightestChromaScale(hue, tint, chroma) {
  return (
    {
      95: 1,
      90: 0.8,
      80: 0.5,
      70: 0.2,
      60: 0.2,
      50: 0.15,
    }[tint] ?? 0.1
  );
}
