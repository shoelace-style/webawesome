// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import { cdnUrl, getPaletteCode, hueRanges, hues, Permalink, tints } from '../../assets/scripts/tweak.js';
import { palette } from '../../assets/scripts/tweak/code.js';
import Prism from '/assets/scripts/prism.js';

let codeSnippets = document.querySelector('#usage ~ wa-tab-group.import-stylesheet-code:first-of-type');
codeSnippets = {
  html: codeSnippets.querySelector('code.language-html'),
  css: codeSnippets.querySelector('code.language-css'),
};

const paletteId = wa_data.paletteId;
const permalink = new Permalink();
const hueShifts = Object.fromEntries(hues.map(hue => [hue, 0]));
const originalColors = wa_data.colors;

// Replace colors with their oklch coords (since they're all opaque and all in the same color space)
for (let hue in originalColors) {
  for (let tint of tints) {
    originalColors[hue][tint] = originalColors[hue][tint].coords;
  }
}

// Read URL params and apply them. This facilitates permalinks.
permalink.mapObject(hueShifts, {
  keyTo: key => key.replace(/-shift$/, ''),
  keyFrom: key => key + '-shift',
  valueFrom: value => (!value ? '' : Number(value)),
  valueTo: value => (!value ? 0 : Number(value)),
});

if (location.search) {
  // Update from URL
  permalink.writeTo(hueShifts);
}

await Promise.all(['wa-slider'].map(tag => customElements.whenDefined(tag)));

globalThis.paletteApp = createApp({
  data() {
    return {
      hueRanges,
      hueShifts,
      paletteId,
      originalColors,
      tweaking: {},
    };
  },

  mounted() {
    if (this.isTweaked) {
      // Update contrast colors
      updateContrastTables(this.colors);
    }
  },

  computed: {
    tweaks() {
      return { hueShifts: this.hueShifts };
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
        }
      }

      return ret;
    },
  },

  watch: {
    // Note: These could move to `v-html` directives if we widen the app root
    paletteHTML() {
      codeSnippets.html.textContent = this.paletteHTML;
      let copyButton = codeSnippets.html.previousElementSibling;
      copyButton.value = this.paletteHTML;
      Prism.highlightElement(codeSnippets.html);
    },

    paletteCSS() {
      codeSnippets.css.textContent = this.paletteCSS;
      let copyButton = codeSnippets.css.previousElementSibling;
      copyButton.value = this.paletteCSS;
      Prism.highlightElement(codeSnippets.css);
    },

    hueShifts: {
      deep: true,
      handler() {
        permalink.readFrom(this.hueShifts);

        // Update page URL
        permalink.updateLocation();

        // Update contrast colors
        updateContrastTables(this.colors);
      },
    },
  },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
}).mount('table.colors.main');

function updateContrastTables(colors) {
  for (let td of document.querySelectorAll('.contrast-table td[data-tint-bg][data-tint-fg]')) {
    let table = td.closest('.contrast-table');
    let { minContrast } = table.dataset;
    let { tintBg, tintFg } = td.dataset;
    let tr = td.parentNode;
    let swatch = td.querySelector('.color.swatch');
    let { hue } = tr.dataset;

    let bg = new Color('oklch', colors[hue][tintBg]);
    let fg = new Color('oklch', colors[hue][tintFg]);
    let originalContrast = td.dataset.originalContrast;

    if (!originalContrast) {
      td.dataset.originalContrast = originalContrast = swatch.textContent.trim();
    }

    let contrast = bg.contrast(fg, 'WCAG21').toLocaleString(undefined, { maximumSignificantDigits: 2 });
    swatch.textContent = contrast;

    swatch.classList.toggle('value-up', contrast > originalContrast);
    swatch.classList.toggle('value-down', contrast < originalContrast);
    swatch.classList.toggle('contrast-fail', contrast < minContrast);
  }
}
