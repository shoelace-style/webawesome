// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { cdnUrl, hueRanges, hues, Permalink, tints } from '../../assets/scripts/tweak.js';
import { cssImport, cssLiteral, cssRule } from '../../assets/scripts/tweak/code.js';
import { maxGrayChroma, moreHue, selectors, urls } from '../../assets/scripts/tweak/data.js';
import { subtractAngles } from '../../assets/scripts/tweak/util.js';
import Prism from '/assets/scripts/prism.js';
import content from '/assets/scripts/vue/directives/content.js';
import savedMixin from '/assets/scripts/vue/mixins/saved.js';

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
  mixins: [savedMixin],

  data() {
    let appRoot = document.querySelector('#palette-app');
    let paletteId = appRoot.dataset.paletteId;
    let palette = allPalettes[paletteId];

    return {
      paletteId,
      originalTitle: palette.title,
      originalColors: palette.colors,
      hueRanges,
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      chromaScale: 1,
      grayChroma: undefined,
      grayColor: undefined,
      tweaking: {},
      type: 'palette',
      collection: 'palettes',
    };
  },

  created() {
    // Non-reactive variables to expose
    Object.assign(this, { moreHue });

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
    }
  },

  mounted() {
    for (let ref in this.$refs) {
      this.$refs[ref].tooltipFormatter = percentFormatter;
    }
  },

  computed: {
    /** Default palette title for saving */
    defaultTitle() {
      return this.originalTitle + ' (tweaked)';
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

    colors() {
      return applyTweaks.call(this, this.originalColors, this.tweaks, this.tweaked);
    },

    colorsMinusChromaScale() {
      let tweaked = { ...this.tweaked, chromaScale: false };
      return applyTweaks.call(this, this.originalColors, this.tweaks, tweaked);
    },

    colorsMinusHueShifts() {
      let tweaked = { ...this.tweaked, hue: false };
      return applyTweaks.call(this, this.originalColors, this.tweaks, tweaked);
    },

    colorsMinusGrayChroma() {
      let tweaked = { ...this.tweaked, grayChroma: false };
      return applyTweaks.call(this, this.originalColors, this.tweaks, tweaked);
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
      return getContrasts(this.originalColors);
    },

    contrasts() {
      return getContrasts(this.colors, this.originalContrasts);
    },

    originalCoreColors() {
      let ret = {};
      for (let hue in this.originalColors) {
        let maxChromaTintRaw = this.originalColors[hue].maxChromaTintRaw;
        ret[hue] = this.originalColors[hue][maxChromaTintRaw];
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

    originalGrayColor() {
      let grayHue = this.originalCoreColors.gray.get('h');
      let minDistance = Infinity;
      let closestHue = null;

      for (let name in this.originalCoreColors) {
        if (name === 'gray') {
          continue;
        }

        let hue = this.originalCoreColors[name].get('h');
        let distance = Math.abs(subtractAngles(hue, grayHue));
        if (distance < minDistance) {
          minDistance = distance;
          closestHue = name;
        }
      }

      return closestHue ?? 'indigo';
    },

    originalGrayChroma() {
      let coreTint = this.originalColors.gray.maxChromaTint;
      let grayChroma = this.originalColors.gray[coreTint].get('c');
      if (grayChroma === 0 || grayChroma === null) {
        return 0;
      }

      let grayColorChroma = this.originalColors[this.originalGrayColor][coreTint].get('c');
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
  },

  methods: {
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
    content,
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

function arrayNext(array, element) {
  let index = array.indexOf(element);
  return array[(index + 1) % array.length];
}

function arrayPrevious(array, element) {
  let index = array.indexOf(element);
  return array[(index - 1 + array.length) % array.length];
}

function applyTweaks(originalColors, tweaks, tweaked) {
  let ret = {};
  let { hueShifts, chromaScale = 1, grayColor, grayChroma } = tweaks;

  if (!tweaked) {
    return originalColors;
  }

  if (tweaked.grayChroma) {
    grayChroma = this.computedGrayChroma;
  }

  for (let hue in originalColors) {
    let originalScale = originalColors[hue];
    let scale = (ret[hue] = {});
    let descriptors = Object.getOwnPropertyDescriptors(originalScale);
    Object.defineProperties(scale, {
      maxChromaTint: { ...descriptors.maxChromaTint, enumerable: false },
      maxChromaTintRaw: { ...descriptors.maxChromaTintRaw, enumerable: false },
    });

    for (let tint of tints) {
      let color = originalScale[tint].clone();

      if (tweaked.hue && hueShifts[hue]) {
        color.set({ h: h => h + hueShifts[hue] });
      }

      if (tweaked.chromaScale && chromaScale !== 1) {
        color.set({ c: c => c * chromaScale });
      }

      if (hue === 'gray' && (tweaked.grayChroma || tweaked.grayColor)) {
        let colorUndertone = originalColors[grayColor][tint].clone();
        color = colorUndertone.set({ c: c => c * grayChroma });
      }

      scale[tint] = color;
    }
  }

  return ret;
}

function camelCase(str) {
  return (str + '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
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
