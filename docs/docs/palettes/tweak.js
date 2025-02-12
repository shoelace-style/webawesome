import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { cdnUrl, getPaletteCode, hueRanges, hues, Permalink } from '../../assets/scripts/tweak.js';
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
const originalColors = {};

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

for (let td of document.querySelectorAll('.core-column')) {
  let { hue, oklch } = td.dataset;

  if (!hue || hue === 'gray') continue;

  oklch = oklch.split(',').map(Number);
  oklch = { l: oklch[0], c: oklch[1], h: oklch[2] };
  originalColors[hue] = oklch;
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

  computed: {
    tweaks() {
      return { hueShifts: this.hueShifts };
    },

    paletteHTML() {
      return palette(this.paletteId, this.tweaks, { language: 'html', cdnUrl });
    },

    paletteCSS() {
      return palette(this.paletteId, this.tweaks, { language: 'css', cdnUrl });
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
      },
    },
  },

  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
}).mount('table.colors.main');
