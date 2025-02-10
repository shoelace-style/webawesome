const HUE_RANGES = {
  red: { min: 15, max: 35 },
  // gap: 35 - 50, will be filled by orange
  yellow: { min: 50, max: 100 },
  // gap: 100 - 130
  green: { min: 130, max: 170 },
  // gap: 170 - 180
  cyan: { min: 180, max: 220 },
  // gap: 220 - 240
  blue: { min: 240, max: 270 },
  indigo: { min: 270, max: 290 },
  purple: { min: 290, max: 320 },
  // gap: 320 - 360, 0 - 15, will be filled by pink
};

const hues = Object.keys(HUE_RANGES);

const tweaked = {};

const tweakHueTemplate = (hue, oklch) => {
  let ranges = HUE_RANGES[hue];
  if (!ranges) console.log('No range for', hue);
  let hueIndex = hues.indexOf(hue);
  let hueBefore = hues[hueIndex === 0 ? hues.length - 1 : hues.indexOf(hue) - 1];
  let hueAfter = hues[hueIndex === hues.length - 1 ? 0 : hues.indexOf(hue) + 1];

  return `
<div class="popup">
  <div class="decorated-slider" style="--hue-min: ${ranges.min}; --hue-max: ${ranges.max};">
    <wa-slider value="${Math.round(oklch.h)}" min="${ranges.min}" max="${ranges.max}">
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

  dropdown.addEventListener('input', e => {
    let value = slider.value;
    let delta = value - oklch.h;
    let tr = td.closest('tr');
    tr.classList.add('tweaking');

    if (Math.abs(delta) < 1) {
      delete tweaked[hue];
      tr.classList.remove('tweaked');
      tr.style.removeProperty('--hue-shift');
      return;
    }

    tweaked[hue] = delta;
    tr.classList.add('tweaked');
    tr.style.setProperty('--hue-shift', delta);
  });

  dropdown.addEventListener('change', e => {
    let tr = td.closest('tr');
    tr.classList.remove('tweaking');
  });

  dropdown.addEventListener('click', e => {
    if (e.target.closest('wa-icon-button')) {
      slider.value = oklch.h;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
}
