// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

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

let paletteAppSpec = {
  data() {
    const { paletteId, colors, maxChroma } = wa_data;

    // Replace colors with their oklch coords (since they're all opaque and all in the same color space)
    for (let hue in colors) {
      for (let tint of tints) {
        colors[hue][tint] = colors[hue][tint].coords;
      }
    }

    return {
      permalink: new Permalink(),
      hueRanges,
      hueShifts: Object.fromEntries(hues.map(hue => [hue, 0])),
      paletteId,
      originalColors: colors,
      maxChroma,
      chromaScale: 1,
      tweaking: {},
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
        this.chromaScale = Number(this.permalink.get('chromaScale') || 1);
      }
    }
  },

  mounted() {
    if (this.isTweaked) {
      // Update contrast colors
      updateContrastTables(this.colors);
    }
  },

  computed: {
    tweaks() {
      return { hueShifts: this.hueShifts, chromaScale: this.chromaScale };
    },

    isTweaked() {
      return Object.values(this.hueShifts).some(Boolean);
    },

    paletteHTML() {
      return getPaletteCode(this.paletteId, this.tweaks, { language: 'html', cdnUrl });
    },

    paletteCSS() {
      return getPaletteCode(this.paletteId, this.tweaks, { language: 'css', cdnUrl });
    },

    colors() {
      let ret = {};

      for (let hue in this.originalColors) {
        ret[hue] = {};

        for (let tint of tints) {
          ret[hue][tint] = this.originalColors[hue][tint].slice();

          if (this.hueShifts[hue]) {
            ret[hue][tint][2] += this.hueShifts[hue];
          }

          if (this.chromaScale !== 1) {
            ret[hue][tint][1] *= this.chromaScale;
          }
        }
      }

      return ret;
    },
  },

  watch: {
    // Note: These could move to `v-html` directives if we widen the app root
    paletteHTML() {
      let codeElement = document.querySelector('#usage ~ wa-tab-group.import-stylesheet-code code.language-html');
      codeElement.textContent = this.paletteHTML;
      let copyButton = codeElement.previousElementSibling;
      copyButton.value = this.paletteHTML;
      Prism.highlightElement(codeElement);
    },

    paletteCSS() {
      let codeElement = document.querySelector('#usage ~ wa-tab-group.import-stylesheet-code code.language-css');
      codeElement.textContent = this.paletteCSS;
      let copyButton = codeElement.previousElementSibling;
      copyButton.value = this.paletteCSS;
      Prism.highlightElement(codeElement);
    },

    hueShifts: {
      deep: true,
      handler() {
        this.permalink.readFrom(this.hueShifts);

        // Update page URL
        this.permalink.updateLocation();

        // Update contrast colors
        updateContrastTables(this.colors);
      },
    },

    chromaScale() {
      this.permalink.set('chroma-scale', this.chromaScale, 1);

      // Update page URL
      this.permalink.updateLocation();

      // Update contrast colors
      updateContrastTables(this.colors);
    },
  },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};

function init() {
  globalThis.paletteApp = createApp(paletteAppSpec).mount('#palette-app');
}

function updateContrastTables(colors) {
  for (let table of document.querySelectorAll('.contrast-table')) {
    let { minContrast } = table.dataset;

    for (let tr of table.querySelectorAll('tr[data-hue]')) {
      let { hue } = tr.dataset;

      for (let td of tr.querySelectorAll('td[data-tint-bg][data-tint-fg]')) {
        let swatch = td.querySelector('.color.swatch');

        let { tintBg, tintFg, originalContrast } = td.dataset;

        let bg = new Color('oklch', colors[hue][tintBg]);
        let fg = new Color('oklch', colors[hue][tintFg]);

        if (!originalContrast) {
          td.dataset.originalContrast = originalContrast = swatch.textContent.trim();
        }

        let contrast = bg.contrast(fg, 'WCAG21').toLocaleString(undefined, { maximumSignificantDigits: 2 });
        swatch.textContent = contrast;

        swatch.classList.toggle('value-up', contrast > originalContrast);
        swatch.classList.toggle('value-down', contrast < originalContrast);
        swatch.classList.toggle('contrast-fail', contrast < minContrast);

        swatch.style.setProperty('--color', bg.display());
        swatch.style.setProperty('color', fg.display());
      }
    }
  }
}

init();
addEventListener('turbo:render', init);
