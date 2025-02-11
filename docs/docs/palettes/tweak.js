import { cdnUrl, getPaletteCode, HUE_RANGES, hues, Permalink } from '../../assets/scripts/tweak.js';
import Prism from '/assets/scripts/prism.js';

let codeSnippets = document.querySelector('#usage ~ wa-tab-group.import-stylesheet-code:first-of-type');
codeSnippets = {
  html: codeSnippets.querySelector('code.language-html'),
  css: codeSnippets.querySelector('code.language-css'),
};

const paletteId = wa_data.paletteId;
const permalink = new Permalink();
const hueShifts = Object.fromEntries(hues.map(hue => [hue, 0]));
const tweaks = { hueShifts };

// Read URL params and apply them. This facilitates permalinks.
permalink.mapObject(hueShifts, {
  keyTo: key => key.replace(/-shift$/, ''),
  keyFrom: key => key + '-shift',
  valueFrom: value => (!value ? '' : Number(value)),
  valueTo: value => (!value ? 0 : Number(value)),
});

const tweakHueTemplate = (hue, oklch) => {
  let ranges = HUE_RANGES[hue];
  let hueIndex = hues.indexOf(hue);
  let hueBefore = hues[hueIndex === 0 ? hues.length - 1 : hues.indexOf(hue) - 1];
  let hueAfter = hues[hueIndex === hues.length - 1 ? 0 : hues.indexOf(hue) + 1];

  let h = oklch.h;
  let min = Math.floor(ranges.min - h);
  let max = Math.ceil(ranges.max - h);

  return `
<div class="popup">
  <div class="decorated-slider" style="--min: ${min}; --max: ${max};">
    <wa-slider name="${hue}-shift" value="0" min="${min}" max="${max}" step="1">
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
  let { hue, oklch } = td.dataset;

  if (!hue || hue === 'gray') continue;

  oklch = oklch.split(',').map(Number);
  oklch = { l: oklch[0], c: oklch[1], h: oklch[2] };
  let dropdown = document.createElement('wa-dropdown');
  swatch.slot = 'trigger';
  dropdown.innerHTML = tweakHueTemplate(hue, oklch);
  swatch.replaceWith(dropdown);
  dropdown.prepend(swatch);
  let slider = dropdown.querySelector('wa-slider');

  // Dragging sliders
  dropdown.addEventListener('input', e => {
    let delta = Math.round(slider.value);
    let tr = td.closest('tr');
    tr.classList.add('tweaking');

    if (Math.abs(delta) <= 1) {
      hueShifts[hue] = 0;
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
      updateControl(slider, 0);
    }
  });
}

await Promise.all(['wa-slider'].map(tag => customElements.whenDefined(tag)));

if (location.search) {
  // Update from URL
  permalink.writeTo(hueShifts);

  for (let hue in hueShifts) {
    let value = hueShifts[hue];

    if (value) {
      let slider = document.querySelector(`wa-slider[name="${hue}-shift"]`);
      if (slider) {
        updateControl(slider, value);
      }
    }
  }
}

function updateControl(control, value) {
  if ('value' in control) {
    control.value = value;
  } else {
    // Not yet initialized
    control.setAttribute('value', value);
  }

  control.dispatchEvent(new Event('input', { bubbles: true }));
  control.dispatchEvent(new Event('change', { bubbles: true }));
}

function render() {
  // Update code snippets
  for (let language in codeSnippets) {
    let codeSnippet = codeSnippets[language];
    let copyButton = codeSnippet.previousElementSibling;
    let code = getPaletteCode(paletteId, tweaks, { language, cdnUrl });
    codeSnippet.textContent = code;
    copyButton.value = code;
    Prism.highlightElement(codeSnippet);

    permalink.readFrom(hueShifts);

    // Update page URL
    permalink.updateLocation();
  }
}
