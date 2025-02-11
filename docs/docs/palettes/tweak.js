import { palette as getPaletteCode } from '../../assets/scripts/tweak/code.js';
import { cdnUrl, HUE_RANGES, hues } from '../../assets/scripts/tweak/data.js';
import Prism from '/assets/scripts/prism.js';

let codeSnippets = document.querySelector('#usage ~ wa-tab-group.import-stylesheet-code:first-of-type');
codeSnippets = {
  html: codeSnippets.querySelector('code.language-html'),
  css: codeSnippets.querySelector('code.language-css'),
};

const paletteId = wa_data.paletteId;
const hueShifts = {};

const tweakHueTemplate = (hue, oklch) => {
  let ranges = HUE_RANGES[hue];
  if (!ranges) console.log('No range for', hue);
  let hueIndex = hues.indexOf(hue);
  let hueBefore = hues[hueIndex === 0 ? hues.length - 1 : hues.indexOf(hue) - 1];
  let hueAfter = hues[hueIndex === hues.length - 1 ? 0 : hues.indexOf(hue) + 1];

  return `
<div class="popup">
  <div class="decorated-slider" style="--hue-min: ${ranges.min}; --hue-max: ${ranges.max};">
    <wa-slider value="${Math.round(oklch.h)}" min="${Math.floor(ranges.min)}" max="${Math.ceil(ranges.max)}" step="1">
      <div slot="label">
        Tweak ${hue} hue
        <wa-icon-button class="clear-button" name="circle-xmark" library="system" variant="regular" label="Reset"></wa-icon>
      </div>
    </wa-slider>

    <div class="label-min">More ${hueBefore}</div>
    <div class="label-max">More ${hueAfter}</div>
  </div>
  <div class="wa-flank:end wa-gap-s">
    <code>--wa-color-${hue}</code>
    <wa-copy-button value="--wa-color-${hue}" copy-label="--wa-color-${hue}"></wa-copy-button>
  </div>
</div>`;
};

for (let td of document.querySelectorAll('.core-column')) {
  let swatch = td.querySelector('.color.swatch');
  let { hue, oklchH, oklchC, oklchL } = td.dataset;

  if (!hue || hue === 'gray') continue;

  let dropdown = document.createElement('wa-dropdown');
  swatch.slot = 'trigger';
  let oklch = { h: +oklchH, c: +oklchC, l: +oklchL };
  dropdown.innerHTML = tweakHueTemplate(hue, oklch);
  swatch.replaceWith(dropdown);
  dropdown.prepend(swatch);
  let slider = dropdown.querySelector('wa-slider');

  // Dragging sliders
  dropdown.addEventListener('input', e => {
    let value = slider.value;
    let delta = Math.round(value - oklch.h);
    let tr = td.closest('tr');
    tr.classList.add('tweaking');

    if (Math.abs(delta) <= 1) {
      delete hueShifts[hue];
      tr.classList.remove('tweaked');
      tr.style.removeProperty('--hue-shift');
      return;
    }

    hueShifts[hue] = delta;
    tr.classList.add('tweaked');
    tr.style.setProperty('--hue-shift', delta);
  });

  // Finished dragging
  dropdown.addEventListener('change', e => {
    let tr = td.closest('tr');
    tr.classList.remove('tweaking');

    render();
  });

  // Clear button
  dropdown.addEventListener('click', e => {
    if (e.target.closest('wa-icon-button')) {
      slider.value = oklch.h;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

function render() {
  // Update code snippets
  for (let language in codeSnippets) {
    let codeSnippet = codeSnippets[language];
    let copyButton = codeSnippet.previousElementSibling;
    let code = getPaletteCode(paletteId, { hueShifts }, { language, cdnUrl });
    codeSnippet.textContent = code;
    copyButton.value = code;
    Prism.highlightElement(codeSnippet);
  }
}
